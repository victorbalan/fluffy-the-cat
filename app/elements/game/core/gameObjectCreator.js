class GameObjectCreator {
  constructor() {
  }

  ground(x, y, bmp, dimension) {
    var object = new createjs.Shape();
    if (!!bmp) {
      object.graphics.beginBitmapFill(bmp, 'no-repeat', this._transformationMatrix(bmp, dimension, dimension)).drawRect(0, 0, dimension, dimension);
    } else {
      object.graphics.beginFill('blue').drawRect(0, 0, dimension, dimension);
    }
    object.x = x;
    object.y = y;
    object.setBounds(x, y, dimension, dimension);
    object.collisionType = 'none';
    return object;
  }

  finish(x, y, dimension) {
    var object = new createjs.Shape();
    object.graphics.beginFill('red').drawRect(0, 0, dimension, dimension);
    object.x = x;
    object.y = y;
    object.setBounds(x, y, dimension, dimension);
    object.collisionType = 'finish';
    return object;
  }

  wall(x, y, bmp, width, height) {
    var object = new createjs.Shape();
    if (!!bmp) {
      object.graphics.beginBitmapFill(bmp, 'no-repeat', this._transformationMatrix(bmp, width, height)).drawRect(0, 0, width, height);
    } else {
      object.graphics.beginFill('#211E27').drawRect(0, 0, width, height);
    }
    object.x = x;
    object.y = y;
    object.setBounds(x, y, width, height);
    object.collisionType = 'collision';
    return object;
  }

  _transformationMatrix(bmp, width, height) {
    var matrix = new createjs.Matrix2D();
    matrix.scale((width + 2) / bmp.width, (height + 2) / bmp.height);
    return matrix;
  }
}
