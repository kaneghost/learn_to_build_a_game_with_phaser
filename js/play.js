var MyGame = MyGame || {};

MyGame.Play = function () {}; 

MyGame.Play.prototype = {    
  preload: function () {
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '#A6E5F5';

    this.map = this.add.tilemap('tilemap');    
    this.map.addTilesetImage('myspritesheet', 'tiles');

    this.groundLayer = this.map.createLayer('GroundLayer');
    this.map.setCollisionBetween(1, 35, true, 'GroundLayer');
    this.backgroundLayer = this.map.createLayer('BackgroundLayer');

    console.log('game.width ' + this.game.width + " height " + this.game.height);
    console.log('world.width ' + this.world.width + " height " + this.world.height);
    this.groundLayer.resizeWorld(); 
    console.log('game.width ' + this.game.width + " height " + this.game.height);
    console.log('world.width ' + this.world.width + " height " + this.world.height);  

    // initiate the player
    this.player = this.add.sprite(60, 60, 'texture-atlas', 'alienBlue_stand');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('walking', Phaser.Animation.generateFrameNames('alienBlue_walk', 1, 2), 5, true);
    this.player.animations.add('jumping', ['alienBlue_jump'], 1, false);    

    this.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 700;

    this.camera.follow(this.player);

    //  Here we create our enemies, put them in a group
    this.enemyGroup = this.game.add.group();
    this.enemyGroup.enableBody = true;
    this.map.createFromObjects('ObjectLayer', 'blockerMad', 'texture-atlas', 'blockerMad', true, false, this.enemyGroup);
    // this.map.createFromObjects('ObjectLayer', 'water', 'water', 0, true, false, this.enemyGroup);    

    this.input.onDown.add(this.letsJump, this);
  },

  letsJump: function() {
    if (this.player.body.blocked.down) {
      this.player.body.velocity.y = -480;
      this.player.animations.play('jumping');
    }
  },
  
  update: function() {
    this.physics.arcade.collide(this.player, this.groundLayer);
    this.physics.arcade.overlap(this.player, this.enemyGroup, this.playerHit, null, this);
     
    if (this.player.body.blocked.down) { 
      this.player.body.velocity.x = 170;
      this.player.animations.play('walking');
    }

  },

  playerHit: function(player, hit) {
    console.log('I hit: ' + hit.name);
  },
};
