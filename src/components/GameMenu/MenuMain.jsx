const MenuMain = ({ onNavigate, onClose }) => (
    <>
        <h2 className="menu-title">menú</h2>
        <div className="menu-buttons">
            <button className="menu-button" onClick={() => onNavigate('CONTROLES')}>controles</button>
            <button className="menu-button" onClick={() => onNavigate('CREDITOS')}>créditos</button>
<button className="menu-button" onClick={() => onNavigate('EXIT')}>salir del juego</button>        </div>
    </>
);
export default MenuMain;