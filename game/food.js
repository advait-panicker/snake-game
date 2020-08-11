const width = 800;
const height = 600;
const scl = 20;
class Food {
    constructor() {
        this.x = Math.floor(Math.random()*(width/scl-1));
        this.y = Math.floor(Math.random()*(height/scl-1));
    }
    pickLocation() {
        this.x = Math.floor(Math.random()*(width/scl-1));
        this.y = Math.floor(Math.random()*(height/scl-1));
    }
}
module.exports = Food;