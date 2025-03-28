import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <GlobalStyles />
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
)
