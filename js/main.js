var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

game.state.add('loadingScreen', loadingScreen);
game.state.add('credits', credits);
game.state.add('chooseLevel', chooseLevel);
game.state.add('gameover', gameover);
game.state.add('menu', menu);
game.state.add("mainGame", mainGame);
game.state.add("MultiplayerWiner", MultiplayerWiner);
game.state.add('multiplayer', multiplayer);
//Start the loadingscreen state.
game.state.start('loadingScreen');