module.exports = function (app){

	var playerInfo = { PlayerID: 1,
					Name: "Carlos",
					RA: "20422328",
					Avatar: "batmanIcon",
					School: "Anhembi",
					Progress: 0,
					Points: 0,
					RoomID: 0,
					TotalElapsedTime: 0};

	app.get("/", function (req, res) {

		//var socketConnection = new SocketConnection();

		

		
		res.render('home/index');

	});
	

	app.get("/game_board", function (req, res) {
		res.render("gameBoard/gameBoard");

		//verifica no banco a posição de todos o jogadores da sala

		

		res.send();
	});

	//mostra tabuleiro com todos os desafios	
	app.get("/allChallenges", function (req, res){

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		playerDAO.listAllPlayers(function(err, results){
			if(err){
				return next(err);
			}

			console.log({lista: results});
		});

		connection.end();


	});

	//mostra o primeiro desafio
	app.get("/challenge/1", function (req, res){
		//renderiza ejs

		connectSocket();

		res.render("challenges/challenge", {playerInfo: playerInfo});

	});

	//15 challenges no maximo!

	app.get("/playerCreation", function (req, res){
		//renderiza ejs

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);
	
		playerDAO.listAllPlayers(function(err, results){

			if(err){
				return next(err);
			}
			res.render("player/playerCreation", {allPlayers: results});
		});		

		connection.end();

		

	});

	app.get("/waitingRoom", function (req, res){
		//renderiza ejs

	});


	/* *******************************
   *                             *
   *       POST FUNCTIONS        *
   *                             *
   ******************************* */

	//requisicao de tabuleiro atualizado
	app.post("/nextChallenge", function (req, res){
		var playerInfo = req.body;

		//console.log(player);

		updatedGameBoard(playerInfo.RoomID);

		res.sendStatus(200);

		//es.render("challenges/challenge" + (player.progress));

		//res.redirect("challenges/challenge");

		//recebe a pontuação a adicionar e renderiza o proximo desafio
		//com tabuleiro e pontuação atualizados
		
	});

	app.post("/savePlayerInfo", function (req, res) {
		var playerInfo = req.body;

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);
	
		playerDAO.updatePlayerRoomIDAndAvatar(playerInfo, function(err, results){

			if(err){
				return next(err);
			}
			res.render("challenges/challenge/1", {playerInfo: playerInfo});
		});		

		connection.end();
	});


	/* *******************************
   *                             *
   *       SOCKET FUNCTIONS      *
   *                             *
   ******************************* */

   var gameSocket;

   function connectSocket() {
   		app.io.on('connection', function(socket){
			initConnection(socket);
		});
   } 
	
	function initConnection(socket){

		gameSocket = socket;

		gameSocket.emit('connected', {message: "You are connected!"});

		gameSocket.on('updatedGameBoard', updatedGameBoard);

		gameSocket.on('joinRoom', joinRoom);

	}

	function updatedGameBoard (roomID){

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		// solicita json com localização dos players da sala no tabuleiro	
		playerDAO.updatedGameBoard(roomID, function(err, results){

			if(err){
				return next(err);
			}
			app.io.to(roomID).emit('updatedGameBoard', results);
		});

		connection.end();
	
	}

	function joinRoom(RoomID) {
	
		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		gameSocket.join(RoomID);
		
		//envia para sala
		//mudar pra somente o cliente q faz o request DONE
		gameSocket.emit('joinDone', {status: "join ok"});
	

	}
}

/*
muiti salas:
pedir o ip ou o numero do jogador ou realmente a sala sempre q receber um recebe
um request

identificar qual o jogador e qual a sala do jogador e rotornar a informação
correta para ele


*/



	/*
	var connection = app.infra.connectionFactory();
	var playerDAO = new app.infra.PlayerDAO(connection);

<!--> <script src="js/sketch.js"></script> <!-->

	<!--> <script src="addons/p5.play.js"></script> <!-->

	<!--> {padding: 0; margin: 0;} <!-->

	*/