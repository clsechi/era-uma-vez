
var IO = {

	init: function(){
		
		IO.socket = io.connect(); //criando conexao socket no jogador

		IO.socket.on('connection', function (data) {
			console.log(data);
		});		
	},

	bindEvents : function () {
		
	}
}

IO.init();




