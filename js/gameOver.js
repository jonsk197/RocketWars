var gameover = {
    
    preload: function(){
        this.load.image('gameOver', 'assets/images/game_over.png');
        this.load.image('background', 'assets/images/background.png');   

    },
    
    create: function(){
        this.add.sprite(0,0, 'background');
        this.add.sprite(250, 250, 'gameOver');
    },
    
    update: function(){
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            location.reload();
           // game.state.restart('menu');
        }
    }
};