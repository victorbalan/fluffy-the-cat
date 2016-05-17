class Menu extends BaseMenu {
  constructor(stage, width, height, onPlay) {
    super(stage, width, height, "Fluffy the cat");
    var self = this;

    var txtPlay = this._text("Play", "bold 40px Arial", width / 2, 200, {
      color: '#FFAA00',
      textAlign: 'center',
      cursor: 'pointer'
    });
    var hitArea = this._hitArea(-50, 0, 100, 100);
    txtPlay.hitArea = hitArea;
    txtPlay.addEventListener('mouseover', function (evt) {
      self._mouseOver(evt, stage);
    });

    txtPlay.addEventListener('mouseout', function (evt) {
      self._mouseOut(evt, stage);
    });
    txtPlay.addEventListener('click', onPlay);
    stage.addChild(txtPlay);
    stage.update()
  }
}
