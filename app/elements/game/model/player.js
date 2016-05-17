class Player extends GameObject {
  constructor(x, y, dimension) {
    super(x, y, 'DeepSkyBlue', dimension)
    this.setBounds({x: x, y: y, width: dimension, height: dimension});
  }

  getBounds() {
    return this.object.getBounds()
  }
}
