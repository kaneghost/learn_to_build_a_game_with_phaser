var MyGame = MyGame || {};

MyGame.Preload = function () {};

MyGame.Preload.prototype = {    
  preload: function () {
    this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tiles.png');
    this.load.atlas('texture-atlas', 'assets/texture-atlas.png', 'assets/texture-atlas.json');
    this.load.image('background', 'assets/background.png');
  },

  create: function () {
    var me = this;

    me.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    me.scale.pageAlignHorizontally = true;
    me.scale.pageAlignVertically = true;
    
    me.physics.startSystem(Phaser.Physics.ARCADE);
    // me.stage.backgroundColor = '#A6E5F5';

    me.state.start('Play');
  }
};