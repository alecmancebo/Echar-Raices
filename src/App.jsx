// src/App.jsx
import './index.css';
import { useContext } from 'react';
import { Context, GameProvider } from './context/Context';
import GameContainer from './components/GameContainer/GameContainer.jsx';
import StartMenu from './components/StartMenu.jsx';

function AppContent() {
  const { gameState } = useContext(Context);

  // Renderizado condicional: o uno, o el otro.
  return (
    <>
      {gameState === 'START_MENU' ? (
        <StartMenu />
      ) : (
        <GameContainer />
      )}
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