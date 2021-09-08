import Bullet from "./bullet";
import Planet from "./planet";
import StarShip from "./starShip";

export default class PictFactory {
    create(image, ...args) {
        switch (image) {
            case "bullet":
                return new Bullet(...args);//this.createBullet(...args);
            case "planet":
                return new Planet(...args);
            case "starShip":
                return new StarShip(...args);
        }
    }
}

