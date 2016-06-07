class Wall extends TexturedGameObject {
  constructor(x, y, bmp, width, height) {
    super(x, y, bmp, width, height)
  }

  _square(x, y, bmp, width, height) {
    var square = new createjs.Shape();
    // var testBmp = new createjs.Bitmap(bmp);
    bmp.scaleX = width/bmp.width;
    bmp.scaleY = height/bmp.height;
    console.log(bmp)
    var matrix = new createjs.Matrix2D(height/bmp.height,0,0,height/bmp.height,0,0)
    square.graphics.beginBitmapFill(bmp, 'repeat', matrix).drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    return square;
  }
}
