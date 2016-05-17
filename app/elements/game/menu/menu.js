class Menu extends BaseMenu {
  constructor(stage, width, height, onPlay) {
    super(stage, width, height, "Fluffy the cat");
    var self = this;

    var txtPlay = this._text("Play", "bold 40px Arial", width / 2, height/4, {
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

    var txtInstructions = this._text("g - God mode(see all map)", "bold 20px Arial", width / 2, height/2, {
      color: '#FFAA00',
      textAlign: 'center'
    })
    stage.addChild(txtInstructions);

    txtInstructions = this._text("bar legend - the brighter the color is the closer you are to finish", "bold 20px Arial", width / 2, height/2 + 30, {
      color: '#FFAA00',
      textAlign: 'center'
    })
    stage.addChild(txtInstructions);

    txtInstructions = this._text("backspace - go to the previous menu", "bold 20px Arial", width / 2, height/2 + 60, {
      color: '#FFAA00',
      textAlign: 'center'
    })
    stage.addChild(txtInstructions);
    stage.update()
  }
}
