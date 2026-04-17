import { useContext } from 'react';
import { Context } from '../../context/Context.jsx'; 

const MenuExit = ({ onCancel }) => {
    const { setGameState, closeMenu } = useContext(Context);

    const handleExitWithoutSaving = () => {
        // Aquí irá la lógica para borrar/resetear datos
        console.log("Datos no guardados. Volviendo a la portada...");
        closeMenu();
        setGameState('START_MENU');
    };

    const handleSaveAndExit = () => {
        // Aquí irá la lógica para guardar datos
        console.log("Datos guardados con éxito. Volviendo a la portada...");
        closeMenu();
        setGameState('START_MENU');
    };

    return (
        <div className="exit-view">
            <h2 className="menu-title">¿Quieres salir?</h2>
            
            <p className="exit-warning">
                Se perderá todo el progreso de esta<br/>sesión si no lo guardas.
            </p>
            
            <div className="menu-buttons exit-buttons">
                <button className="menu-button" onClick={handleExitWithoutSaving}>
                    salir sin guardar
                </button>
                
                <button className="menu-button" onClick={handleSaveAndExit}>
                    guardar y salir
                </button>
            </div>
        </div>
    );
};

export default MenuExit;