import { StrictMode } from 'react'
import { AuthProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GameProvider } from './context/Context.jsx';

// ARRANQUE DE LA APP
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <GameProvider>
        <App />
    </GameProvider>
  </AuthProvider>
  </StrictMode>
)
