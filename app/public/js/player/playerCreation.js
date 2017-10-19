//variavel importante
var playerInfo = {	PlayerID: null,
					Name: null,
					Avatar: null,
					Progress: 0,
					Points: 0,
					RoomID: 0,
					ElapsedTime: 0 };

var button = document.querySelector("#save-player");

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
		alert("Informe os dados corretamente");
	}	
});

//Envia os dados para o server
function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = location.origin + "/savePlayerInfo";

	dados.open("POST" , url, true);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			checkData(JSON.parse(dados.responseText));
		}
	}

	dados.send(JSON.stringify(playerInfo));
}

function checkData(data) {

	switch (data.error){
		case 1:
			alert("Desculpe, a sala selecionada já esta cheia.\nPor favor selecione outra sala.");
		break;
		case 2:
			alert("Aguarde!");
		break;
		case 0:
			window.location.assign(data.url);
		break;
	}
}

//cookies
function setCookie() {
	document.cookie = ("PlayerID =" + playerInfo.PlayerID);
	document.cookie = ("RoomID =" + playerInfo.RoomID);	
}

//image picker magic happens here
$("select").imagepicker({
		  hide_select : false,
		  show_label  : false
		});