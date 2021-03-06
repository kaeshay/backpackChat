function OtherPlayer(avatar, id, x, y){
	this.id = id;
	
	var directions = ["S", "N", "E", "W", "NE","NW","SE", "SW"];
	var sImg, nImg, eImg, wImg, neImg, nwImg, seImg, swImg;

	var img = { "S": sImg, "N": nImg, "E": eImg, "W": wImg, 
				"NE": neImg, "NW": nwImg, "SE": seImg, "SW": swImg }

	for (var i = 0; i < directions.length; i++) {
		img[directions[i]] = loadImage("assets/spritesheets/" + avatar + "-" + directions[i] + ".png");
	}

	this.load = function() {
		this.sprite = createSprite(x, y);
		for (var i = 0; i < directions.length; i++) {
			this.sprite.addImage(directions[i], img[directions[i]]);
		}
	}

	this.update = function(x, y, keyNum) {
		this.sprite.position.x = x;
		this.sprite.position.y = y;

		if (keyIsPressed){
  			switch (keyNum) {
  				case 119:
					this.sprite.changeImage("N");
  					break;
  				case 97:
					this.sprite.changeImage("W");
  					break;
  				case 115:
					this.sprite.changeImage("S");
  					break;
  				case 100:
					this.sprite.changeImage("E");
  					break;
  				default:
  			}
  		}
	}
}