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
}

// broadcast
setInterval(heartbeat, 33);

function heartbeat(){
  io.sockets.emit('heartbeat', players);
}

// receive
io.sockets.on('connection',
  function(socket) {
    console.log("user:" + socket.id + " is connected");

    socket.on('start', function(data) {
      console.log(data.avatar + " " + socket.id + " " + data.x + " " + data.y);
      var player = new Player(data.avatar, socket.id, data.x, data.y);
      players.push(player);
    });

    socket.on('update', function(data){
      console.log(socket.id + " " + data.x + " " + data.y);
      var player;

      for (var i = 0; i < players.length; i++){
        if (socket.id == players[i].id){
          player = players[i];
        }
      }
      player.x = data.x;
      player.y = data.y;
    });
    
    socket.on('disconnect', function() {
      console.log("user:" + socket.id + " disconnected");
    });
  });