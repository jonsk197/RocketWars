leltwo = {
	init: function (){
        var player;
        var bazooka;
        var platforms;
        var lava;
        var cursors;
        var bricks;
        var bullet;
        var bullets;
        var bulletTime;
        var bulletGravity;
        var target;
        var life;  
        },
         preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('smallTile', 'assets/images/smallTile.png');
        this.load.image('bigTile', 'assets/images/bigTile.png');
        this.load.image('lava', 'assets/images/lava.png');
        this.load.spritesheet('player', 'assets/images/sprite_short_man.png', 35 ,50);
        this.load.spritesheet('target', 'assets/images/sprite_short_man.png', 35 ,50);

        this.load.image('bazooka', 'assets/images/bazooka.png');
        this.load.image('bullet', 'assets/images/bullet.png');
    },

    create: function() {
       //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.add.sprite(0, 0, 'background');

        //  The platforms group contains the two ledges
        platforms = this.add.group();
        lava = this.add.group();

        //  We will enable physics for the lava
        lava.enableBody = true;
        platforms.enableBody = true;

        // Here we create the ground.
        var lava1 = lava.create(0, this.world.height - 50, 'lava');
        
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        lava1.scale.setTo(2, 1);

        //  This stops it from falling away when you jump on it
        lava1.body.immovable = true;

        //  Now let's create two ledges
        
        ledge = platforms.create(0, 250, 'smallTile');
        ledge.body.immovable = true;

}