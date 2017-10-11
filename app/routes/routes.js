module.exports = function (app){

	//variavel que verifica se ja esta socket online no server
	var socketOnline = false;
	//maximo de desfios
	var maxChallenges = 10;

	//carrega home
	app.get("/", function (req, res) {
		//renderiza ejs
		res.render("home/index");
	});
	
	//carrega video com o explicação do jogo	
	app.get("/gameExplanation", function (req, res){
		//renderiza ejs
		res.render("player/gameExplanation");
	});

	//tela sobre
	app.get("/about", function (req, res){
		//renderiza ejs
		res.render("admin/about");
	});

	//tela ajuda
	app.get("/help", function(req, res){
		//renderiza ejs
		res.render("player/help");
	});

	//painel mostsrando o progresso de todos os alunos
	app.get("/teacherPanel", function(req, res){
		//abre conexao socket no servidor se necessario
		connectSocket();
		//renderiza ejs
		res.render("teacher/teacherPanel");
	});	

	//jogador seleciona escola, nome, avatar e sala
	app.get("/playerCreation", function (req, res, next){
		//renderiza ejs
		app.infra.connectionFactory(function (err, connection){

			var playerDAO = new app.infra.PlayerDAO(connection);

			playerDAO.listAllPlayers(function(err, results){

				if(err){
					return next(err);
				}

				res.render("player/playerCreation", {allPlayers: results});
				connection.release();
			});
		});
	});
		
		

	//sala de espera para os jogadores que ja concluiram o jogo
	app.get("/waitingRoom", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("player/waitingRoom");
	});

	//mostra o jogadores em um podia conforme a pontuação do maior para o menor
	app.get("/winnersPodium", function (req, res) {		
		//renderiza ejs
		res.render("player/winnersPodium");		
	});

	app.get("/deviceNotSupported", function (req, res) {
		//caso site aberto em celular
		res.render("err/deviceNotSupported");
	});

	//10 challenges no total
	//mostra o primeiro desafio
	app.get("/challenge/1", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/1");
	});

	app.get("/challenge/2", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/2");
	});

	app.get("/challenge/3", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/3");
	});

	app.get("/challenge/4", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/4");
	});

	app.get("/challenge/5", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/5");
	});

	app.get("/challenge/6", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/6");
	});

	app.get("/challenge/7", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/7");
	});

	app.get("/challenge/8", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/8");
	});

	app.get("/challenge/9", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/9");
	});

	app.get("/challenge/10", function (req, res){
		//se necessario abre a conexao socket do servidor
		connectSocket();
		//renderiza ejs
		res.render("challenges/10");
	});

	/* *******************************
   *                             *
   *       POST FUNCTIONS        *
   *                             *
   ******************************* */

	app.post("/nextChallenge", function (req, res, next){
		var playerInfo = req.body;

		//recebe a pontuação a adicionar e renderiza o proximo desafio
		//com tabuleiro e pontuação atualizados

		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);

			//solicita o tempo ja gravado no banco		
			playerDAO.selectTotalElapsedTime(playerInfo.PlayerID, function(err, results){
				if(err){
					return next(err);
				}
				//soma o tempo do banco ao usado no desafio atual
				playerInfo.TotalElapsedTime = (results[0].TotalElapsedTime + playerInfo.ElapsedTime);

				//grava os dadso da pontuação e tempo no banco
				playerDAO.updatePlayerProgessPointsTime(playerInfo, function(err, results){
					if(err){
						return next(err);
					}

					//envia tabuleiro atualizado para os outros jogadores
					updatedGameBoard(playerInfo.RoomID);

					//mudar conforme numero total de casas do tabuleiro
					//redireciona para a view correta conforme o progresso do jogador
					if(playerInfo.Progress <= maxChallenges){
						var redirectURL = "http://" + (req.get('host') + "/challenge/" + (playerInfo.Progress));

						res.send(redirectURL);
					} else {
						//se todos os jogadores ja completaram redireciona para o pódio
						//se não, redireciona para a tela de espera
						checkRoomProgress(playerInfo.RoomID, function (roomProgress) {
							var redirectURL;
							if (roomProgress){
								redirectURL = "http://" + (req.get('host') + "/winnersPodium");
								//envia socket para o outros jogadores da sala com o a url de redirect
								redirectWinnersPodium(playerInfo.RoomID, redirectURL);
							} else {
								redirectURL = "http://" + (req.get('host') + "/waitingRoom");
							}
							res.send(redirectURL);
						});					
					}

					connection.release();
					
					//grava LOG
					updateLOG(playerInfo, next);

					//atualiza painel do professor
					updatedPlayersInfo(playerInfo.RoomID, next);
				});
			});
		});
	});

	//salva informações do usuário
	//res = 0 -> OK
	//res = 1 -> sala cheia
	app.post("/savePlayerInfo", function (req, res, next) {
		var playerInfo = req.body;
		//json vazio que sera enviado como resposta
		//poderia enviar somente uma string
		var redirectURL = {};

		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);
			//verifica se o player ja esta na sala
			playerDAO.selectPlayerAlreadyInRoom(playerInfo.RoomID, playerInfo.PlayerID ,function (err, results) {
				if(err){
					return next(err);
				}

				if(results[0].AlreadyInRoom == 0){
					//verifica se a sala não esta cheia
					playerDAO.selectPlayersInRoom(playerInfo.RoomID, function (err, results) {
						if(err){
							return next(err);
						}
						//numero de jogadores menor que 4
						if (results[0].NumberOfPlayers <= 3) {
							//se a sala nao estiver cheia adiciona o player nela
							playerDAO.updatePlayerRoomIDAndAvatar(playerInfo, function(err, results){
								if(err){
									return next(err);
								}			
								//get URL do app e adiciona o redirecionamento
								//envia esse var para o cliente q faz o redirect
								
								redirectURL.url = "http://" + (req.get('host') + "/gameExplanation");

								redirectURL.error = 0;

								res.send(redirectURL);

								connection.release();
							});
							//
						} else {
							//se a sala estiver cheia retorna msg erro
							redirectURL.error = 1;				

							res.send(redirectURL);

							connection.release();						
						}					
					});
					
				} else {
					//var connection = app.infra.connectionFactory();
					//se o jogador ja estiver na sala somente atualiza a info
					playerDAO.updatePlayerRoomIDAndAvatar(playerInfo, function(err, results){
						if(err){
							return next(err);
						}			
						//get URL do app e adiciona o redirecionamento
						//envia esse var para o cliente q faz o redirect
						
						redirectURL.url = "http://" + (req.get('host') + "/gameExplanation");

						redirectURL.error = 0;

						res.send(redirectURL);

						connection.release();
					});
				}
			});
		});	
	});

	//envia o desafio correto para o usuario após a tela de explicação
	app.post("/firstChallenge", function (req, res, next) {
		var playerInfo = req.body;

		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);

			playerDAO.selectPlayerProgress(playerInfo.PlayerID, function (err, results) {
				if(err){
					return next(err);
				}

				if(results[0].Progress <= maxChallenges){
					var redirectURL = "http://" + (req.get('host')) + "/challenge/" + (results[0].Progress);				
				} else {
					var redirectURL = "http://" + (req.get('host') + "/waitingRoom")
				}
				res.send(redirectURL);
			});
			connection.release();;

			//atualiza painel do professor
			updatedPlayersInfo(playerInfo.RoomID, next);
		});
	});

	//envia json com info final de todos os jogares da sala
	app.post("/winnersPodium", function (req, res, next) {

		var sessionInfo = req.body;
		
		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);

			playerDAO.selectWinners(sessionInfo.RoomID,function (err, results) {

				if(err){
					return next(err);
				}

				res.send(results);
			});
			connection.release();
		});
	});

	/* *******************************
   *                             *
   *        FUNCTIONS            *
   *                             *
   ******************************* */

   //recebe informacoes do desafio atual e grava na tabela ChallengesLOG
   function updateLOG(playerInfo, next) {

		var infoLOG = {FK_PlayerID: playerInfo.PlayerID,
			EarnedPoints: playerInfo.EarnedPoints,
			GBProgress: (playerInfo.Progress - 1),
			ElapsedTime: playerInfo.TotalElapsedTime,
			WrongAnswers: playerInfo.WrongAnswers};
		
		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);		

			playerDAO.updateLOG(infoLOG, function(err, results){
				if(err){
					return next(err);
				}
				console.log("LOG atualizado");
			});
			connection.release();
		});
   }
   //verifica se os jogadores da sala ja completaram todos os desafios
   function checkRoomProgress(roomID, callback) {
   		var answer = false

   		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);		

			playerDAO.selectPlayerInfoByRoom(roomID, function(err, results){
				if(err){
					return next(err);
				}			
				for (var i = 0; i < results.length; i++) {
					//10 numero total de desafios
					if (results[i].Progress > maxChallenges){
						answer = true;
					}				
				}
				callback(answer);
			});
			connection.release();
		});
	}

	/* *******************************
   *                             *
   *       SOCKET FUNCTIONS      *
   *                             *
   ******************************* */

	var gameSocket;

	function connectSocket() {
		//somente abre a conexao se ela ainda nao existir
		if(!socketOnline){
			console.info("Engines On!!!");
			app.io.on('connection', function(socket){
				initConnection(socket);				
			});
			socketOnline = true;
		}
	}
	
	function initConnection(socket){

		gameSocket = socket;

		gameSocket.emit('connected', {message: "You are connected!"});

		gameSocket.on('updatedGameBoard', updatedGameBoard);

		gameSocket.on('joinRoom', joinRoom);
	}

	function updatedPlayersInfo(roomID, next) {
		
		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);

			playerDAO.selectPlayerInfoByRoom(roomID, function(err, results){
				if(err){
					return next(err);
				}

				app.io.emit('updatedPlayersInfo', results);
			});

			/*playerDAO.selectLOG(function(err, results){
				if(err){
					return next(err);
				}

				console.log(results);
			});*/

			connection.release();
		});	
	}
	//teste com a criacao do grafico
	function test() {

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		playerDAO.selectAverageLOG(function(err, results){
			if(err){
				return next(err);
			}

			console.log(results);
		});

		connection.end();
	}



	function redirectWinnersPodium(roomID, redirectURL) {	
		app.io.to(roomID).emit('redirectWinnersPodium', redirectURL);
	}

	function updatedGameBoard (roomID, next){

		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);

			// solicita json com localização dos players da sala no tabuleiro	
			playerDAO.selectPlayerInfoByRoom(roomID, function(err, results){
				if(err){
					return next(err);
				}
				app.io.to(roomID).emit('updatedGameBoard', results);
			});

			connection.release();
		});
	}

	function joinRoom(playerID, next) {
		
		app.infra.connectionFactory(function (err, connection){
			var playerDAO = new app.infra.PlayerDAO(connection);

			//solicita a informacoes sobre o jogador que foram gravadas no banco
			playerDAO.selectPlayerInfo(playerID, function(err, results){
				if(err){
					return next(err);
				}

				var player = results;

				//insere o jogador na sala
				gameSocket.join(player[0].RoomID);

				gameSocket.nickname = player[0].Name;

				//envia para todos os jogadores na sala VERIFICAR PARA SOMENTE O JOGADOR QUE LOGOU
				gameSocket.emit('joinDone', player);

				console.log((new Date).toLocaleTimeString() + " " + player[0].Name + " entrou na sala " + player[0].RoomID);

				//console.log(gameSocket.adapter.rooms);

				updatedGameBoard(player[0].RoomID);
			});
			connection.release();
		});
	}
}


	/* *******************************
   *                             *
   *       GARBAGE               *
   *                             *
   ******************************* */



/*var player = { PlayerID: 3,
				Name: "Carlos",
				RA: "20422328",
				Avatar: "batmanIcon",
				School: "Anhembi",
				Progress: 0,
				Points: 200,
				RoomID: 1,
				ElapsedTime: 200,
				WrongAnswers: 0};*/