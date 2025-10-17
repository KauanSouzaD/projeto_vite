import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    if (!auth) throw new Error('AuthContext not found')

    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname || '/'

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        await auth!.login(email)
        navigate(from, { replace: true })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}
