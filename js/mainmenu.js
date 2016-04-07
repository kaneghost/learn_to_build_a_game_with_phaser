var MyGame = MyGame || {};

MyGame.MainMenu = function () {};

MyGame.MainMenu.prototype = {
  preload: function () {
  },

  create: function() {
    var me = this;

    me.add.image(0, 0, 'cover');

    me.gameOverLabel = me.add.text(Math.round(me.game.width/2), 100, "太厉害了！你用xx秒就跑完了一百米！", {font: "50px Arial", fill: "#fff", align: "center"});
    me.gameOverLabel.anchor.set(0.5);

    me.shareBtn = me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2), 'texture-atlas', me.onClick, me, 'share', 'share', 'share', 'share');
    me.shareBtn.anchor.set(0.5);
  },

  onClick: function() {
    console.log('you clicked');
    this.state.start('Play');
  }
};