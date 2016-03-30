var MyGame = MyGame || {};

MyGame.GameOver = function () {}; 

MyGame.GameOver.prototype = {    
  preload: function () {
  },

  create: function() {
    this.gameOverLabel = this.add.text(Math.round(this.game.width/2), 50, "Game Over", {font: "60px Arial", fill: "#fff", align: "center"}); 
    this.gameOverLabel.anchor.set(0.5);  	

    this.playAgain = this.add.button(Math.round(this.game.width/2), 100, 'texture-atlas', this.onClick, this, 'alienBlue_front');
  },

  onClick: function() {
  	console.log('you clicked');
  },
  update: function() {}

};