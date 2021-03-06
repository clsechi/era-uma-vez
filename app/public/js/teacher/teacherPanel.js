//selecionando as tabelas do DOM
var playersSala1 = document.querySelectorAll('.sala1');
var playersSala2 = document.querySelectorAll('.sala2');
var playersSala3 = document.querySelectorAll('.sala3');
var playersSala4 = document.querySelectorAll('.sala4');
var playersSala5 = document.querySelectorAll('.sala5');

//array com 4 timers, um para cada jogador
var timerSala1 = [];
var timerSala2 = [];
var timerSala3 = [];
var timerSala4 = [];
var timerSala5 = [];

//cria os timers e os eventos para todas as salas
function createTimers() {					

	for (var i = 0; i < 4; i++) {
		timerSala1[i] = new Timer();
		timerSala2[i] = new Timer();
		timerSala3[i] = new Timer();
		timerSala4[i] = new Timer();
		timerSala5[i] = new Timer();
	}
	
	//sala 1
	timerSala1[0].addEventListener('secondsUpdated', function (e) {
    	playersSala1[0].querySelector('.info-tempo').textContent = (timerSala1[0].getTimeValues().toString());
	});
	timerSala1[1].addEventListener('secondsUpdated', function (e) {
    	playersSala1[1].querySelector('.info-tempo').textContent = (timerSala1[1].getTimeValues().toString());
	});
	timerSala1[2].addEventListener('secondsUpdated', function (e) {
    	playersSala1[2].querySelector('.info-tempo').textContent = (timerSala1[2].getTimeValues().toString());
	});
	timerSala1[3].addEventListener('secondsUpdated', function (e) {
    	playersSala1[3].querySelector('.info-tempo').textContent = (timerSala1[3].getTimeValues().toString());
	});

	//sala 2
	timerSala2[0].addEventListener('secondsUpdated', function (e) {
    	playersSala2[0].querySelector('.info-tempo').textContent = (timerSala2[0].getTimeValues().toString());
	});
	timerSala2[1].addEventListener('secondsUpdated', function (e) {
    	playersSala2[1].querySelector('.info-tempo').textContent = (timerSala2[1].getTimeValues().toString());
	});
	timerSala2[2].addEventListener('secondsUpdated', function (e) {
    	playersSala2[2].querySelector('.info-tempo').textContent = (timerSala2[2].getTimeValues().toString());
	});
	timerSala2[3].addEventListener('secondsUpdated', function (e) {
    	playersSala2[3].querySelector('.info-tempo').textContent = (timerSala2[3].getTimeValues().toString());
	});
	
	//sala 3
	timerSala3[0].addEventListener('secondsUpdated', function (e) {
    	playersSala3[0].querySelector('.info-tempo').textContent = (timerSala3[0].getTimeValues().toString());
	});
	timerSala3[1].addEventListener('secondsUpdated', function (e) {
    	playersSala3[1].querySelector('.info-tempo').textContent = (timerSala3[1].getTimeValues().toString());
	});
	timerSala3[2].addEventListener('secondsUpdated', function (e) {
    	playersSala3[2].querySelector('.info-tempo').textContent = (timerSala3[2].getTimeValues().toString());
	});
	timerSala3[3].addEventListener('secondsUpdated', function (e) {
    	playersSala3[3].querySelector('.info-tempo').textContent = (timerSala3[3].getTimeValues().toString());
	});

	//Sala 4
	timerSala4[0].addEventListener('secondsUpdated', function (e) {
    	playersSala4[0].querySelector('.info-tempo').textContent = (timerSala4[0].getTimeValues().toString());
	});
	timerSala4[1].addEventListener('secondsUpdated', function (e) {
    	playersSala4[1].querySelector('.info-tempo').textContent = (timerSala4[1].getTimeValues().toString());
	});
	timerSala4[2].addEventListener('secondsUpdated', function (e) {
    	playersSala4[2].querySelector('.info-tempo').textContent = (timerSala4[2].getTimeValues().toString());
	});
	timerSala4[3].addEventListener('secondsUpdated', function (e) {
    	playersSala4[3].querySelector('.info-tempo').textContent = (timerSala4[3].getTimeValues().toString());
	});

	//Sala 5
	timerSala5[0].addEventListener('secondsUpdated', function (e) {
    	playersSala5[0].querySelector('.info-tempo').textContent = (timerSala5[0].getTimeValues().toString());
	});
	timerSala5[1].addEventListener('secondsUpdated', function (e) {
    	playersSala5[1].querySelector('.info-tempo').textContent = (timerSala5[1].getTimeValues().toString());
	});
	timerSala5[2].addEventListener('secondsUpdated', function (e) {
    	playersSala5[2].querySelector('.info-tempo').textContent = (timerSala5[2].getTimeValues().toString());
	});
	timerSala5[3].addEventListener('secondsUpdated', function (e) {
    	playersSala5[3].querySelector('.info-tempo').textContent = (timerSala5[3].getTimeValues().toString());
	});
}

createTimers();

// atualiza as informações dos jogadores da sala 1
function updateSala1(players) {
	for (var i = 0; i < players.length; i++) {
		//somente executa se o progresso atual for diferente do json
		if(!(playersSala1[i].querySelector('.info-posicao').textContent == players[i].Progress)){
			//adiciona as informaçoes do json na tabela 
			playersSala1[i].querySelector('.info-nome').textContent = players[i].Name;
			playersSala1[i].querySelector('.info-posicao').textContent = players[i].Progress;
			playersSala1[i].querySelector('.info-pontos').textContent = players[i].Points;
			if(players[i].Progress > 10){
				timerSala1[i].stop();
				playersSala1[i].querySelector('.info-tempo').textContent = "CONCLUÍDO"
			} else {
				timerSala1[i].reset();
			}
		}	
	}
}

