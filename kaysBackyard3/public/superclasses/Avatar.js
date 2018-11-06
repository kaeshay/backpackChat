function Avatar(name) {	
	var upImg = loadImage("assets/spritesheets/" + name + "-up.png");
	var downImg = loadImage("assets/spritesheets/" + name + "-down.png");

	this.load = function() {
		this.sprite = createSprite(width / 2, height / 2);
		this.sprite.addImage("still up", upImg);
		this.sprite.addImage("still down", downImg);
	}

	this.avatar = function(x,y){
			this.sprite.position.x = x;
			this.sprite.position.y = y;
			drawSprite(this.sprite);
			this.sprite.setCollider("rectangle", 0, 0, this.sprite.width, this.sprite.height);
			this.sprite.onMouseOver = function() {
	      		this.changeImage("still down");
	    	}
	    	this.sprite.onMouseOut = function() {
	      		this.changeImage("still up");
	    	}
	    	// this.sprite.onMousePressed = function(){
	    		
	    	// }

	    	this.sprite.onMouseReleased = function(){
	    		avatarIsChosen = true;
	    		selectedAvatar = name;
	    	}
	}
}