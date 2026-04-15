import { GameObject } from "./GameObject.js";

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
            character: new GameObject({
                x: 50,
                y: 50,
                src: "/hero.png"
            })
        }
    }
}