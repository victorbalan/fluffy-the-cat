class Grass extends GameObject {
  constructor(x, y, dimension) {
    super(x, y, '#009933', dimension)
  }

  getIntersectionType(rect1) {
    return 'none';
  }
}
