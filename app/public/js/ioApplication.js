
var IO = io.connect(); //criando conexao socket no jogador

function init(){

	IO.on('connected', function (data) {
		console.log(data);
	});

	IO.on('joinDone', function(data){
		console.log(data);
	});
}


		

function joinRoom () {

	var player = {
		PlayerID: 1,
		Name: 'Carlos',
		Progress: 20,
		Points: 10000,
		RoomID:'15',
		Avatar: 'Batman'
	};

	IO.emit('joinRoom', player);
}

init();
joinRoom();




