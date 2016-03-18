var MyGame = MyGame || {};

var targetWidth = 720;
var targetHeight = 480;
var deviceRatio = window.innerWidth/window.innerHeight;

MyGame.game = new Phaser.Game(720, 480, Phaser.AUTO, 'game');
// MyGame.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, 
// 	window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game');
console.log('Width' + window.innerWidth + 'Height' +  window.innerHeight + 'DPI' + window.devicePixelRatio);
MyGame.game.state.add('Load', MyGame.Load);
MyGame.game.state.add('Play', MyGame.Play);

MyGame.game.state.start('Load');