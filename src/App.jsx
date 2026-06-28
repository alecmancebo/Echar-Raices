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

function AppContent() {
  const { gameState, isInventoryOpen } = useContext(Context);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < 480 && window.innerHeight > window.innerWidth);

  const renderScreen = () => {
    switch (gameState) {
      case 'START_MENU':
        return <StartMenu />;
      case 'LOGIN':
        return <Login />;
      case 'STORYBOARD':
        return <Storyboard />;
      case 'PLAYING':
        return (
          <>
            <GameContainer />
          </>
        );
      
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerWidth < 480 && window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Si está en vertical, NO renderizamos el resto del juego
  if (isPortrait) {
    return <DetectorPantalla />;
  }

  return (
    <>
      {renderScreen()}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;