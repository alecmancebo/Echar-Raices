import { GameObject } from "./GameObject.js";
import { OverworldMap, OverworldMaps } from "./OverWorldMap.js";
import { DirectionInput } from "./DirectionInput.js";
import { utils } from "./utils.js"; 
import { InteractionBubble } from "./InteractionBubble.js";
import { KeyPressListener } from "./KeyPressListener.js";

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

        // 1. Actualizar posiciones de los objetos
        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
          });

          // Si el objeto sabe que estás cerca, nos guardamos ese objeto.
          if (object.isInteractive && object.isHovered && object.id !== "character") {
            objectNearPlayer = object;
          }
        });

        // 3. Dibujar TODO el mapa
        this.map.drawMapImage(this.ctx);

        // 4. Dibujar objetos ordenados por el eje Y
        Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y;
        }).forEach(object => {
          object.sprite.draw(this.ctx, player);
        });

        // 5. Dibujar bocadillo si hay un objeto interactivo cerca
        if (objectNearPlayer && player) {
          this.interactionBubble.draw(
            this.ctx, 
            player.x, 
            player.y - 36, 
            objectNearPlayer.interactText
          );
        }
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

  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    // NOTA: Asegúrate de poner aquí el nombre de tu mapa inicial real
    this.startMap(OverworldMaps.Jardin); 

    this.bindActionInput();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}