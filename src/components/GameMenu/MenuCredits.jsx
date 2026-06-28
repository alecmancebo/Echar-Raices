const MenuCredits = ({ onBack }) => (
    <div className="credits">
        <button className="controls__back-btn" onClick={onBack}>
            <img className="controls__back-icon" src="/flecha-grande.png" alt="" />
            VOLVER A MENÚ
        </button>
        <div className="credits__boxes">
            <p>Videojuego creado por Ermes Olea y Alec Rodríguez.</p>
            <p>Madrid, España. Abril, 2026.</p>
            <div className="credits__boxes__images">
                <div className="credits__box"></div>
                <div className="credits__box"></div>
            </div>
        </div>
    </div>
);
export default MenuCredits;