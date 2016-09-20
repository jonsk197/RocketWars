var starGuy = {

    init: function (){
        var player;
        var platforms;
        var cursors;

        var score = 0;
        var scoreText;
    },

    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('lava', 'assets/images/lava.png');
        this.load.spritesheet('dude', 'assets/images/sprite_short_man.png', 35 ,50);
        this.load.spritesheet('dude2', 'assets/images/sprite_short_man.png', 35 ,50);
    },

    create: function() {
       //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.add.sprite(0, 0, 'background');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, this.world.height - 50, 'lava');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // The player and its settings
        player = this.add.sprite(32, this.world.height - 150, 'dude');
        player2 = this.add.sprite(32, this.world.height - 150, 'dude2');

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0], 10, true);
        player.animations.add('right', [2], 10, true);

        player2.body.bounce.y = 0.2;
        player2.body.gravity.y = 300;
        player2.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player2.animations.add('left', [0], 10, true);
        player2.animations.add('right', [2], 10, true);



      


        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        
    },

    update: function() {
        //  Collide the player and the stars with the platforms
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.arcade.overlap(player, player2, this.collectStar, null, starGuy);

        //  Reset the players angel (movement)
        player.body.angel.x = 0;
        switch (player){
        case "player" : 
            if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.angel.x = player.body.angel.x - 10;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
              player.body.angel.x = player.body.angel.x + 10;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
        case "player2"
            if (cursors.left.isDown)
        {
            //  Move to the left
            player2.body.angel.x = player2.body.angel.x - 10;

            player2.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
              player2.body.angel.x = player.body.angel.x + 10;

            player2.animations.play('right');
        }
        else
        {
            //  Stand still
            player2.animations.stop();

            player2.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }

    },
}
    },


    collectStar: function(player, star) {
        
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        //score += 10;
        //scoreText.text = 'Score: ' + score;

    }
};
