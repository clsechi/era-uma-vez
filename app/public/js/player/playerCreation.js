var playerInfo = {	PlayerID: null,
					Name: null,
					RA: null,
					Avatar: null,
					School: null,
					Progress: 0,
					Points: 0,
					RoomID: 1,
					TotalElapsedTime: 0};

var button = document.querySelector("#save-player");

button.addEventListener("click", function (event){

postPlayerInfo();	

});

function postPlayerInfo() {

	var dados = new XMLHttpRequest();

	var url = "http://192.168.0.50:3000/nextChallenge";

	dados.open("POST" , url);

	dados.setRequestHeader("Content-Type", "application/json");

	dados.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200) {
			console.log("POST OK!");
		}
	}

	dados.send(JSON.stringify(playerInfo));
}