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

        //muros
        this.walls = config.walls || {};

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

    isSpaceTaken(currentX, currentY, direction){
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(object => {
            object.mount(this);
        });
    }

    addWall(x,y) {
    this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
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
        }, 

       
        walls: {
            [utils.asGridCoord(6, 3)]: true,
            [utils.asGridCoord(7, 3)]: true,
            [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(6, 2)]: true,
            [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(8, 2)]: true,
        }
    } 
}