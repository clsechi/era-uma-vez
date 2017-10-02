
var btnNextChallenge = document.getElementById('proximo-desafio');

var btnRunBlocks = document.getElementById('executa-blocos');

var btnReset = document.getElementById('reset-game');

var playerInfo = {};

var playerTimer = new Timer();

//botoes
btnNextChallenge.addEventListener("click", function (event){
	//envia info para o server
	postPlayerInfo();
});

btnRunBlocks.addEventListener("click", function (event) {
	//chama funcao do blockly para executar os blocos
	runBlocks();
});

btnReset.addEventListener("click", function (event){
	//chama funcao do p5 que reseta o jogo
	resetGame();
});

//resposta correta
function correctAnswer() {

	//para o tempo
	playerTimer.pause();

	console.log();

	playerInfo.Progress += 1;
	playerInfo.Points += possiblePoints();
	//set o tempo total utilizado em segundos
	playerInfo.ElapsedTime = playerTimer.getTotalTimeValues().seconds;

	console.log(playerInfo);
}

//resposta errada
function wrongAnswer() {

	playerInfo.WrongAnswers += 1;
	console.log(playerInfo.WrongAnswers);
}

//define a pontuacao final conforme os erros
function possiblePoints() {
	var points = 0;
	switch(playerInfo.WrongAnswers){
		case 0:
			points = 100;
		break;
		case 1:
			points = 80;
		break;
		default:
			points = 60;
		break;
	}
	return points;
}

//envia as informações do usuário para o servidor
//e recebe a url do proximo desafio
function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	playerInfo.ElapsedTime = 0;

	var url = location.origin + "/nextChallenge";

	dados.open("POST" , url);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			//window.location.assign(dados.responseText);
			console.log(dados.responseText);
		}
	}

	dados.send(JSON.stringify(playerInfo));
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/* *******************************
   *                             *
   *       SOCKET FUNCTIONS      *
   *                             *
   ******************************* */

var IO = io.connect(); //criando conexao socket no jogador

function init(){

	IO.on('connected', function (data) {
		console.log(data);		
	});

	IO.on('updatedGameBoard', function(players){
		
		console.log(players);

		updateScoreBoard(players);

		updatePlayersPositon(players);
	});

	IO.on('joinDone', function(data){
		playerInfo = data[0];

		//adiciona respostas erradas ao JSON
		playerInfo.WrongAnswers = 0;

		console.log(playerInfo);
		
	});
}		

function joinRoom () {

	IO.emit('joinRoom', readCookie("PlayerID"));	
}

init();
joinRoom();

playerTimer.start();




