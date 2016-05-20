class Ground extends TexturedGameObject {
  constructor(x, y, bmp, dimension) {
    super(x, y, bmp, dimension)
  }

  getIntersectionType(rect1) {
    return 'none';
  }
}
