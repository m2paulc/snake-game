const cvs = document.querySelector("#uiCanvas");
const ctx = cvs.getContext('2d');
const scale = 10;
const columns = cvs.width / scale;
const rows = cvs.height / scale;
const fruitX = document.querySelector('#fruitx');
const fruitY = document.querySelector('#fruity');

export default class Fruit {
  constructor(ctx, scale) {
    this.ctx = ctx;
    this.scale = scale;
    this.x = 0;
    this.y = 0;
    this.fruitShow = true;
  }
  appear() {
    if (this.fruitShow) {
      this.x = Math.abs((Math.round(Math.random() * rows) - 1) * this.scale);
      this.y = Math.abs((Math.round(Math.random() * columns) - 1) * this.scale);
    }
    this.fruitShow = false;
  }
  draw() {
    this.appear();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
    //debug purpose only
    // fruitX.textContent = this.x;
    // fruitY.textContent = this.y;
  }
}
