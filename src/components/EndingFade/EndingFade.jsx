import { useEffect, useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const EndingFade = () => {
  const { gameState, completeEndingTransition, completeIntroTransition } = useContext(Context);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (gameState === 'ENDING_FADE') {
        completeEndingTransition();
        return;
      }

      completeIntroTransition();
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [gameState, completeEndingTransition, completeIntroTransition]);

  return <div className="ending-fade" aria-label="Transición" />;
};

export default EndingFade;
