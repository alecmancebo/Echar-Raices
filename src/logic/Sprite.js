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
        this.animations = config.animations || {
           "idle-down":  [ [0,0] ],
            "idle-left":  [ [0,1] ],
            "idle-right": [ [0,2] ],
            "idle-up":    [ [0,3] ],
            "walk-down":  [ [1,0], [0,0], [3,0], [0,0] ],
            "walk-left":  [ [1,1], [0,1], [3,1], [0,1] ],
            "walk-right": [ [1,2], [0,2], [3,2], [0,2] ],
            "walk-up":    [ [1,3], [0,3], [3,3], [0,3] ]
        }
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;


        this.gameObject = config.gameObject;
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress(){
        // decrece el contador de progreso de la animación
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }

        // resetear el contador de progreso de la animación
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.currentAnimationFrame >= this.animations[this.currentAnimation].length){
        this.currentAnimationFrame = 0;
    }
    }

    draw(ctx) {
        const x = this.gameObject.x; 
        const y = this.gameObject.y;

        // Dibujar sombra con modo multiplicar
        if (this.isShadowLoaded) {
            ctx.globalCompositeOperation = "multiply"; // Cambiar a multiplicar
            ctx.drawImage(this.shadow, x, y + 3);
            ctx.globalCompositeOperation = "source-over"; // Restaurar modo normal
        }

        const [frameX, frameY] = this.frame;

        // Dibujar personaje
        this.isLoaded && ctx.drawImage(this.image, 
            frameX * 16, frameY * 16, 
            16, 16,                   
            x, y,                     
            16, 16                    
        );

        this.updateAnimationProgress();
    }

}
