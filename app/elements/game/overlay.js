// TODO - es6
function Overlay(stage, width, height, player) {
  var bounds = player.getBounds();
  bounds.x = bounds.x + bounds.width/2;
  bounds.y = bounds.y + bounds.height/2;
  var shape = new createjs.Shape();
  stage.addChild(shape);
  shape.graphics.beginFill("#000");
  shape.graphics.drawRect(0, 0, width, height);
  shape.graphics.arc(bounds.x, bounds.y, height/2, 0, Math.PI * 2, true).closePath()
  shape.graphics.beginRadialGradientFill(["transparent","#000"], [0, 1], bounds.x, bounds.y, 1, bounds.x, bounds.y, height/3)
    .arc(bounds.x, bounds.y, height/2, 0, Math.PI * 2, true).closePath();
  stage.update();

  function show(){
    shape.visible = true;
    stage.update();
  }

  function hide(){
    shape.visible = false;
    stage.update();
  }

  return {
    show: show,
    hide: hide
  }
}
