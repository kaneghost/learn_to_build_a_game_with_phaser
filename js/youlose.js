var MyGame = MyGame || {};

MyGame.YouLose = function () {}; 

MyGame.YouLose.prototype = {    
  preload: function () {
  },

  create: function() {
    var me = this;

    me.add.image(0, 0, 'texture-atlas', 'youlose_bg');

    me.restartBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2 + 50), 'texture-atlas', me.onRestart, me, 'restart', 'restart', 'restart', 'restart');
    me.restartBtn.anchor.set(0.5);

    me.menuBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 150, 'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu');
    me.menuBtn.anchor.set(0.5);    
  },

  onRestart: function() {
    this.state.start('Play');
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};