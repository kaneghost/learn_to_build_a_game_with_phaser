var MyGame = MyGame || {};

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

    localStorage.level = 7; // debug

    me.level = parseInt(localStorage.level) || 1;
    if (me.level < 1 || me.level > MyGame.LEVEL_COUNT) me.level = 1;

    me.setupBackground();
    me.setupEnemies();
    me.setupPlayer();
    me.setupHUD();
    me.setupSound();

    me.time.events.loop(Phaser.Timer.SECOND, me.updateHUD, me);
  },

  stopTimer: function() {
    this.time.events.removeAll();
  },

  setupSound: function() {
    var me = this;

    me.sound.volume = 0.3;

    if (!me.s_music) me.s_music = me.add.audio('music');
    me.s_music.play('', 0, 0.3, true);
    
    if (!me.s_hit) me.s_hit = me.add.audio('hit');
    if (!me.s_jump) me.s_jump = me.add.audio('jump');
    if (!me.s_completed) me.s_completed = me.add.audio('completed');
  },

  setupHUD: function() {
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

  setupBackground: function() {
    var me = this;
    
    // background image
    if (me.bg) me.bg.destroy();
    me.bg = me.add.image(0, 0, 'background');

    // tile map
    if (me.groundLayer) me.groundLayer.destroy();
    if (me.backgroundLayer) me.backgroundLayer.destroy();
    if (me.map) me.map.destroy();

    me.map = me.add.tilemap('level' + me.level);    
    me.map.addTilesetImage('mytileset', 'tiles');

    me.backgroundLayer = me.map.createLayer('BackgroundLayer');
    me.groundLayer = me.map.createLayer('GroundLayer');
    me.map.setCollisionBetween(1, 35, true, 'GroundLayer');
    
    me.groundLayer.resizeWorld();

    // start point and check point
    if (me.startAndCheckPoint) me.startAndCheckPoint.destroy();

    me.startAndCheckPoint = me.game.add.group();
    me.map.createFromObjects('ObjectLayer', 'startpoint', 'texture-atlas', 'signRight', true, false, me.startAndCheckPoint);    
    me.map.createFromObjects('ObjectLayer', 'checkpoint', 'texture-atlas', 'sign', true, false, me.startAndCheckPoint);    

    var pos = me.startAndCheckPoint.getAt(0).position;
    me.add.bitmapText(pos.x, pos.y + 12, 'myfont', (me.level - 1) * 10 + 'm', 24);    

    pos = me.startAndCheckPoint.getAt(1).position;
    me.add.bitmapText(pos.x, pos.y + 12, 'myfont', me.level * 10 + 'm', 24);       
  },

  setupPlayer: function() {
    var me = this;

    if (me.player) me.player.destroy();

    me.player = me.add.sprite(60, 150, 'texture-atlas', 'alienBlue_walk2');
    me.player.anchor.setTo(0.5, 0.5);
    me.player.animations.add('walking', ['alienBlue_walk1', 'alienBlue_walk2'], 4, true);

    me.physics.arcade.enable(me.player);
    me.player.body.setSize(38, 84);
    me.player.body.gravity.y = MyGame.PLAYER_GRAVITY_Y;
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

  setupEnemies: function() {
    var me = this;

    if (me.enemyGruop) me.enemyGruop.destroy();
    if (me.fishGroup) me.fishGroup.destroy();

    // put enemies into a group
    me.enemyGroup = me.game.add.group();
    me.enemyGroup.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'box', 'texture-atlas', 'blockerMad', true, false, 
      me.enemyGroup, Phaser.Sprite, false);
    me.enemyGroup.setAll('anchor.y', 1); 

    // fish
    me.fishGroup = me.game.add.group();
    me.fishGroup.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'fish', 'texture-atlas', 'fishSwim1', true, false, me.fishGroup);
    me.fishGroup.callAll('animations.add', 'animations', 'fish_swimming', ['fishSwim1', 'fishSwim2'], 4, true);
    me.fishGroup.callAll('animations.play', 'animations', 'fish_swimming');
  },

  playerJump: function(point, isDoubleTap) {
    var me = this;

    if (me.player.body.blocked.down) {
      this.s_jump.play();       
      me.player.animations.stop();
      me.player.frameName = 'alienBlue_walk2';
      me.player.body.velocity.y = -MyGame.PLAYER_VELOCITY_Y;
    }
  },

  playerHit: function(player, enemy) { 
    var me = this;

    me.player.alive = false;
    me.s_hit.play(); 

    me.loseOneLife();
    me.initPlayer();
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
      // me.physics.arcade.overlap(me.player, me.fishGroup, me.playerHit, null, me);

      if (me.player.body.blocked.down) {
        me.player.body.velocity.x = MyGame.PLAYER_VELOCITY_X;
        me.player.animations.play('walking');
      }

      if (me.player.x > me.world.width) me.levelCompleted();
      if (me.player.y > me.world.height) me.playerHit();
    }
  },

  render: function() {
    var me = this;
    me.game.debug.text(me.game.time.fps || '--', 2, 14, "#00ff00");
    me.game.debug.body(me.player, '#fc2929', false);
    me.enemyGroup.forEach(function(e) {me.game.debug.body(e, '#fc2929', false);});
    me.fishGroup.forEach(function(e) {me.game.debug.body(e, '#fc2929', false);});
  }  
};
