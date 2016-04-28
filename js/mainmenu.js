var MyGame = MyGame || {};

MyGame.MainMenu = function () {};

MyGame.MainMenu.prototype = {
  preload: function () {
    var me = this;
    
    me.fallTimes = 0;
    for (var i = 1; i <= 10; i++) {
      me.fallTimes += parseInt(localStorage.getItem('fallTimes' + i)) || 0;
    }    
  },

  create: function() {
    var me = this;

    me.add.image(Math.round(me.game.width/2), Math.round(me.game.height/2), 
      'texture-atlas', 'mainmenu_bg').anchor.set(0.5);

    var startLabel = me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2 + 40), 
      "点击开始", {font: "bold 45px Arial", fill: "#6fc4a9", align: "center"});
    startLabel.anchor.set(0.5);
    startLabel.alpha = 1;
    me.game.add.tween(startLabel).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, -1, true);

    me.add.bitmapText(me.game.width - 25, 50, 'myfont', '#' + me.fallTimes, 35).anchor.set(1, 0.5);  

    me.input.onDown.add(me.onClick, me);
    me.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(me.onClick, me);
  },

  onClick: function() {
    this.state.start('Play');
  }
};