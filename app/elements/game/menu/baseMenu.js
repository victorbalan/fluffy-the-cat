class BaseMenu {
  constructor(stage, width, height, title) {
    stage.enableMouseOver(10);
    stage.addChild(this._text(title, "bold 30px Georgia", width / 2 - 10, 20, {color: 'red', textAlign: 'center'}));

    this.elementWidth = 100;
    this.topOffset = 90;
    this.elementDimension = 100;
    this.maxElements = height / this.elementWidth - 1;
    this.elementXOffset = (width - this.maxElements * this.elementDimension) / 2;
  }

  _text(text, font, x, y, options) {
    var txt = new createjs.Text();
    txt.font = font;
    txt.text = text;
    txt.x = x;
    txt.y = y;
    if (options) {
      if (options.color) {
        txt.color = options.color;
      }
      if (options.textAlign) {
        txt.textAlign = options.textAlign;
      }
      if (options.cursor) {
        txt.cursor = options.cursor;
      }
    }
    return txt;
  }

  _hitArea(x, y, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginFill('white').drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    return square;
  }

  _mouseOver(evt, stage) {
    evt.target.scaleX = 1.3;
    evt.target.scaleY = 1.3;
    evt.target.color = 'red';
    stage.update();
  }

  _mouseOut(evt, stage) {
    evt.target.scaleX = 1;
    evt.target.scaleY = 1;
    evt.target.color = '#FFAA00';
    stage.update();
  }
}
