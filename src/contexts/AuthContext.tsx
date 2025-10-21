import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './auth'
import type { User } from './auth'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const saved = localStorage.getItem('user')
        if (saved) setUser(JSON.parse(saved))
    }, [])

    // LocalStorage-based users: stored under key 'users' as array [{ name, email, passwordHash }]
    function getUsers(): Array<{ name: string; email: string; password: string }> {
        const raw = localStorage.getItem('users')
        if (!raw) return []
        try {
            return JSON.parse(raw)
        } catch {
            return []
        }
    }

    function saveUsers(users: Array<{ name: string; email: string; password: string }>) {
        localStorage.setItem('users', JSON.stringify(users))
    }

    async function login(email: string, password: string) {
        const users = getUsers()
        const found = users.find(u => u.email === email && u.password === password)
        if (!found) throw new Error('Credenciais inválidas')
        const newUser: User = { name: found.name, email: found.email }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    async function register(name: string, email: string, password: string) {
        const users = getUsers()
        const existing = users.find(u => u.email === email)
        if (existing) throw new Error('Email já cadastrado')
        users.push({ name, email, password })
        saveUsers(users)
        const newUser: User = { name, email }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('user')
    }

    // compatibility apiFetch that reads/writes local tasks if path matches
    async function apiFetch(path: string, opts: RequestInit = {}) {
        // support /api/tasks endpoints locally
        if (path.startsWith('/api/tasks')) {
            // GET /api/tasks -> list tasks for current user
            const method = (opts.method || 'GET').toUpperCase()
            const current = user || (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null)
            const ownerKey = current ? `tasks_${current.email}` : 'tasks_public'
            if (method === 'GET') {
                const raw = localStorage.getItem(ownerKey)
                return new Response(raw ?? '[]', { status: 200 })
            }
            if (method === 'POST') {
                const body = opts.body ? JSON.parse(opts.body as string) : {}
                const newTask = { _id: `${Date.now()}`, title: body.title || '', description: body.description || '', completed: false }
                const list = JSON.parse(localStorage.getItem(ownerKey) || '[]')
                list.push(newTask)
                localStorage.setItem(ownerKey, JSON.stringify(list))
                return new Response(JSON.stringify(newTask), { status: 200 })
            }
            if (method === 'DELETE') {
                const idMatch = path.match(/\/api\/tasks\/(.+)$/)
                const id = idMatch ? idMatch[1] : null
                if (!id) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
                const list = JSON.parse(localStorage.getItem(ownerKey) || '[]')
                const idx = list.findIndex((t: any) => t._id === id)
                if (idx === -1) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
                list.splice(idx, 1)
                localStorage.setItem(ownerKey, JSON.stringify(list))
                return new Response(JSON.stringify({ success: true }), { status: 200 })
            }
        }
        // default: return 404
        return new Response(JSON.stringify({ message: 'Not implemented' }), { status: 404 })
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, apiFetch }}>
            {children}
        </AuthContext.Provider>
    )
}
