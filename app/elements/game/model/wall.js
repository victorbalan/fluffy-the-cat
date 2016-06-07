class Wall extends GameObject {
  constructor(x, y, bmp, width, height) {
    super(width, height);
    this.object = this._square(x, y, bmp, width, height);
  }

  _square(x, y, bmp, width, height) {
    var square = new createjs.Shape();
    if(!!bmp){
      var matrix = new createjs.Matrix2D()
      matrix.scale((width + 2)/ bmp.width, (height + 2)/ bmp.height);
      square.graphics.beginBitmapFill(bmp, 'no-repeat', matrix).drawRect(0, 0, width, height);
    }else {
      square.graphics.beginFill('#211E27').drawRect(0, 0, width, height);
    }
    square.x = x;
    square.y = y;
    return square;
  }
}
