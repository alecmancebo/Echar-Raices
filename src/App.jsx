import './index.css';
import { useContext } from 'react';
import { Context, GameProvider } from './context/Context';
import GameContainer from './components/GameContainer/GameContainer.jsx';
import StartMenu from './components/StartMenu.jsx';
import Storyboard from './components/Storyboard/Storyboard.jsx'; 

function AppContent() {
  const { gameState } = useContext(Context);

  const renderScreen = () => {
    switch (gameState) {
      case 'START_MENU':
        return <StartMenu />;
      case 'STORYBOARD':
        return <Storyboard />;
      case 'PLAYING':
        return <GameContainer />;
      default:
        return null;
    }
  };


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

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;