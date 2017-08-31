/*var ConnectionFactory = require('createDBConnection');

function SocketConnection(app){
	this.io = app.io;
	//this.app = app;

}

	initConnection: function(socket){

		gameSocket = socket;

		gameSocket.emit('connected', {message: "You are connected!"});

		gameSocket.on('updatedGameBoard', updatedGameBoard);

		gameSocket.on('joinRoom', joinRoom);

	}

	function updatedGameBoard (user){

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

	// solicita json com localização dos players da sala no tabuleiro	
	playerDAO.updatedGameBoard(user.roomID, function(err, results){

		if(err){
			return next(err);
		}

		this.io.to(user.roomID).emit(results);
	});

	connection.end();
}

	function joinRoom(user, roomID) {
	
	var connection = app.infra.ConnectionFactory();
	var playerDAO = new app.infra.PlayerDAO(connection);

	//editar o JSON com a roomID

	gameSocket.join(roomID);
/*
	playerDAO.updatePlayerInfo(user, function (err, results) {
		
		if(err){
			return next(err);

		}

		this.io.to(user.roomID).emit({status: done});
	});

}




module.exports = function(app){
	return SocketConnection;
}


		produtosDAO.lista(function(erros, results){

			if (erros){
				return next(erros);
			}

			res.format({
				html: function(){
					res.render('produtos/lista', {lista: results});
				},
				json: function(){
					res.json(results);
				}
			});			
		});
		
		connection.end();	

*/