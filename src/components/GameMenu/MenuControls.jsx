const MenuControls = ({ onBack }) => (
    <div className="controls">
        <button className="controls__back-btn" onClick={onBack}>
            <img className="controls__back-icon" src="/UI/flecha-grande.png" alt="" />
            VOLVER A MENÚ
        </button>
        <ul className="controls__list">
            <li className="controls__item">
                <p>Muévete con las flechas<br/>del teclado.</p>
                
            </li>
            <li className="controls__item">
                <p>Para seleccionar un objeto,<br/>acércate y dale a Enter.</p>
                
            </li>
            <li className="controls__item">
                <p>Para ir al inventario, dale a <br/> acercándote al pozo.</p>
                
            </li>
            <li className="controls__item">
                <p>Para usar un objeto, clica sobre él <br/>en el inventario.</p>
                
            </li>
        </ul>
    </div>
);
export default MenuControls;