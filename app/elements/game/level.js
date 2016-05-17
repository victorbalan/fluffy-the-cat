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
  constructor(stage, width, height, onFinishCallback, onMoveCallback) {
    // NOTE 2.5% would fit perfectly but the map would flicker.
    // TODO - solve
    this.speed = 2 * height / 100;
    this.stage = stage;
    this.godmode = false;
    this.godmode = false;
    this.height = height;
    this.width = width;
    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.onMove = onMoveCallback;
    this.registerEvents();
  }

  startLevel(level) {
    console.log('starting')
    this.stage.removeAllChildren();
    this.stage.update();
    this.map = new LevelMap(level, this.width, this.height);
    this.mapLength = level.length;
    this.start();
  }

  start() {
    this.map.addToStage(this.stage);

    this.player = new Player(this.map.getStartPos().object.x, this.map.getStartPos().object.y, this.map.getStartPos().dimension);
    this.player.addToStage(this.stage);

    this.overlay = new Overlay(this.stage, this.width, this.height, this.player);

    this.stage.update();
    this.initialFinishDistance = this.getDistanceToFinish();
  }

  clear() {
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

  keyPressed(event) {
    var x = 0, y = 0;
    switch (event.keyCode) {
      case KEYCODE_LEFT:
        x = this.speed;
        break;
      case KEYCODE_RIGHT:
        x = -this.speed;
        break;
      case KEYCODE_UP:
        y = this.speed;
        break;
      case KEYCODE_DOWN:
        y = -this.speed;
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
    switch (this.map.getIntersectionType(bounds)) {
      case 'collision':
        return;
      case 'finish':
        this.onFinish();
        console.log('ggwp');
        break;
    }
    this.map.move(x, y);
    this.stage.update();
    this.computeNewDistanceToFinish();
  }

  computeNewDistanceToFinish() {
    var distance = this.getDistanceToFinish();
    var normalizedDistance = this.normalizeDistance(distance);
    this.onMove(this.computeDistanceGradient(normalizedDistance));
  }

  computeDistanceGradient(distance) {
    var percentFade = Math.round(100 - (distance * 100) / 255) / 100;
    console.log(percentFade);
    var diffRed = endColor.r - startColor.r;
    var diffGreen = endColor.g - startColor.g;
    var diffBlue = endColor.b - startColor.b;

    diffRed = Math.round(Math.abs((diffRed * percentFade) + startColor.r));
    diffGreen = Math.round(Math.abs((diffGreen * percentFade) + startColor.g));
    diffBlue = Math.round(Math.abs((diffBlue * percentFade) + startColor.b));

    var style = `background-color:rgba(${diffRed},${diffGreen},${diffBlue},1)`;
    return style;
  }

  normalizeDistance(distance) {
    return (distance * 255) / this.initialFinishDistance;
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
