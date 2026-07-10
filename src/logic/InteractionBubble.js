export class InteractionBubble {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src || "/UI/bocadillo.png";
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
      const x = Math.round(targetX + this.offsetX);
      const y = Math.round(targetY + this.offsetY);

      // 1. Dibujamos el fondo
      ctx.drawImage(this.image, x, y);
    }
  }
}