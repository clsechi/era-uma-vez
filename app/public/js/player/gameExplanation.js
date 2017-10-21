var button = document.getElementById("avancar");

button.addEventListener("click", function (event){
	//redirect to playerCreation
	window.location.assign(location.origin + "/playerCreation");
});