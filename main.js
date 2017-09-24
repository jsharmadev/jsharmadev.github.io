var paddle;
var ball;

function setup(){
    createCanvas(500, 500);
    paddle = new Paddle();
    ball = new Ball();
}

function draw(){
    background(255);

    // paddle functions...
    paddle.display();
    paddle.update();
    paddle.checkEdges();

    //ball functions...
    ball.display();
    ball.update();
    ball.checkEdges();
}

// the paddle object...
function Paddle(){
    this.w = 160;
    this.h = 20;

    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.pos = createVector((width / 2) - (this.w / 2), height - 40);

    this.display = function(){
        stroke("#E91E63");
        fill(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }
    
    this.move = function(step){
        this.pos.x += step;
    }

    this.update = function(){
        if(this.isMovingLeft){
            this.move(-6);
        }else if(this.isMovingRight){
            this.move(6);
        }
    }

    this.checkEdges = function(){
        if(this.pos.x < 0 ) this.pos.x = 0;
        else if(this.pos.x > width - this.w) this.pos.x = width - this.w;
    }
}

function Ball(){
    this.pos = createVector(width/2, height/2);
    this.r = 20;
    this.direction = createVector(1,1);
    this.velocity = createVector(1,1).mult(2);

    this.display = function(){
        ellipse(this.pos.x , this.pos.y, this.r * 2, this.r * 2);
    };

    this.update = function(){
        this.pos.x += this.velocity.x * this.direction.x;
        this.pos.y += this.velocity.y * this.direction.y;
    };

    this.checkEdges = function(){
        
        if(this.pos.y < this.r && this.direction.y < 0)
            this.direction.y *= -1;
        else if(this.pos.y > height - this.r && this.direction.y >0)
            this.direction.y *= -1;
        else if(this.pos.x < this.r && this.direction.x < 0)
            this.direction.x *= -1;
        else if(this.pos.x > height - this.r && this.direction.x >0)
            this.direction.x *= -1;    
    }

}

function keyPressed(){
    if(keyCode === LEFT_ARROW){
        paddle.isMovingLeft = true; 
    }else if(keyCode === RIGHT_ARROW){
        paddle.isMovingRight = true;
    }
}

function keyReleased(){
    paddle.isMovingLeft = false;
    paddle.isMovingRight = false;
}