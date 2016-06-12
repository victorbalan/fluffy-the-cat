class Main {
  constructor(stage, width, height, assetsLoader, parent){
    this.stage = stage;
    this.gameObjectCreator = new GameObjectCreator();
    this.mapCreator = new MapCreator(assetsLoader, this.gameObjectCreator);
    this.parent = parent;
    this.inputProcessor = new InputProcessor(this);

    this.gameConfig = {
      width: width,
      height: height,
      tileDimension: Math.min(width, height) / 8
    };
    this.gameConfig.speed = this.gameConfig.tileDimension / 10;

    this.initCreateJs(stage);

    this.currentLevel = new Level(this.stage, this.gameConfig, this.inputProcessor, this.mapCreator, parent.onLevelFinished);
    var self = this;
    this.tutorial = new Tutorial(this.stage, this.gameConfig, this.inputProcessor, this.mapCreator, parent.onTutorialFinished);
    this.levelSelection = new LevelSelectionFluffy(this.stage, this.gameConfig, this.inputProcessor, this.mapCreator, function(){
      self.startTutorial();
    });
  }

  showLevelSelection(levelsMap, finishedGames, onLevelSelectCallback){
    if(!this.tutorialStarted && (!finishedGames || finishedGames.length === 0)){
      this.tutorialStarted = true;
      return this.startTutorial();
    }
    createjs.Ticker.removeAllEventListeners('tick');
    createjs.Ticker.addEventListener('tick', this.levelSelection.tickListener.bind(this.levelSelection));
    this.stage.removeAllChildren();
    this.inputProcessor.parent = this.levelSelection;
    this.levelSelection.show(levelsMap, finishedGames, onLevelSelectCallback);
  }

  start(level){
    createjs.Ticker.removeAllEventListeners('tick');
    createjs.Ticker.addEventListener('tick', this.currentLevel.tickListener.bind(this.currentLevel));
    this.stage.removeAllChildren();
    this.inputProcessor.parent = this.currentLevel;
    this.currentLevel.start(level);
  }

  startTutorial(){
    createjs.Ticker.removeAllEventListeners('tick');
    createjs.Ticker.addEventListener('tick', this.tutorial.tickListener.bind(this.tutorial));
    this.stage.removeAllChildren();
    this.inputProcessor.parent = this.tutorial;
    this.tutorial.start();
  }

  initCreateJs(stage) {
    stage.enableMouseOver(30);
    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(50);
    createjs.Ticker.useRAF = true;
    // var self = this;
    // createjs.Ticker.addEventListener("tick", function (event) {
    //   self.checkPlayerMovement();
    //   // self.coldHot();
    //   stage.update(event);
    // });
  }
}
