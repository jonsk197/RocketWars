var lvlone = {

    init: function (){
        var player;
        var bazooka;
        var platforms;
        var lava;
        var cursors;

        var bullet;
        var bullets;
        var bulletTime;
    },

    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('groundSmall', 'assets/images/smallTile.png');
        this.load.image('groundBig', 'assets/images/bigTile.png');
        this.load.image('lava', 'assets/images/lava.png');
        this.load.spritesheet('dude', 'assets/images/sprite_short_man.png', 35 ,50);
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
        lava1.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        lava1.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'groundBig');
        ledge.body.immovable = true;
        ledge.scale.setTo(2, 2);
        
        ledge = platforms.create(0, 250, 'groundSmall');
        ledge.body.immovable = true;


        // The player and its settings
        player = this.add.sprite(32, this.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0], 10, true);
        player.animations.add('right', [2], 10, true);

        bazooka = this.add.sprite(player.x, player.y, 'bazooka');

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(10, 'bullet');
        bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
        bullets.setAll('checkWorldBounds', true);
        bulletTime = 0;

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        
    },

    update: function() {
        //  Collide the player and the stars with the ledges and lava
        this.physics.arcade.collide(player, lava);
        this.physics.arcade.collide(player, platforms);

        //  Checks to see if the player overlaps with any of the lava, if he does call the gameOver function
        this.physics.arcade.overlap(player, lava, this.gameOver, null, lvlone);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        bazooka.x = player.x - 10;
        bazooka.y = player.y + 20;
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown)
        {
            bazooka.angle += 2;
        }
        else if(cursors.down.isDown)
        {
            bazooka.angle -=2;
        }

        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.fireBullet();
        }

    },
    fireBullet: function() {

        if (lvlone.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
            if (bullet)
            {
                bullet.angle = bazooka.angle
                bullet.reset(bazooka.x, bazooka.y - 6);
                bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, 300, bullet.velocity);

                bulletTime = lvlone.time.now + 500;
            }
        }
    },

    resetBullet: function (bullet) {
        bullet.kill();
    },

    gameOver: function(player, lava) {
        
        console.log("Game over");
        
        // Removes the star from the screen
        player.kill();
    }
};