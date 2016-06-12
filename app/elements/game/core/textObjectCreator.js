class TextObjectCreator {
  constructor(){}

  text(text, font, x, y, options, withHitArea) {
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

    if(withHitArea){
      console.log(text.length);
      txt.hitArea = this._hitArea(0, 0, 40, 40);
    }

    txt.addEventListener('mouseover', this._mouseOver.bind(this));
    txt.addEventListener('mouseout', this._mouseOut.bind(this));

    return txt;
  }

  _hitArea(x, y, width, height) {
    var square = new createjs.Shape();
    square.graphics.beginFill('white').drawRect(0, 0, width, height);
    square.x = x;
    square.y = y;
    return square;
  }

  _mouseOver(evt) {
    evt.target.scaleX = 1.3;
    evt.target.scaleY = 1.3;
    evt.target.color = 'red';
  }

  _mouseOut(evt) {
    evt.target.scaleX = 1;
    evt.target.scaleY = 1;
    evt.target.color = evt.target.mainColor;
  }
}
