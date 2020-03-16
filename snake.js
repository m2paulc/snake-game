import Fruit from './fruit.js';

export default class Snake {
  constructor(ctx, scale) {
    this.ctx = ctx;
    this.scale = scale;
    this.snake = [
      { x: 40, y: 0 },
      { x: 30, y: 0 },
      { x: 20, y: 0 },
      { x: 10, y: 0 },
      { x: 0, y: 0 }
    ];
    this.direction = { x: 0, y: 0 };
    this.head = { x: this.snake[0].x, y: this.snake[0].y };
    this.tail = {};
    this.fruit = new Fruit(ctx, scale);
    this.totalFruitEaten = 0;
  }
  move(x, y) {
    this.direction.x = x * this.scale;
    this.direction.y = y * this.scale;
  }
  hitWalls() {
    //check if the snake hit vertical and horizontal walls
    if (
      this.head.x < 0 ||
      this.head.x >= 400 ||
      this.head.y < 0 ||
      this.head.y >= 400
    ) {
      return true;
    }
    return false;
  }
  eat() {
    if (this.head.x === this.fruit.x && this.head.y === this.fruit.y) {
      this.totalFruitEaten += 1;
      this.fruit.fruitStart = true;
      return true;
    }
    return false;
  }
  updateSnake() {
    this.head.x = this.snake[0].x;
    this.head.y = this.snake[0].y;
    this.tail = this.snake.pop();
    let newHead = {
      x: this.head.x + this.direction.x,
      y: this.head.y + this.direction.y
    };
    this.snake.unshift(newHead);
  }
  draw() {
    this.ctx.clearRect(0, 0, 400, 400);
    this.ctx.fillStyle = "#cecece";
    this.ctx.fillRect(0, 0, 400, 400);
    // this.fruit.draw();
    for (let i = 0; i < this.snake.length; i++) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(
        this.snake[i].x,
        this.snake[i].y,
        this.scale,
        this.scale
      );
    }
    this.fruit.draw();
  }
}