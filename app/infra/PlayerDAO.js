function PlayerDAO(connection){
	this._connection = connection;
}

//funcao ok
PlayerDAO.prototype.updatedGameBoard = function(roomID, callback) {
	this._connection.query('SELECT PlayerID, Name, Progress, Points, Avatar FROM Players WHERE RoomID = ? ORDER BY PlayerID', roomID, callback);
}

PlayerDAO.prototype.updatePlayerRoomIDAndAvatar = function(player, callback){
	this._connection.query('UPDATE Players SET RoomID = ?, Avatar = ? WHERE PlayerID = ?', [player.RoomID, player.Avatar, player.PlayerID], callback);
}

//funcao ok
//usar [colchetes] nos parametros
PlayerDAO.prototype.updatePlayerProgessPointsTime = function(player, callback){
	this._connection.query('UPDATE Players SET Progress = ?, Points = ?, TotalElapsedTime = ? WHERE PlayerID = ?', [player.Progress, player.Points, player.ElapsedTime, player.PlayerID], callback);
}

//usada para somar a pontuação total com a do ultimo desafio
PlayerDAO.prototype.SelectTotalElapsedTime = function (playerID, callback) {
	this._connection.query('SELECT TotalElapsedTime FROM Players WHERE PlayerID = ?', [playerID], callback);		
}

//funcao ok
PlayerDAO.prototype.listAllPlayers = function(callback){
	this._connection.query('SELECT * FROM Players', callback);
}

module.exports = function(){
	return PlayerDAO;
}