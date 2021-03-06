var gameover = {    
    preload: function(){
        this.load.image('gameOver', 'assets/images/game_over.png');
        this.load.image('background', 'assets/images/background.png');   

    },
    
    create: function(){
        this.add.sprite(0,0, 'background');
        this.add.sprite(200, 250, 'gameOver');
    },
    
    update: function(){
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            game.state.start('menu');
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            game.state.start('mainGame');
        }
    }
};