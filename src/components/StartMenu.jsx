import React, { useContext } from 'react';
import { Context } from '../context/Context';

const StartMenu = () => {
    
    const { startGame } = useContext(Context);

    return (
        <div className="gameContainer start-menu-container">
            <img className="start-menu-bg" src="/fondo.png" alt="Fondo del bosque" />
            <div className="start-menu-content">
            <img className="start-menu-logo" src="/titulo.png" alt="Echar Raíces" />

            <div className="start-menu-links">
            <button className="start-menu-link" onClick={startGame}>
                <img className="menu-arrow" src="/flecha-der.png" alt="" />
                NUEVA PARTIDA
            </button>
          
            <button className="start-menu-link" onClick={() => console.log('Continuar no implementado aún')}>
                <img className="menu-arrow" src="/flecha-der.png" alt="" />
                CONTINUAR
            </button>
        </div>
      </div>
        </div>
    );
};

export default StartMenu;