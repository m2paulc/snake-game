export default class CanvasElements {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.gameContext = canvas.getContext("2d");
    this.scale = scale;

  }
  clearCanvas() {
    this.gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  makeFruit(fruit) {
    fruit.appear();
    this.gameContext.fillStyle = "red";
    this.gameContext.fillRect(fruit.x, fruit.y, this.scale, this.scale);
    // fruit.fruitShow = false;
  }
}