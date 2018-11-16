function AvatarRoom(){
	this.setup = function(){	
		imageMode(CENTER);
		sakiko.load();
		ejler.load();
		gehrig.load();
		oriah.load();
	}

	this.draw = function(){
		background(255);
		avatarPanel();
		if (avatarIsChosen){
			gameState.showScene(TrainStation, selectedAvatar);
	    } 
	}

	function avatarPanel(){
		var x = width/3;
		var y = height/2;
		var offset = 130;
		sakiko.avatar(x, y);
		oriah.avatar(x+offset, y);
		ejler.avatar(x+2*offset, y-20);
		gehrig.avatar(x+3*offset, y-20);
	}
}