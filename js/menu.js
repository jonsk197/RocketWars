var menu = {

    preload: function() {
        game.load.image('menu', 'assets/images/background.png');   
        game.load.spritesheet('start', 'assets/images/buttonStart.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
        //just added "this" - remove if issue
        this.start = this.add.button(150, 210, 'start', this.startGame, this);
        this.start.onInputOver.add(this.overStart, this);
        this.start.onInputOut.add(this.outStart, this);
    },
    
    update: function(){
    },
    
    startGame: function(){
        console.log("Starting");
        game.state.start('lvlone');   
    }
};
    