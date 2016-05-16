const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_G = 71;
const SPEED = 10;

class Game {
  constructor(canvas, dimension, onFinishCallback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.godmode = false;
    this.mapLength = 10;
    this.dimension = dimension;
    this.stage = new createjs.Stage(this.canvas);
    // TODO - fire event
    this.onFinish = onFinishCallback;
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

    this.registerEvents();
    console.log(this.player)
    this.stage.update();
  }

  clear(){
    this.stage.clear();
    this.stage.update();
  }

  registerEvents() {
    (() => {
      document.addEventListener('keydown', (event) => {
        this.keyPressed(event);
      })
    })();
  }

  moveWalls(dir){
    this.map.move(dir, this.stage);
    this.stage.update();
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
    this.overlay.update(this.player, this.godmode)
  }
}
