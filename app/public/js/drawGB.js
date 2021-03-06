//importa as imagens usadas como avatar	
//batman
var batmanIcon = new Image();
batmanIcon.src = '/assets/batmanIcon32.png';

//cat
var catIcon = new Image();
catIcon.src = '/assets/catIcon32.png';

//hulk
var hulkIcon = new Image();
hulkIcon.src = '/assets/hulkIcon32.png';

//joker
var jokerIcon = new Image();
jokerIcon.src = '/assets/jokerIcon32.png';

//lion
var lionIcon = new Image();
lionIcon.src = '/assets/lionIcon32.png';

//logan
var loganIcon = new Image();
loganIcon.src = '/assets/loganIcon32.png';

//spider
var spiderIcon = new Image();
spiderIcon.src = '/assets/spiderIcon32.png';

//superman
var supermanIcon = new Image();
supermanIcon.src = '/assets/supermanIcon32.png';


/* *******************************
   *                             *
   *       CANVAS FUNCTIONS      *
   *                             *
   ******************************* */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();

var canvasX = 0;

var firstChallenge = true;

function drawLines() {

	for (var i = 1; i <= 10; i++) {	

		ctx.rect(canvasX, 0, 60, 50);
		ctx.fillStyle = '#9598db'; // define o preenchimento do retângulo
		ctx.fill(); // Preenche o retângulo
		ctx.lineWidth = 2; // define a largura da linha do contorno
		ctx.strokeStyle = 'black'; // define a cor do contorno
		ctx.stroke(); // desenha o contorno

		canvasX = canvasX + 60;
	}
}

//insere a numeracao no tabuleiro
function drawText() {
	ctx.font = '15px Arial'; //fonte numeros
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black'; //cor numeros

	textX = 30;

	for (var i = 1; i <= 10; i++) {
		ctx.fillText(i, textX,30);
		textX += 60;
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawLines();
	drawText();	
}

function initDraw(){
	drawLines();
	drawText();	
}

function updatePlayersPositon(players) {
	
	//recebe JSON Players

	var finalPosition = {0:{avatar: null},1:{avatar: null},2:{avatar: null},3:{avatar: null}};

	for (var i = 0; i < players.length; i++) {
		if(players[i].Progress > 10){
			finalPosition[i] = setPositionAvatar(players[i].Avatar, 10, i);
		} else {
			finalPosition[i] = setPositionAvatar(players[i].Avatar, players[i].Progress, i);
		}
	}	

	drawAvatar(finalPosition);
}

function setPositionAvatar(avatar, progress, position) {

	var avatarX = 0;
	var avatarY = 0;
	
	switch(position){
		case 0:
			avatarX = 0;
			avatarY = -3;
		break;
		case 1:
			avatarX = 30;
			avatarY = -3;
		break;
		case 2:
			avatarX = 0;
			avatarY = 22;
		break;
		case 3:
			avatarX = 30;
			avatarY = 22;
		break;
	}	

	if (progress != 1){
		avatarX += (60 * (progress-1)); //menos 1 pq x = 0
	}

	return {avatarX: avatarX, avatarY: avatarY, avatar: avatar};
}

function drawAvatar(finalPosition) {

	if(firstChallenge){

	//batmanIcon.onload = function () {		

		if(finalPosition[0].avatar != null){
			ctx.drawImage(eval(finalPosition[0].avatar), finalPosition[0].avatarX, finalPosition[0].avatarY);
		}
		if(finalPosition[1].avatar != null){
			ctx.drawImage(eval(finalPosition[1].avatar), finalPosition[1].avatarX, finalPosition[1].avatarY);
		}
		if(finalPosition[2].avatar != null){
			ctx.drawImage(eval(finalPosition[2].avatar), finalPosition[2].avatarX, finalPosition[2].avatarY);
		}
		if(finalPosition[3].avatar != null){
			ctx.drawImage(eval(finalPosition[3].avatar), finalPosition[3].avatarX, finalPosition[3].avatarY);
		}
	//}

	firstChallenge = false;

	} else {
		clearCanvas();

		if(finalPosition[0].avatar != null){
			ctx.drawImage(eval(finalPosition[0].avatar), finalPosition[0].avatarX, finalPosition[0].avatarY);
		}
		if(finalPosition[1].avatar != null){
			ctx.drawImage(eval(finalPosition[1].avatar), finalPosition[1].avatarX, finalPosition[1].avatarY);
		}
		if(finalPosition[2].avatar != null){
			ctx.drawImage(eval(finalPosition[2].avatar), finalPosition[2].avatarX, finalPosition[2].avatarY);
		}
		if(finalPosition[3].avatar != null){
			ctx.drawImage(eval(finalPosition[3].avatar), finalPosition[3].avatarX, finalPosition[3].avatarY);
		}
	}

}

initDraw();//call initial draw funcions