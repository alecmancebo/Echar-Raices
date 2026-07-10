// RENDER Y ANIMACION DE SPRITES
export class Sprite {
    constructor(config){

        // Carga la imagen del personaje
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => { 
            this.isLoaded = true;
        }
        this.image.src = config.src;

        //DIMENSIONES
        this.cutX = config.cutX || 23; 
        this.cutY = config.cutY || 32; 

        this.offsetX = config.offsetX || 0;
        this.offsetY = config.offsetY || 0;

        //SOMBRAS
        this.shadow = new Image();
        this.useShadow = config.useShadow !== undefined ? config.useShadow : true;
        
        this.shadow.onload = () => { 
            this.isShadowLoaded = true;
        }
        if(this.useShadow){
            this.shadow.src = "/UI/shadow.png";
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
  
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
        this.currentAnimationFrame = 0
        }
    }

    draw(ctx) {
        const x = this.gameObject.x; 
        const y = this.gameObject.y;

        const offsets = {
            "idle-down": { x: -1},
            "idle-up":   { x: -1},
            "idle-left": { x: -1}, 
            "idle-right":{ x: +1},  
            "walk-down": { x: -1},
            "walk-up":   { x: -1},
            "walk-left": { x: -1}, 
            "walk-right":{ x: +1},
        };


        const currentOffset = offsets[this.currentAnimation] || { x: -8, y: -16 };

        if (this.isShadowLoaded && this.useShadow) {
            ctx.globalCompositeOperation = "multiply"; 
            ctx.drawImage(this.shadow, x - 3, y - 23);
            ctx.globalCompositeOperation = "source-over";
        }

        const showGenericHover = this.gameObject.isHovered && !this.gameObject.disableOriginalHover;

        if (showGenericHover) {
            ctx.save(); 
            ctx.shadowColor = "white";
            ctx.shadowBlur = 6;
            ctx.translate(0, -2);
        }

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image, 
            frameX * this.cutX, frameY * this.cutY, 
            this.cutX, this.cutY,                   
            x + currentOffset.x + this.offsetX, y - 16 + this.offsetY,                
            this.cutX, this.cutY                    
        );

        if (showGenericHover) {
            ctx.restore(); 
        }

        this.updateAnimationProgress();
    }

}
