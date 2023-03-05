const foodAudio=new Audio("eatingNew.mp3")
const end=new Audio('end.mp3')
let inputDir = {x: 0, y: 0};    
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 3/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function restart(){
    document.getElementById('status').innerHTML="";
}
function isCollide(snake) {
    // bump  itself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameEngine(){
    
    if(isCollide(snakeArr)){
        inputDir =  {x: 0, y: 0}; 
        end.play();
        /*alert("GAME OVER. Click OK to play again!");*/
        document.getElementById('status').innerHTML="GAME OVER";
        var b=document.createElement('button');
        b.innerHTML="Replay";
        document.getElementById('status').appendChild(b);
        b.style.marginLeft="30px";
        b.style.width="60px";
        b.style.height="30px";
        b.style.backgroundColor="green";
        b.style.fontFamily="Coiny, cursive";
        b.style.color="black";
        b.addEventListener('click',restart);
        
        snakeArr = [{x: 13, y: 15}];
        score = 0;
    }
    // If eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodAudio.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("Topscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Topscore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    
    }

    // Moving the snake
    
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


//Main logic
let hiscore = localStorage.getItem("Topscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("Topscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Topscore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
function func1(){
    window.open("index.html")

}