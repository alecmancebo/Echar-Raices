const MenuControls = ({ onBack }) => (
    <div className="controls">
        <button className="controls__back-btn" onClick={onBack}>
            <img className="controls__back-icon" src="/flecha-grande.png" alt="" />
            VOLVER A MENÚ
        </button>
        <div className="controls__list">
            <div className="controls__item">
                <p>Muévete con las flechas<br/>del teclado.</p>
                <div className="controls__gif"></div>
            </div>
            <div className="controls__item">
                <p>Para seleccionar un objeto,<br/>acércate y haz clic.</p>
                <div className="controls__gif"></div>
            </div>
            <div className="controls__item">
                <p>Para ir al inventario, clica<br/>en el pozo.</p>
                <div className="controls__gif"></div>
            </div>
        </div>
    </div>
);
export default MenuControls;