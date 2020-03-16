import Snake from './snake.js';

const cvs = document.querySelector("#canvas");
const ctx = cvs.getContext("2d");
const scale = 10;
const columns = canvas.width / scale;
const rows = canvas.height / scale;
let gameOver = false;

function draw() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "#cecece";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
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

function stopGame() {
  // console.log(snake.head.x);
  clearInterval(idGame);
}

const snake = new Snake(ctx, scale);

draw();
snake.draw();
keyDirections();
let idGame = setInterval(() => {
  if (!gameOver) {
    if (snake.eat()) console.log("eaten");
    snake.updateSnake();
    snake.draw();
    gameOver = snake.hitWalls();
  } else stopGame();
}, 500);