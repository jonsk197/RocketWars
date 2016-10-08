var credits = {

	preload: function(){
        game.load.spritesheet('credits', 'assets/images/credits.png');
        game.load.spritesheet('by', 'assets/images/by.png');
        game.load.spritesheet('name', 'assets/images/name.png');
        game.load.spritesheet('pressESC', 'assets/images/pressESC.png');
    },

    create: function(){
    	this.add.sprite(0, 0, 'credits');
      	this.add.sprite(360, 200, 'by');
      	this.add.sprite(150, 270, 'name');

        this.add.sprite(220, 450,'pressESC');
    },

    update: function(){
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            game.state.start('menu');
        }
    },
};