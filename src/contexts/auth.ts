import { createContext } from 'react'

export type User = {
    name: string
    email: string
}

export type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
    apiFetch?: (path: string, opts?: RequestInit) => Promise<Response>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
