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


  draw(ctx, targetX, targetY, text = "¿Soy yo?") {
    if (this.isLoaded) {
      const x = targetX + this.offsetX;
      const y = targetY + this.offsetY;

      // 1. Dibujamos el fondo
      ctx.drawImage(this.image, x, y);

      // 2. Dibujamos el texto
      if (text) {
        ctx.save();
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + 10, y + 8); 
        ctx.restore();
      }
    }
  }
}