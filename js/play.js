var MyGame = MyGame || {};

MyGame.Play = function () {}; 

MyGame.Play.prototype = {    
  preload: function () {
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '#A6E5F5';

    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('ground_sprites', 'tiles');    

    this.groundLayer = this.map.createLayer('GroundLayer');
    this.map.setCollisionBetween(1, 20, true, 'GroundLayer');
    // this.backgroundLayer = this.map.createLayer('BackGroundLayer');

    console.log('game.width ' + this.game.width + " height " + this.game.height);
    console.log('world.width ' + this.world.width + " height " + this.world.height);
    this.groundLayer.resizeWorld(); 
    console.log('game.width ' + this.game.width + " height " + this.game.height);
    console.log('world.width ' + this.world.width + " height " + this.world.height);  

    this.player = this.add.sprite(0,100, 'player');  
    this.physics.enable(this.player);
    this.player.body.gravity.y = 200;
    this.player.body.velocity.x = 100;

    this.camera.follow(this.player);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  
  update: function() {
     this.physics.arcade.collide(this.player, this.groundLayer);

     //Make the sprite jump when the up key is pushed
    if(this.cursors.up.isDown) {
      this.player.body.velocity.y = -100;
    }
  },

  render: function() {
      // game.debug.body(this.player);
      // game.debug.bodyInfo(this.player, 32, 320);
  }  
};
