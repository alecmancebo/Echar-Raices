import { GameObject } from "./GameObject.js";
import { utils } from "./utils.js";

export class Person extends GameObject {
    constructor(config){
        super(config);
        this.movementProgressRemaining = 0;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }

   update(state) {
    if (this.movementProgressRemaining > 0) {
    this.updatePosition();
    }else{
        //mas casos

        //caso: esta listo para recibir input y tiene una tecla presionada
        if (state.arrow) {
            this.startBehavior(state, {
                type: "walk",
                direction: state.arrow
            })
        }
         this.updateSprite(state);
    }
   }

    startBehavior(state, behavior) {
        //Set character direction to whatever behavior has
        this.direction = behavior.direction;
        
        if (behavior.type === "walk") {

            //muros laterales
            const {x, y} = utils.nextPosition(this.x, this.y, this.direction);
            const minX = 0;
            const maxX = 384 - 16; 
            const minY = 0;
            const maxY = 208 - 16;
            const isOutOfBounds = x < minX || x > maxX || y < minY || y > maxY;

            //para si hay muro
            if (state.map.isSpaceTaken(this.x, this.y, this.direction) || isOutOfBounds) {
                return;
            }

            state.map.moveWall(this.x, this.y, this.direction);

            //Ready to walk
            this.movementProgressRemaining = 16;
            }
    }

    updatePosition() {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movementProgressRemaining -= 1;
    }

    updateSprite() {
        if (this.movementProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return;
        }
        this.sprite.setAnimation("idle-"+this.direction);    
    }




  }

 

  