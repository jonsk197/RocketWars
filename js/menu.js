var menu = {

    preload: function() {
        game.load.image('menu', 'assets/images/background.png');   
        game.load.spritesheet('start', 'assets/images/buttonStart.png');
        game.load.spritesheet('startMultiplayer', 'assets/images/buttonMultiplayer.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
        this.start = this.add.button(150, 100, 'start', this.startGame, this);
//      this.startMultiplayer = this.add.button(150, 160, 'startMultiplayer', this.startMultiplayer, this);
    },

    startGame: function(){
        console.log("Starting");
        game.state.start('lvlone');   
    },

    startMultiplayer: function(){
        console.log("Starting");
        game.state.start('multiplayer');      
    },
};
    