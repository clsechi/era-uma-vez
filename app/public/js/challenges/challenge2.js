
var button = document.querySelector("#atualiza-tabuleiro");

button.addEventListener("click", function (event){

postPlayerInfo();	

});

console.log(playerInfo)

function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = "http://192.168.0.50:3000/nextChallenge";

	dados.open("POST" , url);

	dados.setRequestHeader("Content-Type", "application/json");

	/*ados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			window.location.replace("http://192.168.0.50:3000/challenge/1")
		}
	}*/

	dados.send(JSON.stringify(playerInfo));
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
		console.log(data);
	});
}		

function joinRoom () {

	IO.emit('joinRoom', playerInfo);	
}

init();
joinRoom();




