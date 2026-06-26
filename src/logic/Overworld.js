import { GameObject } from "./GameObject.js";
import { OverworldMap, OverworldMaps } from "./OverWorldMap.js";
import { DirectionInput } from "./DirectionInput.js";
import { utils } from "./utils.js"; 

export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-container__canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.isPaused = false;
  }

  startGameLoop() {
    const step = () => {
      if (!this.isPaused) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
          });
        });

        this.map.drawMapImage(this.ctx);

        Object.values(this.map.gameObjects).forEach(object => {
          object.sprite.draw(this.ctx);
        });
      }
      requestAnimationFrame(() => { step(); });
    };
    step();
  }

  bindActionInput() {
    // 1. Interacción con TECLADO (Enter)
    document.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && !this.isPaused) {
            const hero = this.map.gameObjects["character"];
            if (!hero) return;
            const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
            const match = Object.values(this.map.gameObjects).find(obj => {
   
            const dist = Math.sqrt(
            Math.pow(obj.x - nextCoords.x, 2) + 
            Math.pow(obj.y - nextCoords.y, 2)
            );
            return dist < 8 && obj.isInteractive;
    });
        if (match) {
                document.dispatchEvent(new CustomEvent("ObjectInteraction", { detail: match.id }));
            }
        }
    });

    // 2. Interacción con RATÓN (Clic)
   /* this.canvas.addEventListener("click", (e) => {
        if (this.isPaused) return;

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const match = Object.values(this.map.gameObjects).find(obj => {
            if (!obj.isInteractive) return false;
            const width = obj.sprite.cutX || 16;
            const height = obj.sprite.cutY || 16;
            return clickX >= obj.x && clickX <= (obj.x + width) && 
                   clickY >= obj.y && clickY <= (obj.y + height);
        });

        if (match) {
            document.dispatchEvent(new CustomEvent("ObjectInteraction", { detail: match.id }));
        }
    });*/
  }

  init() {
    this.map = new OverworldMap(OverworldMaps.Jardin);
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.bindActionInput(); 
    this.startGameLoop();
  }
}