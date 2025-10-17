import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <header className='flex items-center justfy-between px-6'>
            <h2>Página Inicial (Home)</h2>
            <p className="flex"><Link to="/login">login</Link>.</p>
        </header>
    )
}
