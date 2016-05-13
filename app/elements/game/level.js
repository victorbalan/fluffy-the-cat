const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const SPEED = 10;

class Level {
  constructor(canvas, level, dimension) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.godmode = false;
    this.map = new LevelMap(level, dimension);
    this.mapLength = level.length;
    this.dimension = dimension;
  }

  start() {
    this.stage = new createjs.Stage(this.canvas);
    this.map.addToStage(this.stage);
    this.player = new Player(this.map.getStartPos().getBounds());
    this.player.addToStage(this.stage);
    this.overlay = new Overlay(this.stage, this.mapLength, this.map.getGroundDimension());
    this.overlay.update(this.player);
    this.registerEvents();
  }

  registerEvents() {
    (() => {
      document.addEventListener('keydown', (event) => {
        this.keyPressed(event);
      })
    })();
  }

  keyPressed(event) {
    var bounds = this.player.getBounds();
    switch (event.keyCode) {
      case KEYCODE_LEFT:
        bounds.x -= SPEED;
        break;
      case KEYCODE_RIGHT:
        bounds.x += SPEED;
        break;
      case KEYCODE_UP:
        bounds.y -= SPEED;
        break;
      case KEYCODE_DOWN:
        bounds.y += SPEED;
        break;
    }
    if (bounds.x < 0 || bounds.y < 0 || bounds.x > this.dimension - bounds.width || bounds.y > this.dimension - bounds.height) {
      console.log('out of bounds');
      return;
    }
    if (this.map.checkAtFinish(bounds)) {
      console.log('ggwp');
    }
    if (this.map.checkWallCollision(bounds)) {
      console.log('wall collision');
      return;
    }
    this.player.moveTo(bounds.x, bounds.y);
    this.overlay.update(this.player, this.godmode);
    this.stage.update();
    console.log('updating stage');
  }

  godMode() {
    this.godmode = !this.godmode;
    this.overlay.update(this.player, this.godmode)
  }
}
