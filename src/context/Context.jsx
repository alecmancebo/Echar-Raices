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

const ITEM_DATABASE = {
    botas: { id: 'botas', name: 'BOTAS', src: '/botas.png', description: 'Es cierto, estoy descalce. Debería ponérmelas, siento cómo la tierra me llama a través de los dedos de los pies.' },
    pajaro: { id: 'pajaro', name: 'PÁJARO', src: '/pajarito.png', description: 'Se ha apoyado un gorrión en mi mano y me siento bendecide. Cuando escucho su canto me llena de alegría.' },
    sal: { id: 'sal', name: 'SALERO', src: '/salero.png', description: 'La sal es mala para las plantas, ¿verdad? Voy a tragarme un poco y lanzar un puñado por encima del hombro, por si acaso. Nunca viene mal protegerse de la mala suerte.' },
    pociones: { id: 'pociones', name: 'POCIONES', src: '/pociones.png', description: '¡Las pociones curativas que me regaló Rosaura! Hay una llamada “recordar quien eras” que parece perfecta para esta situación.' },
    regadera: { id: 'regadera', name: 'REGADERA', src: '/regadera.png', description: 'Me muero de calor. Me apetece tanto echarme un poco de agua por encima para refrescarme, seguro que me siento mejor.' },
    tijeras: { id: 'tijeras', name: 'TIJERAS', src: '/tijeras.png', description: 'Perfecto, así puedo cortar todas estas raíces y hojas que no paran de salir a través de mi piel.' },
    rana: { id: 'rana', name: 'RANA', src: '/rana.png', description: '¿Intento darle un beso? No pierdo nada por probar y en las historias siempre funciona.' },
    rastrillo: { id: 'rastrillo', name: 'RASTRILLO', src: '/rastrillo.png', description: 'Está todo el jardín lleno de hojas caídas. Si las recogiera, podría tumbarme un rato sobre ellas. Parecen tan acogedoras.' },
    fuego: { id: 'fuego', name: 'FUEGO', src: '/fuego.png', description: 'Es una medida un poco drástica, pero quizá si provoco un pequeño incendio… Uno pequeñito, solo dentro de mí…' },
    herbicida: { id: 'herbicida', name: 'HERBICIDA', src: '/herbicida.png', description: 'Justo lo que necesito para acabar con este extraño proceso. Tan solo tengo que rociarme un poco.' },
    maceta: { id: 'maceta', name: 'MACETA', src: '/maceta.png', description: 'Estas pobres No-me-olvides necesitan tierra donde crecer. Debería pararme un momento a transplantarlas.' },
    sombrilla: { id: 'sombrilla', name: 'SOMBRILLA', src: '/sombrilla.png', description: 'A las plantas les gusta el sol, podría ayudar ocultarme un poco de él.' },
};

const normalizeText = (value) => value?.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const resolveObjectKey = (value) => {
    if (!value) return null;

    const normalizedValue = normalizeText(value);
    if (ITEM_DATABASE[normalizedValue]) return normalizedValue;

    const match = Object.values(ITEM_DATABASE).find((item) => normalizeText(item.id) === normalizedValue || normalizeText(item.name) === normalizedValue);
    return match?.id || normalizedValue;
};

