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

    this.player = new Player(this.map.getStartPos().object.x, this.map.getStartPos().object.y, this.map.getStartPos().dimension/2);
    this.player.addToStage(this.stage);

    this.overlay = new Overlay(this.stage, this.mapLength, this.map.getGroundDimension());
    this.overlay.update(this.player);

    this.registerEvents();
    console.log(this.player)
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
    var bounds = this.player.getBounds();
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
    }
    bounds.x = bounds.x - x;
    bounds.y = bounds.y - y;
    switch(this.map.getIntersectionType(bounds)){
      case 'collision':
        return;
      case 'finish':
        alert('ggwp');
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
