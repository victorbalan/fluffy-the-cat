class Level {
  constructor(level, stage, dimensions){
    this.groundDimension = dimensions / level.length;
    this.walls = [];

    if (!level || level.length === 0 || !level[0] || (level.length !== level[0].length)) {
      console.log('level is not ok');
      return;
    }
    for (var i = 0; i < level.length; i++) {
      var row = level[i];
      for (var j = 0; j < row.length; j++) {
        var x = j * this.groundDimension;
        var y = i * this.groundDimension;
        var square = new createjs.Shape();
        if (level[i][j] === 1) {
          square = this._wall(x, y);
        } else if (level[i][j] === 'f') {
          square = this._finish(x, y);
        } else {
          square = this._grass(x, y);
          if (level[i][j] === 's') {
            this.startPos = square;
          }
        }
        stage.addChild(square);
      }
    }
    stage.update();
  }

  checkAtFinish(player) {
    return checkIntersection(player, this.finishPos.getBounds());
  }

  checkWallCollision(player) {
    for (var i = 0; i < this.walls.length; i++) {
      if (checkIntersection(player, this.walls[i].getBounds())) {
        return true;
      }
    }
    return false
  }

  _wall(x, y) {
    var wall = this._square(x, y, '#4d2600');
    this.walls.push(wall);
    return wall;
  }

  _finish(x, y) {
    this.finishPos = this._square(x, y, 'red');
    return this.finishPos;
  }

  _grass(x, y) {
    return this._square(x, y, '#009933');
  }

  _square(x, y, color) {
    var square = new createjs.Shape();
    square.graphics.beginFill(color).drawRect(x, y, this.groundDimension, this.groundDimension);
    square.setBounds(x, y, this.groundDimension, this.groundDimension);
    return square;
  }

  getGroundDimension() {
    return this.groundDimension;
  }

  getStartPos() {
    return this.startPos;
  }
}
