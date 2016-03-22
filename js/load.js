var MyGame = MyGame || {};

MyGame.Load = function () {};

MyGame.Load.prototype = {    
  preload: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/spritesheet.png');
    this.load.image('player', 'assets/alienBlue_stand.png');
    // this.load.image('box', 'assets/boxCrate_double.png');
    // this.load.image('water', 'assets/waterTop_low.png');
  },

  create: function () {
    this.state.start('Play');
  }
};