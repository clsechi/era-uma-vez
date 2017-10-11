var mysql = require('mysql');
var pool = null;

function createPool() {

	if(!process.env.NODE_ENV || process.env.node === 'dev'){
		pool = mysql.createPool({
			connectionLimit : 100,
			host: "localhost",
			user: "root",
			password: "1234",
			database: "eraumavez",
		});
	}

	/*
	if (process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "1234",
			database: "eraumavez_teste",
		});
	}*/
	
	// heroku implementation
	if (process.env.NODE_ENV == 'production') {
		var url = process.env.CLEARDB_DATABASE_URL;
		var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
		pool =  mysql.createPool({
            connectionLimit: 10, // Limite do ClearDB
            host: grupos[3],
            user: grupos[1],
            password: grupos[2],
            database: grupos[4]
        });
	}

	pool.on('enqueue', function (){
		console.error('Waiting for available connection slot');
	});
}

createPool();

var createDBConnection = function(callback) {

    return pool.getConnection(function (err, connection) {
        if(err) {
            //return callback(err);
            console.log('Error getting mysql_pool connection: ' + err);
            pool.end(function onEnd(error) {
                if(error) {
                    console.log('Erro ao terminar o pool: ' + error);
                }
                // All connections are now closed once they have been returned with connection.release()
                // i.e. this waits for all consumers to finish their use of the connections and ends them.
                // Recria o pool
                createPool();
            });
            return;
        }
        return callback(null, connection);
    });

};

module.exports = function(){
	return createDBConnection; // sem parenteses pq ja esta dentro da funcao
}