import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './twindSetup.js'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
)
