import { GameObject } from "./GameObject.js";

export class Person extends GameObject {
    constructor(config){
        super(config);
        this.movementProgressRemaining = 32;

        // Mantén esto en minúsculas para que coincida con DirectionInput.js y GameObject.js
        this.directionUpdate = {
            "up": ["y", -0.5],
            "down": ["y", 0.5],
            "left": ["x", -0.5],
            "right": ["x", 0.5]
        }
    }

    update(state){
        if(this.movementProgressRemaining > 0){
            this.updatePosition();
        } else {

            // No se está moviendo, por lo que podemos recibir nuevas entradas
            //
            //
            // Si no se está moviendo y el usuario presiona una tecla
            if(state.arrow){
                this.startBehavior(state, {
                    type:"walk",
                    direction:state.arrow
                });
            }
            this.updateSprite(state);
        }

      
      
    }

    startBehavior(state, behavior){
        // Establecer la dirección del personaje
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
            if(!state.map.isSpaceTaken(this.x, this.y, this.direction)){
                this.movementProgressRemaining = 32;
            }
        }
    }

    updatePosition() {
        
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movementProgressRemaining -= 1;
        }
   

    updateSprite(){
       
        const capitalize = this.direction[0].toUpperCase() + this.direction.slice(1);

        // Si le queda distancia por recorrer, está caminando
        if(this.movementProgressRemaining > 0){
            this.sprite.setAnimation("walk" + capitalize);
            return;
        }
        
        // Si no está caminando, está quieto
        this.sprite.setAnimation("idle" + capitalize);
    }
}