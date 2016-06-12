class Dialog {
  constructor(textObjectCreator, gameConfig) {
    this.container = new createjs.Container();

    this.blur = new createjs.Shape();
    this.blur.graphics.beginFill('rgba(0,0,0,0.5)').drawRect(0, 0, gameConfig.width, gameConfig.height);


    var bg = new createjs.Shape();
    bg.graphics.beginFill('DeepSkyBlue')
      .drawRect(0, 0, 600, 400);

    var buttonBg = new createjs.Shape();
    buttonBg.graphics.beginFill('#7fdfff')
      .drawRect(450, 320, 100, 50);

    buttonBg.addEventListener('mouseover', function (evt) {
      evt.target.graphics.clear().beginFill('#4cd2ff')
        .drawRect(450, 320, 100, 50);
    });

    buttonBg.addEventListener('mouseout', function (evt) {
      evt.target.graphics.clear().beginFill('#7fdfff')
        .drawRect(450, 320, 100, 50);
    });
    var buttonText = textObjectCreator.simpleText('OK',
      "20px Josefin Sans", 480, 335, {
        color: 'yellow'
      });

    var topBarBg = new createjs.Shape();
    topBarBg.graphics.beginFill('#0099cc')
      .drawRect(0, 0, 600, 50);

    this.okButton = buttonBg;

    this.text = textObjectCreator.simpleText('',
      "28px Josefin Sans", 50, 65, {
        color: 'yellow'
      }, true);
    this.container.addChild(bg);
    this.container.addChild(this.okButton);
    this.container.addChild(buttonText);
    this.container.addChild(topBarBg);
    this.container.addChild(this.text);
    this.container.x = gameConfig.width / 2 - 300;
    this.container.y = gameConfig.height / 2 - 200;
    this.container.visible = false;
  }

  addToStage(stage) {
    stage.addChild(this.blur);
    stage.addChild(this.container);
  }

  setText(value) {
    this.text.text = value;
  }

  setOnOkClickListener(listener) {
    this.listener = listener;
    this.okButton.addEventListener('click', function (evt) {
      listener();
    });
  }

  clickOk(){
    this.listener();
  }

  show() {
    var self = this;
    this.container.visible = true;
    this.blur.visible = true;

  }

  hide() {
    var self = this;
    var interval = setInterval(function () {
      if (self.container.scaleX <= 0.01) {
        self.container.visible = false;
        self.blur.visible = false;
        self.container.scaleX = 1;
        self.container.scaleY = 1;
        self.container.x -= 300;
        self.container.y -= 200;
        return clearInterval(interval);
      }
      self.container.scaleX -= 0.01;
      self.container.scaleY -= 0.01;
      self.container.x += 3;
      self.container.y += 2;
    }, 1);
  }
}
