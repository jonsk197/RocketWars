var menu = {

    preload: function() {
        game.load.image('menu', 'assets/images/background.png');   
        game.load.spritesheet('start', 'assets/images/buttonStart.png');
        game.load.spritesheet('startMultiplayer', 'assets/images/buttonMultiplayer.png');
        game.load.spritesheet('credits', 'assets/images/buttoncredits.png');
        game.load.spritesheet('chooseLevel', 'assets/images/buttonChooseLevel.png');
        game.load.spritesheet('exit', 'assets/images/buttonExit.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
        start = this.add.button(150, 100, 'start', this.startGame, this);
        chooseLevel = this.add.button(150,160,'chooseLevel' , this.chooseLevel, this);
        credits = this.add.button(150, 220, 'credits', this.showCredits, this);
        startMultiplayer = this.add.button(150, 280, 'startMultiplayer', this.startMultiplayer, this);
        exit = this.add.button(150, 340, 'exit', this.exit, this);
    },

    startGame: function(){
        console.log("Starting");
        game.state.start('mainGame');   
    },

    chooseLevel: function(){
        console.log("chooseLevel");
        game.state.start('chooseLevel');   
    },

    showCredits: function(){
        console.log("showCredits");
        game.state.start('credits');
    },

    startMultiplayer: function(){
        console.log("Starting");
        game.state.start('multiplayer');      
    },

    exit: function(){
        console.log("Close the game!");
        game.destroy();
        console.log("LOL, also need to close the tab dude!");
    },

};
    