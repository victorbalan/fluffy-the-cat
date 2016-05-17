class Player extends GameObject {
  constructor(x, y, dimension) {
    super(x, y, 'DeepSkyBlue', dimension/2)
    this.setBounds({x: x, y: y, width: dimension/2, height: dimension/2});
  }

  getBounds() {
    return this.object.getBounds()
  }
}
