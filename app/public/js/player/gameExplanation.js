var button = document.getElementById("avancar");

button.addEventListener("click", function (event){
	//request pro banco para ver o proximo desafio correto
	firstChallenge();
});

//redireciona para o desafio correto caso o jogador esteja continuando o jogo
function firstChallenge() {

	var playerInfo = {PlayerID: readCookie("PlayerID"),
						RoomID: readCookie("RoomID")};

	var dados = new XMLHttpRequest();

	var url = location.origin + "/firstChallenge";
	
	dados.open("POST", url, true);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			window.location.assign(dados.responseText);
		}
	}

	dados.send(JSON.stringify(playerInfo));
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