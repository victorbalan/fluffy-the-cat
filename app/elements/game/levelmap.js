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
        if (level[i][j] === -1) {
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

  addLevel(l, starti, startj, loader, groundTexture) {
    var level = this.process(l);
    for (var i = 0; i < level.length; i++) {
      var x = -1;
      var y = -1;
      var nrOfTiles = 0;

      for (var j = 0; j < level[i].length; j++) {
        switch (level[i][j]) {
          case '1':
            this.mapObjects.push(new Wall((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, null, this.dimension, this.dimension));
            break;
          case 'wb':
            this.mapObjects.push(new Wall((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, loader.getResult(level[i][j]), this.dimension, this.dimension));
            break;
          case 'f':
            this.finish = new Finish((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, this.dimension);
            this.mapObjects.push(this.finish);
            break;
          case 's':
            this.start = new LevelGround((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, loader.getResult(this.getType(l, i, j)), this.dimension);
            this.mapObjects.push(this.start);
            break;
          default:
            this.mapObjects.push(new LevelGround((j - startj - 1) * this.dimension + this.canvasWidth / 2,
              (i - starti - 1) * this.dimension + this.canvasHeight / 2, loader.getResult(level[i][j]), this.dimension));
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

  process(level) {
    var pl = new Array();
    for (var i = 0; i < level.length; i++) {
      pl.push(new Array(level[i].length));
      for (var j = 0; j < level[i].length; j++) {
        switch (level[i][j]) {
          case 0:
            pl[i][j] = this.getType(level, i, j);
            break;
          case 1:
            pl[i][j] = this.getWallType(level, i, j);
            break;
          case -1:
            pl[i][j] = 's';
            break;
          case 2:
            pl[i][j] = 'f';
            break;
        }
      }
    }
    return pl;
  }

  getWallType(level, i, j) {
    if (i === 0) {
      return '1';
    }
    if (level[i - 1][j] != 1) {
      return 'wb';
    }
    return '1';
  }

  getType(level, i, j) {
    var typesmap = {
      '1111': 'all',
      '1110': 'tbl',
      '1101': 'tbr',
      '1100': 'ver',
      '1011': 'tlr',
      '1010': 'tl',
      '1001': 'tr',
      '1000': 'b',
      '0111': 'blr',
      '0110': 'bl',
      '0101': 'br',
      '0100': 't',
      '0011': 'hor',
      '0010': 'r',
      '0001': 'l',
      '0000': 'err'
    };
    var top, bot, left, right;
    if (i === 0) {
      top = '0';
    }
    if (i === level.length - 1) {
      bot = '';
    }
    if (j === 0) {
      left = '0';
    }
    if (j === level.length - 1) {
      right = '';
    }
    top = !!top ? top : (level[i - 1][j] !== 1) ? '1' : '0';
    bot = !!bot ? bot : (level[i + 1][j] !== 1) ? '1' : '0';
    left = !!left ? left : (level[i][j - 1] !== 1) ? '1' : '0';
    right = !!right ? right : (level[i][j + 1] !== 1) ? '1' : '0';

    var val = typesmap[top + bot + left + right];
    if (!!val) {
      return val;
    } else {
      console.log('und', top, bot, left, right);
      return 'und';
    }
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
