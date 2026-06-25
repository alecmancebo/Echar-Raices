import { GameObject } from "./GameObject.js";

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

        //Stop here if space is not free
        if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
            return;
        }

        //Ready to walk!
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

 

  