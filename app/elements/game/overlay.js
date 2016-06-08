class Overlay {
  constructor(stage, width, height, p) {
    this.stage = stage;
    this.width = width;
    this.height = height;
    var pb = p.getBounds();
    this.player = {x: pb.x, y: pb.y, width: pb.width, height: pb.height};
    this.player.x = this.player.x + this.player.width / 2;
    this.player.y = this.player.y + this.player.height / 2;
    this.dimension = this.player.height * 9;

    this.updateOverlay();
  }

  show() {
    this.overlay.visible = true;
    this.stage.update();
  }

  hide() {
    this.overlay.visible = false;
    this.stage.update();
  }

  move(x, y) {
    // used when we add torches
    // mby replace overlay with an alpha mask
  }

  updateOverlay() {
    if (!!this.overlay) {
      this.stage.removeChild(this.overlay);
    }
    this.overlay = new createjs.Shape();
    this.overlay.graphics.beginFill("#000");
    this.overlay.graphics.drawRect(0, 0, this.width, this.height);

    this.overlay.graphics.arc(this.player.x, this.player.y, this.dimension, 0, Math.PI * 2, true).closePath();
    this.overlay.graphics.beginRadialGradientFill(["transparent", "#000"], [0.5, 1], this.player.x, this.player.y, 1, this.player.x, this.player.y, this.dimension/2)
      .arc(this.player.x, this.player.y, this.dimension + 5, 0, Math.PI * 2, true).closePath();
    this.stage.addChild(this.overlay);
  }
}
