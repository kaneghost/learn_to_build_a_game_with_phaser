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
    // this.map.addTilesetImage('background', 'BackgroundLayer');

    this.groundLayer = this.map.createLayer('GroundLayer');
    this.map.setCollisionBetween(1, 35, true, 'GroundLayer');
    this.backgroundLayer = this.map.createLayer('BackgroundLayer');

    console.log('game.width ' + this.game.width + " height " + this.game.height);
    console.log('world.width ' + this.world.width + " height " + this.world.height);
    this.groundLayer.resizeWorld(); 
    console.log('game.width ' + this.game.width + " height " + this.game.height);
    console.log('world.width ' + this.world.width + " height " + this.world.height);  

    this.player = this.add.sprite(60, 60, 'player');
    this.player.anchor.setTo(0.5, 0.5);  
    this.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 730;

    this.camera.follow(this.player);

    //  Here we create our enemies, put them in a group
    // this.enemyGroup = this.game.add.group();
    // this.enemyGroup.enableBody = true;
    // this.map.createFromObjects('ObjectLayer', 'box', 'box', 0, true, false, this.enemyGroup);
    // this.map.createFromObjects('ObjectLayer', 'water', 'water', 0, true, false, this.enemyGroup);    

    this.input.onDown.add(this.letsJump, this);
  },

  letsJump: function() {
    if (this.player.body.blocked.down) {
      this.player.body.velocity.y = -300;
    }
  },
  
  update: function() {
    this.physics.arcade.collide(this.player, this.groundLayer);
    // this.physics.arcade.overlap(this.player, this.enemyGroup, this.playerHit, null, this);
     
    if (this.player.body.blocked.down) { 
      this.player.body.velocity.x = 170;
    }

  },

  playerHit: function(player, hit) {
    console.log('I hit: ' + hit.name);
  },
};
