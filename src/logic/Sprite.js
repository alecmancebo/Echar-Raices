export class Sprite {
    constructor(config){

        // 1. Carga la imagen del personaje
        this.image = new Image();
        this.image.src = config.src;
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
           "idleDown":  [ [0,0] ],
            "idleLeft":  [ [0,1] ],
            "idleRight": [ [0,2] ],
            "idleUp":    [ [0,3] ],
            "walkDown":  [ [1,0], [0,0], [3,0], [0,0] ],
            "walkLeft":  [ [1,1], [0,1], [3,1], [0,1] ],
            "walkRight": [ [1,2], [0,2], [3,2], [0,2] ],
            "walkUp":    [ [1,3], [0,3], [3,3], [0,3] ]
        }
        this.currentAnimation = "idleRight";
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

        if (this.frame === undefined) {
        this.currentAnimationFrame = 0
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
            frameX * 31, frameY * 43, 
            31, 43,                   
            x, y,                     
            31, 43                    
        );

        this.updateAnimationProgress();
    }


}
