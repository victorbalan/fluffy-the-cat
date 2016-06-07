class TexturedGameObject extends GameObject{
  constructor(x, y, bmp, width, height) {
    super(width, height);
    this.object = this._square(x, y, bmp, width, height);
  }

  _square(x, y, bmp, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginBitmapFill(bmp).drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    return square;
  }
}
