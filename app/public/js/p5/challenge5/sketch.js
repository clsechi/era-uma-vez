//p5.play

var wallTop, wallBottom, wallLeft, wallRight, player;
var WALL_THICKNESS = 30;
//var playerImg, backgroundImg;

// player variables
var playerInitialX = 220;
var playerInitialY = 60;
var playerInitialDirection = 0;

var playerX = playerInitialX;
var playerY = playerInitialY;
var playerDirection = playerInitialDirection;

// target variables
var targetX = 140;
var targetY = 380;

function preload(){

	playerLeft = loadImage("/assets/pokeballs/pokeball-left.png");

	playerRight = loadImage("/assets/pokeballs/pokeball-right.png");

	playerTop = loadImage("/assets/pokeballs/pokeball-top.png");

	playerBottom = loadImage("/assets/pokeballs/pokeball-bottom.png");

	treeImg = loadImage("/assets/objects/tree.png");

	targetImg = loadImage("/assets/pokemons/snorlax.png");

	backgroundImg = loadImage('/assets/background/bg5.png'); //carrega imagem de fundo
}

function setup() {
	var canvasp5 = createCanvas(400, 400);

	canvasp5.parent('sketch-holder');

	//deixa o jogo mais devagar
	frameRate(1);

	//paredes  	
	wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
	wallTop.immovable = true;

	wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
	wallBottom.immovable = true;

	wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
	wallLeft.immovable = true;

	wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
	wallRight.immovable = true;

	//criando objetos na tela
	//primeiro objeto
	object1 = createSprite(210, 140, 75, 85);
	object1.addImage("tree", treeImg);
	object1.immovable = true;
	
	//Criando player
	player = createSprite(playerX, playerY, 40 ,40);
	player.addAnimation("left", playerLeft);	
	/*player.addAnimation("top", playerTop);
	player.addAnimation("bottom", playerBottom);*/

	//Criando alvo
	target = createSprite(targetX, targetY, 40, 40);
	target.addImage("pokemon", targetImg);
}

function draw() {

	background(backgroundImg);
	
	player.addAnimation("right", playerRight);

	target.changeAnimation("pokemon");

	player.collide(object1);

	// immovable não esta funcionando
	player.collide(wallTop);
	player.collide(wallBottom);
	player.collide(wallRight);
	player.collide(wallLeft);

	drawSprites(); 
}

//avanca uma casa no jogo
function setNewPosition() {	
	
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

	setAnimation();

	checkChallenge();
}

//verifica se o player esta na mesma posicao do target
function checkChallenge() {

	if(playerX == targetX && playerY == targetY){
		target.remove();
	}
}

//implementado dentro do bloco WHILE
function checkChallengeBlock() {
	var result = false;
	if(playerX == targetX && playerY == targetY){
		result = false;
	}else{
		result = true;
	}
	return result;
}

//verifica se o player esta na mesma posicao do target
function checkAnswer() {
	
	if(playerX == targetX && playerY == targetY){
		correctAnswer();
	} else {
		wrongAnswer();
	}
}

//gira o player para a direita
function setDirectionRIGHT() {

	if(playerDirection + 90 <= 270){
		playerDirection += 90;
	} else{
		playerDirection = 0;
	}
	setAnimation();
}

//gira o player para a esquerda
function setDirectionLEFT() {

	if(playerDirection - 90 >= 0){
		playerDirection -= 90;
	} else {
		playerDirection = 270;
	}
	setAnimation();
}

//altera animacao conforme a rotação do player
function setAnimation(){

	player.remove();
	
	switch (playerDirection){
		case 0:
			player = createSprite(playerX, playerY, 100 ,100);		
			player.addAnimation("left", playerLeft);
		break;
		case 90:
			player = createSprite(playerX, playerY, 100 ,100);			
			player.addAnimation("top", playerTop);
		break;
		case 180:
			player = createSprite(playerX, playerY, 100 ,100);			
			player.addAnimation("right", playerRight);
		break;
		case 270:
			player = createSprite(playerX, playerY, 100 ,100);
			player.addAnimation("bottom", playerBottom);
		break;
	}
}

//reinica o jogo colocando o player na posição inicial
function resetGame() {
	player.remove();

	playerX = playerInitialX;
	playerY = playerInitialY;

	playerDirection = playerInitialDirection;

	//desenha o player novamente
	player = createSprite(playerX, playerY, 100 ,100);
	player.addAnimation("left", playerLeft);		

	target.remove();

	//desenha o alvo
	target = createSprite(targetX, targetY, 100, 100);
	target.addImage("pokemon",targetImg);
}
