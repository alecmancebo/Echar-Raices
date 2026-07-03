import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

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
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [inventoryItems, setInventoryItems] = useState(Items);
    const [selectedItemId, setSelectedItemId] = useState(1);
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);

    const setPersistedGameState = (nextState) => {
        setGameState(nextState);

        if (nextState === 'PLAYING' || nextState === 'STORYBOARD' || nextState === 'PAUSED') {
            localStorage.setItem('lastGameScreen', nextState);
        }
    };

    useEffect(() => {
        if (!token) {
            if (gameState === 'PLAYING' || gameState === 'STORYBOARD' || gameState === 'LOADING_GAME') {
                setPersistedGameState('START_MENU');
            }
            return;
        }

        if (gameState === 'LOADING_GAME') {
            loadGameData();
        }
    }, [token, gameState]);

    const loadGameData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/api/juego/datos", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Error en la carga");

            const data = await response.json();
            setInventoryItems(data.items || []);
            setCurrentStoryScreen(data.progreso || 1);
            const restoredScreen = data.ultimaPantalla || data.lastScreen || (data.narrativaCompletada ? 'PLAYING' : 'STORYBOARD');
            const savedScreen = localStorage.getItem('lastGameScreen');
            const finalScreen = savedScreen && ['PLAYING', 'STORYBOARD', 'PAUSED'].includes(savedScreen)
                ? savedScreen
                : restoredScreen;

            setPersistedGameState(finalScreen);
            return data;
        } catch (error) {
            console.error("Fallo al inicializar el juego:", error);
            setPersistedGameState('LOGIN');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const startGame = () => {
        setCurrentStoryScreen(1);
        setInventoryItems(Items);
        localStorage.removeItem('lastGameScreen');
        setPersistedGameState('LOGIN');
    };

    const pauseGame = () => setPersistedGameState('PAUSED');

    const resetProgress = () => {
        setCurrentStoryScreen(1);
        setInventoryItems(Items);
        localStorage.removeItem('lastGameScreen');
        setPersistedGameState('START_MENU');
    };

    const openMenu = () => {
        setIsMenuOpen(true);
        setIsInventoryOpen(false);
    };
    const closeMenu = () => setIsMenuOpen(false);

    const openInventory = () => {
        setIsInventoryOpen(true);
        setIsMenuOpen(false); 
    };
    const closeInventory = () => setIsInventoryOpen(false);

    const advanceStory = async () => {
    
        if (currentStoryScreen < 4) {
            setCurrentStoryScreen(prev => prev + 1);
        } else {
       
            try {
                await fetch("http://localhost:4000/api/usuario/narrativa", {
                    method: "PATCH",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setPersistedGameState('PLAYING');
            } catch (e) {
                console.error("Error guardando progreso");
            }
        }
    };

    return (
        <Context.Provider value={{ 
            gameState, setGameState: setPersistedGameState, 
            advanceStory, currentStoryScreen, setCurrentStoryScreen,
            inventoryItems, setInventoryItems,
            isMenuOpen, openMenu, closeMenu,
            isInventoryOpen, openInventory, closeInventory,
            selectedItemId, setSelectedItemId, startGame, pauseGame, resetProgress, loading, setLoading, loadGameData
        }}>
            {children}
        </Context.Provider>
    );
};