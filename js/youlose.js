var MyGame = MyGame || {};

MyGame.YouLose = function () {}; 

MyGame.YouLose.prototype = {    
  preload: function () {
  },

  create: function() {
    var me = this;

    me.add.image(0, 0, 'background');

    me.gameOverLabel = me.add.text(Math.round(me.game.width/2), 100, "好可惜，20秒内没跑完100米", {font: "50px Arial", fill: "#fff", align: "center"}); 
    me.gameOverLabel.anchor.set(0.5);   

    me.restartBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2), 'texture-atlas', me.onRestart, me, 'restart', 'restart', 'restart', 'restart');
    me.restartBtn.anchor.set(0.5);

    me.menuBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 100, 'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu');
    me.menuBtn.anchor.set(0.5);    
  },

  onRestart: function() {
    this.state.start('Play');
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};