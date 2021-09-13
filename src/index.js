import PictFactory from "./core/pictFactory";

class App {
    constructor() {
        this.factory = new PictFactory();
        this.bullets = [];
        this.fireRate = 0;
        this.planets = [];
        this.lvl = 1;
        this.timeOut = 3000;
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
        window.addEventListener("keydown", (event) => this.containPressCheck(this.eventDistributor(event)));
        window.addEventListener("keyup", (event) => this.containUnPressCheck(this.eventDistributor(event)));
        //
        setInterval(this.planetsCreate.bind(this), this.timeOut);
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    planetsCreate() {
        let planet = this.decoratedFactory('planet', this.setPlanetSpeedByLevel());
        planet.sprite.x = this.getRandom((0 + planet.sprite.width), (window.innerWidth - planet.sprite.width));
        this.planets.push(planet);
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
        if (image === "starShip" && this.starShip != null && !this.starShip.isDead()) // или !this.starShip.dead
        {
            console.log("We have one!");
            return this.starShip;
        }
        return this.pictDecorator(this.factory.create(image, ...args));
    }

    containPressCheck(action) {
        if (this.starShipLoopAction.indexOf(action) === -1) {
            this.starShipLoopAction.push(action);
        }
    }

    containUnPressCheck(action) {
        let index = this.starShipLoopAction.indexOf(action);
        if (index !== -1) {
            this.starShipLoopAction.splice(index, 1);
        }
    }

    eventDistributor(e) {
        switch (e.keyCode) {
            case 32:
                return "fire";
            break;
            case 37:
                return "left";
            break;
            case 39:
                return "right";
            break;
        }
    }

    fireBullet() {
        this.bullets.push(this.decoratedFactory('bullet', this.starShip.sprite));
    }

    updateObject(array, direction) {
        for (let i=array.length-1; i>-1; i--) {
            array[i].move(direction);
            this.checkBorders(array[i], direction);
            this.checkDeath(array, i);
        }
    }

    checkBorders(object, direction) {
        switch (direction) {
            case "up":
                if (object.sprite.position.y < 0) {
                    object.dead = true;
                }
                break;
            case "right":
                if (object.sprite.position.x > window.innerWidth - this.starShip.sprite.width/2) {
                    object.moveLeft();
                }
                break;
            case "down":
                if (object.sprite.position.y > (window.innerHeight - this.starShip.sprite.height - object.sprite.height/2 - 11)) {
                    object.dead = true;
                    // to do
                    //нужно заменить 10 на высоту пули. this.decoratedFactory('bullet', this.starShip.sprite).sprite.height => это как вариант
                }
                break;
            case "left":
                if (object.sprite.position.x < 0 + this.starShip.sprite.width/2) {
                    object.moveRight();
                }
                break;
        }
    }

    checkDeath(arrObjects, i) {
        if (arrObjects[i].isDead()) {
            this.app.stage.removeChild(arrObjects[i].sprite);
            arrObjects.splice(i,1);
        }
    }

    updateStarShipLocation() {
        for (let i=0; i<this.starShipLoopAction.length; i++) {
            switch (this.starShipLoopAction[i]) {
                case "fire":
                    if (this.fireRate === 0) {
                        this.fireBullet();
                    }
                    this.fireRate = (++this.fireRate === 7) ? 0 : this.fireRate;
                    break;
                case "left":
                    this.starShip.moveLeft();
                    this.checkBorders(this.starShip, "left");
                    break;
                case "right":
                    this.starShip.moveRight();
                    this.checkBorders(this.starShip, "right");
                    break;
            }
        }
    }

    updatePlanetSpeed() {
        for (let i=0; i<this.planets.length; i++) {
            this.planets[i].speed = this.setPlanetSpeedByLevel();
        }
    }

    setPlanetSpeedByLevel() {
        return this.lvl*0.5;
    }

    gameLoop() {
        this.updateObject(this.bullets,'up');
        this.updateObject(this.planets,'down');
        for (let i=0; i<this.bullets.length; i++) {
            for (let j = 0; j < this.planets.length; j++) {
                if (this.planets[j].checkCollision(this.bullets[i])) {
                    this.bullets[i].dead = true;
                    this.planets[j].dead = true;
                }
            }
        }
        this.updateStarShipLocation();
    }
}

const Index = new App();
