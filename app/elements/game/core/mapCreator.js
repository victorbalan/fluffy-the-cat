class MapCreator {
  constructor(loader) {
    console.log('map creator initialized');
    this.loader = loader;
    this.gameObjectCreator = new GameObjectCreator();
  }

  createMap(level, dimension) {
    // TODO add grounds/walls so we can do less collision check
    var map = {
      container: new createjs.Container(),
      objects: [],
      start: {},
      startMatrixPos: {
        i: 0,
        j: 0
      },
      finish: {},
      // TODO add boundaries
      boundaries: []
    };
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        var x = j * dimension;
        var y = i * dimension;
        var object;
        switch (level[i][j]) {
          case '1':
            object = this.gameObjectCreator.wall(x, y, this.loader.getResult('w'), dimension, dimension);
            break;
          case 'w':
            object = this.gameObjectCreator.wall(x, y, this.loader.getResult('w'), dimension, dimension);
            break;
          case 'wb':
            object = this.gameObjectCreator.wall(x, y, this.loader.getResult(level[i][j]), dimension, dimension);
            break;
          case 'f':
            map.finish = this.gameObjectCreator.finish(x, y, dimension);
            object = map.finish;
            break;
          case 's':
            // TODO process start orientaiton in backend
            map.start = this.gameObjectCreator.ground(x, y, this.loader.getResult(level[i][j]), dimension);
            map.startMatrixPos.i = i;
            map.startMatrixPos.j = j;
            object = map.start;
            break;
          default:
            object = this.gameObjectCreator.ground(x, y, this.loader.getResult(level[i][j]), dimension);
        }
        map.container.addChild(object);
        map.objects.push(Object.assign({}, object.getBounds(), {collisionType: object.collisionType}));
      }
    }
    map.container.cache(0, 0, dimension * level.length, dimension * level.length);

    map.move = function(x, y){
      this.container.x += x;
      this.container.y += y;
      this.objects.forEach(function (object) {
        object.x += x;
        object.y += y;
      });
    };

    var self = this;
    map.getIntersectionType = function(rect){
      for (var i = 0; i < this.objects.length; i++) {
        if (this.objects[i].collisionType !== 'none' && self.intersects(this.objects[i], rect)) {
          return this.objects[i].collisionType;
        }
      }
      return 'none';
    };

    // ADD BOUNDARIES
    // TODO: fix boundaries
    // // TOP
    // this.objects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2  + this.dimension / 2,
    //   (-starti - 2) * this.dimension + this.canvasHeight / 2 + this.dimension / 2, null, (level.length + 3) * this.dimension, this.dimension));
    // // BOT
    // this.objects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2 + this.dimension / 2,
    //   (level.length - starti - 1) * this.dimension + this.canvasHeight / 2 + this.dimension / 2, null, (level.length + 3) * this.dimension, this.dimension));
    // // LEFT
    // this.objects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2  + this.dimension / 2,
    //   (-starti - 1) * this.dimension + this.canvasHeight / 2  + this.dimension / 2, null, this.dimension, (level.length + 1)* this.dimension));
    //
    // this.objects.push(new Wall(( level.length - startj - 1) * this.dimension + this.canvasWidth / 2 + this.dimension / 2,
    //   (-starti - 1) * this.dimension + this.canvasHeight / 2 + this.dimension / 2, null, this.dimension, (level.length + 1) * this.dimension));
    return map;
  }

  intersects(rect1, rect2) {
    return !(rect1.x >= rect2.x + rect2.width
    || rect1.x + rect1.width <= rect2.x
    || rect1.y >= rect2.y + rect2.height
    || rect1.y + rect1.height <= rect2.y);
  }
}