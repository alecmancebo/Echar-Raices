import { GameObject } from "./GameObject.js";
import { OverworldMap, OverworldMaps } from "./OverWorldMap.js";

export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop(){
    const step = () => {
      // 1. Limpiar el lienzo 
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 2. Dibujar el mapa (capa inferior)
      this.map.drawMapImage(this.ctx);

      // 3. Dibujar todos los objetos que existan en el mapa
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx);
      });

      requestAnimationFrame(()=> {
        step();
      })
    }
    step();
  }

  init() {

    this.map = new OverworldMap(OverworldMaps.Jardin)
    this.startGameLoop();

    
  }
}