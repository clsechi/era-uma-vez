var myGamePiece;

var batmanIcon = new Image();
batmanIcon.src = 'assets/batmanIcon32.png';

function initGB() {
	myGBArea.start();
	myGamePiece = new component(30, 30, "red", 0, 0);
}

var myGBArea = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 1200;
		this.canvas.height = 50;
		this.ctx = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval = setInterval (updateGB, 500);
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
    	ctx = myGBArea.ctx;
    	ctx.fillStyle = color;
    	ctx.drawImage(batmanIcon, this.x, this.y,);
    }
}

function updateGB() {
    myGBArea.clear();
    myGamePiece.x += 1;
    myGamePiece.update();
}

initGB();