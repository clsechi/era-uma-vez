module.exports = function (app) {

	var gameSocket;

	app.get("/", function (req, res) {
		
		res.render('home/index', initConnection);

	});

	var initConnection = function(){

		app.io.on('connection', function(socket){
			
			socket.emit('connection', {message: "You are connected!"});
			
		});

		//gameSocket.on('updatedGameBoard', updatedGameBoard);

	}

	function updatedGameBoard() {
		

	}


	//estabelece a conexao com o cliente
	function connectionEstablished(socket) {
	
		

	}
}

/*

<!--> <script src="js/sketch.js"></script> <!-->

    <!--> <script src="addons/p5.play.js"></script> <!-->

    <!--> {padding: 0; margin: 0;} <!-->

    */