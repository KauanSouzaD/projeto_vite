import { Link, Outlet } from 'react-router-dom'
import '../../App.css'

export default function Home() {
    return (
        <div className="bg-white shadow-black-100 max-w-4xl mx-auto px-4 py-8">
            <div>
                <img className='w-18 mb-7 mx-auto rounded-2xl shadow-md' src="../public/Logo.png" alt="#" />
                <h2 className="text-5xl text-black font-bold mb-4 shadow-sm rounded-2xl">TaskFlow</h2>
            </div>
            <p className="pt-5 mb-4 text-gray-500 font-semibold mt-10">Organize suas tarefas de forma simples e eficiente</p>
            <div className="pt-20 p-6">
                <Outlet />

                <Link
                    to="/register"
                    className="mx-auto mr-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-100 font-medium transition"
                >
                    Começar Agora
                </Link>

                <Link
                    to="/login"
                    className="mx-auto text-blue-600 px-6 py-2 rounded-lg shadow hover:bg-blue-100 font-medium transition"
                >
                    Login
                </Link>
            </div>
        </div>
    )
}
