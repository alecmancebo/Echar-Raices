export class InteractionBubble {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src || "/UI/bocadillo.png";
    this.isLoaded = false;
    
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.offsetX = config.offsetX || -4;
    this.offsetY = config.offsetY || -20;

    this.defaultText = config.defaultText || "¿Soy yo?";
  }


  draw(ctx, targetX, targetY, text) {
    if (this.isLoaded) {
      const x = Math.round(targetX + this.offsetX);
      const y = Math.round(targetY + this.offsetY);

      ctx.drawImage(this.image, x, y);

      const bubbleText = (text || this.defaultText || "").toString();
      const centerX = x + Math.round(this.image.width / 2);
      const centerY = y + Math.round(this.image.height / 2);

      window.dispatchEvent(new CustomEvent('InteractionBubbleState', {
        detail: {
          visible: true,
          xPercent: (centerX / ctx.canvas.width) * 100,
          yPercent: (centerY / ctx.canvas.height) * 100,
          text: bubbleText
        }
      }));
    }
  }
}