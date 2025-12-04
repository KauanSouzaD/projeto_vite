import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    })

    if (!auth) throw new Error("AuthContext not found")
    const a = auth

    function validateForm() {
        let valid = true
        const newErrors = { name: '', email: '', password: '' }

        if (name.trim().length < 3) {
            newErrors.name = "O nome deve ter pelo menos 3 caracteres."
            valid = false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            newErrors.email = "Informe um e-mail válido."
            valid = false
        }

        if (password.length < 6) {
            newErrors.password = "A senha precisa ter no mínimo 6 caracteres."
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!validateForm()) return

        try {
            await a.register(name, email, password)
            navigate('/login', { replace: true })
        } catch (err: any) {
            setErrors(prev => ({ ...prev, email: err?.message || "Erro ao registrar" }))
        }
    }

    return (
        <>
            {/* LOGO */}
            <div className=''>
                <img
                    className='w-18 mb-7 mx-auto rounded-2xl shadow-md'
                    src="../public/Logo.png"
                    alt="logo"
                />
            </div>

            {/* CARD DE REGISTRO IGUAL AO LOGIN */}
            <div className="flex h-[500px] w-full border border-gray-300 rounded-2xl mt-5">
                <div className="md:w-[400px] flex-none w-[300px] h-[500px] flex flex-col justify-center p-8 text-white rounded-md">

                    {/* TÍTULO */}
                    <div className="mt-7 text-black text-2xl text-left font-bold pb-3">
                        Criar Conta
                    </div>
                    <p className='text-left text-gray-500 mb-5'>
                        Preencha seus dados para continuar
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-[280px]">

                        {/* NOME */}
                        <label className="text-black block mb-3 text-left">
                            Nome:
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-[337px] px-3 py-1 border rounded-md bg-transparent text-black outline-none mt-1 
                                    ${errors.name ? "border-red-400" : "border-gray-400"}`}
                                placeholder="Digite seu nome"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </label>

                        {/* EMAIL */}
                        <label className="text-black block mb-3 text-left">
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-[337px] px-3 py-1 border rounded-md bg-transparent text-black outline-none mt-1 
                                    ${errors.email ? "border-red-400" : "border-gray-400"}`}
                                placeholder="Digite seu e-mail"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </label>

                        {/* SENHA */}
                        <label className="text-black block mb-3 text-left">
                            Senha:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-[337px] px-3 py-1 border rounded-md bg-transparent text-black outline-none mt-1
                                    ${errors.password ? "border-red-400" : "border-gray-400"}`}
                                placeholder="Digite sua senha"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </label>

                        {/* BOTÃO */}
                        <button
                            type="submit"
                            className="w-[337px] bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium text-white mt-5
                                       focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Criar Conta
                        </button>

                        {/* LINK */}
                        <div className='justify-center text-black w-60 text-xs mt-8 mb-5 m-11'>
                            Já tem uma conta?  
                            <a className='text-blue-400 text-1xl ml-1' href="/login">
                                Entrar
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
