import { useContext } from 'react';
import { Context } from '../context/Context';

const StartMenu = () => {
    const { setGameState, setPendingAction } = useContext(Context);

    const handleContinuar = () => {
        setPendingAction('continue');
        setGameState('LOGIN');
    };

    const handleNuevaPartida = () => {
        setPendingAction('new');
        setGameState('LOGIN');
    };

    return (
        <div className="game-container start-menu">
            <img className="start-menu__bg" src="/fondo.png" alt="Fondo del bosque" />
            <div className="start-menu__content">
                <img className="start-menu__logo" src="/titulo.png" alt="Echar Raíces" />

                <div className="start-menu__links">
                    <button className="start-menu__link" onClick={handleNuevaPartida}>
                        <img className="start-menu__arrow" src="/flecha-der.png" alt="" />
                        NUEVA PARTIDA
                    </button>
                
                    <button className="start-menu__link" onClick={handleContinuar}>
                        <img className="start-menu__arrow" src="/flecha-der.png" alt="" />
                        CONTINUAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;