class Menu extends BaseMenu {
  constructor(stage, width, height, userFullName, assetLoader, onPlay) {
    super(stage, width, height, assetLoader);
    this.userFullName = userFullName;
    this.onPlay = onPlay;
    this.addWalls();
    this.addText();
  }

  addText(){
    var self = this;
    var txtHelloUser = this._text("Hi " + this.userFullName, "bold 20px Arial", this.width / 2, this.height / 6, {
      color: '#FFAA00',
      textAlign: 'center'
    });
    this.stage.addChild(txtHelloUser);

    var txtPlay = this._text("Play", "bold 40px Arial", this.width / 2, this.height / 4, {
      color: '#FFAA00',
      textAlign: 'center',
      cursor: 'pointer'
    });
    var hitArea = this._hitArea(-50, 0, 100, 100);
    txtPlay.hitArea = hitArea;
    txtPlay.addEventListener('mouseover', function (evt) {
      self._mouseOver(evt, self.stage);
    });

    txtPlay.addEventListener('mouseout', function (evt) {
      self._mouseOut(evt, self.stage);
    });
    txtPlay.addEventListener('click', this.onPlay);
    this.stage.addChild(txtPlay);

    var txtInstructions = this._text("g - God mode(see all map)", "bold 20px Arial", this.width / 2, this.height / 2, {
      color: '#FFAA00',
      textAlign: 'center'
    })
    this.stage.addChild(txtInstructions);

    txtInstructions = this._text("bar legend - the brighter the color is the closer you are to finish", "bold 20px Arial", this.width / 2, this.height / 2 + 30, {
      color: '#FFAA00',
      textAlign: 'center'
    })
    this.stage.addChild(txtInstructions);

    txtInstructions = this._text("backspace - go to the previous menu", "bold 20px Arial", this.width / 2, this.height / 2 + 60, {
      color: '#FFAA00',
      textAlign: 'center'
    })
    this.stage.addChild(txtInstructions);
    this.stage.update()
  }
}
