//variavel importante
var playerInfo = {	PlayerID: null,
					Name: null,
					Avatar: null,
					Progress: 0,
					Points: 0,
					RoomID: 0,
					UsedTime: 0 };

var button = document.querySelector("#save-player");

var mainURL = readCookie("url");

//Armazena as opcoes do jogador no JSON e envia para o server
button.addEventListener("click", function (event){

	var playerAvatarDOM = document.getElementById("player-avatar");
	var playerIDDOM = document.querySelector("#player-name");
	var playerRoomDOM = document.querySelector("#player-room");

	//valida se informou os dados
	if(playerRoomDOM.value && playerIDDOM.value){

		playerInfo.Avatar = playerAvatarDOM.options[playerAvatarDOM.selectedIndex].value;
		playerInfo.PlayerID = playerIDDOM.options[playerIDDOM.selectedIndex].value;
		playerInfo.RoomID = playerRoomDOM.options[playerRoomDOM.selectedIndex].value;

		for (var i = 0; i < allPlayers.length; i++) {
			if (allPlayers[i].PlayerID == playerInfo.PlayerID) {
				playerInfo.Name = allPlayers[i].Name;
			} 
		}

		console.log(playerInfo);

		setCookie();

		postPlayerInfo();
	} else {
		//tratar erros <<<<
		console.log("Informe os dados");
	}	
});

//Envia os dados para o server
function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	if(mainURL){// adicioanar tratamento de erros
		var url = mainURL + "savePlayerInfo";
	}

	dados.open("POST" , url, true);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			//var redirectURL = dados.responseText;
			window.location.assign(dados.responseText);
		}
	}

	dados.send(JSON.stringify(playerInfo));
}

function setCookie() {
	document.cookie = ("PlayerID =" + playerInfo.PlayerID);
	document.cookie = ("RoomID =" + playerInfo.RoomID);	
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

/*
$("select").imagepicker({
		  hide_select : true,
		  show_label  : false
		})*/