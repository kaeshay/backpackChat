var sakiko, ejler, gehrig, oriah;
var mallSound;
var avatarIsChosen = false;
var selectedAvatar = "sakiko";

function preload(){
  sakiko = new Avatar("sakiko", 3);
  ejler = new Avatar("ejler", 20);
  gehrig = new Avatar("gehrig", 5);
  oriah = new Avatar("oriah", 3);
  mallSound = loadSound("assets/mall.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gameState = new SceneManager();
  gameState.addScene(AvatarRoom);
  gameState.addScene(TrainStation);
  gameState.showNextScene();
}

function draw() {
  gameState.draw();
}
