import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context.jsx'; 
import MenuMain from './MenuMain.jsx';
import MenuControls from './MenuControls.jsx';
import MenuCredits from './MenuCredits.jsx';
import MenuExit from './MenuExit.jsx';

// MENU EN PARTIDA
const GameMenu = () => {

    const { isMenuOpen, openMenu, closeMenu } = useContext(Context);
    const [activeView, setActiveView] = useState('MAIN');

    useEffect(() => {
        if (!isMenuOpen) setActiveView('MAIN');
    }, [isMenuOpen]);

    const handleClose = () => {
        setActiveView('MAIN');
        closeMenu();
    };

    return (
        <>
            {!isMenuOpen && (
                <button className="game-ui__btn game-ui__btn--menu-closed" onClick={openMenu}>
                    <img className="game-ui__icon" src="/UI/ajustesicono.png" alt="Ajustes" />
                </button>
            )}

            {isMenuOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                      
                        <img className="modal__bg" src="/UI/menu.png" alt="" />
                        
                        <button className="modal__close-btn" onClick={handleClose}>
                            <img src="/UI/x.png" alt="Close" />
                        </button>
                        
                        <div className="modal__content">
                            {activeView === 'MAIN' && (
                                <MenuMain onNavigate={setActiveView} onClose={handleClose} />
                            )}
                            {activeView === 'CONTROLES' && (
                                <MenuControls onBack={() => setActiveView('MAIN')} />
                            )}
                            {activeView === 'CREDITOS' && (
                                <MenuCredits onBack={() => setActiveView('MAIN')} />
                            )}
                            {activeView === 'EXIT' && (
                            <MenuExit onCancel={() => setActiveView('MAIN')} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GameMenu;