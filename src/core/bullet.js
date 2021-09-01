export default class Bullet {
    constructor(starShipPositionX, starShipPositionY, starShipHeight, app) {
        this.app = app;
        this.deltaHeight = starShipHeight
        this.deltaX = starShipPositionX;
        this.deltaY = starShipPositionY;
        this.bulletSpeed = 10;
        return this.createBullet();
    }

    createBullet() {
        let bullet = new PIXI.Sprite.from("image/bullet.png")
        bullet.anchor.set(0.5,1);
        bullet.width = 4;
        bullet.x = this.deltaX + bullet.width/2;
        bullet.y = this.deltaY - this.deltaHeight;
        bullet.speed = this.bulletSpeed;
        console.log(bullet)
        console.log(bullet.y)
        this.app.stage.addChild(bullet);

        return bullet;
    }
}
