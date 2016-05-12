const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const SPEED = 10;

class Game {
  constructor(canvas, levels) {
    this.currentLevel = 0;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.godmode = false;
    this.levels = levels;
  }

  start() {
    this.stage = new createjs.Stage(this.canvas);
    this.level = new Level(this.levels[this.currentLevel], this.stage, 600);
    this.player = new Player(this.level.getStartPos().getBounds(), this.stage);
    this.overlay = new Overlay(this.stage, this.levels[this.currentLevel].length, this.level.getGroundDimension());
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
    bounds.width = this.player.getPlayerDimension();
    bounds.height = this.player.getPlayerDimension();
    if (bounds.x < 0 || bounds.y < 0 || bounds.x > 600 - this.player.getPlayerDimension() || bounds.y > 600 - this.player.getPlayerDimension()) {
      console.log('out of bounds');
      return;
    }
    if (this.level.checkAtFinish(bounds)) {
      console.log('ggwp');
    }
    if (this.level.checkWallCollision(bounds)) {
      console.log('wall collision');
      return;
    }
    this.player.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
    this.overlay.update(this.player, this.godmode);

    this.stage.update();
  }

  godMode() {
    this.godmode = !this.godmode;
    this.overlay.update(this.player, this.godmode)
  }
}
