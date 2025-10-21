import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'


export default function Tarefa() {
    const auth = useContext(AuthContext)
    const [title, setTitle] = useState('')

    if (!auth) return null
    const a = auth
    const navigate = useNavigate()
    const name = a.user?.name ?? 'Usuário'



    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Olá, {name}</h2>
                <button
                    onClick={() => {
                        a.logout()
                        navigate('/')
                    }}
                    className="btn-base bg-red-600 text-white px-3 py-1 rounded"
                >
                    Sair
                </button>
            </div>
        </div>
    )
}
