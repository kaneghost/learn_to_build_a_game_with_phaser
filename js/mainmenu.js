var MyGame = MyGame || {};

MyGame.MainMenu = function () {};

MyGame.MainMenu.prototype = {
  preload: function () {
  },

  create: function() {
    var me = this;

    var coverImage = me.add.image(Math.round(me.game.width/2), Math.round(me.game.height/2), 'texture-atlas', 'cover');
    coverImage.anchor.set(0.5);


    me.startLabel = me.add.text(Math.round(me.game.width/2 - 20), Math.round(me.game.height/2 + 20), "点击开始", {font: "bold 45px Arial", fill: "#6fc4a9", align: "center"});
    me.startLabel.anchor.set(0.5);
    me.startLabel.alpha = 1;
    me.game.add.tween(me.startLabel).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, -1, true);

    me.input.onDown.add(me.onClick, me);
  },

  onClick: function() {
    this.state.start('Play');
  }
};