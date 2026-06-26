import { GameObject } from "./GameObject.js";
import { OverworldMap, OverworldMaps } from "./OverWorldMap.js";
import { DirectionInput } from "./DirectionInput.js";
import { utils } from "./utils.js"; 
import { InteractionBubble } from "./InteractionBubble.js";

export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-container__canvas") || this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.isPaused = false; 

    // Instanciamos el sistema de bocadillos
    this.interactionBubble = new InteractionBubble({
      src: "/bocadillo.png" 
    });
  }

  startGameLoop() {
    const step = () => {
      if (!this.isPaused) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const player = this.map.gameObjects["character"];
        let objectNearPlayer = null;

        // 1. Actualizar posiciones y buscar objetos interactivos cercanos
        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
          });

          // Si es interactivo y NO es el jugador, medimos la distancia
          if (player && object.isInteractive && object.id !== "character") {
            const dist = Math.sqrt(Math.pow(object.x - player.x, 2) + Math.pow(object.y - player.y, 2));
            if (dist < 24) {
              objectNearPlayer = object;
            }
          }
        });

        // 2. Cambiar imágenes dinámicamente 
        Object.values(this.map.gameObjects).forEach(object => {
          if (object.activeSrc && object.normalSrc) {
            object.sprite.image.src = (object === objectNearPlayer) ? object.activeSrc : object.normalSrc;
          }
        });

        // 3. Dibujar capa inferior (suelo)
        this.map.drawLowerImage(this.ctx, player);

        // 4. Dibujar objetos ordenados por el eje Y
        Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y;
        }).forEach(object => {
          object.sprite.draw(this.ctx, player);
        });

        // 5. Dibujar bocadillo si hay algo cerca
        if (objectNearPlayer && player) {
          this.interactionBubble.draw(this.ctx, player, player);
        }

        // 6. Dibujar capa superior (tejados, copas de árboles)
        this.map.drawUpperImage(this.ctx, player);
      }

      requestAnimationFrame(() => {
        step();   
      });
    };
    step();
  }

  bindActionInput() {
    // Interacción con TECLADO
    new KeyPressListener("Enter", () => {
      if (this.isPaused) return;

      const player = this.map.gameObjects["character"];
      if (!player) return;

      const match = Object.values(this.map.gameObjects).find(object => {
        if (object.isInteractive && object.id !== "character") {
          const dist = Math.sqrt(Math.pow(object.x - player.x, 2) + Math.pow(object.y - player.y, 2));
          return dist < 24;
        }
        return false;
      });

      // Si hay match, disparamos el evento a React.
      if (match) {
        document.dispatchEvent(new CustomEvent("ObjectInteraction", { detail: match.id }));
      }
    });

    // Interacción con RATÓN
    this.canvas.addEventListener("click", (e) => {
      if (this.isPaused) return;

      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      const player = this.map.gameObjects["character"];

      const match = Object.values(this.map.gameObjects).find(obj => {
        if (!obj.isInteractive) return false;
        
        const width = obj.sprite.cutX || 16;
        const height = obj.sprite.cutY || 16;
        
        const screenX = obj.x - 8 + utils.withGrid(10.5) - player.x;
        const screenY = obj.y - 18 + utils.withGrid(6) - player.y;

        return clickX >= screenX && clickX <= (screenX + width) && 
               clickY >= screenY && clickY <= (screenY + height);
      });

      if (match) {
        document.dispatchEvent(new CustomEvent("ObjectInteraction", { detail: match.id }));
      }
    });
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    // NOTA: Asegúrate de poner aquí el nombre de tu mapa inicial real
    this.startMap(window.OverworldMaps.Jardin); 

    this.bindActionInput();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}