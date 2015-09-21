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
app.paddle2Y = 250;

app.paddleThickness = 10;
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
		app.paddle2Y = mousePos.y - (app.paddleHeight/2);
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
	// paddle 1
	app.drawSprites('#fff', 10, app.paddle1Y, app.paddleThickness, 100);
	// paddle 2
	app.drawSprites('#fff', app.canvas.width - 20, app.paddle2Y, app.paddleThickness, 100);

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
// COMPUTER MOVEMENT FUNCTION
// ============================
app.computerMovement = function(){


}

// ============================
// MOVEMENT FUNCTION
// ============================
app.movement = function(){
	//animate the ball
	app.ballX += app.ballSpeedX;
	app.ballY += app.ballSpeedY;

	//computer movement
	app.computerMovement();

	//bounce off right wall
	if (app.ballX >= app.canvas.width){
		if (app.ballY > app.paddle2Y && app.ballY < app.paddle2Y + app.paddleHeight ){
			app.ballSpeedX = -app.ballSpeedX;
		}else{
			//app.ballSpeedX = -app.ballSpeedX;
			app.ballReset();
		}
	}
	//bounce off left wall
	if (app.ballX <= 0){
		if (app.ballY > app.paddle1Y && app.ballY < app.paddle1Y + app.paddleHeight ){
			app.ballSpeedX = -app.ballSpeedX;
		}else{
			//app.ballSpeedX = -app.ballSpeedX;
			app.ballReset();
		}
		
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
// BALL RESET FUNCTION
// ============================
app.ballReset = function(){
	//reset ball in center
	app.ballX = app.canvas.width/2;
	app.ballY = app.canvas.height/2;
	//change direction
	app.ballSpeedX = -app.ballSpeedX;

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













