import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import {PresProvider} from './contexts/PresProvider.jsx'
import TokenProvider from './contexts/TokenProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <AuthProvider>
        <PresProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PresProvider>
      </AuthProvider>
    </TokenProvider>
  </StrictMode>,
)
