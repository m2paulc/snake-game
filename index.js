import DrawCanvasBackground from './DrawCanvasBackground.js';
import Snake from './snake.js';
import Fruit from './fruit.js';
import CanvasElements from './CanvasElements.js';

const SCALE = 10;
const backgroundCanvas = document.querySelector('#background-canvas');
const backgroundContext = backgroundCanvas.getContext("2d");
const gameCanvas = document.querySelector("#game-canvas");
const gameContext = gameCanvas.getContext("2d");

let fruit = new Fruit(gameCanvas, SCALE);
let snake = new Snake(gameContext, SCALE);
const drawBackground = new DrawCanvasBackground(backgroundCanvas, backgroundContext, SCALE, fruit);
const drawElements = new CanvasElements(gameCanvas, SCALE);

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
    drawBackground.canvasBackground();
    snake = new Snake(gameContext, SCALE);
    startGame();
  }
}, 500);

let idGame = null;
let gameOver = false;
const status = document.querySelector('#status');
function endGame() {
  status.textContent = 'Press spacebar to restart game';
  backgroundContext.font = "36px Oxanium";
  backgroundContext.fillStyle = 'red';
  backgroundContext.textAlign = 'center';
  backgroundContext.fillText('Game Over', backgroundCanvas.width / 2, backgroundCanvas.height / 2);
  clearInterval(idGame);
  idGame = null;
  gameOver = false;
  snake.collided = false;
}

function startGame() {
  const score = document.querySelector("#score");
  const speedometer = document.querySelector('#speed');
  let initialSpeed = 500;
  let speed = initialSpeed;
  score.textContent = 0;
  status.textContent = 'Press the arrow keys to start the game';
  // drawElements.clearCanvas();
  // drawElements.makeFruit(fruit);
  // snake.draw();
  keyDirections();
  idGame = setInterval(runSnakeGame, speed);
  function runSnakeGame() {
    if (!gameOver) {
      console.log(snake.eat(fruit));
      if (snake.eat(fruit)) {
        // fruit.fruitShow = true;
        console.log('eat');
        snake.grow();
        speed -= 10;
        score.textContent = snake.totalFruitEaten;
        status.textContent = 'Keep Going!';
        clearInterval(idGame);
        idGame = setInterval(runSnakeGame, speed);
      }
      speedometer.textContent = initialSpeed - speed;
      snake.updateSnake();
      drawElements.clearCanvas();
      drawElements.makeFruit(fruit);
      snake.draw();
      if (snake.collided) gameOver = true;
    } else endGame();
  }
}

drawBackground.canvasBackground();
startGame();