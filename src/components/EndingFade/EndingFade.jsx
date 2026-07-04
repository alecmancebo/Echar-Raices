import { useEffect, useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const EndingFade = () => {
  const { completeEndingTransition } = useContext(Context);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      completeEndingTransition();
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [completeEndingTransition]);

  return <div className="ending-fade" aria-label="Transición final" />;
};

export default EndingFade;
