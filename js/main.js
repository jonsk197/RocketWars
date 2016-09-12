var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

game.state.add('loadingScreen', loadingScreen);
game.state.add('menu', menu);
game.state.add('starGuy', starGuy);

game.state.start('loadingScreen');