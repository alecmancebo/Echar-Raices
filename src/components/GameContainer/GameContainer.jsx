import React, { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../../context/Context';
import { Overworld } from '../../logic/Overworld.js';
import InGameMenu from '../GameMenu/GameMenu.jsx';
import Inventory from '../Inventory/Inventory.jsx';
import ItemModal from '../GameMenu/ItemModal.jsx';

const ITEM_DATABASE = {
    botas: { name: "BOTAS", src: "/botas.png", description: "Es cierto, estoy descalce. Debería ponérmelas, siento cómo la tierra me llama a través de los dedos de los pies."},
    pajaro: { name: "PÁJARO", src: "/pajarito.png", description: "Se ha apoyado un gorrión en mi mano y me siento bendecide. Cuando escucho su canto me lleno de alegría." },
    sal: { name: "SALERO", src: "/salero.png", description: "La sal es mala para las plantas, ¿verdad? Voy a tragarme un poco y lanzar un puñado por encima del hombro, por si acaso. Nunca viene mal protegerse de la mala suerte." },
    pociones: { name: "POCIONES", src: "/pociones.png", description: "¡Las pociones curativas que me regaló Rosaura! Hay una llamada “recordar quien eras” que parece perfecta para esta situación." },
    regadera: { name: "REGADERA", src: "/regadera.png", description: "Me muero de calor. Me apetece tanto echarme un poco de agua por encima para refrescarme, seguro que me siento mejor." },
    tijeras: { name: "TIJERAS", src: "/tijeras.png", description: "Perfecto, así puedo cortar todas estas raíces y hojas que no paran de salir a través de mi piel." },
    rana: { name: "RANA", src: "/rana.png", description: "¿Intento darle un beso? No pierdo nada por probar y en las historias siempre funciona." },
    rastrillo: { name: "RASTRILLO", src: "/rastrillo.png", description: "Está todo el jardín lleno de hojas caídas. Si las recogiera, podría tumbarme un rato sobre ellas. Parecen tan acogedoras." },
    fuego: { name: "FUEGO", src: "/fuego.png", description: "Es una medida un poco drástica, pero quizá si provoco un pequeño incendio… Uno pequeñito, solo dentro de mí…" },
    herbicida: { name: "HERBICIDA", src: "/herbicida.png", description: "Justo lo que necesito para acabar con este extraño proceso. Tan solo tengo que rociarme un poco." },
    maceta: { name: "MACETA", src: "/maceta.png", description: "Estas pobres No-me-olvides necesitan tierra donde crecer. Debería pararme un momento a transplantarlas." },
    sombrilla: { name: "SOMBRILLA", src: "/sombrilla.png", description: "A las plantas les gusta el sol, podría ayudar ocultarme un poco de él." },
};

const GameContainer = () => {
  const containerRef = useRef(null);
  const overworldRef = useRef(null); 
  const { gameState, openInventory, isMenuOpen } = useContext(Context);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (containerRef.current && !overworldRef.current) {
      overworldRef.current = new Overworld({
        element: containerRef.current
      });
      overworldRef.current.init(); 
    }
 

  const handleInteraction = (e) => {
        const itemId = e.detail;
        if (itemId === "pozo") {
            openInventory();
            return; 
        }
        
        if (ITEM_DATABASE[itemId]) {
            setSelectedItem(ITEM_DATABASE[itemId]);
        }
    };

    document.addEventListener("ObjectInteraction", handleInteraction);
    return () => document.removeEventListener("ObjectInteraction", handleInteraction);

 }, []);
  

  useEffect(() => {
    if (overworldRef.current) {
        overworldRef.current.isPaused = isMenuOpen || selectedItem !== null;
    }
  }, [isMenuOpen, selectedItem]);

  return (
      <div className="game-container" ref={containerRef}>
          <canvas className="game-container__canvas" width="384" height="208"></canvas>

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