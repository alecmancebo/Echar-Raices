import React, { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../../context/Context';
import { Overworld } from '../../logic/Overworld.js';
import { GameObject } from '../../logic/GameObject.js';
import { utils } from '../../logic/utils.js';
import InGameMenu from '../GameMenu/GameMenu.jsx';
import Inventory from '../Inventory/Inventory.jsx';
import ItemModal from '../GameMenu/ItemModal.jsx';

const ITEM_DATABASE = {
    botas: { id: "botas", name: "BOTAS", src: "/Objetos/botas.png", description: "Es cierto, estoy descalce. Debería ponérmelas, siento cómo la tierra me llama a través de los dedos de los pies."},
    pajaro: { id: "pajaro", name: "PÁJARO", src: "/Objetos/pajarito.png", description: "Se ha apoyado un gorrión en mi mano y me siento bendecide. Cuando escucho su canto me lleno de alegría." },
    sal: { id: "sal", name: "SALERO", src: "/Objetos/salero.png", description: "La sal es mala para las plantas, ¿verdad? Voy a tragarme un poco y lanzar un puñado por encima del hombro, por si acaso. Nunca viene mal protegerse de la mala suerte." },
    pociones: { id: "pociones", name: "POCIONES", src: "/Objetos/pociones.png", description: "¡Las pociones curativas que me regaló Rosaura! Hay una llamada “recordar quien eras” que parece perfecta para esta situación." },
    regadera: { id: "regadera", name: "REGADERA", src: "/Objetos/regadera.png", description: "Me muero de calor. Me apetece tanto echarme un poco de agua por encima para refrescarme, seguro que me siento mejor." },
    tijeras: { id: "tijeras", name: "TIJERAS", src: "/Objetos/tijeras.png", description: "Perfecto, así puedo cortar todas estas raíces y hojas que no paran de salir a través de mi piel." },
    rana: { id: "rana", name: "RANA", src: "/Objetos/rana.png", description: "¿Intento darle un beso? No pierdo nada por probar y en las historias siempre funciona." },
    rastrillo: { id: "rastrillo", name: "RASTRILLO", src: "/Objetos/rastrillo.png", description: "Está todo el jardín lleno de hojas caídas. Si las recogiera, podría tumbarme un rato sobre ellas. Parecen tan acogedoras." },
    fuego: { id: "fuego", name: "FUEGO", src: "/Objetos/fuego.png", description: "Es una medida un poco drástica, pero quizá si provoco un pequeño incendio… Uno pequeñito, solo dentro de mí…" },
    herbicida: { id: "herbicida", name: "HERBICIDA", src: "/Objetos/herbicida.png", description: "Justo lo que necesito para acabar con este extraño proceso. Tan solo tengo que rociarme un poco." },
    maceta: { id: "maceta", name: "MACETA", src: "/Objetos/maceta.png", description: "Estas pobres No-me-olvides necesitan tierra donde crecer. Debería pararme un momento a transplantarlas." },
    sombrilla: { id: "sombrilla", name: "SOMBRILLA", src: "/Objetos/sombrilla.png", description: "A las plantas les gusta el sol, podría ayudar ocultarme un poco de él." },
};

const OBJECT_LAYOUT = {
  botas: { x: utils.withGrid(7), y: utils.withGrid(11), src: '/Objetos/botas.png', useShadow: false, cutX: 30, cutY: 30, isInteractive: true },
  pajaro: { x: utils.withGrid(1), y: utils.withGrid(3), src: '/Objetos/pajarito.png', useShadow: false, cutX: 30, cutY: 30, offsetX: 0, offsetY: -3, isInteractive: true },
  sal: { x: utils.withGrid(2), y: utils.withGrid(7), src: '/Objetos/salero.png', useShadow: false, cutX: 30, cutY: 30, offsetX: 0, offsetY: -1, isInteractive: true },
  pociones: { x: utils.withGrid(7), y: utils.withGrid(2), src: '/Objetos/pociones.png', useShadow: false, cutX: 30, cutY: 30, isInteractive: true },
  regadera: { x: utils.withGrid(13), y: utils.withGrid(8), src: '/Objetos/regadera.png', useShadow: false, cutX: 30, cutY: 30, isInteractive: true },
  tijeras: { x: utils.withGrid(4), y: utils.withGrid(10), src: '/Objetos/tijeras.png', useShadow: false, cutX: 30, cutY: 30, isInteractive: true },
  rana: { x: utils.withGrid(9), y: utils.withGrid(5), src: '/Objetos/rana.png', useShadow: false, cutX: 28, cutY: 28, isInteractive: true },
  rastrillo: { x: utils.withGrid(14), y: utils.withGrid(12), src: '/Objetos/rastrillo.png', useShadow: false, cutX: 31, cutY: 28, isInteractive: true },
  fuego: { x: utils.withGrid(13), y: utils.withGrid(1), src: '/Objetos/fuego.png', useShadow: false, cutX: 35, cutY: 35, isInteractive: true },
  herbicida: { x: utils.withGrid(18), y: utils.withGrid(2), src: '/Objetos/herbicida.png', useShadow: false, cutX: 30, cutY: 30, isInteractive: true },
  maceta: { x: utils.withGrid(22), y: utils.withGrid(4), src: '/Objetos/maceta.png', useShadow: false, cutX: 30, cutY: 30, isInteractive: true },
  sombrilla: { x: utils.withGrid(18), y: utils.withGrid(7), src: '/Objetos/sombrilla.png', useShadow: false, cutX: 28, cutY: 28, isInteractive: true },
};

const normalizeObjectKey = (value) => {
  if (!value) return null;
  return value.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const resolveInteractiveItem = (value) => {
  const normalizedKey = normalizeObjectKey(value);
  if (!normalizedKey) return null;

  if (ITEM_DATABASE[normalizedKey]) {
    return ITEM_DATABASE[normalizedKey];
  }

  const byName = Object.values(ITEM_DATABASE).find((item) => normalizeObjectKey(item.name) === normalizedKey || normalizeObjectKey(item.id) === normalizedKey);
  return byName || null;
};

const GameContainer = () => {
  const containerRef = useRef(null);
  const overworldRef = useRef(null); 
  const { gameState, openInventory, isMenuOpen, isInventoryOpen } = useContext(Context);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bubbleOverlay, setBubbleOverlay] = useState({ visible: false, xPercent: 50, yPercent: 50, text: '¿Soy yo?' });

  const restoreObjectInWorld = (objectPayload) => {
    const map = overworldRef.current?.map;
    if (!map?.gameObjects || !objectPayload) return false;

    const payloadId = typeof objectPayload === 'string' ? objectPayload : objectPayload.id;
    const overrideSrc = typeof objectPayload === 'object' ? objectPayload.src : null;
    const isUsedVersion = typeof objectPayload === 'object' ? Boolean(objectPayload.isUsed) : false;

    const normalizedId = normalizeObjectKey(payloadId);
    if (!normalizedId) return false;

    if (map.gameObjects[normalizedId]) return true;

    const layout = OBJECT_LAYOUT[normalizedId];
    if (!layout) return false;

    const restoredObject = new GameObject({
      ...layout,
      src: overrideSrc || layout.src,
      isInteractive: isUsedVersion ? false : layout.isInteractive,
      id: normalizedId
    });

    map.gameObjects[normalizedId] = restoredObject;
    restoredObject.mount(map);
    return true;
  };

  useEffect(() => {
    if (containerRef.current && !overworldRef.current) {
      overworldRef.current = new Overworld({
        element: containerRef.current
      });
      overworldRef.current.init(); 
    }

    const collectedObjects = JSON.parse(localStorage.getItem('collectedObjects') || '[]');
    collectedObjects.forEach((objectId) => {
      if (overworldRef.current?.map?.gameObjects?.[objectId]) {
        delete overworldRef.current.map.gameObjects[objectId];
      }
    });
 

  const handleInteraction = (e) => {
        const itemId = e.detail;
        if (itemId === "pozo") {
            openInventory();
            return; 
        }
        
        const interactiveItem = resolveInteractiveItem(itemId);
        if (interactiveItem) {
            setSelectedItem(interactiveItem);
        }
    };

    document.addEventListener("ObjectInteraction", handleInteraction);

    const handleObjectRemoved = (e) => {
      const objectId = e.detail;
      const map = overworldRef.current?.map;
      if (!map?.gameObjects || !objectId) return;

      const object = map.gameObjects[objectId];
      if (!object) return;

      delete map.gameObjects[objectId];
      delete map.walls[`${object.x},${object.y}`];
    };

    const handleObjectAdded = (e) => {
      const payload = e.detail;
      if (!payload) return;
      restoreObjectInWorld(payload);
    };

    const handleBubbleState = (e) => {
      const detail = e.detail || {};
      if (!detail.visible) {
        setBubbleOverlay((prev) => ({ ...prev, visible: false }));
        return;
      }

      setBubbleOverlay({
        visible: true,
        xPercent: Number(detail.xPercent) || 50,
        yPercent: Number(detail.yPercent) || 50,
        text: detail.text || '¿Soy yo?'
      });
    };

    window.addEventListener("GameObjectRemoved", handleObjectRemoved);
    window.addEventListener("GameObjectAdded", handleObjectAdded);
    window.addEventListener('InteractionBubbleState', handleBubbleState);
    return () => {
      document.removeEventListener("ObjectInteraction", handleInteraction);
      window.removeEventListener("GameObjectRemoved", handleObjectRemoved);
      window.removeEventListener("GameObjectAdded", handleObjectAdded);
      window.removeEventListener('InteractionBubbleState', handleBubbleState);
    };

 }, []);
  

  useEffect(() => {
    if (overworldRef.current) {
        overworldRef.current.isPaused = isMenuOpen || isInventoryOpen || selectedItem !== null;
    }
  }, [isMenuOpen, isInventoryOpen, selectedItem]);

  return (
      <div className="game-container" ref={containerRef}>
          <canvas className="game-container__canvas" width="384" height="208"></canvas>

          {bubbleOverlay.visible && (
            <div
              className="interaction-bubble__text-overlay"
              style={{ left: `${bubbleOverlay.xPercent}%`, top: `calc(${bubbleOverlay.yPercent}% - 5px)` }}
            >
              {bubbleOverlay.text}
            </div>
          )}

          <ItemModal 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
            />
          <InGameMenu />
          <Inventory />
      </div>
  )
}

export default GameContainer;