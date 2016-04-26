var MyGame = MyGame || {};

MyGame.YouLose = function () {}; 

MyGame.YouLose.prototype = {    
  preload: function () {
    var me = this;
    
    me.fallTimes = 0;
    for (var i = 1; i <= 10; i++) {
      me.fallTimes += parseInt(localStorage.getItem('fallTimes' + i)) || 0;
    }

    me.best = parseInt(localStorage.best) || 0;
  },

  create: function() {
    var me = this;

    me.add.image(Math.round(me.game.width/2), Math.round(me.game.height/2), 
      'texture-atlas', 'youlose_bg').anchor.set(0.5);
    me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 70, 
      'texture-atlas', me.onRestart, me, 'restart', 'restart', 'restart', 'restart').anchor.set(0.5);
    me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 160, 
      'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu').anchor.set(0.5);

    me.bestLabel = me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2) - 45, 
      '最好成绩' + me.best + '米，摔倒' + me.fallTimes + '次', 
      { font: '26px bold Arial', fill: '#95cb40'}
    ).anchor.set(0.5);
    
    me.triedLabel = me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2) - 12, 
      '你可以做得更好！', { font: '26px bold Arial', fill: '#95cb40'}
    ).anchor.set(0.5);

    me.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(me.onRestart, me);   
  },

  onRestart: function() {
    this.state.start('Play');
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};