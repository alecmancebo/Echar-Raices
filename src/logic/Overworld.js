import { GameObject } from "./GameObject.js";
import { OverworldMap, OverworldMaps } from "./OverWorldMap.js";
import { DirectionInput } from "./DirectionInput.js";

export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-container__canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.isPaused = false;
  }

  startGameLoop(){
    const step = () => {
      // 1. Limpiar el lienzo 
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 2. Dibujar el mapa
      this.map.drawMapImage(this.ctx);

      if (!this.isPaused) {
          // Aquí irá la lógica de movimiento cuando implementes Person.js
          // ej: object.update({ arrow: this.directionInput.direction });
      }
      
      // 3. Dibujar los objetos que existan en el mapa
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
            arrow: this.directionInput.direction
        });
        object.sprite.draw(this.ctx);
      });

      requestAnimationFrame(()=> {
        step();
      })
    }
    step();
  }

  init() {

    this.map = new OverworldMap(OverworldMaps.Jardin);
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    
  }
}