class LevelSelectionFluffy {
  // TODO - further refactor.
  constructor(stage, gameConfig, inputProcessor, mapCreator, onLevelSelect) {
    this.stage = stage;
    this.inputProcessor = inputProcessor;
    this.width = gameConfig.width;
    this.height = gameConfig.height;
    this.gameConfig = gameConfig;
    this.mapCreator = mapCreator;

    this.stage.enableMouseOver(10);
  }

  tickListener(event) {
    this.checkPlayerMovement();
    this.stage.update(event);
  }

  show(mapInfo, finishedGames, onLevelSelect) {
    var self = this;
    var events = mapInfo.events;
    this.map = new LevelSelectionMap(mapInfo.map, events, finishedGames, this.gameConfig, this.mapCreator, onLevelSelect);
    this.map.addToStage(this.stage);

    this.player = new Player(this.map.current.x - this.map.current.x / 2, this.map.current.y - this.map.current.y / 2, this.gameConfig.tileDimension);
    this.player.stand();
    this.player.addToStage(this.stage);
    
    this.move(-this.map.current.x / 2, -this.map.current.y / 2);

    this.drawTopMenu();
  }

  checkPlayerMovement() {
    if (this.finished) {
      return;
    }
    var playerMovement = this.inputProcessor.getPlayerMovement();
    if (!playerMovement) {
      return;
    }

    var toPlay = playerMovement.animation;
    var x = playerMovement.x * this.gameConfig.speed, y = playerMovement.y * this.gameConfig.speed;

    // // TODO: refactor
    var bounds = this.player.getBounds();
    bounds.x = bounds.x - x;
    switch (this.map.getIntersectionType(bounds)) {
      case 'collision':
        x = 0;
        toPlay.x = [];
        break;
      case 'finish':
        this.finished = true;
        this.onFinish();
        console.log('ggwp');
        break;
    }
    var bounds = this.player.getBounds();
    bounds.y = bounds.y - y;
    switch (this.map.getIntersectionType(bounds)) {
      case 'collision':
        y = 0;
        toPlay.y = [];
        break;
      case 'finish':
        this.finished = true;
        this.onFinish();
        console.log('ggwp');
        break;
    }
    var toPlayValue = '';
    if (toPlay.x.length > 0) {
      toPlayValue = toPlay.x[0]
    } else {
      toPlayValue = toPlay.y[0]
    }
    this.player.goToAndPlay(toPlayValue);

    if (x === 0 && y === 0) {
      this.player.stand();
      return;
    }

    // TODO: end refactor
    this.move(x, y);
    // this.overlay.move(x, y);
    this.steps++;
    if (Math.floor(this.steps / 5) > this.moves) {
      this.moves = this.steps / 5;
      // console.log(this.moves , 'moves')
    }
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
