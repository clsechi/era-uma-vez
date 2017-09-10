
var button = document.querySelector("#atualiza-tabuleiro");

var playerInfo = {};

var mainURL = readCookie("url");


button.addEventListener("click", function (event){

postPlayerInfo();	

});

function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = mainURL + "nextChallenge";

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
		playerInfo = data;
	});
}		

function joinRoom () {

	IO.emit('joinRoom', readCookie("PlayerID"));	
}

init();
joinRoom();




