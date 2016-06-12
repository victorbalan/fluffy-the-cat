
class Level {
  constructor(stage, gameConfig, inputProcessor, mapCreator, onFinishCallback) {
    this.inputProcessor = inputProcessor;
    this.mapCreator = mapCreator;
    this.stage = stage;

    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.gameConfig = gameConfig;

  }

  tickListener(event){
    this.checkPlayerMovement();
    this.coldHot();
    this.stage.update(event);
  }

  start(level) {
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
    this.progress.x = this.gameConfig.width / 2 - 40;
    this.progress.y = 50;
    this.stage.addChild(this.progress);
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
    if(!playerMovement){
      return;
    }

    var toPlay = playerMovement.animation;
    var x = playerMovement.x * this.gameConfig.speed, y = playerMovement.y * this.gameConfig.speed;

    // TODO: refactor
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

    if(percent === this.percent){
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
