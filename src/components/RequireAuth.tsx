import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function RequireAuth({ children }: { children: React.ReactElement }) {
    const auth = useContext(AuthContext)
    const location = useLocation()
    if (!auth) throw new Error('AuthContext missing')
    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}
