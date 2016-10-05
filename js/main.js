var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

game.state.add('loadingScreen', loadingScreen);
game.state.add('gameover', gameover);
game.state.add('menu', menu);
game.state.add('lvlthree', lvlthree);
game.state.add('lvltwo', lvltwo);
game.state.add('lvlone', lvlone);
game.state.add('multiplayer', multiplayer);

game.state.start('loadingScreen');