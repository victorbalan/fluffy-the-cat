class TexturedGameObject extends GameObject{
  constructor(x, y, bmp, dimension) {
    super(x, y, bmp, dimension);
  }

  _square(x, y, bmp, dimension) {
    var square = new createjs.Shape();
    square.graphics.beginBitmapFill(bmp).drawRect(0, 0, dimension, dimension);
    square.x = x;
    square.y = y;
    return square;
  }
}
