// Game constants & variables

let inputDir = {x: 0, y: 0};
const eatingSound = new Audio('Audio/eating.mp4');
const moveSound = new Audio('Audio/angle.mp3');
const deadSound = new Audio('Audio/dead.mp4');
let lrtime = 0;
let speed = 12;
let score = 0;
let snakeArr = [
    {x: 13,y: 15}
];
let foodObj = {x: 6,y: 7};







// Game functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lrtime)/1000 < 1/speed){
        return;
    }
    lrtime = ctime;
    gameEngine();
}

function isCollide(sarr){
    // if u bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if (sarr[i].x === snakeArr[0].x && sarr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // if u bump into wall
    if (sarr[0].x >22 || sarr[0].x <=0 || sarr[0].y >22 || sarr[0].y <=0){
            return true;
        }
    
}

function gameEngine(){
    // part 1 updating the snake array and food
    //gameover
    if(isCollide(snakeArr)){
        deadSound.play();
        inputDir = {x: 0,y: 0};
        alert('Game Over. Press any Key To Play Again');
        snakeArr = [{x: 13,y: 15}];
        let c = 5;
        let d = 15;
        foodObj = {x: Math.round(c+(d-c)*Math.random()), y: Math.round(c+(d-c)*Math.random())};
        score = 0;
        scr.innerHTML = "Score: " + score;
        
    }
    // if food eaten then increment the score and regenerate the food

    if(snakeArr[0].y===foodObj.y && snakeArr[0].x===foodObj.x){
        eatingSound.play();
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 18;
        foodObj = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
        score += 1;
        scr.innerHTML = "Score: " + score;
    }

    // moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2 rendering the snake and food 
    board.innerHTML = '';

    // snake display
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
    })
    // food display
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodObj.y;
    foodElement.style.gridColumnStart = foodObj.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





// Main Logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    switch (e.key) {
        case "w":
            if (inputDir.y!==0) break;
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.pause();
            moveSound.play();
            break;
        case "d":
            if (inputDir.x!==0) break;
            inputDir.x = 1;
            inputDir.y = 0;
            moveSound.pause();
            moveSound.play();
            break;
        case "a":
            if (inputDir.x!==0) break;
            inputDir.x = -1;
            inputDir.y = 0;
            moveSound.pause();
            moveSound.play();
            break;
        case "s":
            if (inputDir.y!==0) break;
            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.pause();
            moveSound.play();
            break;
        default:
            break;
    }
})
