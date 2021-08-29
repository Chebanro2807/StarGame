class App {
    constructor() {
        this.app;
        this.starShip;
        this.bullets = [];
        this.bulletSpeed = 10;
        this.gameContainer = document.querySelector("#gameContainer");

        this.app = new PIXI.Application(
            {
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0xAAAAAA
            });

        this.gameContainer.appendChild(this.app.view);

//Star ship object
        this.starShip = new PIXI.Sprite.from("image/starShip.png");
        this.starShip.anchor.set(0.5,1);
        this.starShip.x = this.app.view.width/2;
        this.starShip.y = this.app.view.height;

        this.app.stage.addChild(this.starShip);
        this.app.ticker.add(this.gameLoop.bind(this));
//keyboard events
        this.app.stage.interactive = true;
        window.addEventListener("keydown", this.moveShip.bind(this));
    }

    moveShip(e) {
        switch (e.keyCode) {
            case 37:
                this.starShip.x -=10;
                break;
            case 39:
                this.starShip.x +=10;
                break;
            case 32:
                this.fireBullet(e);
                break;
        }
    }

    fireBullet() {
        this.bullets.push(this.createBullet());
    }

    createBullet() {
        let bullet = new PIXI.Sprite.from("image/bullet.png")
        bullet.anchor.set(0.5,1);
        bullet.width = 4;
        bullet.x = this.starShip.x + bullet.width/2;
        bullet.y = this.starShip.y - this.starShip.height;
        bullet.speed = this.bulletSpeed;
        this.app.stage.addChild(bullet);

        return bullet;
    }

    updateBullets() {
        for(let i=0; i<this.bullets.length; i++){
            this.bullets[i].position.y -= this.bullets[i].speed;
            if (this.bullets[i].position.y < 0) {
                this.bullets[i].dead = true;
            }
        }

        for(let i=0; i<this.bullets.length; i++){
            if (this.bullets[i].dead) {
                this.app.stage.removeChild(this.bullets[i]);
                this.bullets.splice(i,1);
            }
        }
    }

    gameLoop() {
        this.updateBullets();
    }
}

const Game = new App();
