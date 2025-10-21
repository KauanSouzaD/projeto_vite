import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <header className="w-full flex items-center justify-between px-8 py-4 shadow-md fixed top-0 left-0 z-50">
        <h1 className="text-xl font-semibold">Meu Projeto</h1>

        <nav>
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* adiciona um padding-top para não sobrepor o conteúdo */}
      <main className="pt-20 p-6">
        <Outlet />
      </main>
    </>
  )
}

export default App
