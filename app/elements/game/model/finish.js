// @deprecated
class Finish extends GameObject {
  constructor(x, y, dimension) {
    super(dimension, dimension);
    this.object = new createjs.Shape();
    this.object.graphics.beginFill('red').drawRect(0, 0, dimension, dimension);
    this.object.x = x;
    this.object.y = y;
    this.collisionType = 'finish';
  }

  getIntersectionType(rect1) {
    return this.intersects(rect1) ? 'finish' : 'none';
  }
}
