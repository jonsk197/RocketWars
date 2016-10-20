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
        var bulletGravity;
        var target;
        var life;  
        var level;
        var spacebar;
        var spacebarJustPressed;
        var turn;
        var turnText;
        var intro;
        var explosion;
        var music;
        var shot;
        var facing1;
        var facing2;
    },


    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('smallTile', 'assets/images/smallTile.png');
        this.load.image('bigTile', 'assets/images/bigTile.png');
        this.load.image('lava', 'assets/images/lava.png');
        this.load.spritesheet('player', 'assets/images/sprite_short_man.png', 35 ,50);
        this.load.spritesheet('player2', 'assets/images/sprite_short_man.png', 35 ,50);
        this.load.spritesheet('target', 'assets/images/targetBoard.png');
        this.load.spritesheet('bazooka', 'assets/images/bazookaSprite.png',50 ,27);
        this.load.spritesheet('bazooka2', 'assets/images/bazookaSprite.png',50 ,27);
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.audio('intro', ['assets/audio/oedipus_wizball_highscore.mp3', 'assets/audio/oedipus_wizball_highscore.ogg']);
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
        this.load.audio('shot', 'assets/audio/shot.wav');
    },

    create: function() {
        //Enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Add the background sprite
        this.add.sprite(0, 0, 'background');
        //Add the music and start playing the music 
        music = this.add.audio('intro');
        music.play();

        //Create the explosion & shot sound
        explosion = this.add.audio('explosion');
        shot = this.add.audio('shot');
        
        //Enable physics for the lava & create the lava-group. Also scale the lava to fit the screen.
        lava = this.add.group();
        lava.enableBody = true;
        var lava1 = lava.create(0, this.world.height - 50, 'lava');
        lava1.scale.setTo(2, 1);

        //Create the players and cordinate there positions.
        player = this.add.sprite(32, this.world.height - 450, 'player');
        player2 = this.add.sprite(738, this.world.height - 450, 'player2');

        //We need to enable physics on the players
        this.physics.arcade.enable(player);
        this.physics.arcade.enable(player2);

        //Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        //Our two animations, walking left and right.
        player.animations.add('left', [0], 1, true);
        player.animations.add('right', [2], 1, true);
       
        //Player physics properties. Give the little guy a slight bounce. 
        player2.body.bounce.y = 0.2;
        player2.body.gravity.y = 300;
        player2.body.collideWorldBounds = true;
        
        //Our two animations, walking left and right.
        player2.animations.add('left', [0], 1, true);
        player2.animations.add('right', [2], 1, true);

       
        //The bazooka and its settings
        bazooka = this.add.sprite(player.x, player.y, 'bazooka');
        bazooka.anchor.setTo(0.5, 0.5);

        //Add the animations to turn the bazooka the same way as the player
        bazooka.animations.add('left', [0], 1, true);
        bazooka.animations.add('right', [1], 1, true);
        
        bazooka2 = this.add.sprite(player2.x, player2.y, 'bazooka2');
        bazooka2.anchor.setTo(0.5, 0.5);
        bazooka2.animations.add('left', [0], 1, true);
        bazooka2.animations.add('right', [1], 1, true);

        //We also need some bullets to shot
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(10, 'bullet');
        bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
        bullets.setAll('checkWorldBounds', true);

        //Varaiable seting the gravity of the bullet
        bulletGravity= 200;
        //Varaiable set number of lifes for the target
        life=2;
        //Varaiable set the start level
        level = 1;
        //Varaiable defining the players turn
        turn = 0;
        //Varaiable defining the winner.
        var winner=0;
        //Varaiables defining if the player faceing left or right?
        facing1 = 'right';
        facing2 = 'left';
        //Varaiable to calculate for how long the spacebar has been pressed.
        spacebarJustPressed = false;
        //Create text describing the turn
        turnText = game.add.text(50, 40, 'Turn for player 1', { fontSize: '32px', fill: '#000' });

        // Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //Add the bricks to the map
        lvlTowers.initBricks();
        
    },

    update: function() {
        //Check collisions between player, bricks and bullets 
        this.physics.arcade.collide(player, bricks);
        this.physics.arcade.collide(player2, bricks);
        this.physics.arcade.collide(bricks, bullets, this.bulletHitBrick);

        //Checks to see if the player overlaps with any of the lava, if he does call the gameOver function
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


        switch(turn) {
        case 0:
            if (cursors.left.isDown)
            {
                //Move to the left
                player.body.velocity.x = -150;
                player.animations.play('left');
                bazooka.animations.play('left');
                facing1 = 'left';
            }
            else if (cursors.right.isDown)
            {
                //Move to the right
                player.body.velocity.x = 150;
                player.animations.play('right');
                bazooka.animations.play('right');
                facing1 = 'right';
            }
            else
            {
                //Stand still
                player.animations.stop();
            }

            
            //Change the angle of the bazooka
            if (cursors.up.isDown)
            {
                if (facing1 == 'right'){
                    bazooka.angle -= 2;
                }
                else {
                    bazooka.angle +=2;
                }
            }
            else if(cursors.down.isDown)
            {
               if (facing1 == 'right')
               {
                    bazooka.angle += 2;
                }
                else {
                    bazooka.angle -=2;
                }
            }

            
            //Check if the spacebar just has been pressed
            if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                spacebarJustPressed = true;
            }

            //Call the fire a bullet if the spacebar is pressed
            if(!this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && spacebarJustPressed)
            {
                //Calculate the time the spacebar has been hold down, this to change the force of the bullet.
                var diff = Math.abs(this.spacebar.timeUp - this.spacebar.timeDown);
                
                //Check so we dont shot to hard. Limite the speed of the bullet to.
                if(diff>1000){
                    this.fireBullet(1000);
                }
                else
                {
                    this.fireBullet(diff);
                }
                spacebarJustPressed = false;
            }
            break;


        case 1:
            if (cursors.left.isDown)
            {
                //Move to the left
                player2.body.velocity.x = -150;
                player2.animations.play('left');
                bazooka2.animations.play('left');
                facing2 = 'left';
            }
            else if (cursors.right.isDown)
            {
                //Move to the right
                player2.body.velocity.x = 150;
                player2.animations.play('right');
                bazooka2.animations.play('right');
                facing2 = 'right';
            }
            else
            {
                //Stand still
                player2.animations.stop();
            }

            
            
            //Change the angle of the bazooka
            if (cursors.up.isDown)
            {
                if (facing2 == 'right'){
                    bazooka2.angle -= 2;
                }
                else {
                    bazooka2.angle +=2;
                }
            }
            else if(cursors.down.isDown)
            {
               if (facing2 == 'right')
               {
                    bazooka2.angle += 2;
                }
                else {
                    bazooka2.angle -=2;
                }
            }
            //Check if the spacebar just has been pressed
            if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                spacebarJustPressed = true;
            }

            //Call the fire a bullet if the spacebar is pressed
            if(!this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && spacebarJustPressed)
            {
                //Calculate the time the spacebar has been hold down, this to change the force of the bullet.
                var diff = Math.abs(this.spacebar.timeUp - this.spacebar.timeDown);
                
                //Check so we dont shot to hard. Limite the speed of the bullet to.
                if(diff>1000){
                    this.fireBullet(1000);
                }
                else
                {
                    this.fireBullet(diff);
                }
                spacebarJustPressed = false;
            }
            break;
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            game.state.start('menu');
            music.pause();
        }
    },   

    fireBullet: function(diff) {
        //Load the first bullet from bullets.
        bullet = bullets.getFirstExists(false);

        switch(turn) {
        case 0:
            if(facing1 == 'right')
            {   
                bullet.angle = bazooka.angle
            }else if( facing1 == 'left'){
                bullet.angle = bazooka.angle + 180;
            }
            //Set the position, gravity and velocity for the bullet
            bullet.reset(bazooka.x, bazooka.y - 6);
            bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, diff, bullet.velocity);
            bullet.body.gravity.y=bulletGravity;

            shot.play();
            
            turn = 1;
            turnText.text = 'Turn for player 2';
            turnText.x = 500;
            break;
        case 1:
            if(facing2 == 'right')
            {   
                bullet.angle = bazooka2.angle;
            }else if( facing2 == 'left'){
                bullet.angle = bazooka2.angle+180;
            }
            //Set the position, gravity and velocity for the bullet
            bullet.reset(bazooka2.x, bazooka2.y - 6);
            bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, diff, bullet.velocity);
            bullet.body.gravity.y=bulletGravity;

            shot.play();

            turn = 0;
            turnText.text = 'Turn for player 1';
            turnText.x=50;
            break;
        }
    },

    resetBullet: function (bullets) {
        bullets.kill();
    },

    player2Win: function(player, lava) {
        //player 2 win
        player.kill();
        bazooka.kill();
        multiplayer.winner=1;
        music.pause();
        game.state.start('MultiplayerWiner');
    },

     playerWin: function(player2, lava) {  
        //player 1 win
        player2.kill();
        bazooka2.kill();
        multiplayer.winner=0;
        music.pause();
        game.state.start('MultiplayerWiner');
    },

    bulletHitBrick:  function (bullets, bricks) {
        // Remove the brick and bullet when they collide.
        bricks.kill();
        bullets.kill();
        explosion.play();
    },
};