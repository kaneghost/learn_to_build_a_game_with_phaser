var MyGame = MyGame || {};

MyGame.YouWin = function () {};

MyGame.YouWin.prototype = {
  preload: function () {
  },

  create: function() {
    var me = this;

    me.add.image(0, 0, 'background');

    me.gameOverLabel = me.add.text(Math.round(me.game.width/2), 100, "太厉害了！你用xx秒就跑完了一百米！", {font: "50px Arial", fill: "#fff", align: "center"});
    me.gameOverLabel.anchor.set(0.5);

    me.shareBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2), 'texture-atlas', me.onShare, me, 'share', 'share', 'share', 'share');
    me.shareBtn.anchor.set(0.5);

    me.menuBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 100, 'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu');
    me.menuBtn.anchor.set(0.5);
  },

  onClick: function() {
    this.state.start('Play');
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};