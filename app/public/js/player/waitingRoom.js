var IO = io.connect(); //criando conexao socket no jogador

var keepUser = true;

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

function init(){

	IO.on('connected', function (data) {
		console.log(data);		
	});
	//falta testar
	IO.on('redirectWinnersPodium', function(url){
		console.log("recebido");
		keepUser = false;
		window.location.assign(url);
	});

	IO.on('joinDone', function(data){
		var playerInfo = data[0];

		console.log(playerInfo);		
	});
}

function joinRoom () {

	var cookieInfo = readCookie("PlayerID");
	//verifica se a configuraçaõ do player esta correta
	if (cookieInfo != null){
		IO.emit('joinRoom', cookieInfo);
	} else {
		if(confirm("PlayerID não encontrando!\nRedicionando para Configuração de Player...")){
			window.location.assign(location.origin + "/playerCreation");
		} else{
			alert("Recarregando a página");
			setTimeout(function(){
				location.reload(true);
			},3000);
		}
	}			
}

init();
joinRoom();

//impede o player de sair da pagina
window.onbeforeunload = function() {
	if(keepUser){
	    var confirmClose = confirm('Close?');
	    return confirmClose;
	}	
}