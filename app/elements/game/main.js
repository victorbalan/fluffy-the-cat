class Main {
  constructor(stage, width, height, assetsLoader, parent){
    this.stage = stage;
    this.width = width;
    this.height = height;
    this.assetsLoader = assetsLoader;
    this.parent = parent;

    this.gameConfig = {
      width: width,
      height: height,
      tileDimension: Math.min(width, height) / 8
    };
    this.gameConfig.speed = this.gameConfig.tileDimension / 10;

    this.currentLevel = new Level(this.stage, this.gameConfig, this.assetsLoader, parent.onLevelFinished);
    this.levelSelection = new LevelSelectionFluffy(this.stage, this.gameConfig, this.assetsLoader);
  }

  showLevelSelection(levelsMap, finishedGames, onLevelSelectCallback){
    this.stage.removeAllChildren();
    this.stage.update();
    this.levelSelection.show(levelsMap, finishedGames, onLevelSelectCallback);
  }

  start(level){
    this.stage.removeAllChildren();
    this.stage.update();
    this.currentLevel.start(level);
  }
}
