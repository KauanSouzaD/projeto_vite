import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <header>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/sobre">Sobre</Link> | <Link to="/contato">Contato</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}
