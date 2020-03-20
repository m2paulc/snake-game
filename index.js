import Snake from './snake.js';

const backgroundCvs = document.querySelector('#backgroundCanvas');
const backgroundCtx = backgroundCvs.getContext("2d");
const cvs = document.querySelector("#uiCanvas");
const ctx = cvs.getContext("2d");
const scale = 10;

function backgroundDraw() {
  backgroundCtx.clearRect(0, 0, backgroundCvs.width, backgroundCvs.height);
  backgroundCtx.fillStyle = "#cecece";
  backgroundCtx.fillRect(0, 0, backgroundCvs.width, backgroundCvs.height);
}

function keyDirections() {
  let currentDirection = "";
  window.addEventListener("keydown", e => {
    if (
      (e.key === "ArrowLeft" || e.which === 37) &&
      currentDirection !== "right"
    ) {
      snake.move(-1, 0);
      currentDirection = "left";
    }
    if (
      (e.key === "ArrowUp" || e.which === 38) &&
      currentDirection !== "down"
    ) {
      snake.move(0, -1);
      currentDirection = "up";
    }
    if (
      (e.key === "ArrowRight" || e.which === 39) &&
      currentDirection !== "left"
    ) {
      snake.move(1, 0);
      currentDirection = "right";
    }
    if (
      (e.key === "ArrowDown" || e.which === 40) &&
      currentDirection !== "up"
    ) {
      snake.move(0, 1);
      currentDirection = "down";
    }
  });
}

window.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (!idGame && e.which === 32) {
    backgroundDraw();
    snake = new Snake(ctx, scale);
    startGame();
  }
}, 500);

let idGame = null;
let gameOver = false;
const status = document.querySelector('#status');
function endGame() {
  status.textContent = 'Press spacebar to restart game';
  backgroundCtx.font = "36px Oxanium";
  backgroundCtx.fillStyle = 'red';
  backgroundCtx.textAlign = 'center';
  backgroundCtx.fillText('Game Over', backgroundCvs.width / 2, backgroundCvs.height / 2);
  clearInterval(idGame);
  idGame = null;
  gameOver = false;
  snake.collided = false;
}

let snake = new Snake(ctx, scale);
const score = document.querySelector("#score");
const speedometer = document.querySelector('#speed');

function startGame() {
  let initialSpeed = 500;
  let speed = initialSpeed;
  score.textContent = 0;
  status.textContent = 'Press the arrow keys to start the game';
  snake.draw();
  keyDirections();
  idGame = setInterval(runSnakeGame, speed);
  function runSnakeGame() {
    if (!gameOver) {
      if (snake.eat()) {
        snake.grow();
        speed -= 10;
        score.textContent = snake.totalFruitEaten;
        status.textContent = 'Keep Going!';
        clearInterval(idGame);
        idGame = setInterval(runSnakeGame, speed);
      }
      speedometer.textContent = initialSpeed - speed;
      snake.updateSnake();
      snake.draw();
      if (snake.collided) gameOver = true;
    } else endGame();
  }
}

backgroundDraw();
startGame();