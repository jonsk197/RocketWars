var loadingScreen = {
    
    preload: function(){
        this.counter = 0;
        this.load.image('loading', 'assets/images/loadingscreen.png');
        this.load.image('gif', 'assets/gif/gifman.gif');
    },
    
    create: function(){
        this.add.sprite(0, 0, 'loading');
        bazooka = this.add.sprite(32, this.world.height - 220, 'gif');
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    },
    
    updateCounter: function(){
        this.counter++;
        
    },
    update: function(){
        if(this.counter == 2){
            game.state.start('menu');   
        }
    }
};