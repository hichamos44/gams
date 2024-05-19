const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const playerWidth = 50;
const playerHeight = 50;
const playerSpeed = 5;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height - playerHeight - 10;
let leftPressed = false;
let rightPressed = false;
let obstacles = [];
let obstacleSpeed = 2;
let score = 0;
let gameOver = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    }
    else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    }
    else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawPlayer() {
    context.beginPath();
    context.rect(playerX, playerY, playerWidth, playerHeight);
    context.fillStyle = '#00F';
    context.fill();
    context.closePath();
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        context.beginPath();
        context.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        context.fillStyle = '#F00';
        context.fill();
        context.closePath();
    });
}

function movePlayer() {
    if(rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
    else if(leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
}

function generateObstacles() {
    if(Math.random() < 0.02) {
        let obstacleWidth = Math.random() * 50 + 20;
        let obstacleX = Math.random() * (canvas.width - obstacleWidth);
        obstacles.push({ x: obstacleX, y: 0, width: obstacleWidth, height: 20 });
    }
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });
}

function checkCollisions() {
    obstacles.forEach((obstacle, index) => {
        if(playerX < obstacle.x + obstacle.width &&
            playerX + playerWidth > obstacle.x &&
            playerY < obstacle.y + obstacle.height &&
            playerY + playerHeight > obstacle.y) {
            gameOver = true;
        }
    });
}

function updateScore() {
    score += 1;
    document.title = `Score: ${score}`;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    if(gameOver) {
        context.font = '48px Arial';
        context.fillStyle = '#FFF';
        context.fillText('Game Over', canvas.width / 4, canvas.height / 2);
    }
}

function update() {
    if(!gameOver) {
        movePlayer();
        generateObstacles();
        moveObstacles();
        checkCollisions();
        updateScore();
        draw();
        requestAnimationFrame(update);
    }
}

update();
