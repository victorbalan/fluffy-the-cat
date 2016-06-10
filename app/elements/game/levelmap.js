class LevelMap {
  constructor(level, gameConfig, mapCreator) {
    this.canvasHeight = gameConfig.height;
    this.canvasWidth = gameConfig.width;
    this.dimension = gameConfig.tileDimension;

    this.mapObjects = [];

    if (!level || level.length === 0) {
      console.log('level is not ok');
      return;
    }
    var map = mapCreator.createMap(level, this.dimension);
    this.mapObjects = map.mapObjects;
    this.start = map.start;
    this.finish = map.finish;
    var starti = map.startMatrixPos.i;
    var startj = map.startMatrixPos.j;
    this.move(Math.floor(this.canvasWidth / this.dimension / 2- startj) * this.dimension + this.dimension / 2,
      Math.floor(this.canvasHeight / this.dimension / 2- starti) * this.dimension - this.dimension / 2);
  }

  move(xOfset, yOffset) {
    this.mapObjects.forEach(function (object) {
      object.moveTo(object.object.x + xOfset, object.object.y + yOffset);
    });
  }

  addToStage(stage) {
    this.mapObjects.forEach(function (object) {
      object.addToStage(stage);
    });
  }

  getIntersectionType(player) {
    for (var i = 0; i < this.mapObjects.length; i++) {
      var type = this.mapObjects[i].getIntersectionType(player)
      if (type !== 'none') {
        return type;
      }
    }
    return 'none';
  }

  printMatrix(m) {
    var line = '';
    for (var i = 0; i < m.length; i++) {
      line = line + '\n';
      for (var j = 0; j < m[i].length; j++) {
        line = line + m[i][j] + ' ';
      }
    }
    console.log(line)
  }
}
