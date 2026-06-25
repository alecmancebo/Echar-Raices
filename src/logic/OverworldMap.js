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

            //banco
            [utils.asGridCoord(6,0)] : true,
            [utils.asGridCoord(7,0)] : true,
            [utils.asGridCoord(8,0)] : true,
            [utils.asGridCoord(6,1)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,

            //pozo
            [utils.asGridCoord(10,4)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(12,4)] : true,
            [utils.asGridCoord(13,4)] : true,
            [utils.asGridCoord(10,5)] : true,
            [utils.asGridCoord(11,5)] : true,
            [utils.asGridCoord(12,5)] : true,
            [utils.asGridCoord(13,5)] : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(11,6)] : true,
            [utils.asGridCoord(12,6)] : true,
            [utils.asGridCoord(13,6)] : true,

            //casa
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(1,11)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(1,9)] : true,
            [utils.asGridCoord(1,8)] : true,

            //mesa
            [utils.asGridCoord(0,5)] : true,
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(1,5)] : true,
            [utils.asGridCoord(1,6)] : true,
            [utils.asGridCoord(2,5)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(3,5)] : true,
            [utils.asGridCoord(3,6)] : true,
            
            //arbol
            [utils.asGridCoord(0,4)] : true,
            [utils.asGridCoord(0,3)] : true,
            [utils.asGridCoord(0,2)] : true,
            [utils.asGridCoord(0,1)] : true,
            [utils.asGridCoord(0,0)] : true,

            //tronco
            [utils.asGridCoord(15,9)] : true,
            [utils.asGridCoord(15,10)] : true,
            [utils.asGridCoord(14,9)] : true,
            [utils.asGridCoord(14,10)] : true,

            //cofre
            [utils.asGridCoord(18,0)] : true,
            [utils.asGridCoord(19,0)] : true,
            [utils.asGridCoord(20,0)] : true,


            //verja
            [utils.asGridCoord(19,4)] : true,
            [utils.asGridCoord(20,4)] : true,
            [utils.asGridCoord(21, 4)] : true,
            [utils.asGridCoord(22, 4)] : true,
            [utils.asGridCoord(23, 4)] : true,
            [utils.asGridCoord(19, 5)] : true,
            [utils.asGridCoord(20, 5)] : true,
            [utils.asGridCoord(21,5)] : true,
            [utils.asGridCoord(22,5)] : true,
            [utils.asGridCoord(23,5)] : true,


            //banco 2
            [utils.asGridCoord(19,10)] : true,
            [utils.asGridCoord(20,10)] : true,
            [utils.asGridCoord(21,10)] : true,
            [utils.asGridCoord(22,10)] : true,
            [utils.asGridCoord(23,10)] : true,
            [utils.asGridCoord(20,9)] : true,
            [utils.asGridCoord(21,9)] : true,
            [utils.asGridCoord(22,9)] : true,
            [utils.asGridCoord(23,9)] : true,
            






        },

       
        }
    }
