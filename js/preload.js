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