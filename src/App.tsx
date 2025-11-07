import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <div>
      <div className="pt-20 p-6">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default App
