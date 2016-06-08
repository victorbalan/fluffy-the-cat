class LevelSelectionFluffy {
  // TODO - remove duplicate code. very very bad code(copied half from level map) refactor SOON.
  constructor(stage, width, height, grounds, loader, finishedGames, onLevelSelect) {
    stage.enableMouseOver(10);
    var self = this;
    console.log(finishedGames);
    var finishedGamesMap = {};
    for (var i = 0; i < finishedGames.length; i++) {
      finishedGamesMap[finishedGames[i].level] = 'ok';
    }
    this.elementWidth = height / 10;
    this.elementDimension = Math.min(width, height) / grounds[0].length;
    this.maxElements = Math.floor(width / this.elementWidth - 1);
    this.elementXOffset = (width - this.maxElements * this.elementDimension) / 2;
    this.stage = stage;
    this.width = width;
    this.height = height;

    var groundObjects = [];
    var textObjects = [];
    var lastLevel;
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
            var groundType = '';
            if (grounds[i][j].groundType) {
              groundType = grounds[i][j].groundType;
              // add text
              var color = 'grey';
              var cursor = undefined;
              if (!!finishedGamesMap[grounds[i][j]._id]) {
                color = 'green';
                cursor = 'pointer';
              } else if (!lastLevel) {
                lastLevel = grounds[i][j]._id;
                cursor = 'pointer';
                color = '#FFAA00';
              }

              var txt = this._text(grounds[i][j].levelKey, "bold 20px Arial", (j + 1) * this.elementDimension + this.elementDimension / 2, (i + 1) * this.elementDimension + this.elementDimension / 3, {
                color: color,
                cursor: cursor
              });
              if (color !== 'grey') {
                txt.levelId = grounds[i][j]._id;
                txt.mainColor = color;

                txt.hitArea = this._hitArea(0, 0, 40, 40);
                txt.addEventListener('mouseover', function (evt) {
                  self._mouseOver(evt, stage);
                });
                txt.addEventListener('mouseout', function (evt) {
                  self._mouseOut(evt, stage, evt.target.mainColor);
                });
                txt.addEventListener('click', function (evt) {
                  onLevelSelect(evt.target.levelId);
                });
              }
              textObjects.push(txt);
            } else {
              groundType = grounds[i][j];
            }
            groundObjects.push(new Ground((j + 1) * this.elementDimension, (i + 1) * this.elementDimension, loader.getResult(groundType), this.elementDimension));
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
    this.drawTopMenu();
  }

  drawTopMenu() {
    var bar = this._square(0, 0, 'DeepSkyBlue', this.width, 50);
    var self = this;
    this.stage.addChild(bar);
    var color = '#FFAA00';
    var instructions = this._text('Instructions', "bold 20px Arial", 5, 5, {
      color: color,
      cursor: 'pointer'
    });
    instructions.mainColor = color;

    instructions.hitArea = this._hitArea(0, 0, 100, 40);
    instructions.addEventListener('mouseover', function (evt) {
      self._mouseOver(evt, self.stage);
    });
    instructions.addEventListener('mouseout', function (evt) {
      self._mouseOut(evt, self.stage, evt.target.mainColor);
    });
    instructions.addEventListener('click', function (evt) {
      alert('Instructions')
    });
    this.stage.addChild(instructions);
    var tutorial = this._text('Tutorial', "bold 20px Arial", 200, 5, {
      color: color,
      cursor: 'pointer'
    });
    tutorial.mainColor = color;

    tutorial.hitArea = this._hitArea(0, 0, 100, 40);
    tutorial.addEventListener('mouseover', function (evt) {
      self._mouseOver(evt, self.stage);
    });
    tutorial.addEventListener('mouseout', function (evt) {
      self._mouseOut(evt, self.stage, evt.target.mainColor);
    });
    tutorial.addEventListener('click', function (evt) {
      alert('Tutorial')
    });
    this.stage.addChild(tutorial);
    this.stage.update();
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

  _square(x, y, color, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginFill(color).drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    return square;
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

  _mouseOut(evt, stage, color) {
    evt.target.scaleX = 1;
    evt.target.scaleY = 1;
    evt.target.color = color;
    stage.update();
  }
}
