const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_G = 71;
const SPEED = 10;

class Game {
  constructor(stage, dimension, onFinishCallback) {
    this.stage = stage;
    this.godmode = false;
    this.godmode = false;
    this.mapLength = 10;
    this.dimension = dimension;
    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.registerEvents();
  }
  startLevel(level) {
    console.log('starting')
    this.stage.removeAllChildren();
    this.stage.update();
    this.map = new LevelMap(level, this.dimension);
    this.mapLength = level.length;
    this.start();
  }

  start() {
    this.map.addToStage(this.stage);

    this.player = new Player(this.map.getStartPos().object.x, this.map.getStartPos().object.y, this.map.getStartPos().dimension);
    this.player.addToStage(this.stage);

    this.overlay = new Overlay(this.stage, this.mapLength, this.map.getGroundDimension());
    this.overlay.update(this.player);

    console.log(this.player)
    this.stage.update();
  }

  clear() {
    this.stage.clear();
    this.stage.update();
  }
  // TODO
  addMobileControls(){
    var groundDimension = this.map.getGroundDimension();
    var self = this;
    if(this.dimension < 600) {
      createjs.Touch.enable(this.stage);
      var right = new GameObject(this.dimension - groundDimension, this.dimension - (groundDimension * 2), 'blue', groundDimension);
      right.addToStage(this.stage);
      right.addEventListener('click', function () {
        console.log('right');
        self.keyCodePressed(KEYCODE_RIGHT);
      });

      var left = new GameObject(this.dimension - (groundDimension * 2 + 5), this.dimension - (groundDimension * 2), 'blue', groundDimension);
      left.addToStage(this.stage);
      left.addEventListener('click', function () {
        console.log('left');
        self.keyCodePressed(KEYCODE_LEFT);
      });

      var up = new GameObject(this.dimension - (groundDimension * 2 - groundDimension / 2), this.dimension - (groundDimension * 3 + 5), 'blue', groundDimension);
      up.addToStage(this.stage);
      up.addEventListener('click', function () {
        console.log('up');
        self.keyCodePressed(KEYCODE_UP);
      });
      var down = new GameObject(this.dimension - (groundDimension * 2 - groundDimension / 2), this.dimension - (groundDimension - 5), 'blue', groundDimension);
      down.addToStage(this.stage);
      down.addEventListener('click', function () {
        console.log('down');
        self.keyCodePressed(KEYCODE_DOWN);
      });
      this.stage.update();
    }
  }

  registerEvents() {
    (() => {
      document.addEventListener('keydown', (event) => {
        this.keyPressed(event);
      })
    })();
  }

  keyPressed(event) {
    var x =0, y = 0;
    switch (event.keyCode) {
      case KEYCODE_LEFT:
        x = SPEED;
        break;
      case KEYCODE_RIGHT:
        x = -SPEED;
        break;
      case KEYCODE_UP:
        y = SPEED;
        break;
      case KEYCODE_DOWN:
        y = -SPEED;
        break;
      case KEYCODE_G:
        this.godMode();
        return;
      default:
        return;
    }
    event.preventDefault();
    var bounds = this.player.getBounds();
    bounds.x = bounds.x - x;
    bounds.y = bounds.y - y;
    switch(this.map.getIntersectionType(bounds)){
      case 'collision':
        return;
      case 'finish':
        this.onFinish();
        console.log('ggwp');
        break;
    }
    this.map.move(x, y);
    this.stage.update();
  }

  godMode() {
    this.godmode = !this.godmode;
    console.log(this.godmode);
    this.overlay.update(this.player, this.godmode)
  }
}
