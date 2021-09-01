import Bullet from './core/bullet';

class App {
    constructor() {
        this.app;
        this.starShip;
        this.bullets = [];
        this.planets = [];
        this.planetSpeed = 0.5;
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
        this.createPlanet();
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
        // console.log(new Bullet(this.starShip.x, this.starShip.y, this.starShip.height, this.app))
        this.bullets.push(new Bullet(this.starShip.x, this.starShip.y, this.starShip.height, this.app));
    }

    createPlanet() {
        let planet = new PIXI.Sprite.from("image/planet.png")
        planet.anchor.set(0.5,1);
        planet.anchor.set(0.5);
        planet.x = this.app.view.width/2;
        planet.y = 0;
        planet.speed = this.planetSpeed;
        this.app.stage.addChild(planet);

        return this.planets.push(planet);
    }



    updateBullets() {
        for(let i=0; i<this.bullets.length; i++){
            // console.log('y= '+ this.createPlanet());
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