var MyGame = MyGame || {};

MyGame.YouWin = function () {};

MyGame.YouWin.prototype = {
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
      'texture-atlas', 'youwin_bg').anchor.set(0.5);

    me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 70, 
      'texture-atlas', me.onShare, me, 'photo', 'photo', 'photo', 'photo').anchor.set(0.5);
    me.add.button(Math.round(me.game.width/2), Math.round(me.game.height/2) + 160, 
      'texture-atlas', me.onMainMenu, me, 'menu', 'menu', 'menu', 'menu').anchor.set(0.5); 

    me.add.text(Math.round(me.game.width/2), Math.round(me.game.height/2) - 20, 
      '跌倒' + me.fallTimes + '次', 
      { font: '28px bold Arial', fill: '#999999'}
      ).anchor.set(0.5);

    me.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(me.onMainMenu, me);
  },

  onShare: function() {
    console.log('save screenshot as a photo');
    navigator.screenshot.save(function(error,res){
      if(error){
        console.error(error);
      }else{
        console.log('ok',res.filePath);
      }
    },'jpg',50);
  },

  onMainMenu: function() {
    this.state.start('MainMenu');
  }
};