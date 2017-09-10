var button = document.getElementById("avancar");

var mainURL = readCookie("url");

button.addEventListener("click", function (event){
	//request pro banco para ver o proximo desafio correto
	window.location.assign(dados.responseText);
});