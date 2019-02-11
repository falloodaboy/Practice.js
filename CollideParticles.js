/**
 *  Sample for collision detection of particles and mouse detection.
 *  author: Zohaib Wasim
 */




var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var winheight = window.innerHeight*0.99;
var winwidth= window.innerWidth*0.99;
canvas.height = winheight;
canvas.width = winwidth;



function clear(){
	
	var c = ctx;
	c.clearRect(0,0,winwidth,winheight);
	
}
 var mouse = {
		 x: undefined,
		 y:undefined
 };
 canvas.addEventListener("mousemove", function(event){
	 mouse.x = event.pageX;
	 mouse.y = event.pageY;

 });
 canvas.addEventListener("mouseout", function(event){
	 mouse.x = undefined;
	 mouse.y = undefined;
	 
 });
 
function distance(x1,y1,x2,y2){
	xDistance = x2 - x1;
	yDistance = y2 - y1;
	
		return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


function Particle(x,y,dx,dy,radius,color){

this.x = x;
this.y = y;
this.dx = dx;
this.dy = dy;
this.radius = radius;
this.color = color;
	this.draw = function(){
		var c = ctx;
		c.beginPath();
		c.arc(this.x, this.y, this.radius,0, Math.PI*2, false);
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
		for(let i = 0; i < particles.length; i++){
			if(this === particles[i]) continue;
			if(distance(this.x,this.y, particles[i].x, particles[i].y) - this.radius*2 < 0 ){
				
			}
			
		}
	}

	
	this.update = function(particle){

		this.draw();
		if((this.x + this.radius) >= winwidth || (this.x - this.radius) <= 0){
			this.dx = -this.dx;

		}
		if((this.y + this.radius) >= winheight || (this.y - this.radius) <= 0 ){
			this.dy = -this.dy;
		}
	
		if((mouse.x) -this.x < 50 && (mouse.x) -this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			this.radius += 1;
			if(this.radius >= 30){
				this.radius = 30;
			}
		}else if(this.radius > 10){
			this.radius -= 1;
		}
		
		this.x += this.dx;
		this.y += this.dy;
		
	};
}

let particles;
function init(){
	particles = [];
	
	for(var i = 0; i < 500; i++){
		const radius = 10;
		let x = Math.random()  * (canvas.width - radius*2) + radius;
		let y = Math.random()  * (canvas.height - radius*2) + radius;
		const color = "yellow";
		const dx = Math.random()*2;
		const dy = Math.random()*2;
		
		if(i !== 0 ){
			for(var j = 0; j < particles.length; j++){
				if(distance(x,y, particles[j].x, particles[j].y) - radius*2 <= 0){
					x = Math.random() * (winwidth - (radius*2)) ;
					y = Math.random() * (winheight -  (radius*2));
					
					j = 0;
				}
			}
		}
		
		particles.push(new Particle(x,y,dx,dy,radius,color));
	}
}
//var p1 = new Particle(50,50,2,-2,10, "#000FFF");

function animate(){
	
	clear();
	ctx.fillStyle= "#00ffff";
	ctx.fillRect(0,0,winwidth,winheight);
	requestAnimationFrame(animate);
	
	particles.forEach(function(particles){
		particles.update(particles);
		
	});
};
init();
animate();
