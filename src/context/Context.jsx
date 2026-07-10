import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const Context = createContext();

const Items = [];

const ITEM_DATABASE = {
    botas: { id: 'botas', name: 'BOTAS', src: '/Objetos/botas.png', usedSrc: '/Objetos/botas_usadas.png', description: 'Es cierto, estoy descalce. Debería ponérmelas, siento cómo la tierra me llama a través de los dedos de los pies.', itinerary: 'c' },
    pajaro: { id: 'pajaro', name: 'PÁJARO', src: '/Objetos/pajarito.png', usedSrc: '/Objetos/pajarito_usado.png', description: 'Se ha apoyado un gorrión en mi mano y me siento bendecide. Cuando escucho su canto me lleno de alegría.', itinerary: 'a' },
    sal: { id: 'sal', name: 'SALERO', src: '/Objetos/salero.png', usedSrc: '/Objetos/salero_usado.png', description: 'La sal es mala para las plantas, ¿verdad? Voy a tragarme un poco y lanzar un puñado por encima del hombro, por si acaso. Nunca viene mal protegerse de la mala suerte.', itinerary: 'c' },
    pociones: { id: 'pociones', name: 'POCIONES', src: '/Objetos/pociones.png', usedSrc: '/Objetos/pociones_usadas.png', description: '¡Las pociones curativas que me regaló Rosaura! Hay una llamada “recordar quien eras” que parece perfecta para esta situación.', itinerary: 'c' },
    regadera: { id: 'regadera', name: 'REGADERA', src: '/Objetos/regadera.png', usedSrc: '/Objetos/regadera_usada.png', description: 'Me muero de calor. Me apetece tanto echarme un poco de agua por encima para refrescarme, seguro que me siento mejor.', itinerary: 'a' },
    tijeras: { id: 'tijeras', name: 'TIJERAS', src: '/Objetos/tijeras.png', usedSrc: '/Objetos/tijeras_usadas.png', description: 'Perfecto, así puedo cortar todas estas raíces y hojas que no paran de salir a través de mi piel.', itinerary: 'b' },
    rana: { id: 'rana', name: 'RANA', src: '/Objetos/rana.png', usedSrc: '/Objetos/rana_usada.png', description: '¿Intento darle un beso? No pierdo nada por probar y en las historias siempre funciona.', itinerary: 'b' },
    rastrillo: { id: 'rastrillo', name: 'RASTRILLO', src: '/Objetos/rastrillo.png', usedSrc: '/Objetos/rastrillo_usado.png', description: 'Está todo el jardín lleno de hojas caídas. Si las recogiera, podría tumbarme un rato sobre ellas. Parecen tan acogedoras.', itinerary: 'a' },
    fuego: { id: 'fuego', name: 'FUEGO', src: '/Objetos/fuego.png', usedSrc: '/Objetos/fuego_usado.png', description: 'Es una medida un poco drástica, pero quizá si provoco un pequeño incendio… Uno pequeñito, solo dentro de mí…', itinerary: 'b' },
    herbicida: { id: 'herbicida', name: 'HERBICIDA', src: '/Objetos/herbicida.png', usedSrc: '/Objetos/herbicida_usado.png', description: 'Justo lo que necesito para acabar con este extraño proceso. Tan solo tengo que rociarme un poco.', itinerary: 'c' },
    maceta: { id: 'maceta', name: 'MACETA', src: '/Objetos/maceta.png', usedSrc: '/Objetos/maceta_usada.png', description: 'Estas pobres No-me-olvides necesitan tierra donde crecer. Debería pararme un momento a transplantarlas.', itinerary: 'a' },
    sombrilla: { id: 'sombrilla', name: 'SOMBRILLA', src: '/Objetos/sombrilla.png', usedSrc: '/Objetos/sombrilla_usada.png', description: 'A las plantas les gusta el sol, podría ayudar ocultarme un poco de él.', itinerary: 'b' },
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
                const incomingIsUsed = entry.isUsed !== undefined ? Boolean(entry.isUsed) : false;

                if (fromDatabase) {
                    const mergedUsedSrc = entry.usedSrc || fromDatabase.usedSrc;
                    return {
                        ...fromDatabase,
                        ...(entry.src ? { src: entry.src } : {}),
                        ...(entry.icon ? { icon: entry.icon } : {}),
                        ...(mergedUsedSrc ? { usedSrc: mergedUsedSrc } : {}),
                        ...(entry.isUsed !== undefined ? { isUsed: incomingIsUsed } : {}),
                        ...(entry.itinerary ? { itinerary: entry.itinerary } : {})
                    };
                }

                if (entry.name) {
                    const byName = Object.values(ITEM_DATABASE).find((item) => normalizeText(item.name) === normalizeText(entry.name));
                    if (byName) {
                        const mergedUsedSrc = entry.usedSrc || byName.usedSrc;
                        return {
                            ...byName,
                            ...(entry.src ? { src: entry.src } : {}),
                            ...(entry.icon ? { icon: entry.icon } : {}),
                            ...(mergedUsedSrc ? { usedSrc: mergedUsedSrc } : {}),
                            ...(entry.isUsed !== undefined ? { isUsed: incomingIsUsed } : {}),
                            ...(entry.itinerary ? { itinerary: entry.itinerary } : {})
                        };
                    }
                }
            }

            return null;
        })
        .map((item) => {
            if (!item) return item;
            if (!item.isUsed) return item;
            return {
                ...item,
                src: item.usedSrc || item.src || '/UI/shadow.png'
            };
        })
        .filter(Boolean);
};

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState('START_MENU');
    const [loginNotice, setLoginNotice] = useState('');
    const [pendingAction, setPendingAction] = useState(null);
    const [currentStoryScreen, setCurrentStoryScreen] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [inventoryItems, setInventoryItems] = useState(Items);
    const [itineraryUsage, setItineraryUsage] = useState({ a: 0, b: 0, c: 0 });
    const [itineraryThresholds, setItineraryThresholds] = useState({ a: null, b: null, c: null });
    const [winningItinerary, setWinningItinerary] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [storyMode, setStoryMode] = useState('intro');
    const [endingTriggered, setEndingTriggered] = useState(false);
    const { token, logout } = useContext(AuthContext);

    const persistScreenToBackend = async (screen) => {
        if (!token) return;

        const screensToPersist = ['PLAYING', 'STORYBOARD', 'PAUSED', 'GAME_OVER'];
        if (!screensToPersist.includes(screen)) return;

        try {
            await fetch('http://localhost:4000/api/juego/estado', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ultimaPantalla: screen })
            });
        } catch (error) {
            console.error('Error persistiendo pantalla actual:', error);
        }
    };

    const setPersistedGameState = (nextState) => {
        setGameState(nextState);
        persistScreenToBackend(nextState);
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
        return normalizedItems;
    };

    const resetEndingFlow = () => {
        setStoryMode('intro');
        setEndingTriggered(false);
        setCurrentStoryScreen(1);
    };

    const resolveWinningItinerary = (usage, thresholds) => {
        const itineraryOrder = ['a', 'b', 'c'];
        const totalUses = itineraryOrder.reduce((sum, itinerary) => sum + Number(usage?.[itinerary] || 0), 0);

        if (totalUses < 4) return null;

        const maxCount = Math.max(...itineraryOrder.map((itinerary) => Number(usage?.[itinerary] || 0)));
        const tiedItineraries = itineraryOrder.filter((itinerary) => Number(usage?.[itinerary] || 0) === maxCount);

        if (tiedItineraries.length === 1) {
            return tiedItineraries[0];
        }

        const ranked = tiedItineraries
            .map((itinerary) => ({
                itinerary,
                reachedAt: thresholds?.[itinerary] ?? Number.MAX_SAFE_INTEGER,
            }))
            .sort((left, right) => {
                if (left.reachedAt !== right.reachedAt) return left.reachedAt - right.reachedAt;
                return itineraryOrder.indexOf(left.itinerary) - itineraryOrder.indexOf(right.itinerary);
            });

        return ranked[0]?.itinerary || null;
    };

    const loadGameData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/api/juego/datos", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                setLoginNotice('Tu sesión expiró. Inicia sesión de nuevo.');
                logout();
                setPersistedGameState('LOGIN');
                return null;
            }

            if (!response.ok) throw new Error("Error en la carga");

            const data = await response.json();
            const backendItems = Array.isArray(data.items) ? data.items : [];
            const restoredInventory = normalizeInventoryItems(backendItems);
            const restoredUsage = data.itineraryUsage || {};
            const restoredThresholds = data.itineraryThresholds || {};
            const restoredWinner = data.winningItinerary || null;

            persistInventoryState(restoredInventory);
            setItineraryUsage({
                a: Number(restoredUsage.a) || 0,
                b: Number(restoredUsage.b) || 0,
                c: Number(restoredUsage.c) || 0,
            });
            setItineraryThresholds({
                a: restoredThresholds.a ?? null,
                b: restoredThresholds.b ?? null,
                c: restoredThresholds.c ?? null,
            });
            setWinningItinerary(restoredWinner);
            setCurrentStoryScreen(data.progreso || 1);
            const restoredScreen = data.ultimaPantalla || data.lastScreen || (data.narrativaCompletada ? 'PLAYING' : 'STORYBOARD');
            setPersistedGameState(restoredScreen);
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
        setItineraryUsage({ a: 0, b: 0, c: 0 });
        setItineraryThresholds({ a: null, b: null, c: null });
        setWinningItinerary(null);
        resetEndingFlow();
        setPersistedGameState('LOGIN');
    };

    const pauseGame = () => setPersistedGameState('PAUSED');

    const saveAndExitToMenu = async () => {
        if (!token) {
            setPersistedGameState('START_MENU');
            return { ok: true };
        }

        try {
            const response = await fetch('http://localhost:4000/api/juego/estado', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ultimaPantalla: 'PLAYING',
                    progreso: currentStoryScreen
                })
            });

            if (response.status === 401 || response.status === 403) {
                setLoginNotice('Tu sesión expiró. Inicia sesión de nuevo.');
                logout();
                setPersistedGameState('LOGIN');
                return { ok: false, message: 'Tu sesión expiró. Inicia sesión de nuevo.' };
            }

            if (!response.ok) {
                return { ok: false, message: 'No se pudo guardar la partida.' };
            }

            setPersistedGameState('START_MENU');
            return { ok: true };
        } catch (error) {
            console.error('Error guardando antes de salir:', error);
            return { ok: false, message: 'No se pudo conectar con el servidor para guardar.' };
        }
    };

    const resetProgress = async () => {
        setCurrentStoryScreen(1);
        setInventoryItems(Items);
        setSelectedItemId(1);
        setIsMenuOpen(false);
        setIsInventoryOpen(false);

        setItineraryUsage({ a: 0, b: 0, c: 0 });
        setItineraryThresholds({ a: null, b: null, c: null });
        setWinningItinerary(null);
        resetEndingFlow();
        setGameState('STORYBOARD');
    };

    const initializeNewRun = async (authToken = null) => {
        const tokenToUse = authToken || token;
        if (!tokenToUse) return { ok: false, message: 'No hay sesión activa.' };

        try {
            const response = await fetch('http://localhost:4000/api/juego/nueva-partida', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenToUse}`
                }
            });

            if (response.status === 401 || response.status === 403) {
                setLoginNotice('Tu sesión expiró. Inicia sesión de nuevo.');
                logout();
                setPersistedGameState('LOGIN');
                return { ok: false, message: 'Tu sesión expiró. Inicia sesión de nuevo.' };
            }

            if (!response.ok) {
                return { ok: false, message: 'No se pudo reiniciar la partida.' };
            }
        } catch (error) {
            console.error('Error al reiniciar partida:', error);
            return { ok: false, message: 'No se pudo conectar para reiniciar la partida.' };
        }

        setInventoryItems(Items);
        setSelectedItemId(1);
        setIsMenuOpen(false);
        setIsInventoryOpen(false);
        setItineraryUsage({ a: 0, b: 0, c: 0 });
        setItineraryThresholds({ a: null, b: null, c: null });
        setWinningItinerary(null);
        resetEndingFlow();
        setPersistedGameState('STORYBOARD');
        return { ok: true };
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
        const itemReference = normalizedItemId ? {
            ...item,
            id: normalizedItemId,
            itinerary: item.itinerary || ITEM_DATABASE[normalizedItemId]?.itinerary || null,
        } : item;

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
            window.dispatchEvent(new CustomEvent("GameObjectRemoved", { detail: normalizedItemId }));
        }

        try {
            const response = await fetch("http://localhost:4000/api/nuevo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ item: normalizedItemId || item.id || item.name })
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

        const itinerary = item.itinerary || ITEM_DATABASE[itemKey]?.itinerary || null;
        const updatedItems = inventoryItems.map((inventoryItem) => {
            const currentKey = resolveObjectKey(inventoryItem?.id || inventoryItem?.name);
            const sameItem = currentKey === itemKey || inventoryItem?.id === item.id || inventoryItem?.name === item.name;
            if (!sameItem) return inventoryItem;

            return {
                ...inventoryItem,
                isUsed: true,
                src: inventoryItem.usedSrc || inventoryItem.src || '/UI/shadow.png'
            };
        });
        const usedItem = updatedItems.find((inventoryItem) => {
            const currentKey = resolveObjectKey(inventoryItem?.id || inventoryItem?.name);
            return currentKey === itemKey || inventoryItem?.id === item.id || inventoryItem?.name === item.name;
        });

        persistInventoryState(updatedItems);

        if (itemKey) {
            window.dispatchEvent(new CustomEvent('GameObjectAdded', {
                detail: {
                    id: itemKey,
                    src: usedItem?.src || usedItem?.usedSrc || item?.usedSrc || item?.src || '/UI/shadow.png',
                    isUsed: true
                }
            }));
        }

        if (itinerary) {
            const nextUsage = {
                ...itineraryUsage,
                [itinerary]: (itineraryUsage[itinerary] || 0) + 1,
            };
            const nextThresholds = {
                ...itineraryThresholds,
                [itinerary]: itineraryThresholds[itinerary] ?? (nextUsage[itinerary] >= 4 ? Date.now() : null),
            };
            setItineraryUsage(nextUsage);
            setItineraryThresholds(nextThresholds);

            const winner = resolveWinningItinerary(nextUsage, nextThresholds);
            if (winner && !endingTriggered) {
                setWinningItinerary(winner);
                setEndingTriggered(true);
                setStoryMode('ending');
                setPersistedGameState('ENDING_FADE');
                setCurrentStoryScreen(1);
            }
        }

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
            if (data.itineraryUsage) {
                const nextUsage = {
                    a: Number(data.itineraryUsage.a) || 0,
                    b: Number(data.itineraryUsage.b) || 0,
                    c: Number(data.itineraryUsage.c) || 0,
                };
                setItineraryUsage(nextUsage);
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

    const completeEndingTransition = () => {
        setPersistedGameState('STORYBOARD');
        setStoryMode('ending');
        setCurrentStoryScreen(1);
    };

    const completeIntroTransition = () => {
        setPersistedGameState('PLAYING');
    };

    const advanceStory = async (maxScreens = 4) => {
        if (storyMode === 'ending') {
            if (currentStoryScreen < maxScreens) {
                setCurrentStoryScreen(prev => prev + 1);
            } else {
                setPersistedGameState('GAME_OVER');
            }
            return;
        }

        if (currentStoryScreen < maxScreens) {
            setCurrentStoryScreen(prev => prev + 1);
        } else {
            try {
                await fetch("http://localhost:4000/api/usuario/narrativa", {
                    method: "PATCH",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setPersistedGameState('INTRO_FADE');
            } catch (e) {
                console.error("Error guardando progreso");
                setPersistedGameState('INTRO_FADE');
            }
        }
    };

    return (
        <Context.Provider value={{ 
            gameState, setGameState: setPersistedGameState, 
            loginNotice, setLoginNotice,
            pendingAction, setPendingAction,
            advanceStory, completeEndingTransition, completeIntroTransition, currentStoryScreen, setCurrentStoryScreen,
            inventoryItems, setInventoryItems, itineraryUsage, itineraryThresholds, winningItinerary, storyMode, setStoryMode, endingTriggered,
            isMenuOpen, openMenu, closeMenu,
            isInventoryOpen, openInventory, closeInventory,
            selectedItemId, setSelectedItemId, startGame, pauseGame, saveAndExitToMenu, resetProgress, initializeNewRun, saveInventoryItem, useInventoryItem, dropInventoryItem, loading, setLoading, loadGameData
        }}>
            {children}
        </Context.Provider>
    );
};