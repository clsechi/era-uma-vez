module.exports = function (app){

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

		res.render("challenges/challenge");

	});

	//15 challenges no maximo!

	app.get("/playerCreation", function (req, res){
		//renderiza ejs

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
		var player = req.body;

		//console.log(player);

		updatedGameBoard(player.RoomID);

		res.sendStatus(200);

		//res.redirect("challenges/challenge");

		//recebe a pontuação a adicionar e renderiza o proximo desafio
		//com tabuleiro e pontuação atualizados
		
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
		//mudar pra somente o cliente q faz o request
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