class Torch {
  constructor(stage, width, height, player, tileWidth, tileHeight){
    console.log(player.getBounds());
    var start = player.getBounds();
    this.object = this._square(start.x, start.y, 'red', tileWidth, tileHeight)
    this.object.alpha = 0.5;
    stage.addChild(this.object);
  }

  update(map){

  }

  _square(x, y, color, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginFill(color).drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    // square.setBounds(x, y, dimension, dimension);
    return square;
  }

}
