function TrainStation(){
	//start a socket connection
	var socket = io.connect("http://localhost:3000/");
	var player;
	var players = [];
	var npc =[];
	var npcX = []
	var npcY = [];

	this.setup = function(){	
	  	player = new Player(this.sceneArgs, socket.id, random(width), random(height));
	  	bg = new Group();
	  	for(var i=0; i<70; i++){
	    var rock = createSprite(random(-width, width), random(-height, height));
	    var potato = createSprite(random(-width, width), random(-height, height));
	    rock.addAnimation('normal', 'assets/blob.png');
	    rock.rotation = random(100);
	    potato.addAnimation('what', 'assets/blob2.png');
	    bg.add(rock);
	    bg.add(potato)
	  }

	  for (var i=1; i<7; i++){
	  	npc[i] = loadImage("assets/npc" + i + ".png");
	  	npcX[i] = random(-width, width);
	  	npcY[i] = random(-width, width);
	  }

	  player.load();
	  sendPlayerStart();
	  receivePlayerUpdates();
	}

	function sendPlayerStart(){
		var data = {
			avatar: "sakiko",
			x: player.sprite.position.x,
			y: player.sprite.position.y
	 	}
		socket.emit('start', data);
	}

	function receivePlayerUpdates(){
		socket.on('heartbeat', function(data){
			players = data;
			console.log(socket.id);
		});
	}

	this.draw = function(){
		background(255);
		drawSprites(bg);

	  	for (var i=1; i<7; i++){
	  		image(npc[i], npcX[i], npcY[i]);
	  	}

	  	if (mallSound.isPlaying() == false){
	      mallSound.loop();
	      mallSound.play();
		}	

	  	player.update();
	  	sendPlayerUpdates();

	  	for (var i = players.length - 1; i >= 0; i--){
	  		if (players[i].id !== socket.id){
	  			ellipse(players[i].x, players[i].y, 20);
				textAlign(CENTER);
				textSize(7);
				text(players[i].id, players[i].x, players[i].y + 10);
	  		}
		}
	}

	function sendPlayerUpdates(){
		var data = {
			x: player.sprite.position.x,
			y: player.sprite.position.y
	 	}
		socket.emit('update', data);
	}
}