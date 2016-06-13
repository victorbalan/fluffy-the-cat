class Level {
  constructor(stage, gameConfig, inputProcessor, mapCreator, onFinishCallback) {
    this.inputProcessor = inputProcessor;
    this.mapCreator = mapCreator;
    this.stage = stage;

    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.gameConfig = gameConfig;
  }

  tickListener(event) {
    this.checkPlayerMovement();
    this.coldHot();
    this.stage.update(event);
  }

  start(level) {
    this.skills = {};
    this.godmode = false;

    this.map = new LevelMap(level, this.gameConfig, this.mapCreator);
    this.finished = false;
    this.map.addToStage(this.stage);
    this.player = new Player(this.map.startPos.x, this.map.startPos.y, this.gameConfig.tileDimension);
    this.player.stand();
    this.player.addToStage(this.stage);

    this.steps = 0;
    this.moves = 0;
    this.overlay = new Overlay(this.stage, this.gameConfig, this.player);

    this.initialFinishDistance = this.getDistanceToFinish();
    this.progress = new createjs.Shape();
    this.progress.x = this.gameConfig.width - 100;
    this.progress.y = 100;
    this.stage.addChild(this.progress);
    this.addSkills();
  }

  addSkills() {
    var self = this;
    var config = {
      action: function () {
        this.overlay.hide();
      }.bind(self),
      onEnd: function () {
        this.overlay.show();
      }.bind(self)
    };
    this.skills.godmode = new Skill(this.gameConfig.width / 2, this.gameConfig.height - this.gameConfig.tileDimension / 2,
      this.gameConfig, 10000, 5000, config);

    this.skills.godmode.addToStage(this.stage);
  }

  clear() {
    this.stage.clear();
    this.stage.update();
  }

  checkPlayerMovement() {
    if (this.finished) {
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

    this.map.move(x, y);
    // this.overlay.move(x, y);
    this.steps++;
    if (Math.floor(this.steps / 5) > this.moves) {
      this.moves = this.steps / 5;
      // console.log(this.moves , 'moves')
    }
  }

  coldHot() {
    var percent = (100 - this.getDistanceToFinish() * 100 / this.initialFinishDistance) / 100;
    if (percent <= 0)
      percent = 0.01;
    // TODO: this makes the game laggy
    // TODO: fix

    if (percent === this.percent) {
      return;
    }
    this.percent = percent;
    this.progress.graphics.clear()
      .beginRadialGradientFill(["#ff6600", "#0066ff"], [0, 1], 0, 0, 0, 0, 0,
        this.gameConfig.tileDimension * percent + 5)
      .setStrokeStyle(1).beginStroke("#0066ff").drawCircle(0, 0, this.gameConfig.tileDimension / 2);
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
    this.skills.godmode.use();
  }
}
