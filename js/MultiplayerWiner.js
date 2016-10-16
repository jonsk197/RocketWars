var MultiplayerWiner = {
    init: function(){
        var TheWiner;
    },
    
    preload: function(){
        this.load.image('background', 'assets/images/background.png');   
        this.load.image('1', 'assets/images/1.png');    
        this.load.image('wineris', 'assets/images/winneris.png');
        this.load.image('2', 'assets/images/2.png');  
        
    },
    
    create: function(){
        this.add.sprite(0,0, 'background');
        this.add.sprite(138, 150, 'wineris');
        if (multiplayer.winner==0){
            this.add.sprite(360, 270, '1');
        }
        else 
        {
            this.add.sprite(350, 270, '2');
        }
    },
    
    update: function(){
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            game.state.start('menu');
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            game.state.start('multiplayer');
        }
    },

};