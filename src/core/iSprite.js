export default class ISprite {
    constructor(scr, speed) {
        this.sprite = new PIXI.Sprite.from(scr);
        this.speed = speed;
        this.dead = false;
    }

    moveUp() {
        this.sprite.y -= this.speed;
    }

    moveDown() {
        this.sprite.y += this.speed;
    }

    moveLeft() {
        this.sprite.x -= this.speed;
    }

    moveRight() {
        this.sprite.x += this.speed;
    }

    move(direction) {
        switch (direction) {
            case "up": this.moveUp();
                break;
            case "right": this.moveRight();
                break;
            case "down": this.moveDown();
                break;
            case "left": this.moveLeft();
                break;
        }
    }

    isDead() {
        return this.dead;
    }

    checkCollision(object) {
        let aBox = this.sprite.getBounds();
        let bBox = object.sprite.getBounds();

        return aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
    }
}
