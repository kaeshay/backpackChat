function Player(selectedAvatar, id, x, y){
	this.id = id;
	this.speed = 5;
	
	var directions = ["down", "up", "right", "left"];
	var rightImg, leftImg, upImg, downImg;

	var img = {
		"down": downImg,
		"up": upImg,
		"right": rightImg,
		"left": leftImg,
	}

	for (var i = 0; i < directions.length; i++) {
		img[directions[i]] = loadImage("assets/spritesheets/" + selectedAvatar + "-" + directions[i] + ".png");
	}

	this.load = function() {
		this.sprite = createSprite(x, y);
		for (var i = 0; i < directions.length; i++) {
			this.sprite.addImage("still " + directions[i], img[directions[i]]);
		}
	}

	this.update = function() {
		drawSprite(this.sprite);
		camera.position.x = this.sprite.position.x;
  		camera.position.y = this.sprite.position.y;
		// w - up
		if (keyIsDown(87)) {
			this.sprite.position.y -= this.speed;
			this.sprite.changeImage("still up");
		}
		// a - left
		if (keyIsDown(65)) {
			this.sprite.position.x -= this.speed;
			this.sprite.changeImage("still left");
		}
		// s - down
		if (keyIsDown(83)) {
			this.sprite.position.y += this.speed;
			this.sprite.changeImage("still down");
		}
		// d - right
		if (keyIsDown(68)) {
			this.sprite.position.x += this.speed;
			this.sprite.changeImage("still right");
		}
	}
}