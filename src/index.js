import PictFactory from "./core/pictFactory";

class App {
    constructor() {
        this.bullets = [];
        this.planets = [];
        this.gameContainer = document.querySelector("#gameContainer");

        this.app = new PIXI.Application(
            {
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0xAAAAAA
            });

        this.gameContainer.appendChild(this.app.view);
        // this.starShip = new StarShipFactory(this.app);
        this.starShip = this.pictDecorator(new PictFactory('starShip', this.app.view))
        this.app.ticker.add(this.gameLoop.bind(this));
        //keyboard events
        this.app.stage.interactive = true;
        window.addEventListener("keydown", this.moveShip.bind(this));
        //
        // this.planets.push(new PlanetFactory(this.app));
        this.planets.push(this.pictDecorator(new PictFactory('planet', this.app.view.width)));
    }

    pictDecorator(pict) {
        if (pict === null) {
            console.log('попали в нулл')
        } else {
            this.app.stage.addChild(pict);
        }
        return pict;
    }

    moveShip(e) {
        switch (e.keyCode) {
            case 32:
                this.fireBullet(e);
                //break;
            case 37:
                this.starShip.x -=10;
                break;
            case 39:
                this.starShip.x +=10;
                break;
        }
    }

    fireBullet() {
        // this.bullets.push(new BulletFactory(this.starShip, this.app));
        this.bullets.push(this.pictDecorator(new PictFactory('bullet', this.starShip)));
    }

    updateBullets() {
        for(let i=0; i<this.bullets.length; i++){
            this.bullets[i].position.y -= this.bullets[i].speed;
            if (this.bullets[i].position.y < 0) {
                this.bullets[i].dead = true;
            }
            if (this.bullets[i].dead) {
                this.app.stage.removeChild(this.bullets[i]);
                this.bullets.splice(i,1);
            }
        }
    }

    updatePlanets() {
        for(let i=0; i<this.planets.length; i++){
            this.planets[i].y += this.planets[i].speed;
            if (this.planets[i].y > this.app.view.height) {
                this.planets[i].dead = true;
            }
            if (this.planets[i].dead) {
                this.app.stage.removeChild(this.planets[i]);
                this.planets.splice(i,1);
            }
        }
    }

    gameLoop() {
        this.updateBullets();
        this.updatePlanets();
        for (let i=0; i<this.bullets.length; i++) {
            for (let j=0; j<this.planets.length; j++) {
                if (this.collision(this.bullets[i], this.planets[j])) {
                    this.bullets[i].dead = true;
                    this.planets[j].dead = true;
                    this.updateBullets();
                    this.updatePlanets();
                }
            }
        }
    }

    collision(objA,objB) {
        let aBox = objA.getBounds();
        let bBox = objB.getBounds();

        return aBox.x + aBox.width > bBox.x &&
               aBox.x < bBox.x + bBox.width &&
               aBox.y + aBox.height > bBox.y &&
               aBox.y < bBox.y + bBox.height;
    }
}

const Index = new App();
