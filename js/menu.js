var menu = {

    preload: function() {
        game.load.image('menu', 'assets/images/startScreen.png');   
        game.load.spritesheet('start', 'assets/images/startButton.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
        //just added "this" - remove if issue
        this.start = this.add.button(120, 210, 'start', this.startGame, this);
        this.start.onInputOver.add(this.overStart, this);
        this.start.onInputOut.add(this.outStart, this);
    },
    
    update: function(){
    },
    
    startGame: function(){
        console.log("Starting");
        game.state.start('starGuy');   
    }
};
    