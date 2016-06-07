class GroundTiles extends GameObject {
  constructor(x, y, dimension) {
    super(x, y, 'DeepSkyBlue', dimension/2)
    this.animationState = '';
    this.setBounds({x: x, y: y, width: dimension/2, height: dimension/2});
  }

  _square(x, y, color, dimension){
    // var data = {
    //   "images": ["images/dungeon_tiles.png"],
    //   "frames": {
    //     "height": 20,
    //     "width": 20
    //   },
    //   'animations': {
    //     'simple': 4.5
    //   }
    // };
    // var spriteSheet = new createjs.SpriteSheet(data);
    // var animation = new createjs.Sprite(spriteSheet, 'simple');
    // animation.x = x;
    // animation.y = y;
    // // animation.gotoAndPlay('simple');
    //
    // animation.scaleX = dimension / 10;
    // animation.scaleY = dimension / 10;
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
