import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    if (!auth) throw new Error('AuthContext not found')
    const a = auth

    // We will redirect to /tarefa on success

    function validateEmail(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (!validateEmail(email)) {
            setError('Informe um email v\u00e1lido')
            return
        }
        if (!password || password.length < 4) {
            setError('Senha deve ter pelo menos 4 caracteres')
            return
        }

        try {
            await a.login(email, password)
            navigate('/tarefa', { replace: true })
        } catch (err: any) {
            setError(err?.message || 'Erro ao logar')
        }
    }

    return (
        <div className="flex h-[400px] w-full overflow-hidden">

            <div className="dark:bg-neutral-900 md:w-[300px] flex-none w-[300px] h-full flex flex-col justify-center p-8 text-white rounded-md">
                <div className="text-2xl text-left font-bold pb-8">Login</div>
                <form onSubmit={handleSubmit} className="w-full max-w-[280px]">
                    <div>
                        <label className="block mb-1 text-left">
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-1 border border-white text-white bg-transparent outline-1 focus:outline-none focus:ring-2 focus:ring-white mt-1 rounded-md"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block mb-1 text-left">
                            Senha:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-1 border border-white text-white bg-transparent outline-1 focus:outline-none focus:ring-2 focus:ring-white mt-1 rounded-md"
                            />
                        </label>
                    </div>

                    {error && (
                        <div className="text-sm text-red-400 mb-2">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium text-white appearance-none border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-10"
                    >
                        Entrar
                    </button>

                    <div className='w-60 text-xs mt-15 mb-5'>Não tem uma conta?  <a className='text-1xl' href="/register">Cadastre-se</a></div>
                </form>
            </div>

            <div className="flex-1 h-full overflow-hidden rounded-md">
                <img
                    src="/img.jpg"
                    alt="Imagem de login"
                    className="w-[400px] h-[500px] object-cover"
                />
            </div>
        </div>
    )
}