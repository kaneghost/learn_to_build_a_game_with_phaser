var MyGame = MyGame || {};

MyGame.GameOver = function () {}; 

MyGame.GameOver.prototype = {    
  preload: function () {
  },

  create: function() {
    this.gameOverLabel = this.add.text(Math.round(this.game.width/2), 100, "好可惜，20秒内没跑完100米", {font: "50px Arial", fill: "#fff", align: "center"}); 
    this.gameOverLabel.anchor.set(0.5);  	

    this.restartBtn = this.add.button(Math.round(this.game.width/2), Math.round(this.game.height/2), 'texture-atlas', this.onClick, this, 'restart', 'restart', 'restart', 'restart');
    this.restartBtn.anchor.set(0.5);

    this.menuBtn = this.add.button(Math.round(this.game.width/2), Math.round(this.game.height/2) + 100, 'texture-atlas', this.onClick, this, 'mainMenuBtn', 'mainMenuBtn', 'mainMenuBtn', 'mainMenuBtn');
    this.menuBtn.anchor.set(0.5);    
  },

  onClick: function() {
  	console.log('you clicked');
    this.state.start('Play');
  },

  onMainMenu: function() {
    console.log('go back to main menu');
  },

  update: function() {}

};