class GameObject{
  constructor(x, y, color, dimension) {
    this.object = this._square(x, y, color, dimension)
  }

  addToStage(stage){
    stage.addChild(this.object);
  }

  getBounds(){
    return this.object.getBounds();
  }

  setBounds(bounds){
    this.object.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  _square(x, y, color, dimension) {
    var square = new createjs.Shape();
    square.graphics.beginFill(color).drawRect(x, y, dimension, dimension);
    square.setBounds(x, y, dimension, dimension);
    return square;
  }

  collidesWith(rect1) {
    var rect2 = this.getBounds();
    return !(rect1.x >= rect2.x + rect2.width
    || rect1.x + rect1.width <= rect2.x
    || rect1.y >= rect2.y + rect2.height
    || rect1.y + rect1.height <= rect2.y);
  }
}
