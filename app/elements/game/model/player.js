class Player extends GameObject {
  constructor(x, y, dimension) {
    super(x, y, 'DeepSkyBlue', dimension/2)
    this.animationState = '';
    this.setBounds({x: x, y: y, width: dimension/2, height: dimension/2});
  }

  _square(x, y, color, dimension){
    var data = {
      images: ["/images/cat_sprite.png"],
      frames: {width:31.6, height:32},
      animations: {
        stand: [24],
        right: [24,26],
        left: [12,14],
        up: [36,38],
        down: [0,2]
      }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet);
    animation.x = x;
    animation.y = y;
    animation.gotoAndPlay('up');
    
    animation.scaleX = 1.5;
    animation.scaleY = 1.5;
    return animation;
  }

  goToAndPlay(a){
    if(a === this.animationState){
      return;
    }
    this.animationState = a;
    this.object.gotoAndPlay(a);
  }

  getBounds() {
    return this.object.getBounds()
  }
}
