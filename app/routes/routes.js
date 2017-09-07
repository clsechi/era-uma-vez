module.exports = function (app){

	/*var playerInfo = { PlayerID: 1,
					Name: "Carlos",
					RA: "20422328",
					Avatar: "batmanIcon",
					School: "Anhembi",
					Progress: 0,
					Points: 0,
					RoomID: 1,
					TotalElapsedTime: 0};*/

	var playerInfo = {	PlayerID: null,
					Name: null,
					Avatar: null,
					Progress: 0,
					Points: 0,
					RoomID: 0,
					UsedTime: 0 };

	//home
	app.get("/", function (req, res) {
		
		res.render("home/index");

	});
	
	//carrega video com o explicação do jogo	
	app.get("/gameExplanation", function (req, res){

		connectSocket();

		res.render("player/gameExplanation");

	});

	app.get("/about", function (req, res){

		res.render("admin/about");

	});

	//painel mostsrando o progresso de todos os alunos
	app.get("/teacherPanel", function(req, res){
		//connectSocket();

		res.render("teacher/teacherPanel");
	})

	app.get("/help", function(req, res){
		//connectSocket();

		res.render("player/help");
	})


	//jogador seleciona escola, nome, avatar e sala
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
		res.render("player/waitingRoom");

	});

	app.get("/deviceNotSupported", function (req, res) {
		//caso site aberto em celular
		res.render("err/deviceNotSupported");
	});

	//15 challenges no maximo!
	//mostra o primeiro desafio
	app.get("/challenge/1", function (req, res){
		//renderiza ejs

		res.render("challenges/1", {playerInfo: playerInfo});

	});

	app.get("/challenge/2", function (req, res){
		//renderiza ejs

		//connectSocket();

		res.render("challenges/2", {playerInfo: playerInfo});

	});

	app.get("/challenge/3", function (req, res){
		//renderiza ejs

		//connectSocket();

		res.render("challenges/3", {playerInfo: playerInfo});

	});

	app.get("/challenge/4", function (req, res){
		//renderiza ejs

		//connectSocket();

		res.render("challenges/4", {playerInfo: playerInfo});

	});

	app.get("/challenge/5", function (req, res){
		//renderiza ejs

		//connectSocket();

		res.render("challenges/5", {playerInfo: playerInfo});

	});



	/* *******************************
   *                             *
   *       POST FUNCTIONS        *
   *                             *
   ******************************* */

	//requisicao de tabuleiro atualizado
	app.post("/nextChallenge", function (req, res){
		playerInfo = req.body;

		//recebe a pontuação a adicionar e renderiza o proximo desafio
		//com tabuleiro e pontuação atualizados

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		playerDAO.updatePlayerProgessPointsTime(playerInfo, function(err, results){
			if(err){
				return next(err);
			}		

			updatedGameBoard(playerInfo.RoomID);
			//mudar conforme numero total de casas do tabuleiro
			if(playerInfo.Progress <= 15){
				var redirectURL = "http://" + (req.get('host') + "/challenge/" + (playerInfo.Progress));

				res.send(redirectURL);
			} else {
				var redirectURL = "http://" + (req.get('host') + "/waitingRoom");

				res.send(redirectURL);
			}

		});		
		connection.end();
	});

	app.post("/savePlayerInfo", function (req, res) {
		playerInfo = req.body;

		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);
	
		playerDAO.updatePlayerRoomIDAndAvatar(playerInfo, function(err, results){
			if(err){
				return next(err);
			}			
			//get URL do app e adiciona o redirecionamento
			//envia esse var para o cliente q faz o redirect
			var redirectURL = "http://" + (req.get('host') + "/gameExplanation");

			res.send(redirectURL.toString());
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

	function joinRoom(playerInfoClient) {
	
		var connection = app.infra.connectionFactory();
		var playerDAO = new app.infra.PlayerDAO(connection);

		gameSocket.join(playerInfoClient.RoomID);

		gameSocket.nickname = playerInfoClient.Name;

		//envia para todos os jogadores na sala VERIFICAR PARA SOMENTE O JOGADOR QUE LOGOU
		gameSocket.emit('joinDone', {enterRoom: playerInfoClient.Name});

		console.log((new Date).toLocaleTimeString() + " " + playerInfoClient.Name + " entrou na sala " + playerInfoClient.RoomID);

		console.log(gameSocket.adapter.rooms);
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

	 nsp.Namespace.adapter

	Socket {
  nsp: 
   Namespace {
     name: '/',
     server: 
      Server {
        nsps: [Object],
        _path: '/socket.io',
        _serveClient: true,
        parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: [Circular],
        eio: [Object],
        httpServer: [Object],
        engine: [Object] },
     sockets: { 'xNN8zHSHk-xQY2ukAAAC': [Circular] },
     connected: { 'xNN8zHSHk-xQY2ukAAAC': [Circular] },
     fns: [],
     ids: 0,
     rooms: [],
     flags: {},
     adapter: 
      Adapter {
        nsp: [Circular],
        rooms: [Object],
        sids: [Object],
        encoder: Encoder {} },
     _events: { connection: [Function] },
     _eventsCount: 1 },
  server: 
   Server {
     nsps: { '/': [Object] },
     _path: '/socket.io',
     _serveClient: true,
     parser: 
      { protocol: 4,
        types: [Object],
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        ERROR: 4,
        BINARY_EVENT: 5,
        BINARY_ACK: 6,
        Encoder: [Function: Encoder],
        Decoder: [Function: Decoder] },
     encoder: Encoder {},
     _adapter: [Function: Adapter],
     _origins: '*:*',
     sockets: 
      Namespace {
        name: '/',
        server: [Circular],
        sockets: [Object],
        connected: [Object],
        fns: [],
        ids: 0,
        rooms: [],
        flags: {},
        adapter: [Object],
        _events: [Object],
        _eventsCount: 1 },
     eio: 
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Object],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Object],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 },
     httpServer: 
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        _connections: 6,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        _pendingResponseData: 0,
        _connectionKey: '6::::3000' },
     engine: 
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Object],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Object],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 } },
  adapter: 
   Adapter {
     nsp: 
      Namespace {
        name: '/',
        server: [Object],
        sockets: [Object],
        connected: [Object],
        fns: [],
        ids: 0,
        rooms: [],
        flags: {},
        adapter: [Circular],
        _events: [Object],
        _eventsCount: 1 },
     rooms: { '1': [Object], 'xNN8zHSHk-xQY2ukAAAC': [Object] },
     sids: { 'xNN8zHSHk-xQY2ukAAAC': [Object] },
     encoder: Encoder {} },
  id: 'xNN8zHSHk-xQY2ukAAAC',
  client: 
   Client {
     server: 
      Server {
        nsps: [Object],
        _path: '/socket.io',
        _serveClient: true,
        parser: [Object],
        encoder: Encoder {},
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: [Object],
        eio: [Object],
        httpServer: [Object],
        engine: [Object] },
     conn: 
      Socket {
        id: 'xNN8zHSHk-xQY2ukAAAC',
        server: [Object],
        upgrading: true,
        upgraded: false,
        readyState: 'open',
        writeBuffer: [Object],
        packetsFn: [],
        sentCallbackFn: [],
        cleanupFn: [Object],
        request: [Object],
        remoteAddress: '::ffff:192.168.0.50',
        checkIntervalTimer: null,
        upgradeTimeoutTimer: [Object],
        pingTimeoutTimer: [Object],
        transport: [Object],
        _events: [Object],
        _eventsCount: 3 },
     encoder: Encoder {},
     decoder: Decoder { reconstructor: null, _callbacks: [Object] },
     id: 'xNN8zHSHk-xQY2ukAAAC',
     request: 
      IncomingMessage {
        _readableState: [Object],
        readable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Object],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '/socket.io/?EIO=3&transport=polling&t=Lv9nWi2',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: true,
        _dumped: true,
        _query: [Object],
        res: [Object],
        cleanup: [Function: cleanup],
        read: [Function] },
     onclose: [Function: bound ],
     ondata: [Function: bound ],
     onerror: [Function: bound ],
     ondecoded: [Function: bound ],
     sockets: { 'xNN8zHSHk-xQY2ukAAAC': [Circular] },
     nsps: { '/': [Circular] },
     connectBuffer: [] },
  conn: 
   Socket {
     id: 'xNN8zHSHk-xQY2ukAAAC',
     server: 
      Server {
        clients: [Object],
        clientsCount: 1,
        wsEngine: 'uws',
        pingTimeout: 60000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Object],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Object],
        ws: [Object],
        _events: [Object],
        _eventsCount: 1 },
     upgrading: true,
     upgraded: false,
     readyState: 'open',
     writeBuffer: [ [Object], [Object] ],
     packetsFn: [],
     sentCallbackFn: [],
     cleanupFn: [ [Function], [Function] ],
     request: 
      IncomingMessage {
        _readableState: [Object],
        readable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Object],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '/socket.io/?EIO=3&transport=polling&t=Lv9nWi2',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: true,
        _dumped: true,
        _query: [Object],
        res: [Object],
        cleanup: [Function: cleanup],
        read: [Function] },
     remoteAddress: '::ffff:192.168.0.50',
     checkIntervalTimer: null,
     upgradeTimeoutTimer: 
      Timeout {
        _called: false,
        _idleTimeout: 10000,
        _idlePrev: [Object],
        _idleNext: [Object],
        _idleStart: 15752,
        _onTimeout: [Function],
        _timerArgs: undefined,
        _repeat: null },
     pingTimeoutTimer: 
      Timeout {
        _called: false,
        _idleTimeout: 85000,
        _idlePrev: [Object],
        _idleNext: [Object],
        _idleStart: 15778,
        _onTimeout: [Function],
        _timerArgs: undefined,
        _repeat: null },
     transport: 
      XHR {
        readyState: 'open',
        discarded: false,
        closeTimeout: 30000,
        maxHttpBufferSize: 100000000,
        httpCompression: [Object],
        supportsBinary: true,
        _events: [Object],
        _eventsCount: 5,
        sid: 'xNN8zHSHk-xQY2ukAAAC',
        req: null,
        res: null,
        writable: false,
        dataReq: null,
        dataRes: null },
     _events: 
      { close: [Object],
        data: [Function: bound ],
        error: [Function: bound ] },
     _eventsCount: 3 },
  rooms: { 'xNN8zHSHk-xQY2ukAAAC': 'xNN8zHSHk-xQY2ukAAAC' },
  acks: {},
  connected: true,
  disconnected: false,
  handshake: 
   { headers: 
      { host: '192.168.0.50:3000',
        connection: 'keep-alive',
        accept: '/*',
        'user-agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/60.0.3112.113 Chrome/60.0.3112.113 Safari/537.36',
        referer: 'http://192.168.0.50:3000/challenge/2',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4',
        cookie: 'io=1LIAR0sf--54vXBhAAAB' },
     time: 'Sun Sep 03 2017 19:04:29 GMT-0300 (BRT)',
     address: '::ffff:192.168.0.50',
     xdomain: false,
     secure: false,
     issued: 1504476269354,
     url: '/socket.io/?EIO=3&transport=polling&t=Lv9nWi2',
     query: { EIO: '3', transport: 'polling', t: 'Lv9nWi2' } },
  fns: [],
  flags: {},
  _rooms: [],
  _events: 
   { updatedGameBoard: [Function: updatedGameBoard],
     joinRoom: [Function: joinRoom] },
  _eventsCount: 2 }

*/