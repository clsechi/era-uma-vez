function PlayerDAO(connection){
	this._connection = connection;
}

//funcao ok
PlayerDAO.prototype.updatedGameBoard = function(roomId, callback) {
	this._connection.query('SELECT PlayerID, Name, Progress, Points FROM Players WHERE RoomId = ?', roomId, callback);
}

PlayerDAO.prototype.updatePlayerRoomAndAvatar = function(player, callback){
	this._connection.query('UPDATE Players SET RoomId = ?, Avatar = ?', [player.RoomId, player.Avatar]);
}

//funcao ok
//usar [colchetes] nos parametros
PlayerDAO.prototype.updatePlayerProgessAndPoints = function(player, callback){
	this._connection.query('UPDATE Players SET Progress = ?, Points = ? WHERE PlayerID = ?', [player.Progress, player.Points, player.PlayerID]);
}

//funcao ok
PlayerDAO.prototype.listAllPlayers = function(callback){
	this._connection.query('SELECT * FROM Players', callback);
}

/*

ProdutosDAO.prototype.lista = function(callback) {
	this._connection.query('select * from produtos', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
	this._connection.query('INSERT INTO produtos SET ?', produto, callback);
}
//nao implementado
ProdutosDAO.prototype.delete = function(id, callback){
	this._connection.query('DELETE FROM produtos WHERE id=?', id, callback);

*/

module.exports = function(){
	return PlayerDAO;
}