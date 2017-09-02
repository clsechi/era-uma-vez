


var playerInfo = {	PlayerID: null,
					Name: null,
					RA: null,
					Avatar: null,
					School: null,
					Progress: 0,
					Points: 0,
					RoomID: 1,
					TotalElapsedTime: 0};


var button = document.querySelector("#atualiza-tabuleiro");

button.addEventListener("click", function (event){

postPlayerInfo();	

});

function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = "http://192.168.0.50:3000/nextChallenge";

	dados.open("POST" , url);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			console.log("POST OK!");
		}
	}

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
		postPlayerInfo();
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

	IO.emit('joinRoom', playerInfo.RoomID);	
}

init();
joinRoom();




