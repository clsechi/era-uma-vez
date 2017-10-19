//propriedades dos blocos que serão utilizados na fase
Blockly.Blocks['avancar'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("avance");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
	}
};

Blockly.Blocks['turnleft'] = {
	init: function() {
		this.appendDummyInput()
		.appendField("vire à ESQUERDA");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(90);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['turnright'] = {
	init: function() {
		this.appendDummyInput()
		.appendField("vire à DIREITA");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['repeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repetir até o Pokémon");
    this.appendStatementInput("repeticao")
        .setCheck(null)
        .appendField("faça");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_until'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repita ")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], ["9","9"], ["10","10"]]), "until")
        .appendField("vezes");
    this.appendStatementInput("repeticao")
        .setCheck(null)
        .appendField("faça");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("se caminho à frente");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("faça");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//acende os blocos
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

function highlightBlock(id) {
	workspace.highlightBlock(id);
}

//generators
Blockly.JavaScript['avancar'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = 'if(getGameStatus()){\nsetNewPosition();\n}\n';
	return code;
};

Blockly.JavaScript['turnleft'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(getGameStatus()){\nsetDirectionLEFT();\n}\n';
  return code;
};

Blockly.JavaScript['turnright'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(getGameStatus()){\nsetDirectionRIGHT();\n}\n';
  return code;
};

Blockly.JavaScript['repeat'] = function(block) {
  var statements_repeticao = Blockly.JavaScript.statementToCode(block, 'repeticao');
  // TODO: Assemble JavaScript into code variable.
  // @repMax trata loops infinitos
  var code = ' var repMax = 15;\nwhile(checkChallengeBlock() && repMax > 0 && getGameStatus()) {\n repMax--;\n' + statements_repeticao + '\n}\n';
  return code;
};

Blockly.JavaScript['repeat_until'] = function(block) {
  var dropdown_until = block.getFieldValue('until');
  var statements_repeticao = Blockly.JavaScript.statementToCode(block, 'repeticao');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(getGameStatus()){\nfor (var i = 0; i < ' + dropdown_until + '; i++) {\n' + statements_repeticao + '}\n}\n';
  return code;
};

//nao implementado
Blockly.JavaScript['if'] = function(block) {
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if (checkChallengeBlock()) {\n' + statements_do + '};\n';
  return code;
};

// cria a toolbox com o blocos definidos acima e no XML inserido no HTML
/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse : false, 
	comments : false, 
	disable : false, 
	maxBlocks : numberMaxBlocks, //define numero maximos de blocos
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars : false, 
	sounds : true, 
	oneBasedIndex : true
};

/* Inject your workspace */ 
var workspace = Blockly.inject(blocklyDiv, options);

//trata a execucao correta dos blocos conforme interacao do usuario
var keepGame = true;

function disableBlocks(){
	keepGame = false;
}

function enableBlocks(){
	keepGame = true;
}

function getGameStatus() {
	return keepGame;
}

//define nuemro maximo de blocos no workspace
var maxNumberBlocks = 5;

//quando altera o workspace muda o numero maximo de blocos
function onChange(event) {
	document.getElementById('capacity').textContent = workspace.remainingCapacity();
}

//adiciona os eventos
workspace.addChangeListener(onChange);
onChange();

// interpretracao dos blocos
Blockly.JavaScript.addReservedWords('code');

var myInterpreter;

//transforma os blocos em codigo e excuta as funcoes do p5
function runBlocks (){
	var code = 'resetGame();\n';
	code += 'enableBlocks();\n';
	code += Blockly.JavaScript.workspaceToCode(workspace);	
	code += 'checkAnswer();\n';
	console.log(code);

	//salva o codigo do usario no json
	//o codigo correto sera enviado para o banco
	playerInfo.Code = code;

	myInterpreter = new Interpreter(code, initApi);
	nextStep();
}

//define o tempo entre a execucao dos blocos
function nextStep() {
	if (myInterpreter.step()) {
		window.setTimeout(nextStep, 30);
	}
}

//adiciona a funções do p5 no interpretador do Blockly
function initApi(interpreter, scope) {

	//interpreter.setProperty(scope, 'LEFT', String(location));
	//interpreter.setProperty(scope, 'RIGHT', String(location));
	
	//add setNewPosition to interpreter
	var wrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(setNewPosition());
	};
	interpreter.setProperty(scope, 'setNewPosition',
		interpreter.createNativeFunction(wrapper));

	//add setDirectionRIGHT
	var wrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(setDirectionRIGHT());
	};
	interpreter.setProperty(scope, 'setDirectionRIGHT',
		interpreter.createNativeFunction(wrapper));

	//add setDirectionLEFT
	var wrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(setDirectionLEFT());
	};
	interpreter.setProperty(scope, 'setDirectionLEFT',
		interpreter.createNativeFunction(wrapper));

	//add checkAnswer
	var wrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(checkAnswer());
	};
	interpreter.setProperty(scope, 'checkAnswer',
		interpreter.createNativeFunction(wrapper));

	//add resetGame
	var wrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(resetGame());
	};
	interpreter.setProperty(scope, 'resetGame',
		interpreter.createNativeFunction(wrapper));

	//add checkChallengeBlock used in WHILE block
	var wrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(checkChallengeBlock());
	};
	interpreter.setProperty(scope, 'checkChallengeBlock',
		interpreter.createNativeFunction(wrapper));

	//add getGameStatus
	var wrapper = function(text) {
	text = text ? text.toString() : '';
	return interpreter.createPrimitive(getGameStatus());
	};
	interpreter.setProperty(scope, 'getGameStatus',
		interpreter.createNativeFunction(wrapper));

	//add enableBlocks
	var wrapper = function(text) {
	text = text ? text.toString() : '';
	return interpreter.createPrimitive(enableBlocks());
	};
	interpreter.setProperty(scope, 'enableBlocks',
		interpreter.createNativeFunction(wrapper));

	// Add an API function for highlighting blocks.
	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(workspace.highlightBlock(id));
	};
	interpreter.setProperty(scope, 'highlightBlock',
		interpreter.createNativeFunction(wrapper));
}

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e5roko