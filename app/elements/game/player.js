function Player(startPos, stage) {
  if (!startPos.height) {
    console.log('start pos not valid');
    return;
  }
  stage = stage;
  var playerDimension = startPos.height / 2;
  var player = new createjs.Shape();
  player.graphics.beginFill("DeepSkyBlue").drawRect(startPos.x, startPos.y, playerDimension, playerDimension);
  player.setBounds(startPos.x, startPos.y, playerDimension, playerDimension);
  stage.addChild(player);
  stage.update();

  return {
    getBounds: function () {
      return player.getBounds();
    },
    setBounds: function (x, y, width, height) {
      player.setBounds(x, y, width, height);
      player.x = x;
      player.y = y;
    },
    getPlayerDimension: function () {
      return playerDimension;
    }
  }
}
