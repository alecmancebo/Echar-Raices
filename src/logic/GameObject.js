import { Sprite } from "./Sprite.js";
import { utils } from "./utils.js";

// ENTIDAD BASE DEL MAPA
export class GameObject {
    constructor(config){
        this.id = config?.id || null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/UI/hero.png",
            useShadow: config.useShadow, 
            cutX: config.cutX,           
            cutY: config.cutY,
            offsetX: config.offsetX || 0, 
            offsetY: config.offsetY || 0 
        });
        this.isInteractive = config.isInteractive || false; 
        this.isHovered = false;
        this.normalSrc = config.normalSrc || null;
        this.activeSrc = config.activeSrc || null;
        this.disableOriginalHover = config.disableOriginalHover || false;
        this.useBubble = config.useBubble || false;
        this.interactionTiles = Array.isArray(config.interactionTiles) ? config.interactionTiles : null;
    }

    getInteractionPoints() {
        if (Array.isArray(this.interactionTiles) && this.interactionTiles.length > 0) {
            return this.interactionTiles
                .filter((tile) => Array.isArray(tile) && tile.length === 2)
                .map(([gridX, gridY]) => ({
                    x: utils.withGrid(gridX),
                    y: utils.withGrid(gridY),
                }));
        }

        return [{ x: this.x, y: this.y }];
    }

    getInteractionRangePx() {
        const footprint = Math.max(this.sprite?.cutX || 16, this.sprite?.cutY || 16);
        return Math.max(24, Math.round(footprint * 0.65));
    }

    isPlayerNear(heroX, heroY, rangePx = this.getInteractionRangePx()) {
        return this.getInteractionPoints().some((point) => {
            const distance = Math.hypot(point.x - heroX, point.y - heroY);
            return distance <= rangePx;
        });
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }
    
    update(state){
        if (this.isInteractive && state.map.gameObjects.character) {
            const hero = state.map.gameObjects.character;
            const wasHovered = this.isHovered;
            this.isHovered = this.isPlayerNear(hero.x, hero.y);

            // Cambia la imagen si el estado ha cambiado
            if (this.isHovered !== wasHovered && this.normalSrc && this.activeSrc) {
                this.sprite.image.src = this.isHovered ? this.activeSrc : this.normalSrc;
            }
        }
    }
    }