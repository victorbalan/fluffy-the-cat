class Wall extends TexturedGameObject {
  constructor(x, y, bmp, width, height) {
    super(x, y, bmp, width, height)
  }

  _square(x, y, bmp, width, height) {
    var square = new createjs.Shape();
    if(!!bmp){
      var matrix = new createjs.Matrix2D(dimension / bmp.width, 0, 0, dimension / bmp.height, 0, 0)
      square.graphics.beginBitmapFill(bmp, 'repeat', matrix).drawRect(0, 0, dimension, dimension);
    }else {
      square.graphics.beginFill('#211E27').drawRect(0, 0, width, height);
    }
    square.x = x;
    square.y = y;
    return square;
  }
}
