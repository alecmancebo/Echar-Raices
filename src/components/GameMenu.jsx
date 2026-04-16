import React, { useContext, useState } from 'react';
import { Context } from '../context/Context.jsx'; 

const InGameMenu = () => {
    const { isMenuOpen, openMenu, closeMenu, setGameState } = useContext(Context);

    const [activeView, setActiveView] = useState('MAIN');

    // cerrar el menú y resetear la vista
    const handleClose = () => {
        setActiveView('MAIN');
        closeMenu();
    };

    return (
        <>
            {/* BOTÓN FLOTANTE*/}
            {!isMenuOpen && (
                <button className="in-game-menu-btn open-menu-btn" onClick={openMenu}>
                    <img className="menu-icon" src="ajustesicono.png" alt="" />
                </button>
            )}

            {/* MODAL*/}
            {isMenuOpen && (
                <div className="menu-modal-overlay">
                    <div className="menu-modal-box">
                        <img className="menu-bg-image" src="/menu.png" alt="" />
                        <button className="menu-close-btn in-game-menu-btn" onClick={closeMenu}>
                            <img src="/x.png" alt="Cerrar" />
                        </button>
                       <div className="menu-content-wrapper">

                          {/* --- VISTA 1: MENÚ PRINCIPAL --- */}
                            {activeView === 'MAIN' && (
                                <>
                                    <h2 className="menu-titulo-pergamino">menú</h2>
                                    <div className="menu-botones-pergamino">
                                        <button 
                                            className="pergamino-btn" 
                                            onClick={() => setActiveView('CONTROLES')}
                                        >
                                            controles
                                        </button>
                                        <button className="pergamino-btn">
                                            créditos
                                        </button>
                                        <button className="pergamino-btn" onClick={() => {
                                            handleClose();
                                            // setGameState('START_MENU');
                                        }}>
                                            salir del juego
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* --- VISTA 2: CONTROLES --- */}
                            {activeView === 'CONTROLES' && (
                                <div className="controles-view">
                                    
                                    {/* Botón de volver */}
                                    <button 
                                        className="volver-btn" 
                                        onClick={() => setActiveView('MAIN')}
                                    >
                                        {/* Si usas la misma flecha del inicio, esta clase la volteará en CSS */}
                                        <img className="flecha-volver" src="/flecha.png" alt="" />
                                        VOLVER A MENÚ
                                    </button>

                                    {/* Lista de instrucciones */}
                                    <div className="controles-lista">
                                        <div className="control-fila">
                                            <p>Muévete con las flechas<br/>del teclado.</p>
                                            <div className="gif-placeholder"></div>
                                        </div>
                                        <div className="control-fila">
                                            <p>Para seleccionar un objeto,<br/>acércate y haz clic.</p>
                                            <div className="gif-placeholder"></div>
                                        </div>
                                        <div className="control-fila">
                                            <p>Para ir al inventario, clica<br/>en el pozo.</p>
                                            <div className="gif-placeholder"></div>
                                        </div>
                                    </div>

                                </div>
                            )}

                    

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InGameMenu;
