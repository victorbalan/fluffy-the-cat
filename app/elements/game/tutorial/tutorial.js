class Tutorial {
  constructor(stage, gameConfig, inputProcessor, mapCreator, onFinishCallback) {
    this.inputProcessor = inputProcessor;
    this.mapCreator = mapCreator;
    this.stage = stage;

    // TODO - fire event
    this.onFinish = onFinishCallback;
    this.gameConfig = gameConfig;


    this.textObjectCreator = new TextObjectCreator();
    this.dialog = new Dialog(this.textObjectCreator, gameConfig);

    this.reset();
  }

  tickListener(event) {
    this.checkPlayerMovement();
    this.coldHot();
    this.stage.update(event);
  }

  enter(){
    this.dialog.clickOk();
  }

  reset(){
    this.skills = {};
    var self = this;
    this.dialog.setOnOkClickListener(function () {
      self.dialog.hide();
      self.inputDisabled = false;
    });
    this.events = {
      'overlay': false,
      'overlay-global': false,
      'progress': false
    };
  }

  start() {
    this.reset();
    this.inputDisabled = true;
    this.dialog.setText('Welcome to Fluffy the Cat!\n' +
      'Your job is to get to the end of the maze.\n' +
      'To move Fluffy you can use the arrow keys \n from your keyboard.\n' +
      'You can press enter to dismiss the dialog.');
    this.dialog.show();
    var level = [
      ['w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'br', 'hor', 'bl', 'w', 'w'],
      ['w', 'ver', 'wb', 'ver', 'w', 'w'],
      ['s', 'tr', 'w', 'ver', 'w', 'w'],
      ['wb', 'wb', 'w', 'ver', 'w', 'w'],
      ['w', 'l', 'hor', 'tlr', 'hor', 'f'],
      ['w', 'wb', 'wb', 'wb', 'wb', 'wb']
    ];
    var events = [
      {i: 2, j: 1, event: 'overlay'},
      {i: 1, j: 2, event: 'progress'},
      {i: 3, j: 3, event: 'overlay-global'},
    ];
    this.godmode = false;

    this.map = new TutorialMap(level, events, this.gameConfig, this.mapCreator);
    this.finished = false;
    this.map.addToStage(this.stage);

    this.player = new Player(this.map.startPos.x, this.map.startPos.y, this.gameConfig.tileDimension);
    this.player.stand();
    this.player.addToStage(this.stage);

    this.overlay = new Overlay(this.stage, this.gameConfig, this.player);
    this.overlay.hideAll();

    this.dialog.addToStage(this.stage);
    this.stage.update();

    this.steps = 0;
    this.moves = 0;

    this.initialFinishDistance = this.getDistanceToFinish();
  }

  clear() {
    this.stage.clear();
    this.stage.update();
  }

  checkPlayerMovement() {
    if (this.finished || this.inputDisabled) {
      return;
    }
    var playerMovement = this.inputProcessor.getPlayerMovement();
    if (!playerMovement) {
      return;
    }
    var moveInfo = this.map.map.getMaxMoveWithIntersectionType(this.player.getBounds(), -playerMovement.x * this.gameConfig.speed, -playerMovement.y * this.gameConfig.speed);
    for (var i = 0; i < moveInfo.intersections.length; i++) {
      if (moveInfo.intersections[i] === 'finish') {
        this.finished = true;
        this.dialog.setText('You finished the tutorial. Good job!\n' +
          'Now we`ll take you to the level selection menu.\nHere you can use the arrows to explore the map \n' +
          'and click the level you want to play.\n' +
          'Yellow is the current level.\n' +
          'Gray is an unavailable level.\n' +
          'Green is an already completed level.\n' +
          'You can use ENTER in the selection screen \n' +
          'to start the current level.');
        this.dialog.show();
        var self = this;
        this.dialog.setOnOkClickListener(function(){
          console.log('onFinish')
          self.onFinish();
        });
        return console.log('ggwwp');
      }
    }
    var x = -moveInfo.max.x;
    var y = -moveInfo.max.y;
    this.player.goToAndPlay(playerMovement.animation);

    if (x === 0 && y === 0) {
      this.player.stand();
      return;
    }
    var toCheck = this.player.getBounds();
    toCheck.x += x;
    toCheck.y += y;
    this.addEvent(this.map.getEvent(toCheck));
    this.map.move(x, y);
    // this.overlay.move(x, y);
    this.steps++;
    if (Math.floor(this.steps / 5) > this.moves) {
      this.moves = this.steps / 5;
      // console.log(this.moves , 'moves')
    }
  }

  addSkills() {
    var self = this;
    var config = {
      action: function () {
        this.overlay.hide();
      }.bind(self),
      onEnd: function () {
        this.overlay.show();
      }.bind(self)
    };
    this.skills.godmode = new Skill(this.gameConfig.width / 2, this.gameConfig.height - this.gameConfig.tileDimension / 2,
      this.gameConfig, 10000, 5000, config);

    this.skills.godmode.addToStage(this.stage);
  }

  addEvent(event) {
    if (!event) {
      return;
    }
    if (this.events[event] === true) {
      return;
    }
    this.inputDisabled = true;
    var self = this;
    switch (event) {
      case 'overlay':
        this.dialog.setText('You will not see so much in real life.\nYou`ll see just as much as if you had a torch.');
        this.overlay.showAll();
        break;
      case 'progress':
        this.dialog.setText('To help you throughout the game you have \nyour cat senses with you.\n' +
          'Your cat senses are represented by the \n' +
          'circle in the top right of the screen.\n' +
          'The closer you are to the finish, the bigger \n' +
          'the orange fill becomes.\n' +
          'It is like an cold hot game.\n' +
          'Bear in mind that your senses show you the \n' +
          'relative position to the finish and not \n' +
          'the correct road.');
        this.progress = new createjs.Shape();
        this.progress.x = this.gameConfig.width - 100;
        this.progress.y = 100;
        this.stage.addChild(this.progress);
        break;
      case 'overlay-global':
        this.dialog.setText('You can press G to turn on/off a more \npowerful flashlight.\n' +
          'Keep in mind that the battery lasts for 5 seconds \n' +
          'and the recharge time is 10 seconds.\n' +
          'The duration and cooldown is displayed in \n' +
          'the skill box in the bottom of the screen.');
        this.addSkills();
        break;
    }
    this.dialog.show();
    this.events[event] = true;
  }

  coldHot() {
    if (!this.progress) {
      return;
    }
    var percent = (100 - this.getDistanceToFinish() * 100 / this.initialFinishDistance) / 100;
    if (percent <= 0)
      percent = 0.01;
    // TODO: this makes the game laggy
    // TODO: fix

    if (percent === this.percent) {
      return;
    }
    this.percent = percent;
    this.progress.graphics
      .beginRadialGradientFill(["#ff6600", "#0066ff"], [0, 1], 0, 0, 0, 0, 0,
        this.gameConfig.tileDimension  * percent + 5)
      .setStrokeStyle(1).beginStroke("#0066ff").drawCircle(0, 0, this.gameConfig.tileDimension /2);
  }

  getDistanceToFinish() {
    var finish = this.map.finishPos;
    var playerBounds = this.player.getBounds();

    var finishX = finish.x, finishY = finish.y;
    var playerX = playerBounds.x, playerY = playerBounds.y;

    var difX = (finishX - playerX);
    var difY = (finishY - playerY);
    return Math.sqrt(difX * difX + difY * difY);
  }

  godMode() {
    this.skills.godmode.use();
  }
}
