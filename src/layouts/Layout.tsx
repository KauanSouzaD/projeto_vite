import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export default function Layout() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    function handleLogout() {
        auth?.logout()
        navigate('/')
    }

    return (
        <>
            <header>
                <nav  className="flex text-2xl font-bold text-white-800">
                     <Link to="/login">Login</Link>
                    {' '}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}
