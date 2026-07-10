import { useContext, useState } from 'react';
import { Context } from '../../context/Context.jsx'; 

const MenuExit = ({ onCancel }) => {
    const { setGameState, closeMenu, saveAndExitToMenu } = useContext(Context);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleExitWithoutSaving = () => {
        setStatusMessage('');
        closeMenu();
        setGameState('START_MENU');
    };

    const handleSaveAndExit = async () => {
        if (isSaving) return;

        setIsSaving(true);
        setStatusMessage('Guardando partida...');

        const result = await saveAndExitToMenu();

        if (!result?.ok) {
            setStatusMessage(result?.message || 'No se pudo guardar la partida.');
            setIsSaving(false);
            return;
        }

        setStatusMessage('');
        closeMenu();
        setIsSaving(false);
    };

    return (
        <div className="exit">
            <button className="controls__back-btn" onClick={onCancel}>
                <img className="controls__back-icon" src="/UI/flecha-grande.png" alt="" />
                VOLVER A MENÚ
            </button>
            <h2 className="modal__title">¿Quieres salir?</h2>
            
            <p className="exit__warning">
                Se perderá todo el progreso de esta<br/>sesión si no lo guardas.
            </p>
            
            <div className="exit__actions">
                <button className="pixel-btn__secondary" onClick={handleExitWithoutSaving} disabled={isSaving}>
                    salir sin guardar
                </button>
                
                <button className="pixel-btn__secondary" onClick={handleSaveAndExit} disabled={isSaving}>
                    {isSaving ? 'guardando...' : 'guardar y salir'}
                </button>
            </div>

            {statusMessage && <p className="exit__status">{statusMessage}</p>}
        </div>
    );
};

export default MenuExit;