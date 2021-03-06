var btnRunBlocks = document.getElementById('executa-blocos');
var btnReset = document.getElementById('reset-game');
var modal = document.getElementById('myModal');
var pointsFinal = document.getElementById('pontos-final');
var help1 = document.getElementById('help1');
var help2 = document.getElementById('help2');
var loading = document.querySelector('.loading');
var playerNameDOM = document.getElementById('player-name');
var blocksDOM = document.querySelector('.blockly');

//variables
var playerInfo = {};
var playerTimer = new Timer();

//remove imagem de loading
window.onload = function() {	
	setTimeout(function () {
		loading.classList.add('invisible');
	},1500);//tempo até o p5 carregar o canvas	
}

//botoes
btnRunBlocks.addEventListener("click", function (event) {
	//chama funcao do blockly para executar os blocos
	btnRunBlocks.disabled = true;
	runBlocks();
	window.setTimeout(function(){
		btnRunBlocks.disabled = false;
	},2500);	
});

btnReset.addEventListener("click", function (event){
	//desebalita a execucao de todos os blocos que restam
	disableBlocks();
	//chama funcao do p5 que reseta o jogo
	resetGame();
});

//resposta correta
function correctAnswer() {
	//pausa o tempo
	playerTimer.pause();

	//set o tempo total utilizado em segundos
	playerInfo.ElapsedTime = playerTimer.getTotalTimeValues().seconds;

	playerInfo.TotalElapsedTime += playerInfo.ElapsedTime;

	//atualiza o json
	playerInfo.Progress += 1;	
	playerInfo.EarnedPoints = possiblePoints();
	playerInfo.Points += playerInfo.EarnedPoints;	

	//mensagem de parabens jogador
	showMessage();

	console.log(playerInfo);
}

//resposta errada
function wrongAnswer() {

	playerInfo.WrongAnswers += 1;
	console.log(playerInfo.WrongAnswers);

	var helpID = playerInfo.WrongAnswers;

	//definir conforme numero de ajudas no desafio
	if(helpID <= 2){
		//mostra ajuda na tela
		eval("help" + helpID + ".classList.remove('invisible')");
	}
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

function showMessage(event){
	//exibe o pokemon e a pontuacao ganha
	//mudar conforme o pokemon
	pointsFinal.textContent = "Você capturou um " + pokemonName + " e ganhou " + possiblePoints() + " pontos";
	blocksDOM.classList.add('invisible');
	modal.style.display = "block";

	//agurda o tempo antes de redirecionar
	window.setTimeout(function(){
		postPlayerInfo();
	},4000);
}

//envia as informações do usuário para o servidor
//e recebe a url do proximo desafio
function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = location.origin + "/nextChallenge";

	dados.open("POST" , url);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			window.location.assign(dados.responseText);
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

		playerNameDOM.textContent = "Olá " + playerInfo.Name + " - " + playerInfo.RoomID;

		console.log(playerInfo);		
	});
}		

function joinRoom () {

	var cookieInfo = readCookie("PlayerID");
	//verifica se a configuraçaõ do player esta correta
	if (cookieInfo != null){
		IO.emit('joinRoom', cookieInfo);
	} else {
		if(confirm("PlayerID não encontrando!\nRedirecionando para Configuração de Player...")){
			window.location.assign(location.origin + "/playerCreation");
		} else{
			alert("Recarregando a página");
			setTimeout(function(){
				location.reload(true);
			},3000);
		}
	}			
}

init();
joinRoom();

playerTimer.start();