class Ground extends TexturedGameObject {
  constructor(x, y, bmp, dimension) {
    super(dimension, dimension);
    this.object = this._square(x, y, bmp, dimension, dimension)
  }

  _square(x, y, bmp, dimension, tileDimension) {
    var square = new createjs.Shape();
    if (!!bmp) {
      var matrix = new createjs.Matrix2D();
      matrix.scale((dimension + 2)/ bmp.width, (dimension + 2)/ bmp.height);
      square.graphics.beginBitmapFill(bmp, 'no-repeat', matrix).drawRect(0, 0, dimension, dimension);
    }else{
      square.graphics.beginFill('blue').drawRect(0, 0, dimension, dimension);
    }
    square.x = x;
    square.y = y;
    return square;
  }

  getIntersectionType(rect1) {
    return 'none';
  }
}
