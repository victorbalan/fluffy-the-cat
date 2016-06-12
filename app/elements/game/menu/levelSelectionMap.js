class LevelSelectionMap {
  // TODO: refactor
  constructor(level, events, finishedGames, gameConfig, mapCreator, onLevelSelect) {
    var finishedGamesMap = {};
    for (var i = 0; i < finishedGames.length; i++) {
      finishedGamesMap[finishedGames[i].level] = 'ok';
    }

    this.gameConfig = gameConfig;
    this.textObjectCreator = new TextObjectCreator();

    this.map = mapCreator.createMap(level, gameConfig.tileDimension);

    this.textObjects = [];
    var currentY = 0;
    var currentX = 0;
    for (var i = 0; i < events.length; i++) {
      var x = events[i].j * this.gameConfig.tileDimension;
      var y = events[i].i * this.gameConfig.tileDimension;

      var color = '#FFAA00', cursor = 'pointer';
      if (events[i].data.prev == null && (!finishedGames || finishedGames.length === 0)) {
        currentY = y;
        currentX = x;
      } else if (!!finishedGamesMap[events[i].data._id]) {
        color = 'green';
      } else if (!!finishedGamesMap[events[i].data.prev]) {
        currentY = y;
        currentX = x;
      } else {
        color = 'grey';
        cursor = undefined;
      }

      var txt = this.textObjectCreator.text(events[i].data.levelKey, "bold 20px Arial", x + this.gameConfig.tileDimension / 2, y + this.gameConfig.tileDimension / 3, {
        color: color,
        cursor: cursor
      }, true);
      if (color !== 'grey') {
        txt.levelId = events[i].data._id;
        txt.mainColor = color;

        txt.addEventListener('click', function (evt) {
          onLevelSelect(evt.target.levelId);
        });
      }
      this.textObjects.push(txt);
    }
    this.current = {
      x: currentX,
      y: currentY
    }
  }

  move(x, y) {
    this.map.move(x, y);
    for (var i = 0; i < this.textObjects.length; i++) {
      this.textObjects[i].x += x;
      this.textObjects[i].y += y;
    }
  }


  addToStage(stage) {
    stage.addChild(this.map.container);
    for (var i = 0; i < this.textObjects.length; i++) {
      stage.addChild(this.textObjects[i]);
    }
  }

  getIntersectionType(player) {
    return this.map.getIntersectionType(player);
  }

}
