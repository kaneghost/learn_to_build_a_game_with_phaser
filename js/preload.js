var MyGame = MyGame || {};

MyGame.Preload = function () {};

MyGame.Preload.prototype = {    
  preload: function () {
    this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tiles.png');
    this.load.atlas('texture-atlas', 'assets/texture-atlas.png', 'assets/texture-atlas.json');
  },

  create: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage.backgroundColor = '#A6E5F5';

    this.state.start('Play');
  }
};