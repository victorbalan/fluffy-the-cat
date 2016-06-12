const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_G = 71;

class InputProcessor {
  constructor() {
    this.movementKeysPressed = {
      37: 0,
      39: 0,
      40: 0,
      38: 0
    };
    this.firstMovementKey = null;
    this.registerEvents();
  }

  getPlayerMovement() {
    var isMoving = this.movementKeysPressed[37] === 1 || this.movementKeysPressed[38] === 1 || this.movementKeysPressed[39] === 1 || this.movementKeysPressed[40] === 1;
    if (!isMoving) {
      return null;
    }
    var animation = {x: [], y: []};
    var x = 0, y = 0;
    if (this.movementKeysPressed[KEYCODE_LEFT] === 1) {
      x += 1;
      animation.x.push('left');
    }
    if (this.movementKeysPressed[KEYCODE_RIGHT] === 1) {
      x += -1;
      animation.x.push('right');
    }
    if (this.movementKeysPressed[KEYCODE_UP] === 1) {
      y += 1;
      animation.y.push('up');
    }
    if (this.movementKeysPressed[KEYCODE_DOWN] === 1) {
      y += -1;
      animation.y.push('down');
    }
    return {x: x, y: y, animation: animation};
  }

  registerEvents() {
    var self = this;
    document.addEventListener('keydown', (e) => {
      if (!this.preventIfGameKey(e)) {
        return;
      }
      if (e.keyCode === KEYCODE_G) {
        // TODO make game an interface than can process any keys except of movement
        self.parent.godMode();
        return;
      }
      this.movementKeysPressed[e.keyCode] = 1;
      if (!this.firstMovementKey) {
        this.firstMovementKey = e.keyCode;
      }
    });
    document.addEventListener('keyup', (e) => {
      if (!this.preventIfGameKey(e)) {
        return;
      }
      this.movementKeysPressed[e.keyCode] = 0;
      if (this.firstMovementKey === e.keyCode) {
        this.firstMovementKey = null;
      }
      if (self.parent.player) {
        self.parent.player.stand();
      }
    })
  }

  preventIfGameKey(e) {
    if (e.keyCode === KEYCODE_G || e.keyCode === KEYCODE_LEFT || e.keyCode === KEYCODE_RIGHT || e.keyCode === KEYCODE_UP || e.keyCode === KEYCODE_DOWN) {
      e.preventDefault();
      return true;
    }
    return false;
  }
}
