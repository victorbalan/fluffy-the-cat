class Finish extends GameObject {
  constructor(x, y, dimension) {
    super(x, y, 'red', dimension, dimension)
  }

  getIntersectionType(rect1) {
    return this.intersects(rect1) ? 'finish' : 'none';
  }
}
