import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import "../../App.css";

export default function MainTarefas() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  if (!auth) throw new Error('AuthContext not found')

  function handleLogout() {
    auth.logout()
    navigate('/', { replace: true })
  }

  function handleNovaTargefa() {
    // Adicione a lógica para criar nova tarefa
    console.log('Nova tarefa')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img className="w-10 h-10 rounded-lg" src="/Logo.png" alt="Logo" />
            <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/tarefa')}
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Minhas Tarefas
            </button>
            <button 
              onClick={handleNovaTargefa}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Nova Tarefa
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 font-medium transition"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bem-vindo ao TaskFlow
          </h2>
          <p className="text-gray-600">
            Gerencie suas tarefas de forma simples e eficiente
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="font-semibold text-gray-800 mb-2">
                Exemplo de Tarefa
              </h3>
              <p className="text-sm text-gray-600">
                Esta é uma tarefa de exemplo
              </p>
              <div className="mt-4 flex gap-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Editar
                </button>
                <button className="text-sm text-red-600 hover:text-red-800">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}