import React, { createContext, useState } from 'react';

export const Context = createContext();

export const GameProvider = ({ children }) => {
    // Estados globales
    const [gameState, setGameState] = useState('START_MENU'); 
    const [currentStoryScreen, setCurrentStoryScreen] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const advanceStory = () => {
        if (currentStoryScreen < 4) {
            setCurrentStoryScreen(prev => prev + 1);
        } else {
            setGameState('PLAYING');
        }
    };

    const startGame = () => {
        setCurrentStoryScreen(1);
        setGameState('LOGIN');};

    const pauseGame = () => setGameState('PAUSED');

   
    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    
    return (
        <Context.Provider value={{ gameState, startGame, pauseGame, isMenuOpen, openMenu, closeMenu, setGameState, currentStoryScreen,advanceStory }}>
            {children}
        </Context.Provider>
    );
};