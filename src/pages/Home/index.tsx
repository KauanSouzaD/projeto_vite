import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h2>Página Inicial (Home)</h2>
            <p>Ir para a página <Link to="/sobre">Sobre</Link>.</p>
        </div>
    )
}
