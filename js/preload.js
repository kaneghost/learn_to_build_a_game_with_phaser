var MyGame = MyGame || {};

MyGame.Preload = function () {};

MyGame.Preload.prototype = {    
  preload: function () {
    var me = this;

    me.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    me.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    me.load.image('background', 'assets/background.png');
    me.load.image('tiles', 'assets/tiles.png');
    me.load.atlas('texture-atlas', 'assets/texture-atlas.png', 'assets/texture-atlas.json');
    me.game.load.bitmapFont('myfont', 'assets/font/font.png', 'assets/font/font.fnt');
  },

  create: function () {
    var me = this;

    me.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    me.scale.pageAlignHorizontally = true;
    me.scale.pageAlignVertically = true;
    
    me.physics.startSystem(Phaser.Physics.ARCADE);
    // me.stage.backgroundColor = '#A6E5F5';

    me.state.start('MainMenu');
  }
};