var chooseLevel = {
	preload: function(){
        game.load.spritesheet('background', 'assets/images/background.png');
        game.load.spritesheet('level1', 'assets/images/level1.png');
        game.load.spritesheet('level2', 'assets/images/level2.png');
        game.load.spritesheet('level3', 'assets/images/level3.png');
        game.load.spritesheet('level4', 'assets/images/level4.png');
        game.load.spritesheet('level5', 'assets/images/level5.png');
        game.load.spritesheet('pressESC', 'assets/images/pressESC.png');
    },

    create: function(){
    	this.add.sprite(0, 0, 'background');

    	this.start = this.add.button(150, 100, 'level1', this.startLevel1, this);
    	this.start = this.add.button(150, 160, 'level2', this.startLevel2, this);
    	this.start = this.add.button(150, 220, 'level3', this.startLevel3, this);
    	this.start = this.add.button(150, 280, 'level4', this.startLevel4, this);
    	this.start = this.add.button(150, 340, 'level5', this.startLevel5, this);      

        this.add.sprite(220, 450,'pressESC');
    
    },
    
    update: function(){
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            game.state.start('menu');
        }
    },

    startLevel1: function(){
    	menu.level = 1;
    	game.state.start('mainGame');
    },

    startLevel2: function(){
    	menu.level = 2;
    	game.state.start('mainGame');
    },

    startLevel3: function(){
		menu.level = 3;
    	game.state.start('mainGame');
    },

    startLevel4: function(){
    	menu.level = 4;
    	game.state.start('mainGame');
    },

    startLevel5: function(){
    	menu.level = 5;
    	game.state.start('mainGame');
    },
};