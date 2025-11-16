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
        <>
        <div className=''>
           <img className='w-18 mb-7 mx-auto rounded-2xl shadow-md' src="../public/Logo.png" alt="#" />
        </div>
        <div className="flex h-[400px] w-full border border-gray-300 rounded-2xl mt-5">
            <div className="md:w-[400px] flex-none w-[300px] h-[400px] flex flex-col justify-center p-8 text-white rounded-md">
                <div className="mt-7 text-black text-2xl text-left font-bold pb-8">Entrar</div>
                <p className='text-left text-gray-500 mb-5'>Entre com suas Credênciais</p>
                <form onSubmit={handleSubmit} className="w-full max-w-[280px]">
                    <div>
                        <label className="text-black block mb-1 text-left">
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[337px] px-3 py-1 border border-gray-400 text-black bg-transparent outline-0 focus:outline-none focus:ring-2 focus:ring-white mt-1 rounded-md"
                                placeholder='Digite seu e-mail'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="text-black block mb-1 text-left">
                            Senha:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[337px] px-3 py-1 border border-gray-400 text-black bg-transparent outline-0 focus:outline-none focus:ring-2 focus:ring-white mt-1 rounded-md"
                                placeholder='Digite sua senha'
                            />
                        </label>
                    </div>

                    {error && (
                        <div className="text-sm text-red-400 mb-2">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-[337px] bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium text-white appearance-none border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-10"
                    >
                        Entrar
                    </button>

                    <div className='justify-center text-black w-60 text-xs mt-8 mb-5 m-11'>Não tem uma conta?  <a className='text-blue-400 text-1xl' href="/register">Cadastre-se</a></div>
                </form>
            </div>
        </div>
        </>
    )
}