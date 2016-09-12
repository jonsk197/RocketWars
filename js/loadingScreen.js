var loadingScreen = {
    
    preload: function(){
        this.counter = 0;
        this.load.image('loading', 'assets/images/loadingScreen.png');
    },
    
    create: function(){
        this.add.sprite(0, 0, 'loading');
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    },
    
    updateCounter: function(){
        this.counter++;
        
    },
    update: function(){
        if(this.counter == 3){
            game.state.start('menu');   
        }
    }
};