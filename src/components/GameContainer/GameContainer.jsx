import React, { useEffect, useRef, useContext } from 'react';
import { Context } from '../../context/Context';
import { Overworld } from '../../logic/Overworld.js';
import InGameMenu from '../GameMenu/GameMenu.jsx';
import Inventory from '../Inventory/Inventory.jsx';

const GameContainer = () => {
  const containerRef = useRef(null);
  const overworldRef = useRef(null); 
  const { gameState, openInventory } = useContext(Context);
  const { isMenuOpen } = useContext(Context);

  useEffect(() => {
    if (containerRef.current && !overworldRef.current) {
      overworldRef.current = new Overworld({
        element: containerRef.current
      });
      overworldRef.current.init();
    }
  }, []);

  useEffect(() => {
    if (overworldRef.current) {
        overworldRef.current.isPaused = isMenuOpen;
    }
  }, [isMenuOpen]);

  return (
      <div className="game-container" ref={containerRef}>
          <button className="game-ui__btn game-ui__btn--inventory" onClick={openInventory}>
              <img className="game-ui__icon" src="/casa.png" alt="Inventario" />
          </button>
          
          <canvas className="game-container__canvas" width="385" height="217"></canvas>

          <InGameMenu />
          <Inventory />
      </div>
  )
}

export default GameContainer;