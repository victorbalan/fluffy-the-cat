class LevelMap {
  constructor(level, gameConfig, mapCreator) {
    this.mapObjects = [];

    if (!level || level.length === 0) {
      console.log('level is not ok');
      return;
    }
    var map = mapCreator.createMap(level, gameConfig.tileDimension);
    this.mapObjects = map.mapObjects;
    this.start = map.start;
    this.finish = map.finish;
    var starti = map.startMatrixPos.i;
    var startj = map.startMatrixPos.j;
    var xOffset = Math.floor(gameConfig.width / gameConfig.tileDimension / 2- startj) * gameConfig.tileDimension + gameConfig.tileDimension / 2;
    var yOffset = Math.floor(gameConfig.height / gameConfig.tileDimension / 2- starti) * gameConfig.tileDimension - gameConfig.tileDimension / 2
    this.move(xOffset, yOffset);
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