// atualiza as informações dos jogadores da sala 2
function updateSala2(players) {
	for (var i = 0; i < players.length; i++) {
		//somente executa se o progresso atual for diferente do json
		if(!(playersSala2[i].querySelector('.info-posicao').textContent == players[i].Progress)){
			//adiciona as informaçoes do json na tabela 
			playersSala2[i].querySelector('.info-nome').textContent = players[i].Name;
			playersSala2[i].querySelector('.info-posicao').textContent = players[i].Progress;
			playersSala2[i].querySelector('.info-pontos').textContent = players[i].Points;
			if(players[i].Progress > 10){
				timerSala2[i].stop();
				playersSala2[i].querySelector('.info-tempo').textContent = "CONCLUÍDO"
			} else {
				timerSala2[i].reset();
			}
		}	
	}
}

// atualiza as informações dos jogadores da sala 3
function updateSala3(players) {
	for (var i = 0; i < players.length; i++) {
		//somente executa se o progresso atual for diferente do json
		if(!(playersSala3[i].querySelector('.info-posicao').textContent == players[i].Progress)){
			//adiciona as informaçoes do json na tabela 
			playersSala3[i].querySelector('.info-nome').textContent = players[i].Name;
			playersSala3[i].querySelector('.info-posicao').textContent = players[i].Progress;
			playersSala3[i].querySelector('.info-pontos').textContent = players[i].Points;
			if(players[i].Progress > 10){
				timerSala3[i].stop();
				playersSala3[i].querySelector('.info-tempo').textContent = "CONCLUÍDO"
			} else {
				timerSala3[i].reset();
			}
		}	
	}
}

// atualiza as informações dos jogadores da sala 4
function updateSala4(players) {
	for (var i = 0; i < players.length; i++) {
		//somente executa se o progresso atual for diferente do json
		if(!(playersSala4[i].querySelector('.info-posicao').textContent == players[i].Progress)){
			//adiciona as informaçoes do json na tabela 
			playersSala4[i].querySelector('.info-nome').textContent = players[i].Name;
			playersSala4[i].querySelector('.info-posicao').textContent = players[i].Progress;
			playersSala4[i].querySelector('.info-pontos').textContent = players[i].Points;
			if(players[i].Progress > 10){
				timerSala4[i].stop();
				playersSala4[i].querySelector('.info-tempo').textContent = "CONCLUÍDO"
			} else {
				timerSala4[i].reset();
			}
		}	
	}
}

// atualiza as informações dos jogadores da sala 5
function updateSala5(players) {
	for (var i = 0; i < players.length; i++) {
		//somente executa se o progresso atual for diferente do json
		if(!(playersSala5[i].querySelector('.info-posicao').textContent == players[i].Progress)){
			//adiciona as informaçoes do json na tabela 
			playersSala5[i].querySelector('.info-nome').textContent = players[i].Name;
			playersSala5[i].querySelector('.info-posicao').textContent = players[i].Progress;
			playersSala5[i].querySelector('.info-pontos').textContent = players[i].Points;
			if(players[i].Progress > 10){
				timerSala5[i].stop();
				playersSala5[i].querySelector('.info-tempo').textContent = "CONCLUÍDO"
			} else {
				timerSala5[i].reset();
			}
		}	
	}
}

//define qual sala sera atualizada
function updatePlayersInfo(players) {
	switch (players[0].RoomID){
		case 'sala1':
			updateSala1(players);
		break;
		case 'sala2':
			updateSala2(players);
		break;
		case 'sala3':
			updateSala3(players);
		break;
		case 'sala4':
			updateSala4(players);
		break;
		case 'sala5':
			updateSala5(players);
		break;
	}
}

/* *******************************
   *                             *
   *       HABILITA O JOGO       *
   *                             *
   ******************************* */

var btnEnable = document.getElementById('enable-game');
var btnDisable = document.getElementById('disable-game');
var gameStatus = document.getElementById('game-status');

btnEnable.addEventListener('click', function (){
	sendGameStatus(true);
});

btnDisable.addEventListener('click', function (){
	sendGameStatus(false);
});


//altera o status visivel do jogo na tela
function changeGameStatus(status) {
	if(status){
		gameStatus.textContent = "Habilitado";
		gameStatus.classList.remove('w3-text-red');
		gameStatus.classList.add('w3-text-green');
	} else {
		gameStatus.textContent = "Desabilitado";
		gameStatus.classList.remove('w3-text-green');
		gameStatus.classList.add('w3-text-red');
	}
}


/* *******************************
   *                             *
   *       SOCKET FUNCTIONS      *
   *                             *
   ******************************* */

var IO = io.connect(); //criando conexao socket

function init(){

	IO.on('connected', function (data) {
		console.log(data);
	});

	IO.on('updatedPlayersInfo', function(players){
		
		console.log(players);

		updatePlayersInfo(players);

	});

	IO.on('gameStatus', function(data){
		changeGameStatus(data);
	});
}

function sendGameStatus(status) {	
	IO.emit('sendGameStatus', status);
}

function getGameStatus(){
	IO.emit('getGameStatus');
}

init();
getGameStatus();

/* *******************************
   *                             *
   *           GRAFICOS          *
   *                             *
   ******************************* */

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
		['Mushrooms', 3],
		['Onions', 1],
		['Olives', 1],
		['Zucchini', 1],
		['Pepperoni', 2]
		]);

	// Set chart options
	var options = {'title':'How Much Pizza I Ate Last Night',
	'width':550,
	'height':450};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}