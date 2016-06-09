class Wall extends GameObject {
  constructor(x, y, bmp, width, height) {
    super(width, height);
    this.object = new createjs.Shape();
    if (!!bmp) {
      // TODO: move transformation logic to own utils
      var matrix = new createjs.Matrix2D();
      matrix.scale((width + 2)/ bmp.width, (height + 2)/ bmp.height);
      this.object.graphics.beginBitmapFill(bmp, 'no-repeat', matrix).drawRect(0, 0, width, height);
    }else{
      this.object.graphics.beginFill('#211E27').drawRect(0, 0, width, height);
    }
    this.object.x = x;
    this.object.y = y;
  }

  getIntersectionType(rect1) {
    return this.intersects(rect1) ? 'collision' : 'none';
  }
}
