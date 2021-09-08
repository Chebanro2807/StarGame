import PictFactory from "./core/pictFactory";

class App {
    constructor() {
        this.factory = new PictFactory();
        this.bullets = [];
        this.planets = [];
        this.starShipLoopAction = [];
        this.gameContainer = document.querySelector("#gameContainer");

        this.app = new PIXI.Application(
            {
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0xAAAAAA
            });

        this.gameContainer.appendChild(this.app.view);
        this.starShip = this.decoratedFactory('starShip', this.app.view);
        this.app.ticker.add(this.gameLoop.bind(this));
        //keyboard events
        this.app.stage.interactive = true;
        window.addEventListener("keydown", this.moveShip.bind(this));
        window.addEventListener("keyup", this.moveCheker.bind(this));
        //
        this.planets.push(this.decoratedFactory('planet', this.app.view.width));
    }

    pictDecorator(pict) {
        if (pict === null) {
            console.log('попали в нулл')
        } else {
            this.app.stage.addChild(pict.sprite);
        }
        return pict;
    }

    decoratedFactory(image, ...args) {
        return this.pictDecorator(this.factory.create(image, ...args));
    }

    moveShip(e) {
        switch (e.keyCode) {
            case 32:
                this.starShipLoopAction.push("fire");
                // this.fireBullet();
                break;
            case 37:
                this.starShipLoopAction.push("left");
                // this.starShip.moveLeft();
                break;
            case 39:
                this.starShipLoopAction.push("right");
                // this.starShip.moveRight();
                break;
        }
    }

    moveCheker(e) {
        switch (e.keyCode) {
            case 32:
                this.starShipLoopAction.reduce("fire");
                break;
            case 37:
                this.starShipLoopAction.reduce("left");
                break;
            case 39:
                this.starShipLoopAction.reduce("right");
                break;
        }
    }

    fireBullet() {
        this.bullets.push(this.decoratedFactory('bullet', this.starShip.sprite));
    }

    updateObject(array, direction) {
        for(let i=0; i<array.length; i++) {
            array[i].move(direction);
            if (array[i].sprite.position.y < 0) {
                array[i].dead = true;
            }
            this.checkDeath(array, i);
        }
    }

    checkDeath(arrObjects, i) {
        if (arrObjects[i].isDead()) {
            this.app.stage.removeChild(arrObjects[i].sprite);
            arrObjects.splice(i,1);
        }
    }

    gameLoop() {
        this.updateObject(this.bullets,'up');
        this.updateObject(this.planets,'down');
        for (let i=0; i<this.bullets.length; i++) {
            for (let j=0; j<this.planets.length; j++) {
                if (this.planets[j].checkCollision(this.bullets[i])) {
                    this.bullets[i].dead = true;
                    this.planets[j].dead = true;
                    this.checkDeath(this.bullets, i);
                    this.checkDeath(this.planets, j);
                }
            }
        }
        for (let i=0; i<this.starShipLoopAction.length; i++) {
            switch (this.starShipLoopAction[i]) {
                case "fire":
                    this.fireBullet();
                    break;
                case "left":
                    this.starShip.moveLeft();
                    break;
                case "right":
                    this.starShip.moveRight();
                    break;
            }
        }
    }
}

const Index = new App();
