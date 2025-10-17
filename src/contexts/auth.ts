import { createContext } from 'react'

export type User = {
    name: string
    email: string
}

export type AuthContextType = {
    user: User | null
    login: (email: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
