class LevelSelectionFluffy {
  // TODO - remove duplicate code. very very bad code(copied half from level map) refactor SOON.
  constructor(stage, width, height, levels, loader, onLevelSelect) {
    var self = this;

    this.elementWidth = height / 10;
    this.elementDimension = height / 10;
    this.maxElements = width / this.elementWidth - 1;
    this.elementXOffset = (width - this.maxElements * this.elementDimension) / 2;
    this.stage = stage;
    this.width = width;
    this.height = height;

    var groundsUnprocessed = [];
    var j = 0;
    var i=0;
    while (i * j / 4 < levels.length) {
      if (j === (height / this.elementWidth - 1)) {
        j = 0;
      }
      var row = [];
      for (i = 0; i < this.maxElements - 1; i++) {
        if (j % 4 === 1 && i === this.maxElements - 2) {
          row.push(0);
          continue;
        }
        if (j % 4 === 3 && i === 0) {
          row.push(0);
          continue;
        }
        if (j % 2 === 0) {
          row.push(0);
        } else {
          row.push(1);
        }
      }
      groundsUnprocessed.push(row);
      j++;
    }

    var grounds = this.process(groundsUnprocessed);

    // this.printMatrix(groundsUnprocessed);
    // this.printMatrix(grounds);

    var groundObjects = [];
    var levelCounter = 0;
    var textObjects = [];
    for (var i = 0; i < grounds.length; i++) {
      for (var j = 0; j < grounds[i].length; j++) {
        switch (grounds[i][j]) {
          case '1':
            groundObjects.push(new Wall((j + 1) * this.elementDimension, (i + 1) * this.elementDimension, null, this.elementDimension, this.elementDimension));
            break;
          case 'wb':
            groundObjects.push(new Wall((j + 1) * this.elementDimension, (i + 1) * this.elementDimension, loader.getResult(grounds[i][j]), this.elementDimension, this.elementDimension));
            break;
          default:
            if (j % 2 === 0 && i % 2 === 0 && levelCounter < levels.length) {
              var level = levels[levelCounter];
              var txt = this._text(level.subDifficulty, "bold 20px Arial", (j + 1) * this.elementDimension + 50, (i + 1) * this.elementDimension + 30, {
                color: '#FFAA00',
                cursor: 'pointer'
              });

              txt.levelId = level._id;

              txt.hitArea = this._hitArea(0, 0, 40, 40);
              txt.addEventListener('mouseover', function (evt) {
                self._mouseOver(evt, stage);
              });
              txt.addEventListener('mouseout', function (evt) {
                self._mouseOut(evt, stage);
              });
              txt.addEventListener('click', function (evt) {
                onLevelSelect(evt.target.levelId);
              });
              textObjects.push(txt);
              levelCounter++;
            }
            groundObjects.push(new Ground((j + 1) * this.elementDimension, (i + 1) * this.elementDimension, loader.getResult(grounds[i][j]), this.elementDimension));
            break;
        }
      }
    }

    for (var i = 0; i < groundObjects.length; i++) {
      groundObjects[i].addToStage(stage);
    }
    for (var i = 0; i < textObjects.length; i++) {
      stage.addChild(textObjects[i]);
    }

    function scroll(delta) {
      for (var i = 0; i < groundObjects.length; i++) {
        groundObjects[i].object.y += delta * 20;
      }
      for (var i = 0; i < textObjects.length; i++) {
        textObjects[i].y += delta * 20;
      }
      stage.update();
    }

    document.addEventListener("mousewheel", function (e) {
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      console.log('scroll', delta)
      scroll(delta);
    }, false);
    stage.update()
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

  _text(text, font, x, y, options) {
    var txt = new createjs.Text();
    txt.font = font;
    txt.text = text;
    txt.x = x;
    txt.y = y;
    if (options) {
      if (options.color) {
        txt.color = options.color;
      }
      if (options.textAlign) {
        txt.textAlign = options.textAlign;
      }
      if (options.cursor) {
        txt.cursor = options.cursor;
      }
    }
    return txt;
  }

  _hitArea(x, y, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginFill('white').drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    return square;
  }

  _mouseOver(evt, stage) {
    evt.target.scaleX = 1.3;
    evt.target.scaleY = 1.3;
    evt.target.color = 'red';
    stage.update();
  }

  _mouseOut(evt, stage) {
    evt.target.scaleX = 1;
    evt.target.scaleY = 1;
    evt.target.color = '#FFAA00';
    stage.update();
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
      bot = '0';
    }
    if (j === 0) {
      left = '0';
    }
    if (j === level.length - 1) {
      right = '0';
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
}
