import { useContext } from 'react';
import { Context } from '../../context/Context.jsx'; 

const MenuExit = ({ onCancel }) => {
    const { setGameState, closeMenu } = useContext(Context);

    const handleExitWithoutSaving = () => {
        console.log("Datos no guardados. Volviendo a la portada...");
        closeMenu();
        setGameState('START_MENU');
    };

    const handleSaveAndExit = () => {
        console.log("Datos guardados con éxito. Volviendo a la portada...");
        closeMenu();
        setGameState('START_MENU');
    };

    return (
        <div className="exit">
            <button className="controls__back-btn" onClick={onCancel}>
                <img className="controls__back-icon" src="/flecha-grande.png" alt="" />
                VOLVER A MENÚ
            </button>
            <h2 className="modal__title">¿Quieres salir?</h2>
            
            <p className="exit__warning">
                Se perderá todo el progreso de esta<br/>sesión si no lo guardas.
            </p>
            
            <div className="exit__actions">
                <button className="pixel-btn__secondary" onClick={handleExitWithoutSaving}>
                    salir sin guardar
                </button>
                
                <button className="pixel-btn__secondary" onClick={handleSaveAndExit}>
                    guardar y salir
                </button>
            </div>
        </div>
    );
};

export default MenuExit;