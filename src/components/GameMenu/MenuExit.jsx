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
            <h2 className="modal__title">¿Quieres salir?</h2>
            
            <p className="exit__warning">
                Se perderá todo el progreso de esta<br/>sesión si no lo guardas.
            </p>
            
            <div className="modal__actions exit__actions">
                <button className="modal__btn" onClick={handleExitWithoutSaving}>
                    salir sin guardar
                </button>
                
                <button className="modal__btn" onClick={handleSaveAndExit}>
                    guardar y salir
                </button>
            </div>
        </div>
    );
};

export default MenuExit;