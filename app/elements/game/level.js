function Level(level, stage, dimensions) {
  if (!level || level.length === 0 || !level[0] || (level.length !== level[0].length)) {
    console.log('level is not ok')
    return false;
  }
  var walls = [];
  var groundDimension = dimensions / level.length;

  function addToStage() {
    for (var i = 0; i < level.length; i++) {
      var row = level[i];
      for (var j = 0; j < row.length; j++) {
        var x = j * groundDimension;
        var y = i * groundDimension;
        var square = new createjs.Shape();
        if (level[i][j] === 1) {
          square = _wall(x, y);
        } else if (level[i][j] === 'f') {
          square = _finish(x, y);
        } else {
          square = _grass(x, y);
          if (level[i][j] === 's') {
            startPos = square;
          }
        }
        stage.addChild(square);
      }
    }
    stage.update();
  }

  function checkAtFinish(player) {
    return checkIntersection(player, finishPos.getBounds());
  }

  function checkWallCollision(player) {
    for (var i = 0; i < walls.length; i++) {
      if (checkIntersection(player, walls[i].getBounds())) {
        return true;
      }
    }
    return false
  }

  function getGroundDimension() {
    return groundDimension;
  }

  // private
  function _wall(x, y) {
    var wall = _square(x, y, '#4d2600');
    walls.push(wall);
    return wall;
  }

  function _finish(x, y) {
    finishPos = _square(x, y, 'red');
    return finishPos;
  }

  function _grass(x, y) {
    return _square(x, y, '#009933');
  }

  function _square(x, y, color) {
    var square = new createjs.Shape();
    square.graphics.beginFill(color).drawRect(x, y, groundDimension, groundDimension);
    square.setBounds(x, y, groundDimension, groundDimension);
    return square;
  }

  return {
    addToStage: addToStage,
    checkWallCollision: checkWallCollision,
    checkAtFinish: checkAtFinish,
    getGroundDimension: getGroundDimension,
    startPos: function () {
      return startPos;
    }
  }
}
