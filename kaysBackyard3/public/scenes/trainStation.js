function TrainStation(){
	//start a socket connection
	var socket = io.connect("https://kaysbackyard.herokuapp.com/");
	var player;
	var players = [];
	var otherPlayers = [];
	var npc =[];
	var npcX = []
	var npcY = [];
	var avatars = ["sakiko", "oriah", "ejler", "gehrig"];
	var sakikoImg, oriahImg, ejlerImg, gehrigImg, onningImg, chairImg;
	var img = {"sakiko": sakikoImg, "oriah": oriahImg, "ejler": ejlerImg, "gehrig": gehrigImg}

	this.setup = function(){	
	  	player = new Player(this.sceneArgs, socket.id, random(width), random(height));
	  	onningImg = loadImage("assets/trainStation/onning.png");
	  	chairImg = loadImage("assets/trainStation/chair.png");
	  	for (var i = 0; i < avatars.length; i++) {
			img[avatars[i]] = loadImage("assets/spritesheets/" + avatars[i] + "-S.png");
		}

	  	// background
  		bg = new Group();
  		for(var i=0; i<20; i++){
		    var puddle = createSprite(random(-width, width), random(-height, height));
		    puddle.addAnimation('normal', 'assets/trainStation/puddle.png');
		    puddle.rotation = random(-10, 10);
		    puddle.scale = random(.1,.3);
		    bg.add(puddle);
 		}	

		for (var i=1; i<7; i++){
			npc[i] = loadImage("assets/npc" + i + ".png");
		  	npcX[i] = random(-width, width);
		  	npcY[i] = random(-width, width);
		}

	  	player.load();
	  	sendPlayerStart(this.sceneArgs);
	  	loadOtherPlayer();
	  	receivePlayerUpdates();
	}
		function sendPlayerStart(avatar){
			var data = {
				avatar: avatar,
				id: socket.id,
				x: player.sprite.position.x,
				y: player.sprite.position.y,
				canvasW: width,
				canvasH: height
		 	}
			socket.emit('load', data);
		}

		function loadOtherPlayer(){
			for (var i = players.length - 1; i >= 0; i--){
		  		if (players[i].id !== socket.id){
		  			var otherPlayer = new OtherPlayer(players[i].avatar, players[i].id, players[i].x, players[i].y);
		  			// otherPlayers.push(new OtherPlayer(players[i].avatar, players[i].id, players[i].x, players[i].y));	
		  		}
		  	}
		}

		function receivePuddles(){
			socket.on('puddle', function(data){
		  		console.log(data);
		  	// 	for(var i=0; i<20; i++){
				 //    var puddle = createSprite(data.x, data.y);
				 //    puddle.addAnimation('normal', 'assets/trainStation/puddle.png');
				 //    puddle.rotation = data.rotation;
				 //    puddle.scale = data.scale;
				 //    bg.add(puddle);
		 		// }	
	  		});
		}

		function receivePlayerUpdates(){
			socket.on('heartbeat', function(data){
				players = data;
			});
		}

	this.draw = function(){
		background(255);
		drawSprites(bg);
		image(onningImg, width/2, height/2);
		for (var i=1; i<8; i++){
		 	image(chairImg, [i*200], height/2 + 350);
  		}

	  	for (var i=1; i<7; i++){
	  		image(npc[i], npcX[i], npcY[i]);
	  	}

	  	if (trainStationMP3.isPlaying() == false){
	     trainStationMP3.loop();
	      trainStationMP3.play();
		}	

	  	player.update(keyCode);
	  	sendPlayerUpdates();
	  	updateOtherPlayer();
	  	// console.log(otherPlayers);
	}
		function updateOtherPlayer(){
			for (var i = players.length - 1; i >= 0; i--){
		  		if (players[i].id !== socket.id){
		  			// otherPlayers.push(new OtherPlayer(players[i].avatar, players[i].id, players[i].x, players[i].y));
		  			// otherPlayers[i].load();
		  			// otherPlayers[i].update(players[i].x, players[i].y, players[i].key);
		  			image(img[players[i].avatar], players[i].x, players[i].y);
		  		}
			}
		}

		function sendPlayerUpdates(){
			var data = {
				x: player.sprite.position.x,
				y: player.sprite.position.y,
				key: keyCode,
		 	}
			socket.emit('update', data);
		}
}