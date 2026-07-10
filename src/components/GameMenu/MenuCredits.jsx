// VISTA DE CREDITOS
const MenuCredits = ({ onBack }) => (
    <div className="credits">
        <button className="controls__back-btn" onClick={onBack}>
            <img className="controls__back-icon" src="/UI/flecha-grande.png" alt="" />
            VOLVER A MENÚ
        </button>
        <div className="credits__boxes">
            <p>Videojuego creado por Ermes Olea y Alec Rodríguez.</p>
            <p>Madrid, España. Abril, 2026.</p>
            <div className="credits__boxes__images">
                <div className="credits__box">
                    <img src="/UI/ermes.png" alt="Ermes Olea" />
                </div>
                <div className="credits__box">
                    <img src="/UI/alec.png" alt="Alec Rodríguez" />
                </div>
            </div>
        </div>
    </div>
);
export default MenuCredits;