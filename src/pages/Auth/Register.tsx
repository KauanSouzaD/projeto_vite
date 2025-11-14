import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    if (!auth) throw new Error('AuthContext not found')
    const a = auth

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            await a.register(name, email, password)
            navigate('/')
        } catch (err: any) {
            alert(err?.message || 'Erro ao registrar')
        }
    }

    return (
        <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nome:<br />
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Email:<br />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Senha:<br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}
