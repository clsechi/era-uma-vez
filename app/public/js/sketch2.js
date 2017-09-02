//Carlos Sechi

//p5.play

function drawGame(p) {

	var x = 100; 
	var y = 100;
	p.setup = function() {
		p.createCanvas(400, 200);
	};

	p.draw = function() {
		p.background(0);
		p.fill(255);
		p.rect(x,y,50,50);
	}


}

var myP5 = new p5(drawGame, 'canvas1');

var drawGB = function(p){

	var x = 100.0; 
	var y = 100; 
	var speed = 2.5; 
	p.setup = function() {
		p.createCanvas(400, 200);
	};

	p.draw = function() {
		p.background(100);
		p.fill(1);
		x += speed; 
		if(x > p.width){
			x = 0; 
		}
		p.ellipse(x,y,50,50);

  }
}

	/*

	GB.setup = function() {
		GB.createCanvas(400, 200);
		GB.createSprite(400, 200, 50, 50);
	}

	function draw() {
		GB.background(255,255,255);
		GB.drawSprites();

	}*/



var myP5 = new p5(drawGB, 'canvas2');



/*

function player(){
	pl= createSprite(200, 200, 100 ,100);
	pl.addImage(linuxImg);

	this.move = function(direction) {
		pl.position.x = mouseX;
		pl.position.y = mouseY;

	}
  
}


canvas 400X400

noStroke



	box = createSprite (270, 200);
	box.addImage(iron);
	//box.setCollider("rectangle", 0, 26, 75,75);


adicionando grupos de sprites

 for(var i=0; i<4; i++)
	{
	var box = createSprite(random(0, width), random(0,height));
	box.addAnimation("normal", "assets/box0001.png", "assets/box0003.png");
	obstacles.add(box);
	}


	*/
