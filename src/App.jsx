import './index.css';
import { useContext, useEffect, useState } from 'react';
import { Context, GameProvider } from './context/Context';
import GameContainer from './components/GameContainer/GameContainer.jsx';
import StartMenu from './components/StartMenu.jsx';
import Storyboard from './components/Storyboard/Storyboard.jsx'; 
import Login from './components/Login/Login.jsx';
import GameMenu from './components/GameMenu/GameMenu.jsx';
import Inventory from './components/Inventory/Inventory.jsx'; 
import { DetectorPantalla } from './components/DetectorPantalla/DetectorPantalla.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext';

function AppContent() {
  const { loadingAuth, token } = useContext(AuthContext);
  const { gameState, isInventoryOpen, loading } = useContext(Context);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < 480 && window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerWidth < 480 && window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isPortrait) return <DetectorPantalla />;
 
  //pantallas de carga 
  if (loadingAuth) return <div>Cargando sesión...</div>;
  if (loading) return <div>Cargando recursos del juego...</div>;

  switch (gameState) {
      case 'LOGIN': return <Login />;
      case 'STORYBOARD': return <Storyboard />;
      case 'PLAYING': 
      return token ? <GameContainer /> : <Login />;
      case 'START_MENU': 
      default: return <StartMenu />;
  }

}

  


function App() {
  return (
    <AuthProvider>
    <GameProvider>
      <AppContent />
    </GameProvider>
    </AuthProvider>
  );
}

export default App;