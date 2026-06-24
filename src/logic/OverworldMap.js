import { GameObject } from "./GameObject.js";
import { utils } from "./utils.js";
import { Person } from "./Person.js";
import { Sprite } from "./Sprite.js";
import { Overworld } from "./Overworld.js";
import { DirectionInput } from "./DirectionInput.js";


export class OverworldMap {
    constructor(config){
        // Colección de objetos en este mapa
        this.gameObjects = config.gameObjects || {};

        // Imagen de fondo del mapa
        this.image = new Image();
        this.isLoaded = false; 

        this.image.onload = () => {
            this.isLoaded = true;
        };

        this.image.src = config.src;
    }

    drawMapImage(ctx) {
    if (this.isLoaded) { 
        ctx.drawImage(this.image, 0, 0);
    }
    }

}

// Exportamos las configuraciones de los mapas 
export const OverworldMaps = {
    Jardin : {
        src: "/jardin.png",
        gameObjects: {
            character: new Person({
                x: utils.withGrid(0),
                y: utils.withGrid(0),
                src: "/hero.png"
            })
        }
    }
}