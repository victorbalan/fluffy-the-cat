
class LevelMap {
  constructor(level, canvasDimension){
    this.dimension = canvasDimension / level.length;
    this.walls = [];
    this.grass = [];

    if (!level || level.length === 0 || !level[0] || (level.length !== level[0].length)) {
      console.log('level is not ok');
      return;
    }
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        var x = j * this.dimension;
        var y = i * this.dimension;
        switch(level[i][j]){
          case 0:
            this.grass.push(new Grass(x, y, this.dimension));
            break;
          case 1:
            this.walls.push(new Wall(x, y, this.dimension));
            break;
          case 'f':
            this.finish = new GameObject(x, y, 'red', this.dimension);
            break;
          case 's':
            this.start = new Grass(x, y, this.dimension);
            break;
        }
      }
    }
  }

  addToStage(stage){
    this.walls.forEach(function (wall) {
      wall.addToStage(stage);
    });
    this.grass.forEach(function (wall) {
      wall.addToStage(stage);
    });
    this.finish.addToStage(stage);
    this.start.addToStage(stage);
    stage.update();
  }

  checkAtFinish(player) {
    return checkIntersection(player, this.finish.getBounds());
  }

  checkWallCollision(player) {
    for (var i = 0; i < this.walls.length; i++) {
      if(this.walls[i].collidesWith(player)){
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
    square.graphics.beginFill(color).drawRect(x, y, this.dimension, this.dimension);
    square.setBounds(x, y, this.dimension, this.dimension);
    return square;
  }

  getGroundDimension() {
    return this.dimension;
  }

  getStartPos() {
    return this.start.object;
  }
}
