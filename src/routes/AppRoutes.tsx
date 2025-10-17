import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Contato from '../pages/Contato/contato'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="sobre" element={<Sobre />} />
                    <Route path="contato" element={<Contato />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
