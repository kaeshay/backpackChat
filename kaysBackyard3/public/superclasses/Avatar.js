function Avatar(name) {	
	var nImg = loadImage("assets/spritesheets/" + name + "-N.png");
	var sImg = loadImage("assets/spritesheets/" + name + "-S.png");

	this.load = function() {
		this.sprite = createSprite(width / 2, height / 2);
		this.sprite.addImage("N", nImg);
		this.sprite.addImage("S", sImg);
	}

	this.avatar = function(x,y){
			this.sprite.position.x = x;
			this.sprite.position.y = y;
			drawSprite(this.sprite);
			this.sprite.setCollider("rectangle", 0, 0, this.sprite.width, this.sprite.height);
			this.sprite.onMouseOver = function() {
	      		this.changeImage("S");
	    	}
	    	this.sprite.onMouseOut = function() {
	      		this.changeImage("N");
	    	}
	    	// this.sprite.onMousePressed = function(){
	    		
	    	// }

	    	this.sprite.onMouseReleased = function(){
	    		avatarIsChosen = true;
	    		selectedAvatar = name;
	    	}
	}
}