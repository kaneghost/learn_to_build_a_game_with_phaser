var MyGame = MyGame || {};

MyGame.YouWin = function () {};

MyGame.YouWin.prototype = {
  preload: function () {
  },

  create: function() {
    var me = this;

    me.add.image(0, 0, 'youwin_bg');

    me.shareBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2), 'texture-atlas', me.onShare, me, 'share', 'share', 'share', 'share');
    me.shareBtn.anchor.set(0.5);

    me.menuBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 100, 'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu');
    me.menuBtn.anchor.set(0.5);
  },

  onShare: function() {
    this.state.start('MainMenu');
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};