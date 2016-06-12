class Tutorial {
  constructor(stage, gameConfig, inputProcessor, mapCreator, onFinishCallback) {
    this.inputProcessor = inputProcessor;
    this.mapCreator = mapCreator;
    this.stage = stage;

    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.gameConfig = gameConfig;

    this.events = {
      'overlay': false,
      'progress': false
    }

  }

  tickListener(event) {
    this.checkPlayerMovement();
    this.coldHot();
    this.stage.update(event);
  }

  start() {
    this.textObjectCreator = new TextObjectCreator();

    this.text = this.textObjectCreator.text('Welcome to Fluffy the Cat. Your job is to get to the end of the maze.',
      "bold 20px Arial", 100, this.gameConfig.height - 100, {
      color: 'green'
    }, true);
    var level = [
      ['w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'br', 'hor', 'bl', 'w', 'w'],
      ['w', 'ver', 'wb', 'ver', 'w', 'w'],
      ['s', 'tr', 'w', 'ver', 'w', 'w'],
      ['wb', 'wb', 'w', 'ver', 'w', 'w'],
      ['w', 'l', 'hor', 'tlr', 'hor', 'f'],
      ['w', 'wb', 'wb', 'wb', 'wb', 'wb']
    ];
    var events = [
      {i: 2, j: 1, event: 'overlay'},
      {i: 1, j: 2, event: 'progress'},
      {i: 3, j: 3, event: 'overlay-global'},
    ];
    this.godmode = false;

    this.map = new TutorialMap(level, events, this.gameConfig, this.mapCreator);
    this.finished = false;
    this.map.addToStage(this.stage);

    this.player = new Player(this.map.startPos.x, this.map.startPos.y, this.gameConfig.tileDimension);
    this.player.stand();
    this.player.addToStage(this.stage);

    this.overlay = new Overlay(this.stage, this.gameConfig, this.player);
    this.overlay.hideAll();

    this.stage.addChild(this.text);
    this.stage.update();

    this.steps = 0;
    this.moves = 0;
    // this.overlay = new Overlay(this.stage, this.gameConfig, this.player);

    this.initialFinishDistance = this.getDistanceToFinish();
  }

  clear() {
    this.stage.clear();
    this.stage.update();
  }

  checkPlayerMovement() {
    if (this.finished || this.inputDisabled) {
      return;
    }
    var playerMovement = this.inputProcessor.getPlayerMovement();
    if (!playerMovement) {
      return;
    }
    var moveInfo = this.map.map.getMaxMoveWithIntersectionType(this.player.getBounds(), -playerMovement.x * this.gameConfig.speed, -playerMovement.y * this.gameConfig.speed);
    for (var i = 0; i < moveInfo.intersections.length; i++) {
      if (moveInfo.intersections[i] === 'finish') {
        this.finished = true;
        this.onFinish();
        return console.log('ggwwp');
      }
    }
    var x = -moveInfo.max.x;
    var y = -moveInfo.max.y;
    this.player.goToAndPlay(playerMovement.animation);

    if (x === 0 && y === 0) {
      this.player.stand();
      return;
    }
    var toCheck = this.player.getBounds();
    toCheck.x += x;
    toCheck.y += y;
    this.addEvent(this.map.getEvent(toCheck));
    this.map.move(x, y);
    // this.overlay.move(x, y);
    this.steps++;
    if (Math.floor(this.steps / 5) > this.moves) {
      this.moves = this.steps / 5;
      // console.log(this.moves , 'moves')
    }
  }

  addEvent(event){
    if(!event){
      return;
    }
    if(this.events[event] === true){ return; }
    this.inputDisabled = true;
    var self = this;
    setTimeout(function(){
      self.inputDisabled = false;
    }, 2000);
    switch(event){
      case 'overlay':
        this.text.text = 'You will not see so much in real life. You`ll see just as much as if you had a torch.';
        this.text.color = 'yellow';
        this.overlay.showAll();
        break;
      case 'progress':
        this.text.text = 'To help you throughout the game you have your cat senses with you.\nThe closer you are to the finish the bigger the red fill becomes.';
        this.text.color = 'red';
        this.progress = new createjs.Shape();
        this.progress.x = this.gameConfig.width / 2 - 40;
        this.progress.y = 50;
        this.stage.addChild(this.progress);
        break;
      case 'overlay-global':
        this.text.color = 'DeepSkyBlue';
        this.text.text = 'You can press G to turn on/off a more powerful flashlight.';
        break;
    }
    this.events[event] = true;
  }

  coldHot() {
    if(!this.progress){
      return;
    }
    var percent = (100 - this.getDistanceToFinish() * 100 / this.initialFinishDistance) / 100;
    if (percent <= 0)
      percent = 0.01;
    // TODO: this makes the game laggy
    // TODO: fix

    if (percent === this.percent) {
      return;
    }
    this.percent = percent;
    this.progress.graphics.beginRadialGradientFill(["#ff6600", "#0066ff"], [0, 1], 0, 0, 0, 0, 0, 65 * percent).setStrokeStyle(1).beginStroke("#0066ff").drawCircle(0, 0, 40);
  }

  getDistanceToFinish() {
    var finish = this.map.finishPos;
    var playerBounds = this.player.getBounds();

    var finishX = finish.x, finishY = finish.y;
    var playerX = playerBounds.x, playerY = playerBounds.y;

    var difX = (finishX - playerX);
    var difY = (finishY - playerY);
    return Math.sqrt(difX * difX + difY * difY);
  }

  godMode() {
    // TODO - make godmode show exactly a radius of x squares and not the whole map.
    this.godmode = !this.godmode;
    if (this.godmode) {
      this.overlay.hide();
    } else {
      this.overlay.show();
    }
  }
}
