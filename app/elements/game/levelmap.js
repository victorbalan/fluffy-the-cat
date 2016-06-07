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
    this.mapObjects.push(new LevelGround((- startj - 1) * this.dimension + this.canvasWidth / 2, (- starti - 1) * this.dimension + this.canvasHeight / 2, groundTexture, level.length * this.dimension, this.dimension));

    // ADD BOUNDARIES
    this.mapObjects.push(new TexturedGameObject((- startj - 2) * this.dimension + this.canvasWidth / 2,
      (- starti - 2) * this.dimension + this.canvasHeight / 2, wallTexture, (level.length+2) * this.dimension, this.dimension));
    this.mapObjects.push(new TexturedGameObject((- startj - 2) * this.dimension + this.canvasWidth / 2,
      (level.length - starti - 1) * this.dimension + this.canvasHeight / 2, wallTexture, (level.length+2) * this.dimension, this.dimension));
    this.mapObjects.push(new TexturedGameObject((- startj - 2) * this.dimension + this.canvasWidth / 2,
      (-starti - 1) * this.dimension + this.canvasHeight / 2, wallTexture, this.dimension, level.length * this.dimension));
    this.mapObjects.push(new TexturedGameObject(( level.length - startj -1) * this.dimension + this.canvasWidth / 2,
      (-starti - 1) * this.dimension + this.canvasHeight / 2, wallTexture, this.dimension, level.length * this.dimension));

    // ADD WALLS
    for (var i = 0; i < level.length; i++) {
      var x = -1;
      var y = -1;
      var nrOfTiles = 0;

      for (var j = 0; j < level[i].length; j++) {
        switch(level[i][j]){
          case 1:
            if(x === -1 || y === -1){
              x = (j - startj - 1) * this.dimension + this.canvasWidth / 2;
              y = (i - starti - 1) * this.dimension + this.canvasHeight / 2;
            }
            nrOfTiles ++;
            continue;
          case 2:
            this.finish = new Finish((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, this.dimension);
            this.mapObjects.push(this.finish);
            break;
          case -1:
            this.start = new Ground((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, groundTexture, this.dimension);
            this.mapObjects.push(this.start);
            break;
        }
        if(nrOfTiles>0) {
          this.mapObjects.push(new Wall(x, y, wallTexture, nrOfTiles * this.dimension, this.dimension));
        }
        x = -1;
        y = -1;
        nrOfTiles = 0;
      }
      if (x !== -1 && y != -1) {
        if(nrOfTiles > 0) {
          this.mapObjects.push(new Wall(x, y, wallTexture, nrOfTiles * this.dimension, this.dimension));
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
