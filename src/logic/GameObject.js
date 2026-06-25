import { Sprite } from "./Sprite.js"; 
export class GameObject {
    constructor(config){
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
    }

    mount(map) {
        this.isMounted = true;
    }
    
    update(){

    }
}