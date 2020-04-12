export default class DrawCanvasBackground {
  constructor(backgroundCanvas, backgroundContext, scale, fruit) {
    this.backgroundCanvas = backgroundCanvas;
    this.backgroundContext = backgroundContext;
    this.scale = scale;
  }
  canvasBackground() {
    this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
    this.backgroundContext.fillStyle = "#cecece";
    this.backgroundContext.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  }
}