import './index.css';
import { useContext } from 'react';
import { Context, GameProvider } from './context/Context';
import GameContainer from './components/GameContainer/GameContainer.jsx';
import StartMenu from './components/StartMenu.jsx';
import Storyboard from './components/Storyboard/Storyboard.jsx'; 
import Login from './components/Login/Login.jsx';
import GameMenu from './components/GameMenu/GameMenu.jsx';
import Inventory from './components/Inventory/Inventory.jsx'; 
import EndingFade from './components/EndingFade/EndingFade.jsx';
import GameOver from './components/GameOver/GameOver.jsx';
import { DetectorPantalla } from './components/DetectorPantalla/DetectorPantalla.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext';

function AppContent() {
  const { loadingAuth, token } = useContext(AuthContext);
  const { gameState, loading } = useContext(Context);
 
  //pantallas de carga 
  if (loadingAuth) return <div>Cargando sesión...</div>;
  if (loading) return <div>Cargando recursos del juego...</div>;

  let screen = null;
  switch (gameState) {
      case 'LOGIN': screen = <Login />; break;
      case 'STORYBOARD': screen = <Storyboard />; break;
      case 'INTRO_FADE': screen = <EndingFade />; break;
      case 'ENDING_FADE': screen = <EndingFade />; break;
      case 'GAME_OVER': screen = <GameOver />; break;
      case 'PLAYING': screen = token ? <GameContainer /> : <Login />; break;
      case 'LOADING_GAME': screen = <div>Cargando datos...</div>; break;
      case 'START_MENU':
      default: screen = <StartMenu />;
  }

  return (
    <>
      {screen}
      <DetectorPantalla />
    </>
  );

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