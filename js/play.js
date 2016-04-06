var MyGame = MyGame || {};

MyGame.TIME_LIMIT = 20;
MyGame.LEVEL_COUNT = 1;

MyGame.Play = function () {}; 

MyGame.Play.prototype = {
  preload: function () {
  },

  create: function () {
    var me = this;

    me.level = 0;    
    console.log('level: ' + me.level);
    me.loadLevel();

    me.input.onDown.add(me.playerJump, me);
  },

  loadLevel: function() {
    var me = this;

    me.level++;
    if (me.level > MyGame.LEVEL_COUNT) {
      me.state.start('YouWin');
    } else {
      me.createBackground();
      me.createGameMap();
      me.createEnemies();
      me.createCheckPoint();
      me.createPlayer();
      me.createTimer(); 
    }
  },

  createBackground: function() {
    var me = this;
    console.log(me.bg);
    if (me.bg) me.bg.destroy();
    me.bg = me.add.image(0, 0, 'background');
  },

  createPlayer: function() {
    var me = this;

    if (me.player) me.player.destroy();

    me.player = me.add.sprite(60, 60, 'texture-atlas', 'alienBlue_walk2');
    me.player.anchor.setTo(0.5, 0.5);
    me.player.animations.add('walking', ['alienBlue_walk1', 'alienBlue_walk2'], 5, true);

    me.physics.arcade.enable(me.player);
    me.player.body.gravity.y = 1000;
    me.camera.follow(me.player);
  },

  createCheckPoint: function() {
    var me = this;

    if (me.checkPoint) me.checkPoint.destroy();

    // make the yellow flag as our check point
    me.checkPoint = me.game.add.group();
    me.checkPoint.enableBody = true;
    me.map.createFromObjects('ObjectLayer', 'flag', 'texture-atlas', 'flagYellow', true, false, me.checkPoint);
    
    me.checkPoint.callAll('animations.add', 'animations', 'fluttering', ['flagYellow', 'flagYellow2'], 3, true);
    me.checkPoint.callAll('animations.play', 'animations', 'fluttering');    
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
    console.log('I hit: ' + enemy.name);    
    this.initPlayer();
  },

  initPlayer: function() {
    var me = this;

    me.player.animations.stop();
    me.player.x = 60;
    me.player.y = 60;
    me.player.body.velocity.x = 0;
    me.player.body.velocity.y = 0;

    me.player.body.blocked.down = false;
  },

  levelCompleted: function() {    
    this.stopTimer();

    this.loadLevel();
  },

  stopTimer: function() {
    this.time.events.removeAll();
  },

  createTimer: function(){
    var me = this;
    me.timeElapsed = 0;

    if (me.timeLabel) me.timeLabel.destroy();

    me.timeLabel = me.add.text(Math.round(me.game.width/2), 50, 
      "00:" + MyGame.TIME_LIMIT, {font: "60px Arial", fill: "#fff", align: "center"}); 
    me.timeLabel.anchor.set(0.5);
    me.timeLabel.fixedToCamera = true; 

    me.time.events.loop(Phaser.Timer.SECOND, me.updateTimer, me);
  },
  
  updateTimer: function() {
    var me = this;

    me.timeElapsed++;
    if (me.timeElapsed > MyGame.TIME_LIMIT) {
      me.state.start('GameOver');
    } else {     
      var timeRemaining = MyGame.TIME_LIMIT - me.timeElapsed;
      var minutes = (timeRemaining < 10) ? "0" + timeRemaining : timeRemaining;

      me.timeLabel.text = '00:' + minutes;
    }
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
