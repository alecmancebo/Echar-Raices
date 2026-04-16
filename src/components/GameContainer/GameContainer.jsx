import React, { useEffect, useRef, useContext } from 'react';
import { Context } from '../../context/Context';
import { Overworld } from '../../logic/Overworld.js';


const GameContainer = () => {
  const containerRef = useRef(null);
  const overworldRef = useRef(null); // Mejor guardar la instancia aquí
  const { gameState } = useContext(Context);

  useEffect(() => {
    // Solo inicializamos el motor de Canvas una vez
    if (containerRef.current && !overworldRef.current) {
      overworldRef.current = new Overworld({
        element: containerRef.current
      });
      overworldRef.current.init();
    }
  }, []);

  return (
      <div className="gameContainer" ref={containerRef}>
          <canvas className="gameCanvas" width="385" height="217"></canvas>
      </div>
  )
}

export default GameContainer;