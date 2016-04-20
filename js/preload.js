var MyGame = MyGame || {};

MyGame.LEVEL_COUNT = 8; // the game has 10 levels
MyGame.PLAYER_GRAVITY_Y = 1100;//1000
MyGame.PLAYER_VELOCITY_X = 260;//250;
MyGame.PLAYER_VELOCITY_Y = 550;

MyGame.Preload = function () {};

MyGame.Preload.prototype = {    
  preload: function () {
    var me = this;

    for (var i = 1; i <= MyGame.LEVEL_COUNT; i++ ) {
      // 'level2', 'assets/level2.json'
      me.load.tilemap('level' + i, 'assets/level'+ i + '.json', null, Phaser.Tilemap.TILED_JSON);
    }
    me.load.image('background', 'assets/background.png');
    me.load.image('tiles', 'assets/tiles.png');
    me.load.atlas('texture-atlas', 'assets/texture-atlas.png', 'assets/texture-atlas.json');
    me.game.load.bitmapFont('myfont', 'assets/font.png', 'assets/font.fnt');

    me.load.audio('hit', 'assets/hit.mp3');
    me.load.audio('jump', 'assets/jump.mp3');    
    me.load.audio('music', 'assets/bg.mp3');
    me.load.audio('completed', 'assets/completed.mp3');

    me.game.time.advancedTiming = true;
  },

  create: function () {
    var me = this;

    // handle screen scale
    if (me.game.device.desktop) {
      // desktop: do nothing
    } else {
      if (window.innerWidth < window.innerHeight) {
        // mobile portrait mode: do nothing
      } else {
        // mobile landscape mode
        var newWidth = (window.innerWidth/window.innerHeight) * targetHeight;
        me.scale.setGameSize(newWidth, targetHeight);
      }

      me.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;      
    }

    // centralize the game on screen
    me.scale.pageAlignHorizontally = true;
    me.scale.pageAlignVertically = true;
    
    me.physics.startSystem(Phaser.Physics.ARCADE);
    // me.stage.backgroundColor = '#A6E5F5';

    me.state.start('MainMenu');
  }
};