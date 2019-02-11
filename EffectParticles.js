/**
 * Testing of effects on particulate motion in canvas, javascript.
 */

var canvas = document.getElementById("canvas");
// var dx = Math.random()* 0.5;
// var dy = Math.random()*0.5;
var fps = 60;
var canwidth = window.innerWidth*.99;
var canheight = window.innerHeight*0.99;
var friction  = 0.79;
var gravity = 1.0;
var ctx = canvas.getContext("2d");
canvas.width = canwidth;
canvas.height = canheight;

function clearCanvas(){
	ctx.clearRect(0,0,canwidth,canheight);
}

function Ball(x,y,radius,dx,dy,color){
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.dx = dx;
	this.radius = radius;
	this.color = color;
	this.update = function(){
		
		//effects of gravity on 2 di mo.
		if(this.y + this.radius + this.dy > canheight){
			this.dy = -this.dy * friction;
			this.dx = this.dx* friction;
		}
		else {
			this.dy += gravity;
		}
		//containing in canvas
		if(this.x - this.radius <= 0 || this.x + this.radius >= canwidth){
			this.dx = -this.dx;
		}

		this.x += this.dx;
		
		
		this.y += this.dy;
		this.draw();
		
	};
	
	this.draw = function(){
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	};
}
var ballArray = [];
function init() {
	for(var i=0; i < 100; i++){
		const radius = 30;
		var x = Math.random()*(canwidth - (radius*2)) + radius;
		var y = Math.random()*(canheight - (radius*2)) + radius;
		var dx = Math.random()*5;
		var dy = Math.random()*5;
		var red = Math.random()*250;
		var green = Math.random()*250;
		var blue = Math.random()*250;
		var color = "rgba("+red.toFixed(0)+","+green.toFixed(0)+","+blue.toFixed(0)+",1.0)";
		ballArray.push(new Ball(x,y,radius,dx,dy,color));
	}
	
}


function animate(){
	clearCanvas();
	ctx.fillStyle= "cyan";
	ctx.fillRect(0,0,canwidth,canheight);
	requestAnimationFrame(animate);
	
	ballArray.forEach(function(ballArray){
		ballArray.update(ballArray);
	});
}
init();
animate();