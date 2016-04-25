var MyGame = MyGame || {};

MyGame.YouLose = function () {}; 

MyGame.YouLose.prototype = {    
  preload: function () {
  },

  create: function() {
    var me = this;

    me.add.image(Math.round(me.game.width/2), Math.round(me.game.height/2), 
      'texture-atlas', 'youlose_bg').anchor.set(0.5);
    me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 70, 
      'texture-atlas', me.onRestart, me, 'restart', 'restart', 'restart', 'restart').anchor.set(0.5);
    me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 160, 
      'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu').anchor.set(0.5);

    me.bestLabel = me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2) - 50, '最好成绩88米，摔倒58次', { font: '26px bold Arial', fill: '#95cb40'}).anchor.set(0.5);
    me.triedLabel = me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2) - 15, '你可以做得更好！', { font: '26px bold Arial', fill: '#95cb40'}).anchor.set(0.5);

    me.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(me.onRestart, me);   
  },

  onRestart: function() {
    this.state.start('Play');
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};