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
        Object.keys(this.gameObjects).forEach(key => {
        let object = this.gameObjects[key];
        object.id = key;
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

export const OverworldMaps = {
    Jardin : {
        src: "/jardin.png",
        gameObjects: {
            
            rana: new GameObject({
                x: utils.withGrid(9), 
                y: utils.withGrid(5),
                src: "/rana.png",   
                useShadow: false,      
                cutX: 28,             
                cutY: 28,
                isInteractive: true

            }),

              pozo: new GameObject({
                x: utils.withGrid(10), 
                y: utils.withGrid(6),
                src: "/pozo-inactive.png",
                normalSrc: "/pozo-inactive.png",   
                activeSrc: "/pozo-active.png",
                useShadow: false,      
                cutX: 54,             
                cutY: 47,
                isInteractive: true,
                disableOriginalHover: true,
                useBubble: true
            }),

            botas: new GameObject({
                x: utils.withGrid(7), 
                y: utils.withGrid(11),
                src: "/botas.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                isInteractive: true             
            }),

            pajaro: new GameObject({
                x: utils.withGrid(1), 
                y: utils.withGrid(3),
                src: "/pajarito.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                offsetX: 0,  
                offsetY: -3,
                isInteractive: true               
            }),

            sal: new GameObject({
                x: utils.withGrid(2), 
                y: utils.withGrid(7),
                src: "/salero.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                offsetX: 0,  
                offsetY: -1,
                isInteractive: true              
            }),

            pociones: new GameObject({
                x: utils.withGrid(7), 
                y: utils.withGrid(2),
                src: "/pociones.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                isInteractive: true

            }),

            regadera: new GameObject({
                x: utils.withGrid(13), 
                y: utils.withGrid(8),
                src: "/regadera.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                isInteractive: true             
            }),

            rastrillo: new GameObject({
                x: utils.withGrid(14), 
                y: utils.withGrid(12),
                src: "/rastrillo.png",   
                useShadow: false,      
                cutX: 31,             
                cutY: 28,
                isInteractive: true             
            }),

            tijeras: new GameObject({
                x: utils.withGrid(4), 
                y: utils.withGrid(10),
                src: "/tijeras.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                isInteractive: true             
            }),

            fuego: new GameObject({
                x: utils.withGrid(13), 
                y: utils.withGrid(1),
                src: "/fuego.png",   
                useShadow: false,      
                cutX: 35,             
                cutY: 35,
                isInteractive: true             
            }),

            herbicida: new GameObject({
                x: utils.withGrid(18), 
                y: utils.withGrid(2),
                src: "/herbicida.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                isInteractive: true             
            }),

            maceta: new GameObject({
                x: utils.withGrid(22), 
                y: utils.withGrid(4),
                src: "/maceta.png",   
                useShadow: false,      
                cutX: 30,             
                cutY: 30,
                isInteractive: true             
            }),

            sombrilla: new GameObject({
                x: utils.withGrid(18), 
                y: utils.withGrid(7),
                src: "/sombrilla.png",   
                useShadow: false,      
                cutX: 28,             
                cutY: 28,
                isInteractive: true             
            }),


            character: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "/hero.png"
            }),

        },

        walls: {

            //banco
            [utils.asGridCoord(6,1)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(7,2)] : true,
            [utils.asGridCoord(8,2)] : true,

            //pozo
            [utils.asGridCoord(10,5)] : true,
            [utils.asGridCoord(11,5)] : true,
            [utils.asGridCoord(12,5)] : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(11,6)] : true,
            [utils.asGridCoord(12,6)] : true,

            //casa
            [utils.asGridCoord(0,12)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(1,12)] : true,
            [utils.asGridCoord(1,11)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(1,9)] : true,

            //mesa
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(1,6)] : true,
            [utils.asGridCoord(1,7)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(2,7)] : true,
            [utils.asGridCoord(3,6)] : true,
            [utils.asGridCoord(3,7)] : true,
            
            //arbol
            [utils.asGridCoord(0,5)] : true,
            [utils.asGridCoord(0,4)] : true,
            [utils.asGridCoord(0,3)] : true,
            [utils.asGridCoord(0,2)] : true,
            [utils.asGridCoord(0,1)] : true,

            //tronco
            [utils.asGridCoord(15,11)] : true,
            [utils.asGridCoord(14,11)] : true,

            //cofre
            [utils.asGridCoord(18,1)] : true,
            [utils.asGridCoord(19,1)] : true,
            [utils.asGridCoord(20,1)] : true,

            //verja
            [utils.asGridCoord(19,5)] : true,
            [utils.asGridCoord(20,5)] : true,
            [utils.asGridCoord(21, 5)] : true,
            [utils.asGridCoord(22, 5)] : true,
            [utils.asGridCoord(23, 5)] : true,
            [utils.asGridCoord(19, 6)] : true,
            [utils.asGridCoord(20, 6)] : true,
            [utils.asGridCoord(21,6)] : true,
            [utils.asGridCoord(22,6)] : true,
            [utils.asGridCoord(23,6)] : true,

            //banco 2
            [utils.asGridCoord(19,11)] : true,
            [utils.asGridCoord(20,11)] : true,
            [utils.asGridCoord(21,11)] : true,
            [utils.asGridCoord(22,11)] : true,
            [utils.asGridCoord(23,11)] : true,
            [utils.asGridCoord(20,10)] : true,
            [utils.asGridCoord(21,10)] : true,
            [utils.asGridCoord(22,10)] : true,
            [utils.asGridCoord(23,10)] : true,


            //resto objetos
            [utils.asGridCoord(7,10)] : true,
            [utils.asGridCoord(8,10)] : true,
            [utils.asGridCoord(7,11)] : true,
            [utils.asGridCoord(14,11)] : true,
            [utils.asGridCoord(14,12)] : true,
            [utils.asGridCoord(9,5)] : true,
            [utils.asGridCoord(10,5)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
            [utils.asGridCoord(8,2)] : true,
            [utils.asGridCoord(1,2)] : true,
            [utils.asGridCoord(18,6)] : true,
            [utils.asGridCoord(22,3)] : true,
            [utils.asGridCoord(4,9)] : true,

        },

    }
    }
