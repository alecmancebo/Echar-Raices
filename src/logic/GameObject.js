import { Sprite } from "./Sprite.js"; 
export class GameObject {
    constructor(config){
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/hero.png",
            useShadow: config.useShadow, 
            cutX: config.cutX,           
            cutY: config.cutY,
            offsetX: config.offsetX || 0, 
            offsetY: config.offsetY || 0 
        });
        this.isInteractive = config.isInteractive || false; 
        this.isHovered = false;
        this.normalSrc = config.normalSrc || null;
        this.activeSrc = config.activeSrc || null;
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }
    
    update(state){
        if (this.isInteractive && state.map.gameObjects.character) {
            const hero = state.map.gameObjects.character;
            const diffX = Math.abs(hero.x - this.x);
            const diffY = Math.abs(hero.y - this.y);
            
            // Si el jugador está en la misma casilla o a 16 píxeles (una casilla) de distancia
            this.isHovered = (diffX <= 16 && diffY <= 16);
        }
    }
    }

    /*async doBehaviorEvent(map){
        let eventConfig;
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();


    }*/