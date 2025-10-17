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

    async function login(email: string /* password: string */) {
        const demoUser = { name: email.split('@')[0], email }
        setUser(demoUser)
        localStorage.setItem('user', JSON.stringify(demoUser))
    }

    async function register(name: string, email: string, _password: string) {
        // Demo: apenas cria o usuário localmente. Em produção, chamar API de registro.
        void _password
        const newUser = { name, email }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        // Em um caso real, você armazenaria token e não a senha.
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
