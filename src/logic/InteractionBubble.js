export class InteractionBubble {
  constructor(config) {
  
    this.image = new Image();
    this.image.src = config.src || "/bocadillo.png";
    this.isLoaded = false;
    
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Ajustes de posición para que flote sobre el personaje
    this.offsetX = config.offsetX || -4;
    this.offsetY = config.offsetY || -20;
  }

  draw(ctx, targetX, targetY) {
    if (this.isLoaded) {
      // Dibujamos la imagen exactamente encima del objetivo (personaje)
      ctx.drawImage(this.image, targetX + this.offsetX, targetY + this.offsetY);
    }
    // 2. Si hay texto, lo dibujamos encima
      if (text) {
        ctx.save();
        ctx.fillStyle = "#000000"; 
        ctx.textAlign = "center";    
        ctx.textBaseline = "middle";  
        
        // Escribimos el texto en el centro de la burbuja. 
        ctx.fillText(text, x + 10, y + 8); 
        ctx.restore();
      }
  }
}