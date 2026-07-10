import { GameObject } from "./GameObject.js";
import { OverworldMap, OverworldMaps } from "./OverWorldMap.js";
import { DirectionInput } from "./DirectionInput.js";
import { utils } from "./utils.js"; 
import { InteractionBubble } from "./InteractionBubble.js";
import { KeyPressListener } from "./KeyPressListener.js";

// CONTROLADOR PRINCIPAL DEL MUNDO
export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-container__canvas") || this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.isPaused = false; 
    this.bubbleVisible = false;

    //sistema de bocadillos
    this.interactionBubble = new InteractionBubble({
      src: "/UI/bocadillo.png" 
    });
  }

  startGameLoop() {
    const step = () => {
      if (!this.isPaused) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const player = this.map.gameObjects["character"];
        let objectNearPlayer = null;

        // Actualizar posiciones de los objetos
        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
          });

          if (object.isInteractive && object.isHovered && object.useBubble && object.id !== "character") {
            objectNearPlayer = object;
          }
        });

        //Dibujar el mapa
        this.map.drawMapImage(this.ctx);

        // Dibujar objetos ordenados por el eje Y
        Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y;
        }).forEach(object => {
          object.sprite.draw(this.ctx, player);
        });

        // Dibujar bocadillo si hay objeto interactivo cerca
        if (objectNearPlayer && player) {
          this.bubbleVisible = true;
          this.interactionBubble.draw(
            this.ctx, 
            player.x, 
            player.y - 8, 
            objectNearPlayer.interactText
          );
        } else if (this.bubbleVisible) {
          window.dispatchEvent(new CustomEvent('InteractionBubbleState', {
            detail: { visible: false }
          }));
          this.bubbleVisible = false;
        }
      } else if (this.bubbleVisible) {
        window.dispatchEvent(new CustomEvent('InteractionBubbleState', {
          detail: { visible: false }
        }));
        this.bubbleVisible = false;
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
          if (typeof object.isPlayerNear === "function") {
            return object.isPlayerNear(player.x, player.y);
          }

          const dist = Math.sqrt(Math.pow(object.x - player.x, 2) + Math.pow(object.y - player.y, 2));
          return dist < 24;
        }
        return false;
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

    this.startMap(OverworldMaps.Jardin); 

    this.bindActionInput();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}