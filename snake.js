const canvas = document.getElementById("board");

const ctx = canvas.getContext('2d');

let snake = {
    positionsX: [80,60,40],
    positionsY: [100,100,100],
    size : 3,
    direction: 6
}

const speed = 70;
let score = 0;
let loose = false;
let keyFlag = true;
let food = {
    x: 0 ,
    y : 0
}
document.onkeydown = checkKey;

function init(){
    loose = false;
    score = 0;
    keyFlag = true;
    snake.positionsX = [80,60,40];
    snake.positionsY = [100,100,100];
    snake.size = 3 ;
    snake.direction = 6;
}
function checkKey(e) {

    e = e || window.event;
    if(loose){
        init();  
    }
    else{
        if(keyFlag){
            keyFlag = false;
            switch(e.keyCode){
                case 38:
                    if(snake.direction != 2)
                        snake.direction = 8;
                    break;
                case 40:
                    if(snake.direction != 8)
                        snake.direction = 2;
                    break;
                case 37:
                    if(snake.direction != 6)
                        snake.direction = 4;
                    break;
                case 39:
                    if(snake.direction != 4)
                        snake.direction = 6;
                    break;
            }
        }
    }
    

}

function move(){

    for(let i = snake.size ; i > 1 ; i--){
        snake.positionsX[i-1] = snake.positionsX[i-2];
        snake.positionsY[i-1] = snake.positionsY[i-2];
        
    }

    switch(snake.direction){
        case 8:
            snake.positionsY[0] =  (snake.positionsY[0] - 20 + canvas.height) % canvas.height;
            break;
        case 2:
            snake.positionsY[0] = (snake.positionsY[0] + 20) % canvas.height ;
            break;
        case 6:
            snake.positionsX[0] = (snake.positionsX[0] + 20) % canvas.width ;
            break;
        case 4:
            snake.positionsX[0] = (snake.positionsX[0] - 20 + canvas.width) % canvas.width ;
            break;
    }
}

function checkFood(){

    if(snake.positionsX[0] == food.x && snake.positionsY[0] == food.y){
        snake.size = snake.size +1
        score++;
 
        food.y = (Math.floor(Math.random() * (canvas.height)) % 20 ) * 20
        food.x = (Math.floor(Math.random() * (canvas.width)) % 20) * 20
    }
}
function loop() {
    redraw();
    keyFlag = true;
    checkAutoEat();
    if(!loose){
        move();
        checkFood();
    }
    else{
        ctx.clearRect(food.x, food.y, 20, 20);
        document.getElementById("score").textContent = "YOU LOOSE :(";
    }
  }

let interval = setInterval(loop, speed);

function redraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFF12"
    ctx.strokeStyle = 'white';
    ctx.fillRect(snake.positionsX[0], snake.positionsY[0], 20, 20);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#9EFF12"
    for(let i = 1 ; i< snake.size ; i++){
        ctx.fillRect(snake.positionsX[i], snake.positionsY[i], 20, 20);
    }
    ctx.fillStyle = "#FB240E"
    ctx.fillRect(food.x, food.y, 20, 20);
    
    document.getElementById("score").textContent = "SCORE: " +score
}

function checkAutoEat(){
    let x = snake.positionsX[0];
    let y = snake.positionsY[0];

    for(let i = 2 ; i < snake.size ; i++){
        if(x == snake.positionsX[i] && y == snake.positionsY[i]){
            loose = true;
        }       
    }
}
