//p5.play

var wallTop, wallBottom, wallLeft, wallRight, player;
var WALL_THICKNESS = 30;
//var playerImg, backgroundImg;

// player variables
var playerX = 100;
var playerY = 180;
var playerDirection = 180;

// target variables
var targetX = 300;
var targetY = 180;

function preload(){
	//captureImg = loadAnimation("/assets/ball_001.png", "/assets/ball_002.png", "/assets/ball_003.png", "/assets/ball_004.png");
	//playerImg.frameDelay = 100;

	playerImg = loadImage("/assets/mainPokeball.png")

	targetImg = loadImage("/assets/charizard.png");

	backgroundImg = loadImage('/assets/background.png'); //carrega imagem de fundo
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
	player.addImage("animation", playerImg);

	//Criando alvo
	target = createSprite(targetX, targetY, 100, 100);
	target.addImage("pokemon",targetImg);
}

function draw() {
	background(backgroundImg);

	player.changeAnimation("animation");

	target.changeAnimation("pokemon");

	// immovable não esta funcionando
	player.collide(wallTop);
	player.collide(wallBottom);
	player.collide(wallRight);
	player.collide(wallLeft);

	drawSprites(); 
}

//avanca uma casa no jogo
function setNewPosition() {

	player.remove();
	
	//soma ou subtrai 40px da posicao atual do jogador
	//somente altera se a nova posicao estiver dentro dos limites do jogo
	switch (playerDirection){
		case 0:
			if(player.position.x - 40 >= 0){
				playerX = player.position.x - 40;
			}
		break;
		case 90:
			if(player.position.y - 40 >= 0) {
				playerY = player.position.y - 40;
			}
		break;
		case 180:
			if(player.position.x + 40 <= 400){
				playerX = player.position.x + 40;
			}
		break;
		case 270:
			if(player.position.y + 40 <= 400){
				playerY = player.position.y + 40;
			}
		break;
	}	

	player = createSprite(playerX, playerY, 100 ,100);
	player.addAnimation("animation", playerImg);

	checkChallenge();
}

//verifica se o player esta na mesma posicao do target
function checkChallenge() {

	if(playerX == targetX && playerY == targetY){
		target.remove();
	}
}

//verifica se o player esta na mesma posicao do target
function checkAnswer() {
	
	if(playerX == targetX && playerY == targetY){
		console.log("RESPOSTA CORRETA");
		correctAnswer();
	} else {
		wrongAnswer();
	}
}

// define a direcao que o player ira se mover
function setDirectionRIGHT() {

	if(playerDirection + 90 <= 270){
		playerDirection += 90;
	} else{
		playerDirection = 0;
	}	
}

function setDirectionLEFT() {

	if(playerDirection - 90 >= 0){
		playerDirection -= 90;
	} else {
		playerDirection = 270;
	}
}

//reinica o jogo colocando o player na posição inicial
function resetGame() {
	player.remove();

	playerX = 100;
	playerY = 180;

	playerDirection = 180;

	//desenha o player novamente
	player = createSprite(playerX, playerY, 100 ,100);
	player.addAnimation("animation", playerImg);

	target.remove();

	//desenha o alvo
	target = createSprite(targetX, targetY, 100, 100);
	target.addImage("pokemon",targetImg);
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
