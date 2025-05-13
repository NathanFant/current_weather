import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CoordsProvider } from './context/CoordsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoordsProvider>
      <App />
    </CoordsProvider>
  </StrictMode>,
)
