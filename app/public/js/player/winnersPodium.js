//envia a sala para o servidor e recebe um json com todos os jogadores
//com nome, pontos, tempo usado e avatar
function getWinners() {
	
	var sessionInfo = {RoomID: readCookie("RoomID")};

	var dados = new XMLHttpRequest();

	var url = location.origin + "/winnersPodium";

	dados.open("POST" , url, true);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			updateWinners(JSON.parse(dados.responseText));
		}
	}
	dados.send(JSON.stringify(sessionInfo));
}

//implementar a exibição do tempo, pontos e avatar
function updateWinners(winners) {

	var podium = document.querySelectorAll("#podium");

	for (var i = 0; i < podium.length; i++) {
		var winner = podium[i];
		winner.textContent = [i+1] + "º Lugar: " + winners[i].Name + " com " + winners[i].Points + " pontos"; 
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

getWinners();
