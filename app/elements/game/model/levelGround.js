class LevelGround extends TexturedGameObject {
  // constructor(x, y, bmp, width, height) {
  //   super(x, y, bmp, width, height)
  // }
  //
  // _square(x, y, bmp, width, height) {
  //   var square = new createjs.Shape();
  //   // var testBmp = new createjs.Bitmap(bmp);
  //   bmp.scaleX = width/bmp.width;
  //   bmp.scaleY = height/bmp.height;
  //   console.log(bmp)
  //   var matrix = new createjs.Matrix2D(height/bmp.height,0,0,height/bmp.height,0,0)
  //   square.graphics.beginBitmapFill(bmp, 'repeat', matrix).drawRect(0, 0, width, height);
  //   square.x = x;
  //   square.y = y;
  //   return square;
  // }
  getIntersectionType(rect1) {
    return 'none';
  }

  constructor(x, y, bmp, dimension, tileDimension) {
    super(x, y, bmp, dimension, tileDimension)
  }

  _square(x, y, bmp, dimension, tileDimension) {
    var square = new createjs.Shape();
    if (!!bmp) {
      var matrix = new createjs.Matrix2D(dimension / bmp.width, 0, 0, dimension / bmp.height, 0, 0)
      console.log(dimension / bmp.width, dimension / bmp.height);
      square.graphics.beginBitmapFill(bmp, 'repeat', matrix).drawRect(0, 0, dimension, dimension);
    }else{
      square.graphics.beginFill('blue').drawRect(0, 0, dimension, dimension);
    }
    square.x = x;
    square.y = y;
    return square;
  }
}
