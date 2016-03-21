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
    this.map.setCollisionBetween(1, 22, true, 'GroundLayer');
    // this.backgroundLayer = this.map.createLayer('BackgroundLayer');

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

    //  Here we create our box group
    this.boxes = this.game.add.group();
    this.boxes.enableBody = true;
    this.map.createFromObjects('MyBoxes', 1, 'tiles', 0, true, false, this.boxes);

    this.input.onDown.add(this.letsJump, this);
  },

  letsJump: function() {
    if (this.player.body.blocked.down) {
      this.player.body.velocity.y = -300;
    }
  },
  
  update: function() {
     this.physics.arcade.collide(this.player, this.groundLayer);
     // console.log(this.player.body.blocked.down); 
    if (this.player.body.blocked.down) { 
      this.player.body.velocity.x = 170;
    }

  },

  render: function() {
      // game.debug.body(this.player);
      // game.debug.bodyInfo(this.player, 32, 320);
  }  
};
