const width = 800;
const height = 600;
const scl = 20;
class Player {
    id = "";
    name = "";
    color= [255, 255, 255];
    x = 0;
    y = 0;
    tail = [];
    xspeed = 0;
    yspeed = 0;
    constructor(player_id, name) {
        this.id = player_id;
        this.name = name;
        this.spawn();
    }
    spawn() {
        this.x = Math.floor(Math.random()*(width/scl-1));
        this.y = Math.floor(Math.random()*(height/scl-1));
        this.color = [Math.floor((Math.random()+1)*(128)),
                    Math.floor((Math.random()+1)*(128)),
                    Math.floor((Math.random()+1)*(128))]
        this.tail = [[this.x,this.y]];
    }
    update() {
        if (this.xspeed != 0 || this.yspeed != 0) {
            for (var i = this.tail.length-1; i > 0; i--) {
                this.tail[i] = this.tail[i-1];
            }
            this.tail[0] = [this.x, this.y];
            for (var i = 1; i < this.tail.length; i++) {
                if (this.tail[i][0] == this.tail[0][0] && this.tail[i][1] == this.tail[0][1]) {
                    this.spawn();
                }
            }
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.x < 0) {
            this.x = width/scl-1;
        }
        if (this.x >= width/scl) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = height/scl-1;
        }
        if (this.y >= height/scl) {
            this.y = 0;
        }
    }
    changeDir(x, y) {
        if (this.xspeed != -x) {
            this.xspeed = x;
        }
        if (this.yspeed != -y) {
            this.yspeed = y;
        }
    }
    eat() {
        this.tail.push([this.x,this.y]);
    }
}
module.exports = Player;