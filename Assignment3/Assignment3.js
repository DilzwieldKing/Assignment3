//Joseph Eiles
//3152600

//Sources:

//Classes, constructors, and methods:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

//Measuring distance between two points:
//https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas

//Previous assignment in P5.JS in which I took inspiration from:
//https://codepen.io/JosephME/pen/jexOeb

//KNOWN LIMITATIONS:
//Sometimes the ball spawns inside or too close to each other, in this case refresh the page to trigger new spawn coordinates for the balls

var canvas;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var w = 600;
var h = 600;

var composition = [];

//Class that represents a ball which is drawn onto the screen
class MyBall {
    
    //Class constructor and variables
    constructor(x, speedx, y, speedy, r, s, e, c, a)
    {
        this.x = x;
        this.speedx = speedx;
        this.y = y;
        this.speedy = speedy;
        this.r = r;
        this.s = s;
        this.e = e;
        this.c = c;
        this.a = a;
        this.isColliding = false;
        this.fillColor = 'white';
    }
    
    //Updates the x & y coordinates of each specific object
    updateData()
    {
        this.x += this.speedx;
        this.y += this.speedy;

        if(this.x+this.r > w || this.x-this.r < 0){this.speedx *= -1};
        if(this.y+this.r > h || this.y-this.r < 0){this.speedy *= -1};
    }

    //Draws the ball
    drawCircle()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.s, this.e);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }
    
    //Draws the lines
    drawQuad()
    {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
    
    //Checks for collisions between two balls and changes ball characteristics such as color and direction
    checkCollision()
    {

        for(var i = 0; i < composition.length; i++)
        {
            var otherBall = composition[i];
            if ( otherBall != this) 
            {
                
                var dist = Math.sqrt( Math.pow((this.x-otherBall.x), 2) + Math.pow((this.y-otherBall.y), 2) );
                
                //Draws lines
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(otherBall.x, otherBall.y);
                ctx.strokeStyle = 'red';
                ctx.stroke();
                
                //If there is a collision between two balls then change color and direction
                if(dist < this.r + otherBall.r)
                {
                    this.speedx *= -1;
                    this.speedy *= -1;
                    this.isColliding = true;
                    otherBall.isColliding = true;
                    this.fillColor = 'red';
                    otherBall.fillColor = 'red';
                    console.log("hit");
                }
                else
                {
                    this.isColliding = false;
                    otherBall.isColliding = false;
                } 
            }
        }  
    }
}



//Initializion calls
setupCanvas();
ballSpawn(5);
setInterval(animationLoop, 30);

//Setup canvas initial state
function setupCanvas(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto";
    canvas.style.border = "6px solid red";    
    canvas.width = w;
    canvas.height = h;
}

//Function for spawning new balls.
function ballSpawn(num){
    
    for(var i = 0; i < num; i++){
        
        var newBall = new MyBall( 
            w/2+random(200),
            nRandom(10),
            h/2+random(200),
            nRandom(10),
            20,
            0,
            2*Math.PI,
            200,
            0.5
            );
        
        //Pushes new ball into the array
        composition.push(newBall);
    }
}

//Generates a number within a range
function random(range){
    var r = Math.random()*range;
    return r
}

//Generates a negative number within a range
function nRandom(range){
	var r = Math.random()*range - (range/2); 
	return r
}

//Animation loop. 
function animationLoop(){
    clear();
    //For each ball in the collection call the class methods
    for(var i = 0; i < composition.length; i++)
    {
        var currentBall = composition[i];
        currentBall.drawCircle();
        currentBall.drawQuad();
        currentBall.updateData();
        currentBall.checkCollision();
    }
}

//Clears the canvas
function clear(){
	ctx.clearRect(0, 0, w, h); 
}
