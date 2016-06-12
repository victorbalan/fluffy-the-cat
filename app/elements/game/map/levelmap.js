class LevelMap {
  constructor(level, gameConfig, mapCreator) {
    if (!level || level.length === 0) {
      console.log('level is not ok');
      return;
    }

    var map = mapCreator.createMap(level, gameConfig.tileDimension);
    this.map = map;
    this.start = map.start;
    this.finish = map.finish;

    var xOffset = Math.floor(gameConfig.width / gameConfig.tileDimension / 2 - map.startMatrixPos.j) * gameConfig.tileDimension + gameConfig.tileDimension / 2;
    var yOffset = Math.floor(gameConfig.height / gameConfig.tileDimension / 2 - map.startMatrixPos.i) * gameConfig.tileDimension - gameConfig.tileDimension / 2;

    this.startPos = {
      x: this.start.x + xOffset,
      y: this.start.y + yOffset
    };

    this.finishPos = {
      x: this.finish.x + xOffset,
      y: this.finish.y + yOffset
    };
    this.move(xOffset, yOffset);
  }

  move(xOffset, yOffset) {
    this.map.move(xOffset, yOffset);
    this.finishPos.x += xOffset;
    this.finishPos.y += yOffset;
  }


  addToStage(stage) {
    stage.addChild(this.map.container);
  }

  getIntersectionType(player) {
    return this.map.getIntersectionType(player);
  }

}
