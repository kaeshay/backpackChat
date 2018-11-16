// server setup
var express = require('express');
var app = express();
app.use(express.static('public'));
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3000);
console.log('listening on: 3000');

// player setup
var players = [];

function Player(avatar, id, x, y){
  this.avatar = avatar;
  this.id = id;
  this.x = x;
  this.y = y;
  this.key = 0;
}

var puddle = new Puddle(1000, 1000);

function Puddle(canvasW, canvasH){
  this.x = Math.random(-canvasW, canvasW);
  this.y = Math.random(-canvasH, canvasH);
  this.rotation = Math.random(-10, 10);
  this.scale = Math.random(.1,.3);
}

// broadcast
setInterval(heartbeat, 33);

function heartbeat(){
  io.sockets.emit('heartbeat', players);
}

// receive
io.on('connection', function(socket) {
    console.log("user:" + socket.id + " is connected");

    socket.emit('puddle', 2);

    socket.on('load', function(data) {
      var player = new Player(data.avatar, socket.id, data.x, data.y); // proxy player
      players.push(player);
    });

    socket.on('update', function(data){
      var player;

      for (var i = 0; i < players.length; i++){
        if (socket.id == players[i].id){
          player = players[i];
        }
      }
      player.x = data.x;
      player.y = data.y;
      player.key = data.key;

    });

    socket.on('disconnect', function() {
      console.log("user:" + socket.id + " disconnected");
    });
});