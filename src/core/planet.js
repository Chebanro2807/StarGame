import ISprite from "./iSprite";

export default class Planet extends ISprite {
    constructor(...args) {
        super("image/planet.png", args[0]);
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.sprite.anchor.set(0.5);
        this.sprite.x = args[0] / 2;
        this.sprite.y = 0;

    }
}
