let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 4;
let dy = -4;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 175;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;

let brickRowCount = 4;
let brickColumnCount =10;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 15;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;
let lives = 3;

let bricks = [];
for(let c=0; c<brickColumnCount; c++){
    bricks[c]=[];
    for(let r=0; r<brickRowCount; r++){
        bricks[c][r] = { x:0, y:0, status:1}
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function collisionDetection(){
    for(let c=0;c<brickColumnCount;c++){
        for(let r=0;r<brickRowCount;r++){
            let b = bricks[c][r];
            if(b.status == 1){
            if(x >b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                dy = -dy;
                b.status = 0;
                score++
                if(score == brickRowCount*brickColumnCount){
                    alert('YOU WIN, GZ');
                    document.location.reload();
                    requestAnimationFrame(draw);
                }
                }
            }
        }
    }
}
 function drawScore(){
     ctx.font = '16px Arial';
     ctx.fillStyle = 'black';
     ctx.fillText("Score: "+score, 8, 20)
 }

 function drawLives() {
     ctx.font = '16px Arial';
     ctx.fillStyle = 'black';
     ctx.fillText("Lives: "+lives, canvas.width-65,20);
 }

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

let drawBall = () => {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.closePath();
}

let drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = 'limegreen'
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for ( let c=0;c<brickColumnCount;c++){
        for(let r=0;r<brickRowCount;r++){
            if(bricks[c][r].status == 1){
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle = 'black'
            ctx.fill();
            ctx.closePath;
            }
        }
    }
}


let draw = ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    drawLives();
    if(y+dy < ballRadius){
    dy = -dy;
    } else if (y+dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy - 1;
            dx = dx + 1;
        } else {
            lives--;
            if(!lives){
        alert("GAME OVER");
        document.location.reload();
        requestAnimationFrame(draw);
            }else{
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 4;
                dy = -4;
                paddleX = (canvas.width-paddleWidth)/2
            }
    }
}
    if(x+dx > canvas.width-ballRadius || x +dx < ballRadius){
    dx = -dx
    }
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;
    } else if (leftPressed && paddleX > 0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}


// let interval = setInterval(draw,10)

draw()