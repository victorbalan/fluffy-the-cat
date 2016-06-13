class Skill {
  constructor(x, y, gameConfig, cooldown, duration, config) {
    this.cooldown = cooldown;
    this.duration = duration;
    this.dimension = gameConfig.tileDimension / 2;
    this.container = new createjs.Container();

    this.skill = new createjs.Shape();
    this.skill.graphics.beginFill('DeepSkyBlue').drawRect(0, 0, this.dimension, this.dimension);
    this.container.addChild(this.skill);
    this.container.x = x;
    this.container.y = y;
    this.config = config;
    this.status = 'usable';
  }

  addToStage(stage) {
    stage.addChild(this.container);
  }

  use() {
    if(this.status !== 'usable'){
      return;
    }
    this.config.action();
    if (!this.duration) {
      return this.startCooldown();
    }
    this.status = 'not-usable';

    var self = this;
    var countdown = this.dimension * 2;
    var interval = setInterval(function () {
      if (countdown < 0) {
        self.config.onEnd();
        self.startCooldown();
        return clearInterval(interval);
      }
      self.skill.graphics.clear().setStrokeStyle(1).beginStroke('DeepSkyBlue')
        .beginLinearGradientFill(['red', 'blue'], [0.5, 0.5], 0, self.dimension, countdown, self.dimension)
        .drawRect(0, 0, self.dimension, self.dimension);
      countdown -= self.dimension * 2 / 100;
    }, this.duration / 100);
  }

  startCooldown() {
    this.status = 'not-usable';

    var self = this;
    var countdown = 0;
    var interval = setInterval(function () {
      if (countdown >= self.dimension * 2) {
        self.usable();
        return clearInterval(interval);
      }
      self.skill.graphics.clear().setStrokeStyle(1).beginStroke('DeepSkyBlue')
        .beginLinearGradientFill(['red', 'blue'], [0.5, 0.5], 0, self.dimension, countdown, self.dimension)
        .drawRect(0, 0, self.dimension, self.dimension);
      countdown += self.dimension * 2 / 100;
    }, this.cooldown / 100);
  }

  usable(){
    this.status = 'usable';
    this.skill.graphics.beginFill('DeepSkyBlue').drawRect(0, 0, this.dimension, this.dimension);
  }
}
