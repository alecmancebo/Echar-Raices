const MenuControls = ({ onBack }) => (
    <div className="controls-view">
        <button className="back-button" onClick={onBack}>
            <img className="back-arrow" src="/flecha.png" alt="" />
            VOLVER A MENÚ
        </button>
        <div className="controls-list">
            <div className="control-row">
                <p>Muévete con las flechas<br/>del teclado.</p>
                <div className="gif-placeholder"></div>
            </div>
            <div className="control-row">
                <p>Para seleccionar un objeto,<br/>acércate y haz clic.</p>
                <div className="gif-placeholder"></div>
            </div>
            <div className="control-row">
                <p>Para ir al inventario, clica<br/>en el pozo.</p>
                <div className="gif-placeholder"></div>
            </div>
        </div>
    </div>
);
export default MenuControls;