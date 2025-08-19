import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App/>  
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
)
