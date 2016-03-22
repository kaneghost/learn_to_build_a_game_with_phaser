var MyGame = MyGame || {};

var targetWidth = 840;//960; // 3:2
var targetHeight = 560;//640;

var newWidth = (window.innerWidth/window.innerHeight) * targetHeight;
var newHeight = targetHeight;

MyGame.game = new Phaser.Game(newWidth, newHeight, Phaser.AUTO, 'game');

console.log('Width' + window.innerWidth + 'Height' +  window.innerHeight + 'DPI' + window.devicePixelRatio);
MyGame.game.state.add('Load', MyGame.Load);
MyGame.game.state.add('Play', MyGame.Play);

MyGame.game.state.start('Load');