const normalizeInventoryItems = (payload) => {
    if (!Array.isArray(payload)) return [];

    return payload
        .map((entry) => {
            if (!entry) return null;

            if (typeof entry === 'string') {
                const key = normalizeText(entry);
                return ITEM_DATABASE[key] || null;
            }

            if (typeof entry === 'object') {
                const candidateId = entry.id || entry.itemId || entry.item || entry.name;
                const candidateKey = normalizeText(candidateId);
                const fromDatabase = ITEM_DATABASE[candidateKey];

                if (fromDatabase) {
                    return {
                        ...fromDatabase,
                        ...(entry.src ? { src: entry.src } : {}),
                        ...(entry.icon ? { icon: entry.icon } : {}),
                        ...(entry.usedSrc ? { usedSrc: entry.usedSrc } : {}),
                        ...(entry.isUsed !== undefined ? { isUsed: Boolean(entry.isUsed) } : {})
                    };
                }

                if (entry.name) {
                    const byName = Object.values(ITEM_DATABASE).find((item) => normalizeText(item.name) === normalizeText(entry.name));
                    if (byName) {
                        return {
                            ...byName,
                            ...(entry.src ? { src: entry.src } : {}),
                            ...(entry.icon ? { icon: entry.icon } : {}),
                            ...(entry.usedSrc ? { usedSrc: entry.usedSrc } : {}),
                            ...(entry.isUsed !== undefined ? { isUsed: Boolean(entry.isUsed) } : {})
                        };
                    }
                }
            }

            return null;
        })
        .filter(Boolean);
};

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState('START_MENU');
    const [pendingAction, setPendingAction] = useState(null);
    const [currentStoryScreen, setCurrentStoryScreen] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [inventoryItems, setInventoryItems] = useState(() => {
        const savedInventory = JSON.parse(localStorage.getItem('inventoryState') || '[]');
        return normalizeInventoryItems(savedInventory.length ? savedInventory : Items);
    });
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

    const persistInventoryState = (items) => {
        const normalizedItems = normalizeInventoryItems(items);
        setInventoryItems(normalizedItems);
        localStorage.setItem('inventoryState', JSON.stringify(normalizedItems));
        return normalizedItems;
    };

    const loadGameData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/api/juego/datos", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Error en la carga");

            const data = await response.json();
            const storedItems = JSON.parse(localStorage.getItem('collectedObjects') || '[]');
            const savedInventory = JSON.parse(localStorage.getItem('inventoryState') || '[]');
            const backendItems = Array.isArray(data.items) ? data.items : [];
            const restoredInventory = backendItems.length > 0
                ? normalizeInventoryItems(backendItems)
                : normalizeInventoryItems(savedInventory.length > 0 ? savedInventory : storedItems);

            persistInventoryState(restoredInventory);
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
        localStorage.removeItem('collectedObjects');
        localStorage.removeItem('inventoryState');
        setPersistedGameState('LOGIN');
    };

    const pauseGame = () => setPersistedGameState('PAUSED');

    const resetProgress = async () => {
        setCurrentStoryScreen(1);
        setInventoryItems(Items);
        setSelectedItemId(1);
        setIsMenuOpen(false);
        setIsInventoryOpen(false);

        localStorage.removeItem('lastGameScreen');
        localStorage.removeItem('collectedObjects');
        localStorage.removeItem('inventoryState');
        setGameState('STORYBOARD');
    };

    const initializeNewRun = async () => {
        if (!token) return;

        try {
            await fetch('http://localhost:4000/api/juego/nueva-partida', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error al reiniciar partida:', error);
        }

        localStorage.removeItem('lastGameScreen');
        localStorage.removeItem('collectedObjects');
        localStorage.removeItem('inventoryState');
        setPersistedGameState('STORYBOARD');
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

    const saveInventoryItem = async (item) => {
        if (!token || !item) return false;

        const normalizedItemId = resolveObjectKey(item.id || item.name);
        const itemReference = normalizedItemId ? { ...item, id: normalizedItemId } : item;

        const alreadyExists = inventoryItems.some((inventoryItem) => {
            const currentName = inventoryItem?.name?.toLowerCase();
            const newName = itemReference?.name?.toLowerCase();
            return currentName && newName && currentName === newName;
        });

        if (alreadyExists) {
            return true;
        }

        const localInventory = persistInventoryState([...inventoryItems, itemReference]);

        if (normalizedItemId) {
            const storedItems = JSON.parse(localStorage.getItem('collectedObjects') || '[]');
            if (!storedItems.includes(normalizedItemId)) {
                storedItems.push(normalizedItemId);
                localStorage.setItem('collectedObjects', JSON.stringify(storedItems));
            }
            window.dispatchEvent(new CustomEvent("GameObjectRemoved", { detail: normalizedItemId }));
        }

        try {
            const response = await fetch("http://localhost:4000/api/nuevo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ item: item.id || item.name })
            });

            if (!response.ok) throw new Error("No se pudo guardar el item");

            const data = await response.json();
            const serverItems = Array.isArray(data.items) ? data.items : localInventory;
            persistInventoryState(serverItems);
            return true;
        } catch (error) {
            console.error("Error guardando item:", error);
            return true;
        }
    };

    const useInventoryItem = async (item) => {
        if (!item) return false;

        const itemKey = resolveObjectKey(item.id || item.name);
        const payloadItem = itemKey || item.id || item.name;

        const updatedItems = inventoryItems.map((inventoryItem) => {
            const currentKey = resolveObjectKey(inventoryItem?.id || inventoryItem?.name);
            const sameItem = currentKey === itemKey || inventoryItem?.id === item.id || inventoryItem?.name === item.name;
            if (!sameItem) return inventoryItem;

            return {
                ...inventoryItem,
                isUsed: true,
                src: inventoryItem.usedSrc || inventoryItem.src || '/shadow.png'
            };
        });

        persistInventoryState(updatedItems);

        if (!token) return true;

        try {
            const response = await fetch('http://localhost:4000/api/inventario/usar', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ item: payloadItem })
            });

            if (!response.ok) throw new Error('No se pudo usar el item');

            const data = await response.json();
            if (Array.isArray(data.items)) {
                persistInventoryState(data.items);
            }

            return true;
        } catch (error) {
            console.error('Error usando item:', error);
            return true;
        }
    };

    const dropInventoryItem = async (item) => {
        if (!item) return false;

        const itemKey = resolveObjectKey(item.id || item.name);
        const payloadItem = itemKey || item.id || item.name;
        const updatedItems = inventoryItems.filter((inventoryItem) => {
            const currentKey = resolveObjectKey(inventoryItem?.id || inventoryItem?.name);
            const sameItem = currentKey === itemKey || inventoryItem?.name === item.name || inventoryItem?.id === item.id;
            return !sameItem;
        });

        persistInventoryState(updatedItems);

        const storedItems = JSON.parse(localStorage.getItem('collectedObjects') || '[]');
        const filteredItems = storedItems.filter((storedId) => {
            const storedValue = resolveObjectKey(storedId);
            const currentValue = itemKey;
            return storedValue !== currentValue && storedValue !== item.name;
        });
        localStorage.setItem('collectedObjects', JSON.stringify(filteredItems));

        if (itemKey) {
            window.dispatchEvent(new CustomEvent('GameObjectAdded', { detail: itemKey }));
        }

        if (!token) return true;

        try {
            const response = await fetch('http://localhost:4000/api/inventario/dejar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ item: payloadItem })
            });

            if (!response.ok) throw new Error('No se pudo dejar el item');

            const data = await response.json();
            if (Array.isArray(data.items)) {
                persistInventoryState(data.items);
            }

            return true;
        } catch (error) {
            console.error('Error dejando item:', error);
            return true;
        }
    };

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
            pendingAction, setPendingAction,
            advanceStory, currentStoryScreen, setCurrentStoryScreen,
            inventoryItems, setInventoryItems,
            isMenuOpen, openMenu, closeMenu,
            isInventoryOpen, openInventory, closeInventory,
            selectedItemId, setSelectedItemId, startGame, pauseGame, resetProgress, initializeNewRun, saveInventoryItem, useInventoryItem, dropInventoryItem, loading, setLoading, loadGameData
        }}>
            {children}
        </Context.Provider>
    );
};