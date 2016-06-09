class Player extends GameObject {
  constructor(x, y, dimension) {
    dimension = dimension / 2;
    super(dimension, dimension);
    this.object = this.cat(x, y, dimension)
    this.animationState = '';
    this.setBounds({x: x, y: y, width: dimension, height: dimension});
  }

  cat(x, y, dimension) {
    var simple = {
      stand: [24],
      right: [24, 26],
      left: [12, 14],
      up: [36, 38],
      down: [0, 2]
    };

    var tiger = {
      stand: [33],
      right: [33, 35],
      left: [21, 23],
      up: [45, 47],
      down: [9, 11]
    };

    var data = {
      images: ["/images/cat_sprite.png"],
      frames: {width: 31.6, height: 32},
      animations: tiger
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet);
    animation.x = x;
    animation.y = y ;
    animation.gotoAndPlay('stand');

    animation.scaleX = dimension/31.6;
    animation.scaleY = dimension/32;

    return animation;
  }

  stand() {
    this.goToAndPlay('stand');
  }

  goToAndPlay(a) {
    if (a === this.animationState) {
      return;
    }
    this.animationState = a;
    this.object.gotoAndPlay(a);
  }
}
