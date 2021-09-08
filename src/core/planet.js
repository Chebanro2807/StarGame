import ISprite from "./iSprite";

export default class Planet extends ISprite {
    constructor(...args) {
        super("image/planet.png", 0.5);
        if (args.length === 1) {
            this.sprite.anchor.set(0.5);
            this.sprite.x = args[0] / 2;
            this.sprite.y = 0;
        }
    }
}
