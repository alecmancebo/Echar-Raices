import React, { createContext, useState } from 'react';

export const Context = createContext();

export const GameProvider = ({ children }) => {
    // Estados globales de tu UI
    const [gameState, setGameState] = useState('START_MENU'); // 'START_MENU', 'PLAYING', 'PAUSED'

    const startGame = () => setGameState('PLAYING');
    const pauseGame = () => setGameState('PAUSED');

    return (
        <Context.Provider value={{ gameState, startGame, pauseGame }}>
            {children}
        </Context.Provider>
    );
};