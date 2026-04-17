import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context.jsx'; 
import MenuMain from './MenuMain.jsx';
import MenuControls from './MenuControls.jsx';
import MenuCredits from './MenuCredits.jsx';
import MenuExit from './MenuExit.jsx';

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
            {/* BOTÓN FLOTANTE: Se dibuja solo cuando el menú está cerrado */}
            {!isMenuOpen && (
                <button className="in-game-menu-btn open-menu-btn" onClick={openMenu}>
                    <img className="menu-icon" src="/ajustesicono.png" alt="Ajustes" />
                </button>
            )}

            {/* EL MODAL: Se dibuja solo cuando el menú está abierto */}
            {isMenuOpen && (
                <div className="menu-modal-overlay">
                    <div className="menu-modal-box">
                      
                        <img className="menu-bg-image" src="/menu.png" alt="" />
                        
                        <button className="menu-close-btn in-game-menu-btn" onClick={handleClose}>
                            <img src="/x.png" alt="Close" />
                        </button>
                        
                        <div className="menu-content-wrapper">
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