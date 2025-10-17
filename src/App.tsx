import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/sobre">Sobre</Link> | <Link to="/contato">Contato</Link>
        </nav>
      </header>

      <main>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <Outlet />
      </main>
    </>
  )
}

export default App
