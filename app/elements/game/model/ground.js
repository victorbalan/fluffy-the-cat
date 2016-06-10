// @deprecated
class Ground extends GameObject {
  constructor(x, y, bmp, dimension) {
    super(dimension, dimension);
    this.object = new createjs.Shape();
    if (!!bmp) {
      // TODO: move transformation logic to own utils
      var matrix = new createjs.Matrix2D();
      matrix.scale((dimension + 2)/ bmp.width, (dimension + 2)/ bmp.height);
      this.object.graphics.beginBitmapFill(bmp, 'no-repeat', matrix).drawRect(0, 0, dimension, dimension);
    }else{
      this.object.graphics.beginFill('blue').drawRect(0, 0, dimension, dimension);
    }
    this.object.x = x;
    this.object.y = y;
    this.collisionType = 'none';
  }

  getIntersectionType(rect1) {
    return 'none';
  }
}
