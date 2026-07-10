import { useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const routeLabels = {
  a: 'A',
  b: 'B',
  c: 'C',
};

const GameOver = () => {
  const { setGameState, winningItinerary } = useContext(Context);

  const handleBackToStart = () => {
    setGameState('START_MENU');
  };

  const routeLabel = routeLabels[winningItinerary] || '?';

  return (
    <section className="game-over" aria-label="Pantalla de game over">
      <div className="game-over__panel">
        <p className="game-over__kicker">fin de ruta</p>
        <h1 className="game-over__title">Game Over</h1>
        <p className="game-over__summary">Has completado el final del itinerario {routeLabel}.</p>
        <button type="button" className="pixel-btn game-over__action" onClick={handleBackToStart}>
          volver a Inicio
        </button>
      </div>
    </section>
  );
};

export default GameOver;
