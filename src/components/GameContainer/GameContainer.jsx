import React, { useEffect, useRef } from 'react';
import { Overworld } from '../../logic/Overworld.js';

const GameContainer = () => {
  const containerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // init.js
    if (containerRef.current && !isInitialized.current) {
      const overworld = new Overworld({
        element: containerRef.current
      });
      overworld.init();
      isInitialized.current = true;
    }
  }, []);

    return (
        <div className="gameContainer" ref={containerRef}>
            <canvas className="gameCanvas" width="385" height="217"></canvas>
        </div>
    )

}

export default GameContainer;