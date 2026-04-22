import React, { createContext, useState } from 'react';

export const Context = createContext();

const Items = [
    { id: 1, name: 'Rama', description: 'Una rama de árbol común.', icon: null },
    { id: 2, name: 'Piedra', description: 'Una piedra pequeña.', icon: null },
    { id: 3, name: 'Agua', description: 'Una cantimplora con agua.', icon: null },
    { id: 4, name: 'Mapa', description: 'Un mapa del bosque.', icon: null },
    { id: 5, name: 'Llave', description: 'Una llave oxidada.', icon: null },
    { id: 6, name: 'Baya', description: 'Una baya silvestre.', icon: null },
    { id: 7, name: 'Cuerda', description: 'Una cuerda resistente.', icon: null },
    { id: 8, name: 'Diario', description: 'Un diario viejo.', icon: null },
    { id: 9, name: 'Brújula', description: 'Una brújula.', icon: null },
    { id: 10, name: 'Antorcha', description: 'Una antorcha.', icon: null },
    { id: 11, name: 'Hacha', description: 'Un hacha pequeña.', icon: null },
    { id: 12, name: 'Vendaje', description: 'Un vendaje.', icon: null },
];

export const GameProvider = ({ children }) => {
   
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

    const openMenu = () => {
        setIsMenuOpen(true);
        setIsInventoryOpen(false);
    };
    const closeMenu = () => setIsMenuOpen(false);

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [inventoryItems, setInventoryItems] = useState(Items);
    const [selectedItemId, setSelectedItemId] = useState(1);

    const openInventory = () => {
        setIsInventoryOpen(true);
        setIsMenuOpen(false); 
    };
    const closeInventory = () => setIsInventoryOpen(false);
    
    return (
        <Context.Provider value={{ gameState, startGame, pauseGame, isMenuOpen, openMenu, closeMenu, setGameState, currentStoryScreen,advanceStory, isInventoryOpen, openInventory, closeInventory, inventoryItems, selectedItemId }}>

            {children}
        </Context.Provider>
    );
};