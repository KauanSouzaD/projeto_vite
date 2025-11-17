import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Tarefa from '../pages/Tarefa'
import MainTarefas from '../pages/Auth/MainTarefas'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="tarefa" element={<Tarefa />} />
                <Route path="/maintarefas" element={<MainTarefas />} />
            </Routes>
        </BrowserRouter>
    )
}
