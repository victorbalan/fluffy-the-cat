class LevelMap {
  constructor(level, canvasWidth, canvasHeight, loader) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.dimension = canvasHeight / 10;
    this.mapObjects = [];

    var groundTexture = loader.getResult('ground');

    if (!level || level.length === 0 || !level[0] || (level.length !== level[0].length)) {
      console.log('level is not ok');
      return;
    }
    var starti = 0;
    var startj = 0;
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        if (level[i][j] === 's') {
          starti = i;
          startj = j;
        }
      }
    }

    // ADD BOUNDARIES
    this.mapObjects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2,
      (-starti - 2) * this.dimension + this.canvasHeight / 2, null, (level.length + 2) * this.dimension, this.dimension));
    this.mapObjects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2,
      (level.length - starti - 1) * this.dimension + this.canvasHeight / 2, null, (level.length + 2) * this.dimension, this.dimension));
    this.mapObjects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2,
      (-starti - 1) * this.dimension + this.canvasHeight / 2, null, this.dimension, level.length * this.dimension));
    this.mapObjects.push(new Wall(( level.length - startj - 1) * this.dimension + this.canvasWidth / 2,
      (-starti - 1) * this.dimension + this.canvasHeight / 2, null, this.dimension, level.length * this.dimension));
    this.addLevel(level, starti, startj, loader, groundTexture);
  }

  addLevel(level, starti, startj, loader, groundTexture) {
    this.printMatrix(level)
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        var x = (j - startj - 1) * this.dimension + this.canvasWidth / 2;
        var y = (i - starti - 1) * this.dimension + this.canvasHeight / 2;
        switch (level[i][j]) {
          case '1':
            this.mapObjects.push(new Wall(x, y, null, this.dimension, this.dimension));
            break;
          case 'wb':
            this.mapObjects.push(new Wall(x, y, loader.getResult(level[i][j]), this.dimension, this.dimension));
            break;
          case 'f':
            this.finish = new Finish(x, y, this.dimension);
            this.mapObjects.push(this.finish);
            break;
          case 's':
            // TODO process start orientaiton in backend
            this.start = new Ground(x, y, loader.getResult(level[i][j]), this.dimension);
            this.mapObjects.push(this.start);
            break;
          default:
            this.mapObjects.push(new Ground(x, y, loader.getResult(level[i][j]), this.dimension));
            continue;
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
    for (var i = 0; i < this.mapObjects.length; i++) {
      var type = this.mapObjects[i].getIntersectionType(player)
      if (type !== 'none') {
        console.log(this.mapObjects[i])
        console.log(player);
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
