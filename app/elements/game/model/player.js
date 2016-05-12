class Player extends GameObject{
  constructor(startPos) {
    super(startPos.x, startPos.y, 'DeepSkyBlue', startPos.height/2)
  }
  moveTo(x, y){
    this.object.setBounds(x, y, this.getBounds().width, this.getBounds().height);
    this.object.x = x;
    this.object.y = y;
  }
}
