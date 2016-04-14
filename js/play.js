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
    me.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(me.playerJump, me);
  },

  loadLevel: function() {
    var me = this;
    
    me.level = parseInt(localStorage.level) || 1;
    if (me.level < 1 || me.level > MyGame.LEVEL_COUNT) me.level = 1;

    me.createBackground();
    me.createGameMap();
    me.createEnemies();
    me.createStartAndCheckPoint();
    me.createPlayer();
    me.createHUD();
    me.createSound();

    me.time.events.loop(Phaser.Timer.SECOND, me.updateHUD, me);
  },

  stopTimer: function() {
    this.time.events.removeAll();
  },

  createSound: function() {
    var me = this;

    if (!me.s_music) me.s_music = me.add.audio('music');
    me.s_music.play('', 0, 0.3, true);
    
    if (!me.s_hit) me.s_hit = me.add.audio('hit');
    if (!me.s_jump) me.s_jump = me.add.audio('jump');
    if (!me.s_completed) me.s_completed = me.add.audio('completed');
  },

  createHUD: function() {
    var me = this;

    // lives
    if (me.lives) me.lives.destroy();
    me.lives = me.add.image(50, 50, 'texture-atlas', 'hud_p2');
    me.lives.anchor.set(0.5);
    me.lives.fixedToCamera = true;  

    if (me.livesLabel) me.livesLabel.destroy();
    me.livesLabel = me.add.bitmapText(me.lives.x + me.lives.width + 12, me.lives.y, 'myfont', ' x ' + me.player.health, 35);  
    me.livesLabel.anchor.set(0.5);
    me.livesLabel.fixedToCamera = true;

    // current meters
    if (me.metersLabel) me.metersLabel.destroy();
    me.metersLabel = me.add.bitmapText(Math.round(me.game.width/2), me.lives.y, 'myfont', (me.level - 1) * 10 + 'm', 40);  
    me.metersLabel.anchor.set(0.5);
    me.metersLabel.fixedToCamera = true;
  },

  loseOneLife: function() {
    var me = this;

    me.player.health--;
    if (me.player.health <= 0) {
      me.s_music.pause();
      me.stopTimer();
      me.state.start('YouLose');
    } else {
      me.livesLabel.text = ' x ' + me.player.health;
    }
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

  initPlayer: function() {
    var me = this;

    me.player.animations.stop();
    me.player.x = 60;
    me.player.y = 150;
    me.player.body.velocity.x = 0;
    me.player.body.velocity.y = 0;

    me.player.body.blocked.down = false;
    me.player.alive = true;
  },  

  createStartAndCheckPoint: function() {
    var me = this;

    if (me.startAndCheckPoint) me.startAndCheckPoint.destroy();

    me.startAndCheckPoint = me.game.add.group();
    me.map.createFromObjects('ObjectLayer', 'startpoint', 'texture-atlas', 'signRight', true, false, me.startAndCheckPoint);    
    me.map.createFromObjects('ObjectLayer', 'checkpoint', 'texture-atlas', 'sign', true, false, me.startAndCheckPoint);    

    var pos = me.startAndCheckPoint.getAt(0).position;
    me.add.bitmapText(pos.x, pos.y + 12, 'myfont', (me.level - 1) * 10 + 'm', 24);    

    pos = me.startAndCheckPoint.getAt(1).position;
    me.add.bitmapText(pos.x, pos.y + 12, 'myfont', me.level * 10 + 'm', 24);  
  },

  createEnemies: function() {
    var me = this;

    if (me.enemyGruop) me.enemyGruop.destroy();

    // create our enemies, put them in a group
    me.enemyGroup = me.game.add.group();
    me.enemyGroup.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'box', 'texture-atlas', 'blockerMad', true, false, me.enemyGroup);
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
      this.s_jump.play('', 0, 1);       
      me.player.animations.stop();
      me.player.frameName = 'alienBlue_walk2';
      me.player.body.velocity.y = -550;
    }
  },

  playerHit: function(player, enemy) { 
    player.alive = false;
    this.s_hit.play('', 0, 1); 

    this.loseOneLife();
    this.initPlayer();
  },

  levelCompleted: function() {
    var me = this;
    
    me.s_music.pause();
    me.s_completed.play();
    
    var nextLevel = me.level + 1;
    if (nextLevel > MyGame.LEVEL_COUNT) {
      localStorage.level = 1;
      me.stopTimer();
      me.state.start('YouWin');
    } else {
      localStorage.level = nextLevel;
      me.loadLevel();
    }
  },
  
  updateHUD: function() {
    var me = this;

    // meters
    me.metersLabel.text = (me.level - 1) * 10 + Math.round(me.player.x * 10 / me.world.width) + 'm';
  },

  update: function() {
    var me = this;

    if (me.player && me.player.alive) {
      me.physics.arcade.collide(me.player, me.groundLayer);
      me.physics.arcade.overlap(me.player, me.enemyGroup, me.playerHit, null, me);

      if (me.player.body.blocked.down) {
        me.player.body.velocity.x = 250;
        me.player.animations.play('walking');
      }

      if (me.player.x > me.world.width) me.levelCompleted();    
    }
  },

  render: function() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }  
};
