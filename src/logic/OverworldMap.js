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

        this.walls = config.walls || {};

        console.log("Muros iniciales:", this.walls);  // ← Agrega esto aquí


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
        ctx.drawImage(this.image, 0, 0, ctx.canvas.width, ctx.canvas.height);    }
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }


    mountObjects() {
        Object.values(this.gameObjects).forEach(o => {
        o.mount(this);
        })
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
            [utils.asGridCoord(6,0)] : true,
            [utils.asGridCoord(7,0)] : true,
            [utils.asGridCoord(8,0)] : true,
            [utils.asGridCoord(6,1)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,

            [utils.asGridCoord(10,5)] : true,
            [utils.asGridCoord(11,5)] : true,
            [utils.asGridCoord(12,5)] : true,
            [utils.asGridCoord(13,5)] : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(11,6)] : true,
            [utils.asGridCoord(12,6)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(11,7)] : true,
            [utils.asGridCoord(12,7)] : true,
            [utils.asGridCoord(13,7)] : true,

            [utils.asGridCoord(0,12)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(1,12)] : true,
            [utils.asGridCoord(1,11)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(1,9)] : true,

            

        },

       
        }
    }
