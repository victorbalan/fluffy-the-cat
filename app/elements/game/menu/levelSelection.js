class LevelSelection extends BaseMenu {
  // TODO - remove duplicate code
  constructor(stage, width, height, levels, assetLoader, onLevelSelect) {
    super(stage, width, height, assetLoader);
    this.addWalls();
    var self = this;

    var row = 0;
    for (var i = 0; i < levels.length; i++) {
      var level = levels[i];

      var x = (i - row * this.maxElements) * this.elementDimension + this.elementXOffset;
      var y = row * this.elementDimension + this.topOffset;
      var txt = this._text(level.subDifficulty, "bold 20px Arial", x, y, {color: '#FFAA00', cursor: 'pointer'});

      txt.levelId = level._id;
      txt.hitArea = this._hitArea(0, 0, 40, 40);

      txt.addEventListener('mouseover', function (evt) {
        self._mouseOver(evt, stage);
      });
      txt.addEventListener('mouseout', function (evt) {
        self._mouseOut(evt, stage);
      });
      txt.addEventListener('click', function (evt) {
        onLevelSelect(evt.target.levelId);
      });
      stage.addChild(txt);
      if ((i + 1) % this.maxElements === 0) {
        row++;
      }
    }
    stage.update()
  }
}
