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

    me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2) - 20, 
      '跑完' + me.best + '米，跌倒' + me.fallTimes + '次', 
      { font: '28px bold Arial', fill: '#999999'}
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