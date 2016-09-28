var lvlone = {

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

        // The player and its settings
        player = this.add.sprite(32, this.world.height - 250, 'player');
        target = this.add.sprite(600, this.world.height - 250, 'target');
        //  We need to enable physics on the player
        this.physics.arcade.enable(player);
        this.physics.arcade.enable(target);
        target.body.gravity.y = 300;
        target.body.collideWorldBounds = true;
        //  Player physics properties. Give the little guy a slight bounce.

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0], 10, true);
        player.animations.add('right', [2], 10, true);

        bazooka = this.add.sprite(player.x, player.y, 'bazooka');
        bazooka.anchor.setTo(0.5, 0.5);
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bulletGravity= 200;
        bullets.createMultiple(10, 'bullet');
        bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
        bullets.setAll('checkWorldBounds', true);
        bulletTime = 0;
        life=5;

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        this.initBricks();
        
    },

    update: function() {
        //  Collide the player and the stars with the ledges and lava
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(player, bricks);
        this.physics.arcade.collide(target, platforms);
        this.physics.arcade.collide(target, bricks);
        this.physics.arcade.collide(bricks, bullets, this.bulletHitBrick);
        this.physics.arcade.overlap(target, lava, this.TargetLava, null, lvlone);

        //  Checks to see if the player overlaps with any of the lava, if he does call the gameOver function
        this.physics.arcade.overlap(player, lava, this.gameOver, null, lvlone);
        this.physics.arcade.collide(bullets, target, this.hits);

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
        bazooka.x = player.x + 15;
        bazooka.y = player.y + 33;
        
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

     initBricks:  function() {
     
         brickInfo = {
            width: 27,
            height: 27,
            count: {
                row: 22,
                col: 3
            },
            offset: {
                top: 450,
                left: 10
            },
            padding: 10
        }
        bricks = game.add.group();
        for(c=0; c<brickInfo.count.col; c++) {
            for(r=0; r<brickInfo.count.row; r++) {
                var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
                var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
                newBrick = game.add.sprite(brickX, brickY, 'bigTile');
                newBrick.scale.setTo(0.5, 0.5);
                game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                bricks.add(newBrick);
            }
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
                bullet.body.gravity.y=bulletGravity;
                bulletTime = lvlone.time.now + 500;
            }
        }
    },

    resetBullet: function (bullets) {
        bullets.kill();
    },

     hits: function(target, bullets){
        
        console.log(life);
        life = life -1;
        bullets.kill();
        if (life ==0){
            target.kill();
            console.log('next Level');
            location.reload;
            game.state.add('menu');
            game.state.start('menu');
        }

    },

    gameOver: function(player, lava) {
        
        console.log("Game over");
        
        // Removes the star from the screen
        player.kill();
        bazooka.kill();
        game.state.start('gameover');
    },
    TargetLava: function(target, lava) {
        
        console.log("Target is dead");
        
        // Removes the star from the screen
        target.kill();
        game.state.start('gameover');
    },

    bulletHitBrick:  function (bullets, bricks) {
        bricks.kill();
        bullets.kill();
    },


};