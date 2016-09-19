var loadingScreen = {
    
    preload: function(){
        this.counter = 0;
        this.load.image('loading', 'assets/images/loadingscreen.png');
    },
    
    create: function(){
        this.add.sprite(0, 0, 'loading');
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    },
    
    updateCounter: function(){
        this.counter++;
        
    },
    update: function(){
        if(this.counter == 1){
            game.state.start('menu');   
        }
    }
};