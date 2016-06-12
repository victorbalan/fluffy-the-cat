class TutorialMap {
  constructor(level, events, gameConfig, mapCreator) {
    if (!level || level.length === 0) {
      console.log('level is not ok');
      return;
    }

    this.events = [];

    var map = mapCreator.createMap(level, gameConfig.tileDimension);
    this.map = map;
    this.start = map.start;
    this.finish = map.finish;

    var xOffset = Math.floor(gameConfig.width / gameConfig.tileDimension / 2 - map.startMatrixPos.j) * gameConfig.tileDimension + gameConfig.tileDimension / 2;
    var yOffset = Math.floor(gameConfig.height / gameConfig.tileDimension / 2 - map.startMatrixPos.i) * gameConfig.tileDimension - gameConfig.tileDimension / 2;

    for (var i = 0; i < events.length; i++) {
      var x = events[i].j * gameConfig.tileDimension;
      var y = events[i].i * gameConfig.tileDimension;

      this.events.push({x: x, y: y, width: gameConfig.tileDimension, height: gameConfig.tileDimension, event: events[i].event});
    }
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
    for (var i = 0; i < this.events.length; i++) {
      this.events[i].x += xOffset;
      this.events[i].y += yOffset;
    }
    this.finishPos.x += xOffset;
    this.finishPos.y += yOffset;
  }


  addToStage(stage) {
    stage.addChild(this.map.container);
  }

  getIntersectionType(player) {
    return this.map.getIntersectionType(player);
  }

  getEvent(player) {
    for (var i = 0; i < this.events.length; i++) {
      if (this.intersects(this.events[i], player)) {
        return this.events[i].event;
      }
    }
    return null;
  }

  intersects(rect1, rect2) {
    return !(rect1.x >= rect2.x + rect2.width
    || rect1.x + rect1.width <= rect2.x
    || rect1.y >= rect2.y + rect2.height
    || rect1.y + rect1.height <= rect2.y);
  }
}
