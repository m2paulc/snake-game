import Snake from './snake.js';

const cvs = document.querySelector("#canvas");
const ctx = cvs.getContext("2d");
const scale = 10;
let gameOver = false;

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

const status = document.querySelector('#status');
function stopGame() {
  status.textContent = 'Game Over!';
  clearInterval(idGame);
}

const snake = new Snake(ctx, scale);
const score = document.querySelector("#score");
const speedometer = document.querySelector('#speed');

let initialSpeed = 500;
let speed = initialSpeed;
score.textContent = 0;
snake.draw();
keyDirections();
let idGame = setInterval(runSnakeGame, speed);
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
  } else stopGame();
}