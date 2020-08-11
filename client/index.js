var socket = io();
var inGame = false;
function onJoin() {
    var username = document.getElementById('username_input').value;
    socket.emit('signIn', username);
    document.getElementById('login_wrapper').style.display = "none";
    document.getElementById('game').style.display = "block";
    inGame = true;
}
socket.on('newFrame', function(data) {
    clientData = data;
});
socket.on('newMessage', function(msg) {
    const messages = document.getElementById('messages');
    messages.insertAdjacentHTML('beforeend',`<p>${msg}</p>`);
});
function updateDir (x, y) {
    if (inGame) {
        socket.emit('updateDir', [x, y]);
    }
}
function sendMsg() {
    var message = document.getElementById('msgString').value;
    socket.emit('sendMessage', message);
    document.getElementById('msgString').value = '';
}
function keyPressed() {
    if (keyCode == 87) {
        updateDir(0, -1);
    } else if (keyCode == 83) {
        updateDir(0, 1);
    } else if (keyCode == 65) {
        updateDir(-1, 0);
    } else if (keyCode == 68) {
        updateDir(1, 0);
    } else if (keyCode == 32) {
        updateDir(0,0);
    }
}