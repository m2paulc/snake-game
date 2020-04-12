export default class Fruit {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.gameContext = canvas.getContext('2d');
    this.scale = scale;
    this.x = 0;
    this.y = 0;
    this.fruitShow = true;
  }
  appear() {
    const columns = this.canvas.width / this.scale;
    const rows = this.canvas.height / this.scale;
    if (this.fruitShow) {
      this.x = Math.abs((Math.round(Math.random() * rows) - 1) * this.scale);
      this.y = Math.abs((Math.round(Math.random() * columns) - 1) * this.scale);
    }
    this.fruitShow = false;
    console.log(this.x, this.y);
    console.log(this.fruitShow);
  }
}
