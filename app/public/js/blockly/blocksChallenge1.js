		
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

//acende os blocos
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

function highlightBlock(id) {
	workspace.highlightBlock(id);
}

//generators
Blockly.JavaScript['avancar'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = 'setNewPosition();\n';
	return code;
};

/*
Blockly.JavaScript['vire'] = function(block) {
	var dropdown_definedirecao = block.getFieldValue('defineDirecao');
	dropdown_definedirecao = dropdown_definedirecao.toString();
	// TODO: Assemble JavaScript into code variable.
	var code = 'setDirection(' + dropdown_definedirecao + ');\n';
	return code;
};*/

Blockly.JavaScript['turnleft'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'setDirectionLEFT();\n';
  return code;
};

Blockly.JavaScript['turnright'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'setDirectionRIGHT();\n';
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
	maxBlocks : 5, //define numero maximos de blocos
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
	code += Blockly.JavaScript.workspaceToCode(workspace);
	code += 'checkAnswer();\n';
	console.log("this code:\n" +code);

	myInterpreter = new Interpreter(code, initApi);
	nextStep();
}

//define o tempo entre a execucao dos blocos
function nextStep() {
	if (myInterpreter.step()) {
		window.setTimeout(nextStep, 100);
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

	// Add an API function for highlighting blocks.
	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(workspace.highlightBlock(id));
	};
	interpreter.setProperty(scope, 'highlightBlock',
		interpreter.createNativeFunction(wrapper));
}

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#w3hr7z