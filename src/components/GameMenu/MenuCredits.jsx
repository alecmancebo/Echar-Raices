const MenuCredits = ({ onBack }) => (
    <div className="controls-view">
        <button className="back-button" onClick={onBack}>
            <img className="back-arrow" src="/flecha-grande.png" alt="" />
            VOLVER A MENÚ
        </button>
        <div className="credits-content">
            <p>Videojuego creado por Ermes Olea y Alec Rodríguez.</p>
            <p>Madrid, España. Abril, 2026.</p>
            <div className="credits-boxes">
                <div className="gray-box"></div>
                <div className="gray-box"></div>
            </div>
        </div>
    </div>
);
export default MenuCredits;