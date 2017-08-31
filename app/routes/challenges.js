module.exports = function (app){

	app.get("/", function (req, res) {

		//var socketConnection = new SocketConnection();

		app.io.on('connection', function(socket){
			initConnection(socket);
		});
		
		res.render('home/index');

	});


	//requisicao de tabuleiro atualizado
	app.post("/nextChallenge", function (req, res){
		dados = req.body;

		//recebe a pontuação a adicionar e renderiza o proximo desafio
		//com tabuleiro e pontuação atualizados

		
	});

	app.get("/game_board", function (req, res) {
		res.render("gameBoard/gameBoard");

		//verifica no banco a posição de todos o jogadores da sala

		

		res.send();
	});

	//mostra tabuleiro com todos os desafios	
	app.get("/challenges", function (req, res){

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		

		var player = {
			PlayerID: 1,
			Name: 'Carlos',
			Progress: 20,
			Points: 20000,
			roomId: '0'
		};

		

		playerDAO.updatePlayerProgessAndPoints(player, function(err, results){
			if(err){
				return next(err);
			}

			//console.log(results.changeRows);
		});

		playerDAO.listAllPlayers(function(err, results){
			if(err){
				return next(err);
			}

			console.log(results);
		});

		connection.end();


	});

	//mostra o primeiro desafio
	app.get("/challenge/1", function (req, res){
		//renderiza ejs

	});


	/* *******************************
   *                             *
   *       SOCKET FUNCTIONS      *
   *                             *
   ******************************* */

	
	function initConnection(socket){

		gameSocket = socket;

		gameSocket.emit('connected', {message: "You are connected!"});

		gameSocket.on('updatedGameBoard', updatedGameBoard);

		gameSocket.on('joinRoom', joinRoom);

	}

	function updatedGameBoard (player){

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		// solicita json com localização dos players da sala no tabuleiro	
		playerDAO.updatedGameBoard(player.roomID, function(err, results){

			if(err){
				return next(err);
			}

			this.io.to(player.roomID).emit(results);
		});

		connection.end();
	
	}

	function joinRoom(player) {
	
		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		//editar o JSON com a roomID

		gameSocket.join(player.RoomID);
		//console.log(player.roomID);

	playerDAO.updatePlayerRoomAndAvatar(player, function (err, results) {
		
		if(err){
			return next(err);

		}

		this.io.to(player.RoomID).emit('joinDone',{status: done});
	});

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