class Player extends GameObject {
  constructor(x, y, dimension) {
    dimension = dimension / 2;
    super(dimension, dimension);
    this.object = this.cat(x, y, dimension)
    this.animationState = '';
    this.soundPlaying = false;
    this.setBounds({x: x, y: y, width: dimension, height: dimension});
    // TODO add sounds after optmizations
    // this.sound = createjs.Sound.play("footstep", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1});
  }

  cat(x, y, dimension) {
    var first_simple = {
      stand: [24],
      right: [24, 26],
      left: [12, 14],
      up: [36, 38],
      down: [0, 2]
    };
    var second_brown = {
      stand: [27],
      right: [27, 29],
      left: [15, 17],
      up: [39, 41],
      down: [3, 5]
    };
    var third_ugly_bald = {
      stand: [30],
      right: [30, 32],
      left: [18, 20],
      up: [42, 44],
      down: [6, 8]
    };

    var fourth_tiger = {
      stand: [33],
      right: [33, 35],
      left: [21, 23],
      up: [45, 47],
      down: [9, 11]
    };

    var fifth_black = {
      stand: [72],
      right: [72, 74],
      left: [60, 62 ],
      up: [84, 86],
      down: [48, 50]
    };

    var sixth_yellow = {
      stand: [75],
      right: [75, 77],
      left: [63, 65],
      up: [87, 89],
      down: [51, 53]
    };

    var seventh_brown = {
      stand: [78],
      right: [78, 80],
      left: [66, 68],
      up: [90, 92],
      down: [54, 56]
    };

    var eight_black = {
      stand: [81],
      right: [81, 83],
      left: [69, 71],
      up: [93, 95],
      down: [57, 59]
    };

    var data = {
      images: ["/images/cat_sprite.png"],
      frames: {width: 31.6, height: 32},
      animations: fourth_tiger
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet);
    animation.framerate = 15;
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
    // TODO add sounds after optmizations
    // if(a !== 'stand' && !this.soundPlaying) {
    //   this.soundPlaying = true;
    //   this.sound.play();
    // }else{
    //   console.log('stop')
    //   // fix standing issue(when fluffy hits a wall it enters stand mode)
    //   // this.soundPlaying = false;
    //   // this.sound.stop();
    // }
    this.animationState = a;
    this.object.gotoAndPlay(a);
  }
}
