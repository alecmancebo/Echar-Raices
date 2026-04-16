import React, { createContext, useState } from 'react';

export const Context = createContext();

export const GameProvider = ({ children }) => {
    // Estados globales
    const [gameState, setGameState] = useState('START_MENU'); // 'START_MENU', 'PLAYING', 'PAUSED'

    const startGame = () => setGameState('PLAYING');
    const pauseGame = () => setGameState('PAUSED');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Context.Provider value={{ gameState, startGame, pauseGame, isMenuOpen, openMenu, closeMenu }}>
            {children}
        </Context.Provider>
    );
};