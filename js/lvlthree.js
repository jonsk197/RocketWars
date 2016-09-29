var lvlthree = {

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
        this.load.spritesheet('target', 'assets/images/targetBoard.png');
        this.load.image('bazooka', 'assets/images/bazooka.png');
        this.load.image('bullet', 'assets/images/bullet.png');
    },

    create: function() {
        //Enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.sprite(0, 0, 'background');

        //Enable physics for the lava & create the lava-group
        lava = this.add.group();
        lava.enableBody = true;
        var lava1 = lava.create(0, this.world.height - 50, 'lava');
        lava1.scale.setTo(2, 1);

        //The player and its settings
        player = this.add.sprite(32, this.world.height - 250, 'player');

        //We need to enable physics on the player
        this.physics.arcade.enable(player);

        //Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        //Our two animations, walking left and right.
        player.animations.add('left', [0], 1, true);
        player.animations.add('right', [2], 1, true);

        //The target and its settings
        target = this.add.sprite(600, this.world.height - 250, 'target');
        this.physics.arcade.enable(target);
        target.body.gravity.y = 300;
        target.body.collideWorldBounds = true;
        target.scale.setTo(0.5, 0.5);
        
        //The bazooka and its settings
        bazooka = this.add.sprite(player.x, player.y, 'bazooka');
        bazooka.anchor.setTo(0.5, 0.5);
        
        //We also need some bullets to shot
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(10, 'bullet');
        bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
        bullets.setAll('checkWorldBounds', true);

        //Set the gravity of the bullet
        bulletGravity= 200;
        //initialize bulletTime
        bulletTime = 0;
        //Set number of lifes for the target
        life=2;

        // Our controls.
        cursors = this.input.keyboard.createCursorKeys();

        //Add the bricks to the map
        this.initBricks();
        
    },

    update: function() {
        //Check collisions between player,lava, bricks and bullets 
        this.physics.arcade.collide(player, bricks);
        this.physics.arcade.collide(target, bricks);
        this.physics.arcade.collide(bricks, bullets, this.bulletHitBrick);
        this.physics.arcade.overlap(target, lava, this.targetHitsLava, null, lvlthree);

        //Checks to see if the player overlaps with any of the lava, if he does call the gameOver function
        this.physics.arcade.overlap(player, lava, this.gameOver, null, lvlthree);
        this.physics.arcade.collide(bullets, target, this.hits);

        //Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else
        {
            //Stand still
            player.animations.stop();
            player.frame = 1;
        }

        //Set the bazooka's possition on the player
        bazooka.x = player.x + 15;
        bazooka.y = player.y + 33;
        
        //Change the angle of the bazooka
        if (cursors.up.isDown)
        {
            bazooka.angle += 2;
        }
        else if(cursors.down.isDown)
        {
            bazooka.angle -=2;
        }

        //Call the fire a bullet if the spacebar is pressed
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
                var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left +10;
                var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
                newBrick = game.add.sprite(brickX, brickY, 'bigTile');
                newBrick.scale.setTo(0.5, 0.5);
                game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                bricks.add(newBrick);
            }
        }  
            brickInfo = {
            width: 27,
            height: 27,
            count: {
                row: 2,
                col: 5,
            },
            offset: {
                top: 250,
                left: 400,
            },
            padding: 10
        }
       
       
        for(c=0; c<brickInfo.count.col; c++) {
            for(r=0; r<brickInfo.count.row; r++) {
                var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left +10;
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

        if (lvlthree.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
            if (bullet)
            {
                bullet.angle = bazooka.angle
                bullet.reset(bazooka.x, bazooka.y - 6);
                bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, 300, bullet.velocity);
                bullet.body.gravity.y=bulletGravity;
                bulletTime = lvlthree.time.now + 500;
            }
        }
    },

    resetBullet: function (bullets) {
        bullets.kill();
    },

    hits: function(target, bullets){
        
        life = life -1;
        bullets.kill();

        if (life ==0){
            target.kill();

            game.state.add('menu');  
            game.state.start('menu');
            console.log("Menu-state not set...");
            location.reload();
        }

    },

    targetHitsLava: function(target, lava) {
        
        console.log("Target is dead");
        target.kill();
        game.state.start('gameover');
    },

    bulletHitBrick:  function (bullets, bricks) {
        bricks.kill();
        bullets.kill();
    },

    gameOver: function(player, lava) {
        
        console.log("Game over");
        player.kill();
        bazooka.kill();
        game.state.start('gameover');
    },
};