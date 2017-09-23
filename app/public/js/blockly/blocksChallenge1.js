
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

Blockly.Blocks['vire'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("vire à")
        .appendField(new Blockly.FieldDropdown([["direita","right"], ["esquerda","left"]]), "defineDirecao");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// cria a toolbox com o blocos definidos acima e no XML inserido no HTML
/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");

var options = { 
  toolbox : toolbox, 
  collapse : false, 
  comments : false, 
  disable : false, 
  maxBlocks : Infinity, 
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

/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. */
Blockly.Xml.domToWorkspace(workspace, workspaceBlocks);


//funcoes que ligam o blockly ao p5
/*

Blockly.JavaScript['avancar'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['vire'] = function(block) {
  var dropdown_definedirecao = block.getFieldValue('defineDirecao');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};*/

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#79y55r