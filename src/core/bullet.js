import ISprite from "./iSprite";

export default class Bullet extends ISprite {
    constructor(...args) {
        super("image/bullet.png", 10);
        if (args.length === 1 && args[0] instanceof PIXI.Sprite) {
            let starShip = args[0];
            this.sprite.anchor.set(0.5,1);
            this.sprite.width = 4;
            this.sprite.x = starShip.x + this.sprite.width/2;
            this.sprite.y = starShip.y - starShip.height;
        }
    }
}
