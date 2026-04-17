export class Sprite {
    constructor(config){
        this.image = new Image();
        this.image.src = config.src; // Corrección: punto en lugar de coma
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.animation = config.animations || {
            idleDown: [ [0,0] ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        // Corrección: Se elimina la multiplicación por 56. El Sprite solo debe dibujar en la posición exacta que le dicte su GameObject.
        const x = this.gameObject.x; 
        const y = this.gameObject.y;

        this.isLoaded && ctx.drawImage(this.image, 0,0,32,32,x,y,32,32);
    }
}