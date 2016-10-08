var multiplayer = {

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
        var level;
        var spacebar;
        var spacebarJustPressed;
        var startPressSpaceTime;
        var turn;
        var changebullet;
        },

    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('smallTile', 'assets/images/smallTile.png');
        this.load.image('bigTile', 'assets/images/bigTile.png');
        this.load.image('lava', 'assets/images/lava.png');
        this.load.spritesheet('player', 'assets/images/sprite_short_man.png', 35 ,50);
        this.load.spritesheet('player2', 'assets/images/sprite_short_man.png', 35 ,50);
        this.load.spritesheet('target', 'assets/images/targetBoard.png');
        this.load.image('bazooka', 'assets/images/bazooka.png');
        this.load.image('bazooka2', 'assets/images/bazooka.png');
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
        player2 = this.add.sprite(100, this.world.height - 250, 'player2');

        //We need to enable physics on the player
        this.physics.arcade.enable(player);
        this.physics.arcade.enable(player2);

        //Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        //Our two animations, walking left and right.
        player.animations.add('left', [0], 1, true);
        player.animations.add('right', [2], 1, true);
        
        player2.body.bounce.y = 0.8;
        player2.body.gravity.y = 300;
        player2.body.collideWorldBounds = true;
        
        //Our two animations, walking left and right.
        player2.animations.add('left', [0], 1, true);
        player2.animations.add('right', [2], 1, true);

       
        //The bazooka and its settings
        bazooka = this.add.sprite(player.x, player.y, 'bazooka');
        bazooka.anchor.setTo(0.5, 0.5);
        
        bazooka2 = this.add.sprite(player2.x, player2.y, 'bazooka2');
        bazooka2.anchor.setTo(0.5, 0.5);
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
        level = 1;

        spacebarJustPressed = false;
        startPressSpaceTime = 0;

        // Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //Add the bricks to the map
        lvlone.initBricks();
    },

    update: function() {

     
        //Check collisions between player,lava, bricks and bullets 
        this.physics.arcade.collide(player, bricks);
        this.physics.arcade.collide(player2, bricks);
        this.physics.arcade.collide(bricks, bullets, this.bulletHitBrick);

        //Checks to see if the player overlaps with any of the lava, if he does call the gameOver function
        this.physics.arcade.overlap(player, player2, this.playersCollision , null, multiplayer);
        this.physics.arcade.overlap(player, lava, this.player2Win, null, multiplayer);
        this.physics.arcade.overlap(player2, lava, this.playerWin, null, multiplayer);


        //Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player2.body.velocity.x = 0;

        //Set the bazooka's possition on the player
        bazooka.x = player.x + 15;
        bazooka.y = player.y + 33;
        //Set the bazooka's possition on the player2
        bazooka2.x = player2.x + 15;
        bazooka2.y = player2.y + 33;

        turn = 0;
        if (turn ==0 ) {

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
                spacebarJustPressed = true;
            }

            if(!this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && spacebarJustPressed)
            {
                //Calculate the time the spacebar has been hold down, this to change the force of the bullet.
                var diff = Math.abs(this.spacebar.timeUp - this.spacebar.timeDown);
                //console.log("Diff: " + diff);

                this.fireBullet(diff);

                spacebarJustPressed = false;
                turn= turn +1;
            }
            
        }

         else {
            if (cursors.left.isDown)
            {
                //Move to the left
                player2.body.velocity.x = -150;
                player2.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                //Move to the right
                player2.body.velocity.x = 150;
                player2.animations.play('right');
            }
            else
            {
                //Stand still
                player2.animations.stop();
                player2.frame = 1;
            }

            
            
            //Change the angle of the bazooka
            if (cursors.up.isDown)
            {
                bazooka2.angle += 2;
            }
            else if(cursors.down.isDown)
            {
                bazooka2.angle -=2;
            }

            
            //Call the fire a bullet if the spacebar is pressed
            if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                spacebarJustPressed = true;
            }

            if(!this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && spacebarJustPressed)
            {
                //Calculate the time the spacebar has been hold down, this to change the force of the bullet.
                var diff = Math.abs(this.spacebar.timeUp - this.spacebar.timeDown);
                //console.log("Diff: " + diff);

                this.fireBullet(diff);

                spacebarJustPressed = false;
            }
            turn= turn -1;
        }
    },

    getlength: function(number) {
    return number.toString().length;
    },   

    fireBullet: function(diff) {

        changebullet = 0;
        if (multiplayer.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
            if (bullet)
            {
                if (changebullet==0){
                    bullet.angle = bazooka.angle
                    bullet.reset(bazooka.x, bazooka.y - 6);
                    bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, diff, bullet.velocity);
                    bullet.body.gravity.y=bulletGravity;
                    bulletTime = multiplayer.time.now + 500;
                }
                else if (changebullet==1){
                    bullet.angle = bazooka2.angle
                    bullet.reset(bazooka2.x, bazooka2.y - 6);
                    bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, diff, bullet.velocity);
                    bullet.body.gravity.y=bulletGravity;
                    bulletTime = multiplayer.time.now + 500;}
            }
        }
    },

    resetBullet: function (bullets) {
        bullets.kill();
    },


     player2Win: function(player, lava) {
        
        console.log("player2 win");
        player.kill();
        bazooka.kill();
    },

     playerWin: function(player2, lava) {
        
        console.log("player2 win");
        player2.kill();
        bazooka2.kill();
    },
  

    bulletHitBrick:  function (bullets, bricks) {
        bricks.kill();
        bullets.kill();
    },
    playersCollision: function(player, player2){

    },

    gameOver: function(player, lava) {
        
        console.log("Game over");
        player.kill();
        bazooka.kill();
        game.state.start('gameover');
    },
};