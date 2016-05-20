class LevelMap {
  constructor(level,canvasWidth, canvasHeight, loader) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.dimension = canvasHeight / 10;
    this.mapObjects = [];

    var groundTexture = loader.getResult('ground');
    var wallTexture = loader.getResult('wall');


    if (!level || level.length === 0 || !level[0] || (level.length !== level[0].length)) {
      console.log('level is not ok');
      return;
    }
    var starti = 0;
    var startj = 0;
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        if (level[i][j] === -1) {
          starti = i;
          startj = j;
        }
      }
    }
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        var x = (j - startj - 1) * this.dimension + this.canvasWidth / 2;
        var y = (i - starti - 1) * this.dimension + this.canvasHeight / 2;
        switch (level[i][j]) {
          case 0:
            var grass = new Ground(x, y, groundTexture, this.dimension);
            this.mapObjects.push(grass);
            break;
          case 1:
            var wall = new TexturedGameObject(x, y, wallTexture, this.dimension);
            this.mapObjects.push(wall);
            break;
          case 2:
            this.finish = new Finish(x, y, this.dimension);
            this.mapObjects.push(this.finish);
            break;
          case -1:
            this.start = new Ground(x, y, groundTexture, this.dimension);
            this.mapObjects.push(this.start);
            break;
        }
      }
    }
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
    var topLeft = this.mapObjects[0].getBounds();
    var botRight = this.mapObjects[this.mapObjects.length - 1].getBounds();
    if (player.x < topLeft.x || player.x > botRight.x + player.width ||
      player.y < topLeft.y || player.y > botRight.y + player.height) {
      // out of bounds
      return 'collision'
    }
    for (var i = 0; i < this.mapObjects.length; i++) {
      var type = this.mapObjects[i].getIntersectionType(player)
      if (type !== 'none') {
        return type;
      }
    }
    return 'none';
  }

  getGroundDimension() {
    return this.dimension;
  }

  getFinishPos() {
    return this.finish;
  }

  getStartPos() {
    return this.start;
  }
}
