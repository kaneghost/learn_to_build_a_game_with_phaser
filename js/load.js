var MyGame = MyGame || {};

MyGame.Load = function () {};

MyGame.Load.prototype = {    
  preload: function () {
  	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  	//have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // this.scale.setScreenSize(true);

  	this.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
  	this.load.image('tiles', 'assets/ground_sprites.png');

  	this.load.image('player', 'assets/alienBlue_stand.png');
  	// this.load.image('player', 'assets/1136x640.png');
  },

  create: function () {
  	this.state.start('Play');
  }
};