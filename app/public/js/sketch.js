//Carlos Sechi

//p5.play

var wallTop, wallBottom, wallLeft, wallRight, player;
var WALL_THICKNESS = 30;
//var playerImg, backgroundImg;
var playerX = 200;
var playerY = 300;

function preload(){
	playerImg = loadAnimation("assets/ball_001.png", "assets/ball_002.png", "assets/ball_003.png", "assets/ball_004.png");
	//playerImg.frameDelay = 100;

	backgroundImg = loadImage('assets/background.png'); //carrega imagem de fundo
}

function setup() {
	createCanvas(400, 400);

	//deixa o jogo mais devagar
	frameRate(10);

  	//paredes  	
  	wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  	wallTop.immovable = true;

  	wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  	wallBottom.immovable = true;

  	wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  	wallLeft.immovable = true;

  	wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  	wallRight.immovable = true;
  	
	//Criando player
	player = createSprite(playerX, playerY, 100 ,100);
	player.addAnimation("test", playerImg);	
}

function draw() {
	background(backgroundImg);

	//player.position.x = mouseX;
  	//player.position.y = mouseY;

  	player.changeAnimation("test");

  	if(mouseIsPressed){  		
  		movePlayer();  		
  	}

	// immovable não esta funcionando
	player.collide(wallTop);
	player.collide(wallBottom);
	player.collide(wallRight);
	player.collide(wallLeft);

	drawSprites(); 
}

function movePlayer(movimento) {

	player.remove();

	playerX = player.position.x + 20;
	playerY = player.position.y + 10;

	player = createSprite(playerX, playerY, 100 ,100);
	player.addAnimation("test", playerImg);

}






/*

function player(){
	pl= createSprite(200, 200, 100 ,100);
  	pl.addImage(linuxImg);

  	this.move = function(direction) {
  		pl.position.x = mouseX;
  		pl.position.y = mouseY;

  	}
  
}


canvas 400X400

noStroke



  	box = createSprite (270, 200);
	box.addImage(iron);
	//box.setCollider("rectangle", 0, 26, 75,75);


adicionando grupos de sprites

 for(var i=0; i<4; i++)
    {
    var box = createSprite(random(0, width), random(0,height));
    box.addAnimation("normal", "assets/box0001.png", "assets/box0003.png");
    obstacles.add(box);
    }


    */
