var MyGame = MyGame || {};

var targetWidth = 840;//960; // 3:2
var targetHeight = 560;//640;

MyGame.game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'game');

console.log('Width' + window.innerWidth + 'Height' +  window.innerHeight + 'DPI' + window.devicePixelRatio);
MyGame.game.state.add('Preload', MyGame.Preload);
MyGame.game.state.add('MainMenu', MyGame.MainMenu);
MyGame.game.state.add('YouLose', MyGame.YouLose);
MyGame.game.state.add('YouWin', MyGame.YouWin);
MyGame.game.state.add('Play', MyGame.Play);

MyGame.game.state.start('Preload');