const express = require('express');
const app = express();
var Player = require('./game/player.js');
var Food = require('./game/food.js');
app.use(express.static(`${__dirname}/client`));

const serv = require('http').Server(app);

serv.on('error', (err) => {
    console.error('Server error: ', err);
});

serv.listen(process.env.PORT || 2000, () => {
    console.log('Server Started');
});

var SOCKET_LIST = {};
var PLAYER_LIST = {};
var food = new Food();
const io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    socket.on('signIn', function(username) {
        var player = new Player(socket.id, username);
        PLAYER_LIST[socket.id] = player;    
    });
    socket.on('updateDir', function(data){
        PLAYER_LIST[socket.id].changeDir(data[0], data[1]);
    })
    socket.on('sendMessage', function(msg) {
        var str = `<span class='player_name'>${PLAYER_LIST[socket.id].name}<span> : ${msg}`;
        io.emit('newMessage', str);
    });
    socket.on('disconnect', function() {
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
});

setInterval(function() {
    var playerData = [];
    for (var i in PLAYER_LIST) {
        PLAYER_LIST[i].update();
        var player = PLAYER_LIST[i];
        if (player.x == food.x && player.y == food.y) {
            PLAYER_LIST[i].eat();
            food.pickLocation();
        }
        playerData.push({
            name : player.name, 
            color : player.color,
            tail : player.tail
        });
    }
    var pack = {"food" : [food.x, food.y],"players" : playerData}
    // for (var i in SOCKET_LIST) {
    //     var socket = SOCKET_LIST[i];
    //     socket.emit('newFrame', pack);
    // }
    io.emit('newFrame', pack);
},80);