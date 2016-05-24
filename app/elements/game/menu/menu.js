class Menu extends BaseMenu {
  constructor(stage, width, height, userFullName, onPlay) {
    super(stage, width, height, "Fluffy the cat");
    this.width = width;
    this.height = height;
    this.stage = stage;
    this.userFullName = userFullName;
    this.onPlay = onPlay;

    var self = this;

    var manifest = [
      {src: "/images/ground.png", id: "ground"},
      {src: "/images/brickwall.png", id: "wall"}
    ];

    var self = this;
    this.assetLoader = new createjs.LoadQueue(false);
    this.assetLoader.addEventListener("complete", function(){
      self.addWalls();
      self.addText();
    });
    this.assetLoader.loadManifest(manifest, true);
  }

  addWalls() {
    var groundTexture = this.assetLoader.getResult('wall');
    var dimension = 55;
    new TexturedGameObject(0, 0, this.assetLoader.getResult('ground'), this.width, this.height).addToStage(this.stage);

    new TexturedGameObject(0, 0, groundTexture, this.width, dimension).addToStage(this.stage);
    new TexturedGameObject(0, this.height - dimension, groundTexture, this.width, dimension).addToStage(this.stage);
    new TexturedGameObject(0, dimension, groundTexture, dimension, this.height - 2 * dimension).addToStage(this.stage);
    new TexturedGameObject(this.width - dimension, dimension, groundTexture, dimension, this.height - 2 * dimension).addToStage(this.stage);
    this.stage.update();
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
