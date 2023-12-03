const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const ball = document.getElementById('ball');

let ballX = 300;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;

let leftPaddleY = 160;
let rightPaddleY = 160;
const paddleSpeed = 10;

function updateGame() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce the ball off the top and bottom walls
  if (ballY < 0 || ballY > 390) {
    ballSpeedY = -ballSpeedY;
  }

  // Bounce the ball off the paddles
  if (
    (ballX < 20 && ballY > leftPaddleY && ballY < leftPaddleY + 80) ||
    (ballX > 570 && ballY > rightPaddleY && ballY < rightPaddleY + 80)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Move the paddles
  if (leftPaddleY > 0 && leftPaddleY < 320) {
    if (wKey) {
      leftPaddleY -= paddleSpeed;
    }
    if (sKey) {
      leftPaddleY += paddleSpeed;
    }
  }

  if (rightPaddleY > 0 && rightPaddleY < 320) {
    if (upKey) {
      rightPaddleY -= paddleSpeed;
    }
    if (downKey) {
      rightPaddleY += paddleSpeed;
    }
  }

  // Update the positions
  leftPaddle.style.top = leftPaddleY + 'px';
  rightPaddle.style.top = rightPaddleY + 'px';
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

function gameLoop() {
  updateGame();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

let wKey = false;
let sKey = false;
let upKey = false;
let downKey = false;

function handleKeyDown(e) {
  switch (e.key) {
    case 'w':
      wKey = true;
      break;
    case 's':
      sKey = true;
      break;
    case 'ArrowUp':
      upKey = true;
      break;
    case 'ArrowDown':
      downKey = true;
      break;
  }
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'w':
      wKey = false;
      break;
    case 's':
      sKey = false;
      break;
    case 'ArrowUp':
      upKey = false;
      break;
    case 'ArrowDown':
      downKey = false;
      break;
  }
}

gameLoop();
