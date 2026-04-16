export class Sprite {
    constructor(config){

        // 1. Carga la imagen del personaje
        this.image = new Image();
        this.image.onload = () => { 
            this.isLoaded = true;
        }
        this.image.src = config.src;

        // 2. Carga la sombra
        this.shadow = new Image();
        this.useShadow = true;
        
        this.shadow.onload = () => { 
            this.isShadowLoaded = true;
        }
        if(this.useShadow){
            this.shadow.src = "/shadow.png";
        }

        // configuraciones de animación
        this.animation = config.animations || {
            idleDown: [ [0,0] ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;
        this.gameObject = config.gameObject;
    }




    draw(ctx) {
       
        const x = this.gameObject.x; 
        const y = this.gameObject.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x,y + 3);

        this.isLoaded && ctx.drawImage(this.image, 
        0,0,
        31,43,
        x,y,
        31,43);
    }

   
}