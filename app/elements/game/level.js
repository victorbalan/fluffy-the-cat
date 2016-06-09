const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_G = 71;
const startColor = {
  r: 64,
  g: 58,
  b: 62
};
const endColor = {
  r: 255,
  g: 130,
  b: 155
};

class Game {
  constructor(stage, width, height, assetLoader, onFinishCallback) {
    // NOTE 2.5% would fit perfectly but the map would flicker.
    // TODO - solve
    this.speed = height / 100;
    this.stage = stage;
    this.godmode = false;
    this.godmode = false;
    this.height = height;
    this.width = width;
    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.assetLoader = assetLoader;
    this.keysPressed = {
      37: 0,
      39: 0,
      40: 0,
      38: 0
    };
    stage.enableMouseOver(30);
    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(50);
    createjs.Ticker.useRAF = true;
    this.firstKey = null;
    var self = this;
    createjs.Ticker.addEventListener("tick", function(){
      self.keyPressed()
      stage.update();
    });
    this.registerEvents();
  }

  startLevel(level) {
    this.stage.removeAllChildren();
    this.stage.update();
    this.mapLength = level.length;
    this.map = new LevelMap(level, this.width, this.height, this.assetLoader);
    this.start();
    this.loader = new createjs.Shape();
    this.progress = new createjs.Shape();
  }

  start() {
    this.finished = false;
    this.map.addToStage(this.stage);
    this.player = new Player(this.map.getStartPos().object.x, this.map.getStartPos().object.y, this.map.dimension);
    this.player.stand();
    this.player.addToStage(this.stage);

    this.steps = 0;
    this.moves = 0;
    this.overlay = new Overlay(this.stage, this.width, this.height, this.player);

    this.initialFinishDistance = this.getDistanceToFinish();
    this.stage.update();
  }

  clear() {
    this.stage.clear();
    this.stage.update();
  }

  registerEvents() {
    (() => {
      document.addEventListener('keydown', (e) => {
        if(!(e.keyCode === KEYCODE_G ||
          e.keyCode === KEYCODE_LEFT ||
          e.keyCode === KEYCODE_RIGHT ||
          e.keyCode === KEYCODE_UP ||
          e.keyCode === KEYCODE_DOWN)){
          console.log('return')
          return;
        }
        e.preventDefault();
        if(e.keyCode === KEYCODE_G) {
          this.godMode();
          return;
        }
        this.keysPressed[e.keyCode] = 1;
        if (!this.firstKey) { this.firstKey = e.keyCode; }
      })
      document.addEventListener('keyup', (e) => {
        if(!(e.keyCode !== KEYCODE_G ||
          e.keyCode !== KEYCODE_LEFT ||
          e.keyCode !== KEYCODE_RIGHT ||
          e.keyCode !== KEYCODE_UP ||
          e.keyCode !== KEYCODE_DOWN)){
          return;
        }
        e.preventDefault();
        this.keysPressed[e.keyCode] = 0;
        if (this.firstKey === e.keyCode) { this.firstKey = null; }
        if (this.player) { this.player.stand(); }
      })
    })();
  }

  keyPressed() {
    if(this.finished){
      return;
    }
    var isMoving = this.keysPressed[37] === 1 ||
      this.keysPressed[38] === 1 || this.keysPressed[39] === 1 || this.keysPressed[40] === 1;

    if(!isMoving){
      return;
    }
    var toPlay = {x: [], y: []};
    var x = 0, y = 0;
    if(this.keysPressed[KEYCODE_LEFT] === 1){
      x += this.speed;
      toPlay.x.push('left');
    }
    if(this.keysPressed[KEYCODE_RIGHT] === 1){
      x += -this.speed;
      toPlay.x.push('right');
    }
    if(this.keysPressed[KEYCODE_UP] === 1){
      y += this.speed;
      toPlay.y.push('up');
    }
    if(this.keysPressed[KEYCODE_DOWN] === 1){
      y += -this.speed;
      toPlay.y.push('down');
    }
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
    if(toPlay.x.length > 0){
      toPlayValue = toPlay.x[0]
    }else{
      toPlayValue = toPlay.y[0]
    }
    this.player.goToAndPlay(toPlayValue);

    if(x ===0 && y === 0 ){
      this.player.stand();
      return;
    }
    this.map.move(x, y);
    this.overlay.move(x, y);
    this.steps ++;
    if(Math.floor(this.steps / 5 )> this.moves){
      this.moves = this.steps/5;
      // console.log(this.moves , 'moves')
    }
    this.coldHot();
    // this.stage.update();
  }

  coldHot(){
    var percent = (100 - this.getDistanceToFinish() * 100 / this.initialFinishDistance)/ 100;
    if (percent <= 0)
      percent = 0.01;

    this.progress.graphics.beginRadialGradientFill(["#ff6600","#0066ff"], [0, 1], 0, 0, 0, 0, 0, 65 * percent).
    setStrokeStyle(1).beginStroke("#0066ff").drawCircle(0, 0, 40);
    this.progress.x = this.width/2 - 40;
    this.progress.y = 50;
    this.stage.addChild(this.progress);
  }

  getDistanceToFinish() {
    var finish = this.map.getFinishPos().getBounds();
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

  // TODO
  // addMobileControls(){
  //   var groundDimension = this.map.getGroundDimension();
  //   var self = this;
  //   if(this.height < 600) {
  //     createjs.Touch.enable(this.stage);
  //     var right = new GameObject(this.height - groundDimension, this.height - (groundDimension * 2), 'blue', groundDimension);
  //     right.addToStage(this.stage);
  //     right.addEventListener('click', function () {
  //       console.log('right');
  //       self.keyCodePressed(KEYCODE_RIGHT);
  //     });
  //
  //     var left = new GameObject(this.height - (groundDimension * 2 + 5), this.height - (groundDimension * 2), 'blue', groundDimension);
  //     left.addToStage(this.stage);
  //     left.addEventListener('click', function () {
  //       console.log('left');
  //       self.keyCodePressed(KEYCODE_LEFT);
  //     });
  //
  //     var up = new GameObject(this.height - (groundDimension * 2 - groundDimension / 2), this.height - (groundDimension * 3 + 5), 'blue', groundDimension);
  //     up.addToStage(this.stage);
  //     up.addEventListener('click', function () {
  //       console.log('up');
  //       self.keyCodePressed(KEYCODE_UP);
  //     });
  //     var down = new GameObject(this.height - (groundDimension * 2 - groundDimension / 2), this.height - (groundDimension - 5), 'blue', groundDimension);
  //     down.addToStage(this.stage);
  //     down.addEventListener('click', function () {
  //       console.log('down');
  //       self.keyCodePressed(KEYCODE_DOWN);
  //     });
  //     this.stage.update();
  //   }
  // }

}
