class MapCreator {
  constructor(loader) {
    console.log('map creator initialized');
    this.loader = loader;
  }

  createMap(level, dimension) {
    // TODO add grounds/walls so we can do less collision check
    var map = {
      mapObjects: [],
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
        switch (level[i][j]) {
          case '1':
            map.mapObjects.push(new Wall(x, y, this.loader.getResult('w'), dimension, dimension));
            break;
          case 'w':
            map.mapObjects.push(new Wall(x, y, this.loader.getResult('w'), dimension, dimension));
            break;
          case 'wb':
            map.mapObjects.push(new Wall(x, y, this.loader.getResult(level[i][j]), dimension, dimension));
            break;
          case 'f':
            map.finish = new Finish(x, y, dimension);
            map.mapObjects.push(map.finish);
            break;
          case 's':
            // TODO process start orientaiton in backend
            map.start = new Ground(x, y, this.loader.getResult(level[i][j]), dimension);
            map.startMatrixPos.i = i;
            map.startMatrixPos.j = j;
            map.mapObjects.push(map.start);
            break;
          default:
            map.mapObjects.push(new Ground(x, y, this.loader.getResult(level[i][j]), dimension));
        }
      }
    }

    // ADD BOUNDARIES
    // TODO: fix boundaries
    // // TOP
    // this.mapObjects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2  + this.dimension / 2,
    //   (-starti - 2) * this.dimension + this.canvasHeight / 2 + this.dimension / 2, null, (level.length + 3) * this.dimension, this.dimension));
    // // BOT
    // this.mapObjects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2 + this.dimension / 2,
    //   (level.length - starti - 1) * this.dimension + this.canvasHeight / 2 + this.dimension / 2, null, (level.length + 3) * this.dimension, this.dimension));
    // // LEFT
    // this.mapObjects.push(new Wall((-startj - 2) * this.dimension + this.canvasWidth / 2  + this.dimension / 2,
    //   (-starti - 1) * this.dimension + this.canvasHeight / 2  + this.dimension / 2, null, this.dimension, (level.length + 1)* this.dimension));
    //
    // this.mapObjects.push(new Wall(( level.length - startj - 1) * this.dimension + this.canvasWidth / 2 + this.dimension / 2,
    //   (-starti - 1) * this.dimension + this.canvasHeight / 2 + this.dimension / 2, null, this.dimension, (level.length + 1) * this.dimension));
    return map;
  }

}
