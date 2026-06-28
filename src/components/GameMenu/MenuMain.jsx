import { useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const MenuMain = ({ onNavigate, onClose }) => { 
    
    const { startGame } = useContext(Context);

    return ( 
        <>
            <h2 className="modal__title">menú</h2>
            <div className="modal__actions">
                <button className="modal__btn" onClick={() => onNavigate('CONTROLES')}>controles</button>
                <button className="modal__btn" onClick={() => onNavigate('CREDITOS')}>créditos</button>
                <button className="modal__btn" onClick={() => onNavigate('EXIT')}>salir del juego</button>
            </div>
        </>
    );
    
}; 

export default MenuMain;