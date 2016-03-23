var MyGame = MyGame || {};

MyGame.Play = function () {}; 

MyGame.Play.prototype = {    
  preload: function () {
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '#A6E5F5';

    // create game map
    this.map = this.add.tilemap('tilemap');    
    this.map.addTilesetImage('myspritesheet', 'tiles');

    this.groundLayer = this.map.createLayer('GroundLayer');
    this.map.setCollisionBetween(1, 35, true, 'GroundLayer');
    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer.resizeWorld(); 

    // create the player
    this.player = this.add.sprite(60, 60, 'texture-atlas', 'alienBlue_walk2');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('walking', ['alienBlue_walk1', 'alienBlue_walk2'], 5, true);

    this.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 700;

    this.camera.follow(this.player);

    // create our enemies, put them in a group
    this.enemyGroup = this.game.add.group();
    this.enemyGroup.enableBody = true;
    this.map.createFromObjects('ObjectLayer', 'blockerMad', 'texture-atlas', 'blockerMad', true, false, this.enemyGroup);

    // make the yellow flag as our end point
    this.endPoint = this.game.add.group();
    this.endPoint.enableBody = true;
    this.map.createFromObjects('ObjectLayer', 'flag', 'texture-atlas', 'flagYellow', true, false, this.endPoint);
    
    this.endPoint.callAll('animations.add', 'animations', 'fluttering', ['flagRed', 'flagRed2'], 5, true);
    this.endPoint.callAll('animations.play', 'animations', 'fluttering');
    
    this.level = 1;
    
    // user tap mobile screen to make player jump
    this.input.onDown.add(this.playerJump, this);
  },

  playerJump: function() {
    if (this.player.body.blocked.down) {
      this.player.animations.stop();
      this.player.frameName = 'alienBlue_walk2';
      this.player.body.velocity.y = -480;
    }
  },

  playerHit: function(player, hit) {
    console.log('I hit: ' + hit.name);
    this.letPlayerRunAgain();
  },

  letPlayerRunAgain: function() {
    this.player.animations.stop();
    this.player.x = 60;
    this.player.y = 60;
    this.player.body.velocity.x = 0;

    this.player.body.blocked.down = false;    
  }, 

  playFinishedOneLevel: function() {
    console.log('you Win!');
  },
  
  update: function() {
    this.physics.arcade.collide(this.player, this.groundLayer);
    this.physics.arcade.overlap(this.player, this.enemyGroup, this.playerHit, null, this);
    this.physics.arcade.overlap(this.player, this.endPoint, this.playFinishedOneLevel, null, this);
     
    if (this.player.body.blocked.down) { 
      this.player.body.velocity.x = 180;
      this.player.animations.play('walking');
    }
  },

  render: function() {
    // this.game.debug.spriteInfo(this.player, 32, 32);
  }
};
