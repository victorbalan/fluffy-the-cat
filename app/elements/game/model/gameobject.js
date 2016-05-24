class GameObject {
  constructor(x, y, color, width, height) {
    this.object = this._square(x, y, color, width, height)
    this.dimension = width;
    this.width = width;
    this.height = height;
  }

  addToStage(stage) {
    stage.addChild(this.object);
  }

  getBounds() {
    return {
      x: this.object.x,
      y: this.object.y,
      width: this.width,
      height: this.height
    };
  }

  setBounds(bounds) {
    this.object.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  addEventListener(event, listener) {
    this.object.addEventListener(event, listener);
  }

  _square(x, y, color, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginFill(color).drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    // square.setBounds(x, y, dimension, dimension);
    return square;
  }

  moveTo(x, y) {
    var b = this.getBounds();
    this.object.x = x;
    this.object.y = y;
  }

  intersects(rect1) {
    var rect2 = this.getBounds();
    return !(rect1.x >= rect2.x + rect2.width
    || rect1.x + rect1.width <= rect2.x
    || rect1.y >= rect2.y + rect2.height
    || rect1.y + rect1.height <= rect2.y);
  }

  getIntersectionType(rect1) {
    return this.intersects(rect1) ? 'collision' : 'none';
  }
}
