var menu = {

    preload: function() {
        game.load.image('menu', 'assets/images/background.png');   
        game.load.spritesheet('start', 'assets/images/buttonStart.png');
        game.load.spritesheet('startMultiplayer', 'assets/images/buttonMultiplayer.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
        //just added "this" - remove if issue
        
        this.start = this.add.button(150, 100, 'start', this.startGame, this);
        //this.start.onInputOver.add(this.overStart, this);
        //this.start.onInputOut.add(this.outStart, this);
        
        this.startMultiplayer = this.add.button(150, 160, 'startMultiplayer', this.startMultiplayer, this);
        //this.lvl.onInputOver.add(this.overMulti, this);
        //this.lvl.onInputOut.add(this.outMulti, this);

    },
    
    update: function(){
    },
    
    startGame: function(){
        console.log("Starting");
        game.state.start('lvlone');   
    },

    startMultiplayer: function(){
        console.log("Starting");
        game.state.start('multiplayer');      
    }
};
    