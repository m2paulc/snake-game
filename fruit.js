const cvs = document.querySelector("#canvas");
const ctx = cvs.getContext('2d');
const scale = 10;
const columns = cvs.width / scale;
const rows = cvs.height / scale;

export default class Fruit {
  constructor(ctx, scale) {
    this.ctx = ctx;
    this.scale = scale;
    this.x = 0;
    this.y = 0;
    this.fruitStart = true;
  }
  appear() {
    if (this.fruitStart) {
      this.x = Math.round(Math.random() * rows) * this.scale;
      this.y = Math.round(Math.random() * columns) * this.scale;
    }
    this.fruitStart = false;
  }
  draw() {
    this.appear();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
  }
}
