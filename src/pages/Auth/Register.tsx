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

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Preencha todos os campos.')
      return
    }

    try {
      await a.register(name, email, password)
      navigate('/')
    } catch (err: any) {
      alert(err?.message || 'Erro ao registrar')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent">
      <div className="bg-white md:w-[400px] flex-none w-[200px] 
      h-full flex flex-col justify-center p-8 text-white rounded-md border border-gray-300">

        <h2 className="text-2xl font-semibold text-left text-gray-800 mb-6">
          Criar Conta
        </h2>

        <p className='text-[10px] font-semibold text-left text-gray-800 mb-6'>
          Crie sua conta para começar a organizar suas tarefas
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 text-left font-medium mb-1">
              Nome:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                         bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                         bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left font-medium mb-1">
              Senha:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                         bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 
                       text-white font-semibold py-2 rounded-lg 
                       transition-all duration-200"
          >
            Registrar
          </button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Já possui conta?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>

      </div>
    </div>
  )
}
