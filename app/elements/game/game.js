function Game(canvas, levels) {
  var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;
  var currentLevel = 0;
  document.onkeydown = keyPressed
  var stage, level, player, overlay;
  var godmode = false;

  function start() {
    stage = new createjs.Stage(canvas);
    level = new Level(levels[currentLevel], stage, 600);
    level.addToStage();
    overlay = new Overlay(stage, levels[currentLevel].length, level.getGroundDimension());
    player = new Player(level.startPos().getBounds(), stage);
    overlay.update(player);
  }

  function keyPressed(event) {
    var bounds = player.getBounds();
    switch (event.keyCode) {
      case KEYCODE_LEFT:
        bounds.x -= 10;
        break;
      case KEYCODE_RIGHT:
        bounds.x += 10;
        break;
      case KEYCODE_UP:
        bounds.y -= 10;
        break;
      case KEYCODE_DOWN:
        bounds.y += 10;
        break;
    }
    bounds.width = player.getPlayerDimension();
    bounds.height = player.getPlayerDimension();
    if (bounds.x < 0 || bounds.y < 0 || bounds.x > 600 - player.getPlayerDimension() || bounds.y > 600 - player.getPlayerDimension()) {
      console.log('out of bounds')
      return;
    }
    if (level.checkAtFinish(bounds)) {
      console.log('ggwp');
    }
    if (level.checkWallCollision(bounds)) {
      console.log('wall collision');
      return;
    }
    player.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
    overlay.update(player, godmode);

    stage.update();
  }

  return {
    start: start,
    godmode: function () {
      godmode = !godmode;
      overlay.update(player, godmode)
    }
  }
}
