var IO = io.connect(); //criando conexao socket no jogador

var keepUser = true;

function init(){

	IO.on('connected', function (data) {
		console.log(data);		
	});
	//falta testar
	IO.on('redirectWinnersPodium', function(url){
		keepUser = false;
		window.location.assign(url);
	});
}

init();

//impede o player de sair da pagina
window.onbeforeunload = function() {
	if(keepUser){
	    var confirmClose = confirm('Close?');
	    return confirmClose;
	}	
}