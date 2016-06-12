class LevelSelectionFluffy {
  // TODO - further refactor.
  constructor(stage, gameConfig, inputProcessor, mapCreator, onTutorialSelect) {
    this.stage = stage;
    this.inputProcessor = inputProcessor;
    this.width = gameConfig.width;
    this.height = gameConfig.height;
    this.gameConfig = gameConfig;
    this.mapCreator = mapCreator;

    this.stage.enableMouseOver(10);
    this.onTutorialSelect = onTutorialSelect;
  }

  tickListener(event) {
    this.checkPlayerMovement();
    this.stage.update(event);
  }

  show(mapInfo, finishedGames, onLevelSelect) {
    var self = this;
    this.onLevelSelect = onLevelSelect;
    var events = mapInfo.events;
    this.map = new LevelSelectionMap(mapInfo.map, events, finishedGames, this.gameConfig, this.mapCreator, onLevelSelect);
    this.map.addToStage(this.stage);

    var x = this.gameConfig.width / 2 - this.map.current.x;
    var y = this.gameConfig.height / 2 - this.map.current.y;

    this.player = new Player(this.gameConfig.width / 2, this.gameConfig.height / 2, this.gameConfig.tileDimension);
    this.player.stand();
    this.player.addToStage(this.stage);

    this.move(x, y);

    this.drawTopMenu();
  }

  enter(){
    var level = this.map.getLevel(this.player.getBounds());
    if(!level){
      return;
    }
    this.onLevelSelect(level);
  }

  checkPlayerMovement() {
    var playerMovement = this.inputProcessor.getPlayerMovement();
    if (!playerMovement) {
      return;
    }

    var moveInfo = this.map.map.getMaxMoveWithIntersectionType(this.player.getBounds(), -playerMovement.x * this.gameConfig.speed, -playerMovement.y * this.gameConfig.speed);
    var x = -moveInfo.max.x;
    var y = -moveInfo.max.y;
    this.player.goToAndPlay(playerMovement.animation);

    if (x === 0 && y === 0) {
      this.player.stand();
      return;
    }

    this.move(x, y);
  }

  move(x, y) {
    this.map.move(x, y);
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
      self.onTutorialSelect();
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
