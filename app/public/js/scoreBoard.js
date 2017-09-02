var playersDOM = document.querySelectorAll(".player");

function updateScoreBoard(players){

	var avatar, name, points;

	for (var i = 0; i < players.length; i++) {
		avatar = players[i].Avatar;
		name = players[i].Name
		points = players[i].Points;
		
		var player = playersDOM[i];
		var tdAvatar = player.querySelector(".info-avatar");
		var tdName = player.querySelector(".info-name");
		var tdPoints = player.querySelector(".info-points");

		tdAvatar.innerHTML = "<img src='/assets/"+ avatar +"32.png'/>"

		tdName.textContent = name;

		tdPoints.textContent = points;		
	}
}