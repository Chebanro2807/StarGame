import ISprite from "./iSprite";

export default class StarSHip extends ISprite {
    constructor(...args) {
        super("image/starShip.png", 10);
        if (args.length === 1 && args[0] instanceof HTMLCanvasElement) {
            this.sprite.anchor.set(0.5, 1);
            this.sprite.x = args[0].width / 2;
            this.sprite.y = args[0].height;
        }
    }
}
