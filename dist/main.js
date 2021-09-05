(()=>{"use strict";class t{constructor(t,...e){switch(t){case"bullet":return this.createBullet(...e);case"planet":return this.createPlanet(...e);case"starShip":return this.createStarShip(...e)}}createBullet(...t){if(1===t.length&&t[0]instanceof PIXI.Sprite){let e=t[0],i=new PIXI.Sprite.from("image/bullet.png");return i.speed=10,i.anchor.set(.5,1),i.width=4,i.x=e.x+i.width/2,i.y=e.y-e.height,i}return null}createPlanet(...t){if(1===t.length){let e=new PIXI.Sprite.from("image/planet.png");return e.speed=.5,e.anchor.set(.5),e.x=t[0]/2,e.y=0,e}return null}createStarShip(...t){if(1===t.length&&t[0]instanceof HTMLCanvasElement){let e=new PIXI.Sprite.from("image/starShip.png");return e.anchor.set(.5,1),e.x=t[0].width/2,e.y=t[0].height,e}return null}}new class{constructor(){this.bullets=[],this.planets=[],this.gameContainer=document.querySelector("#gameContainer"),this.app=new PIXI.Application({width:window.innerWidth,height:window.innerHeight,backgroundColor:11184810}),this.gameContainer.appendChild(this.app.view),this.starShip=this.pictDecorator(new t("starShip",this.app.view)),this.app.ticker.add(this.gameLoop.bind(this)),this.app.stage.interactive=!0,window.addEventListener("keydown",this.moveShip.bind(this)),this.planets.push(this.pictDecorator(new t("planet",this.app.view.width)))}pictDecorator(t){return null===t?console.log("попали в нулл"):this.app.stage.addChild(t),t}moveShip(t){switch(t.keyCode){case 32:this.fireBullet(t);break;case 37:this.starShip.x-=10;break;case 39:this.starShip.x+=10}}fireBullet(){this.bullets.push(this.pictDecorator(new t("bullet",this.starShip)))}updateBullets(){for(let t=0;t<this.bullets.length;t++)this.bullets[t].position.y-=this.bullets[t].speed,this.bullets[t].position.y<0&&(this.bullets[t].dead=!0),this.bullets[t].dead&&(this.app.stage.removeChild(this.bullets[t]),this.bullets.splice(t,1))}updatePlanets(){for(let t=0;t<this.planets.length;t++)this.planets[t].y+=this.planets[t].speed,this.planets[t].y>this.app.view.height&&(this.planets[t].dead=!0),this.planets[t].dead&&(this.app.stage.removeChild(this.planets[t]),this.planets.splice(t,1))}gameLoop(){this.updateBullets(),this.updatePlanets();for(let t=0;t<this.bullets.length;t++)for(let e=0;e<this.planets.length;e++)this.collision(this.bullets[t],this.planets[e])&&(this.bullets[t].dead=!0,this.planets[e].dead=!0,this.updateBullets(),this.updatePlanets())}collision(t,e){let i=t.getBounds(),s=e.getBounds();return i.x+i.width>s.x&&i.x<s.x+s.width&&i.y+i.height>s.y&&i.y<s.y+s.height}}})();