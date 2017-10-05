var app = require('./config/express')(); // passo local do express e executo a funcao anonima
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.set('io', io);

app.io = io; //configura o socoket.io dentro do express

var porta = process.env.PORT || 3000;
var server = http.listen(porta, function () {
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('era-uma-vez listening at http://%s:%s', host, port);

});
/*

io.on('connection', function (socket) {
	app.set('socketClient', socket);
	//socket.emit('connection', {message: "You are connected!"});
});*/