// ============================
// DOCUMENT READY FUNCTION
// ============================
window.onload = function(){
	console.log('Document Ready!');
	app.init();
}
// ============================
//GLOBAL APP OBJECT & VARIABLES
// ============================
var app = {}

//canvas element
app.canvas;
app.ctx;
//ball
app.ballX = 50;
app.ballY = 50;
app.ballSpeedX = 10;
app.ballSpeedY = 4;
//paddles
app.paddle1Y = 250;
app.paddleHeight = 100;

// ============================
//INIT FUNCTION
// ============================
app.init = function(){
	app.gameStart();
}
// ============================
// GAMESTART FUNCTION
// ============================
app.gameStart = function(){
	// set up canvas and context
	app.canvas = document.getElementById('game-canvas');
	app.ctx = app.canvas.getContext('2d');

	//set asset refresh rate
	var framesPerSecond = 30;
	//call the gameloop 30x per second
	setInterval(app.gameLoop, 1000/framesPerSecond);

	//mouse position
	app.canvas.addEventListener('mousemove', function(evt){
		var mousePos = app.mousePosition(evt);
		app.paddle1Y = mousePos.y - (app.paddleHeight/2);
	});
}
// ============================
// GAMELOOP FUNCTION
// ============================
app.gameLoop = function(){
	app.drawAssets();
	app.movement();
}
// ============================
// DRAWASSETS FUNCTION
// ============================
app.drawAssets = function(){
	// game board (x-pos, y-pos, width, height)
	app.drawSprites('#383838', 0, 0, app.canvas.width, app.canvas.height);
	// ball
	app.drawCircle('#fff', app.ballX, app.ballY, 10);
	// paddle
	app.drawSprites('#fff', 10, app.paddle1Y, 10, 100);
}
// DRAWSPRITE FUNCTION
app.drawSprites = function(color, posX, posY, width, height){
	app.ctx.fillStyle = color;
	app.ctx.fillRect(posX, posY, width, height);
}
// DRAWCIRCLE FUNCTION
app.drawCircle = function(color, centerX, centerY, radius){
	app.ctx.fillStyle = color;
	app.ctx.beginPath();
	app.ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	app.ctx.fill();
}

// ============================
// MOVEMENT FUNCTION
// ============================
app.movement = function(){
	app.ballX = app.ballX + app.ballSpeedX;
	app.ballY = app.ballY + app.ballSpeedY;

	//bounce off right wall
	if (app.ballX >= app.canvas.width){
		app.ballSpeedX = -app.ballSpeedX;
	}
	//bounce off left wall
	if (app.ballX <= 0){
		app.ballSpeedX = -app.ballSpeedX;
	}
	//bounce off bottom wall
	if (app.ballY >= app.canvas.height){
		app.ballSpeedY = -app.ballSpeedY;
	}
	//bounce off top wall
	if (app.ballY <= 0){
		app.ballSpeedY = -app.ballSpeedY;
	}
}
// ============================
// MOUSEPOSITION FUNCTION
// ============================

app.mousePosition = function(evt){
	//get the mouse pos relative to the canvas
	var rect = app.canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x: mouseX,
		y: mouseY
	}


}













