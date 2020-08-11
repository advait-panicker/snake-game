/* data = 
    {
        food: [x, y],
        players : [
            {
                name : "Mike",
                color : [1,2,3],
                tail : [
                    [x, y],
                    [x, y],
                    [x, y], ...
                ]
            }, ...
        ]
    }
*/
const scl = 20;
const nameSize = 20;
var clientData = [];

function setup () {
    var canvas = createCanvas(800,600);
    canvas.parent('sketch-holder');
    frameRate(10);
}

function draw() {
    background(0);
    textSize(nameSize);
    if (clientData.length != 0) {
        var players = clientData.players;
        for (var i = 0; i < players.length; i++) {
            var tail = players[i].tail;
            var color = players[i].color;
            var name = players[i].name;
            var w = textWidth(name);
            fill(color[0], color[1], color[2]);
            for (var j = 0; j < tail.length; j++) {
                rect(tail[j][0]*scl, tail[j][1]*scl, scl, scl);
            }
            fill(0);
            rect(tail[0][0]*scl, tail[0][1]*scl-nameSize, w, nameSize);
            fill(color[0], color[1], color[2]);
            text(name, tail[0][0]*scl, tail[0][1]*scl);
        }
        fill(255, 0, 0);
        var food = clientData.food;
        rect(food[0]*scl, food[1]*scl, scl, scl);
    }
}