module.exports = function (app){

	//requisicao de tabuleiro atualizado
	app.post("/nextChallenge", function (req, res){
		dados = req.body;

		//recebe a pontuação a adicionar e renderiza o proximo desafio
		//com tabuleiro e pontuação atualizados

		
	});

	app.get("/game_board", function (req, res) {
		res.render("gameBoard/gameBoard");

		//verifica no banco a posição de todos o jogadores da sala

		

		res.send();
	});

	//mostra tabuleiro com todos os desafios	
	app.get("/challenges", function (req, res){

	});

	//mostra o primeiro desafio
	app.get("/challenge/1", function (req, res){
		//renderiza ejs

	});
}

/*
muiti salas:
pedir o ip ou o numero do jogador ou realmente a sala sempre q receber um recebe
um request

identificar qual o jogador e qual a sala do jogador e rotornar a informação
correta para ele


*/
