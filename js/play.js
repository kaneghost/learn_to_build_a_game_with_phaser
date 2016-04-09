var MyGame = MyGame || {};

MyGame.LEVEL_COUNT = 2; // the game has 2 levels, for now

MyGame.Play = function () {}; 

MyGame.Play.prototype = {
  preload: function () {
  },

  create: function () {
    var me = this;

    me.loadLevel();

    me.input.onDown.add(me.playerJump, me);
  },

  loadLevel: function() {
    var me = this;
    
    me.level = parseInt(localStorage.level) || 1;
    if (me.level < 1 || me.level > MyGame.LEVEL_COUNT) me.level = 1;

    me.createBackground();
    me.createGameMap();
    me.createEnemies();
    me.createCheckPoint();
    me.createPlayer();
    me.createHUD();  

    me.time.events.loop(Phaser.Timer.SECOND, me.updateHUD, me);
  },

  createHUD: function() {
    var me = this;

    // lives
    me.lives = me.add.image(50, 50, 'texture-atlas', 'hud_p2');
    me.lives.anchor.set(0.5);
    me.lives.fixedToCamera = true;

    me.livesLabel = me.add.bitmapText(me.lives.x + me.lives.width + 12, me.lives.y, 'myfont', ' x ' + me.player.health, 35);  
    me.livesLabel.anchor.set(0.5);
    me.livesLabel.fixedToCamera = true;

    // current meters
    me.metersLabel = me.add.bitmapText(Math.round(me.game.width/2), me.lives.y, 'myfont', (me.level - 1) * 10 + 'm', 40);  
    me.metersLabel.anchor.set(0.5);
    me.metersLabel.fixedToCamera = true; 

    // best meters
    // me.bestLabel = me.add.bitmapText(20, me.lives.y, 'myfont', 'BEST: 65m', 35);  
    // me.bestLabel.anchor.set(0, 0.5);
    // me.bestLabel.fixedToCamera = true;          
  },

  loseOneLife: function() {
    var me = this;

    me.player.health--;
    if (me.player.health <= 0) {
      me.state.start('YouLose');
    } else {
      me.livesLabel.text = ' x ' + me.player.health;
    }
  },

  updateMeters: function() {
    var me = this;
    
    me.metersLabel.text = (me.level - 1) * 10 + Math.round(me.player.x * 10 / me.world.width) + 'm';
  },

  createBackground: function() {
    var me = this;
    
    if (me.bg) me.bg.destroy();
    me.bg = me.add.image(0, 0, 'background');
  },

  createPlayer: function() {
    var me = this;

    if (me.player) me.player.destroy();

    me.player = me.add.sprite(60, 150, 'texture-atlas', 'alienBlue_walk2');
    me.player.anchor.setTo(0.5, 0.5);
    me.player.animations.add('walking', ['alienBlue_walk1', 'alienBlue_walk2'], 5, true);

    me.physics.arcade.enable(me.player);
    me.player.body.gravity.y = 1000;
    me.camera.follow(me.player);

    me.player.health = 3;
  },

  createCheckPoint: function() {
    var me = this;

    if (me.startPoint) me.startPoint.destroy();
    if (me.checkPoint) me.checkPoint.destroy();

    me.startPoint = me.game.add.group();
    me.startPoint.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'startpoint', 'texture-atlas', 'signRight', true, false, me.startPoint);    

    var pos = me.startPoint.getAt(0).position;
    me.add.bitmapText(pos.x, pos.y + 12, 'myfont', (me.level - 1) * 10 + 'm', 24);    

    me.checkPoint = me.game.add.group();
    me.checkPoint.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'checkpoint', 'texture-atlas', 'sign', true, false, me.checkPoint);    

    pos = me.checkPoint.getAt(0).position;
    me.add.bitmapText(pos.x, pos.y + 12, 'myfont', me.level * 10 + 'm', 24);  
  },

  createEnemies: function() {
    var me = this;

    if (me.enemyGruop) me.enemyGruop.destroy();

    // create our enemies, put them in a group
    me.enemyGroup = me.game.add.group();
    me.enemyGroup.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'box', 'texture-atlas', 'blockerMad', true, false, me.enemyGroup);
    me.map.createFromObjects('ObjectLayer', 'water', 'texture-atlas', 'liquidWaterTop_mid', true, false, me.enemyGroup);    
  },

  createGameMap: function() {
    var me = this;

    if (me.groundLayer) me.groundLayer.destroy();
    if (me.backgroundLayer) me.backgroundLayer.destroy();
    if (me.map) me.map.destroy();

    me.map = me.add.tilemap('level' + me.level);    
    me.map.addTilesetImage('mytileset', 'tiles');

    me.backgroundLayer = me.map.createLayer('BackgroundLayer');
    me.groundLayer = me.map.createLayer('GroundLayer');
    me.map.setCollisionBetween(1, 35, true, 'GroundLayer');
    
    me.groundLayer.resizeWorld();     
  },

  playerJump: function(point, isDoubleTap) {
    var me = this;

    if (me.player.body.blocked.down) {
      me.player.animations.stop();
      me.player.frameName = 'alienBlue_walk2';
      me.player.body.velocity.y = -550;
    }
  },

  playerHit: function(player, enemy) {    
    this.loseOneLife();
    this.initPlayer();
  },

  initPlayer: function() {
    var me = this;

    me.player.animations.stop();
    me.player.x = 60;
    me.player.y = 150;
    me.player.body.velocity.x = 0;
    me.player.body.velocity.y = 0;

    me.player.body.blocked.down = false;
  },

  levelCompleted: function() {
    var me = this;

    var nextLevel = me.level + 1;
    if (nextLevel > MyGame.LEVEL_COUNT) {
      localStorage.level = 1;
      me.state.start('YouWin');
    } else {
      localStorage.level = nextLevel;
      me.loadLevel();
    }
  },
  
  updateHUD: function() {
    var me = this;

    me.updateMeters();
  },

  update: function() {
    var me = this;

    me.physics.arcade.collide(me.player, me.groundLayer);
    me.physics.arcade.overlap(me.player, me.enemyGroup, me.playerHit, null, me);
    me.physics.arcade.overlap(me.player, me.checkPoint, me.levelCompleted, null, me);

    if (me.player.body.blocked.down) {
      me.player.body.velocity.x = 250;
      me.player.animations.play('walking');
    }

    if (me.player.x > me.world.width) me.levelCompleted();    
  }
};
