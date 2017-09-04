//variavel importante
var playerInfo = {	PlayerID: null,
					Name: null,
					Avatar: null,
					Progress: 0,
					Points: 0,
					RoomID: 0,
					UsedTime: 0 };

var button = document.querySelector("#save-player");

//Armazena as opcoes do jogador no JSON e envia para o server
button.addEventListener("click", function (event){

	var playerAvatarDOM = document.getElementById("player-avatar");
	var playerIDDOM = document.querySelector("#player-name");
	var playerRoomDOM = document.querySelector("#player-room");

	if(playerRoomDOM != undefined && playerIDDOM != undefined){

		playerInfo.Avatar = playerAvatarDOM.options[playerAvatarDOM.selectedIndex].value;
		playerInfo.PlayerID = playerIDDOM.options[playerIDDOM.selectedIndex].value;
		playerInfo.RoomID = playerRoomDOM.options[playerRoomDOM.selectedIndex].value;

		for (var i = 0; i < allPlayers.length; i++) {
			if (allPlayers[i].PlayerID == playerInfo.PlayerID) {
				playerInfo.Name = allPlayers[i].Name;
			} 
		}

		console.log(playerInfo);

		postPlayerInfo();
	} else {
		//tratar erros <<<<
		console.log("Informe os dados");
	}	
});

//Envia os dados para o server
function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = "http://192.168.0.50:3000/savePlayerInfo";

	dados.open("POST" , url, true);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			//window.location.assing(dados.responseText);
			console.log(dados.responseText);
		}
	}

	dados.send(JSON.stringify(playerInfo));
}

/*
$("select").imagepicker({
          hide_select : true,
          show_label  : false
        })*/