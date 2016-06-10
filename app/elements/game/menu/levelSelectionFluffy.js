class LevelSelectionFluffy {
  // TODO - remove duplicate code. very very bad code(copied half from level map) refactor SOON.
  constructor(stage, gameConfig, loader, onLevelSelect) {
    this.stage = stage;
    this.width = gameConfig.width;
    this.height = gameConfig.height;
    this.gameConfig = gameConfig;
    this.mapCreator = new MapCreator(loader);

    this.stage.enableMouseOver(10);
  }

  show(mapInfo, finishedGames, onLevelSelect) {
    var self = this;
    var finishedGamesMap = {};
    for (var i = 0; i < finishedGames.length; i++) {
      finishedGamesMap[finishedGames[i].level] = 'ok';
    }
    var events = mapInfo.events;
    this.map = this.mapCreator.createMap(mapInfo.map, this.gameConfig.tileDimension);

    var textObjects = [];
    var currentY = 0;
    for (var i = 0; i < events.length; i++) {
      var x = events[i].j * this.gameConfig.tileDimension;
      var y = events[i].i * this.gameConfig.tileDimension;

      var color, cursor;
      if (events[i].data.prev == null && (!finishedGames || finishedGames.length === 0)) {
        cursor = 'pointer';
        color = '#FFAA00';
        currentY = y;
      } else if (!!finishedGamesMap[events[i].data._id]) {
        color = 'green';
        cursor = 'pointer';
      } else if (!!finishedGamesMap[events[i].data.prev]) {
        cursor = 'pointer';
        color = '#FFAA00';
        currentY = y;
      } else {
        color = 'grey';
        cursor = undefined;
      }

      var txt = this._text(events[i].data.levelKey, "bold 20px Arial", x + this.gameConfig.tileDimension / 2, y + this.gameConfig.tileDimension / 3, {
        color: color,
        cursor: cursor
      });
      if (color !== 'grey') {
        txt.levelId = events[i].data._id;
        txt.mainColor = color;

        txt.hitArea = this._hitArea(0, 0, 40, 40);

        txt.addEventListener('click', function (evt) {
          onLevelSelect(evt.target.levelId);
        });
      }
      textObjects.push(txt);
    }

    this.stage.addChild(this.map.container);
    for (var i = 0; i < textObjects.length; i++) {
      this.stage.addChild(textObjects[i]);
    }

    var self = this;

    function scroll(delta) {
      self.map.move(0, delta * 20);
      for (var i = 0; i < textObjects.length; i++) {
        textObjects[i].y += delta * 20;
      }
      self.stage.update();
    }

    console.log(currentY)
    scroll(20 - currentY / 20);

    document.addEventListener("mousewheel", function (e) {
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      console.log('scroll', delta)
      scroll(delta);
    }, false);


    // #remove
    document.addEventListener("keydown", function (e) {
      if(e.keyCode === 65){
        self.map.move(-20, 0);
        for (var i = 0; i < textObjects.length; i++) {
          textObjects[i].x += - 20;
        }
      }else if (e.keyCode === 68){
        self.map.move(20, 0);
        for (var i = 0; i < textObjects.length; i++) {
          textObjects[i].x += 20;
        }
      }
    });


    if (this.width > this.height) {
      this.map.move((this.width - this.height) / 2 - this.gameConfig.tileDimension / 2, 0);
      for (var i = 0; i < textObjects.length; i++) {
        textObjects[i].x += (this.width - this.height) / 2 - this.gameConfig.tileDimension / 2;
      }
    }

    this.stage.update()
    this.drawTopMenu();
  }

  drawTopMenu() {
    var bar = this._square(0, 0, 'DeepSkyBlue', this.width, 50);
    var self = this;
    this.stage.addChild(bar);
    var color = '#FFAA00';
    var instructions = this._text('Instructions', "bold 20px Arial", this.width / 2 - 150, 5, {
      color: color,
      cursor: 'pointer'
    });
    instructions.mainColor = color;

    instructions.hitArea = this._hitArea(0, 0, 100, 40);
    instructions.addEventListener('click', function (evt) {
      alert('Instructions')
    });
    this.stage.addChild(instructions);
    var tutorial = this._text('Tutorial', "bold 20px Arial", this.width / 2 + 50, 5, {
      color: color,
      cursor: 'pointer'
    });
    tutorial.mainColor = color;

    tutorial.hitArea = this._hitArea(0, 0, 100, 40);
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
    txt.addEventListener('mouseover', this._mouseOver.bind(this));
    txt.addEventListener('mouseout', this._mouseOut.bind(this));
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

  _mouseOver(evt) {
    evt.target.scaleX = 1.3;
    evt.target.scaleY = 1.3;
    evt.target.color = 'red';
    this.stage.update();
  }

  _mouseOut(evt) {
    evt.target.scaleX = 1;
    evt.target.scaleY = 1;
    evt.target.color = evt.target.mainColor;
    this.stage.update();
  }
}
