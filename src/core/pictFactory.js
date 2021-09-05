export default class PictFactory {
    constructor(image, ...args) {
        switch (image) {
            case "bullet":
                return this.createBullet(...args);
            case "planet":
                return this.createPlanet(...args);
            case "starShip":
                return this.createStarShip(...args);
        }
    }
    createBullet(...args) {
        if (args.length === 1 && args[0] instanceof PIXI.Sprite) {
            let starShip = args[0];
            let bullet = new PIXI.Sprite.from("image/bullet.png");
            bullet.speed = 10;
            bullet.anchor.set(0.5,1);
            bullet.width = 4;
            bullet.x = starShip.x + bullet.width/2;
            bullet.y = starShip.y - starShip.height;

            return bullet;
        }
        return null;
    }

    createPlanet(...args) {
        if (args.length === 1) {
            let planet = new PIXI.Sprite.from("image/planet.png")
            planet.speed = 0.5;
            planet.anchor.set(0.5);
            planet.x = args[0] / 2;
            planet.y = 0;

            return  planet;
        }
        return null;
    }

    createStarShip(...args) {
        if (args.length === 1 && args[0] instanceof HTMLCanvasElement) {
            let starShip = new PIXI.Sprite.from("image/starShip.png");
            starShip.anchor.set(0.5,1);
            starShip.x = args[0].width / 2;
            starShip.y = args[0].height;

            return starShip;
        }
        return null;
    }
}

