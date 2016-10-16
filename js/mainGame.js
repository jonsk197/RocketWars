var mainGame = {

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
        var lifeText;
        var levelText;
        var spacebar;
        var spacebarJustPressed;
        var graphics;
        var infoRect;
        var instructions;
        var instruction_label;
        var mute;
        var explosion;
        var shot;
        var music;
        var muteTime;
        var facing;
        var keyboard;
        var crosshair;
        },

    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('smallTile', 'assets/images/smallTile.png');
        this.load.image('bigTile', 'assets/images/bigTile.png');
        this.load.image('lava', 'assets/images/lava.png');
        this.load.image('keyboard', 'assets/images/keyboard.png');
        this.load.spritesheet('player', 'assets/images/sprite_short_man.png',35 ,50);
        this.load.spritesheet('target', 'assets/images/targetBoard.png');
        this.load.spritesheet('bazooka', 'assets/images/bazookaSprite.png',50 ,27);
        this.load.image('crosshair', 'assets/images/crosshair.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.audio('music', ['assets/audio/oedipus_wizball_highscore.mp3', 'assets/audio/oedipus_wizball_highscore.ogg']);
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
        this.load.audio('shot', 'assets/audio/shot.wav');
    },

    create: function() {
        //Enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Add the background
        this.add.sprite(0, 0, 'background');

        //Add the music and start playing the music 
        music = this.add.audio('music');
        music.play();

        //Create the explosion & shot sound
        explosion = this.add.audio('explosion');
        shot = this.add.audio('shot');
        
        //Enable graphics for the buttons used in the game
        graphics = game.add.graphics(0,0);
        graphics.lineStyle(0);
        graphics.beginFill(0xffba00, 0.6);

        //Enable physics for the lava & create the lava-group. Also scale the lava to fit the screen.
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

        //The bazooka and its settings
        bazooka = this.add.sprite(player.x, player.y, 'bazooka');
        bazooka.anchor.setTo(0.5, 0.5);

        //Turn the bazooka the same way as the player
        bazooka.animations.add('left', [0], 1, true);
        bazooka.animations.add('right', [1], 1, true);

        //The target and its settings
        target = this.add.sprite(600, 200, 'target');
        this.physics.arcade.enable(target);
        target.body.gravity.y = 300;
        target.body.collideWorldBounds = true;
        target.scale.setTo(0.5, 0.5);

        crosshair = this.add.sprite(bazooka.x +30, bazooka.y, 'crosshair');
        crosshair.scale.setTo(0.1, 0.1);

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
        life=1;
        //Varaiables defining if the player faceing left or right?
        facing = 'left';
        //Varaiable to calculate for how long the spacebar has been pressed.
        spacebarJustPressed = false;
        //initialize bulletTime
        bulletTime = 0;
        //initialize muteTime and the state of the mute
        muteTime = 0;
        mute = false;

        //Add text to the screen telling the player what level he is on and how many lifes the target has. 
        levelText = game.add.text(16, 16, 'Level: ' + menu.level, { fontSize: '20px', fill: '#000' });
        lifeText = game.add.text(16, 40, 'Life of target: ' + life, { fontSize: '20px', fill: '#000' });

        //Add the sprite of a keyboard the instructions
        keyboard = this.add.group();
        var keyboard1 = keyboard.create(500, 500, 'keyboard');
        keyboard.scale.setTo(0.3, 0.3);
        keyboard.alpha = 0.9;

        //Add the button for help.
        instruction_label = game.add.text(700, 20, 'Help!', { font: '24px Arial', fill: '#ffba00' });
        instruction_label.inputEnabled = true;
        instruction_label.events.onInputUp.add(function(){
             // Then add the help instructions
            instructions = game.add.text(140, 80, 'Press the spacebar to shot, hold it to shoot harder!\n Use arrows to move and aim.', { font: '24px Arial', align: "center", fill: '#000' });
            infoRect.visible = true;
            keyboard.visible = true;
        });
        // Add a input listener that can help us return from being paused
        game.input.onDown.add(this.removeInstructions, self);

        muteText = game.add.text(600, 20, 'Mute', { font: '24px Arial', fill: '#000' });
        
        // Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //Check what level and load the map.
        if(menu.level == 1){
            lvlone.initBricks();
            this.showInstructions();
            life = 1;
        }else if(menu.level == 2)
        {
            lvltwo.initBricks();
            life = 2;
        }else if(menu.level == 3)
        {
            lvlthree.initBricks();
            life = 3;
        }else if(menu.level == 4)
        {
            lvlfour.initBricks();
            life = 4;
        }else if(menu.level == 5)
        {
            lvlfive.initBricks();
            life = 5;
        }
        lifeText.text = 'Life of target: ' + life;
        levelText.text = 'Level: ' + menu.level;

    },

    update: function() {
        if(menu.level == 2 || menu.level == 5){
            //Movable target
            var period = Math.abs(game.time.now * 0.001);
            var radius = 60;
            target.x = 600 + Math.cos(period) * radius;
            target.y = 200 + Math.sin(period) * radius;
        }

        //Check collisions between player,lava, bricks and bullets 
        this.physics.arcade.collide(player, bricks);
        this.physics.arcade.collide(target, bricks);
        this.physics.arcade.collide(bricks, bullets, this.bulletHitBrick);
        this.physics.arcade.overlap(target, lava, this.targetHitsLava, null, mainGame);

        //Checks to see if the player overlaps with any of the lava, if he does call the gameOver function
        this.physics.arcade.overlap(player, lava, this.gameOver, null, mainGame);
        this.physics.arcade.collide(bullets, target, this.hits);

        //Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
            bazooka.animations.play('left');
            facing = 'left';
        }
        else if (cursors.right.isDown)
        {
            //Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
            bazooka.animations.play('right');
            facing = 'right';
        }
        else
        {
            //Stand still
            player.animations.stop();
            bazooka.animations.stop();
        }

        //Set the bazooka's possition on the player
        bazooka.x = player.x + 15;
        bazooka.y = player.y + 33;

        if(facing == 'left'){
            crosshair.x = bazooka.x - Math.cos(bazooka.angle * 0.018) * 150;
            crosshair.y = bazooka.y - Math.sin(bazooka.angle * 0.018) * 150;
        }else if(facing == 'right'){
            crosshair.x = bazooka.x + Math.cos(bazooka.angle * 0.018) * 150;
            crosshair.y = bazooka.y + Math.sin(bazooka.angle * 0.018) * 150;
        }

        console.log('x: '+ crosshair.x + "\ny: " + crosshair.y);
        
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

            //Check so we dont shot to hard. Limite the speed of the bullet to.
                if(diff>1500){
                    this.fireBullet(1500);
                }
                else
                {
                    this.fireBullet(diff);
                }

            spacebarJustPressed = false;

            this.removeInstructions();
        }

        if(this.input.keyboard.isDown(Phaser.Keyboard.P))
        {
            if(mainGame.time.now > muteTime){
                this.pauseMusic();
                muteTime=mainGame.time.now +500;
            }
        }

        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            game.state.start('menu');
            music.pause();
        }

    },

    fireBullet: function(diff) {
        
        if (mainGame.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
            if (bullet)
            {
                if(facing == 'right')
                {   
                    bullet.angle = bazooka.angle
                }else if( facing == 'left'){
                    bullet.angle = bazooka.angle + 180;
                }
                //Set the position, gravity and velocity for the bullet
                bullet.reset(bazooka.x, bazooka.y - 6);
                bullet.body.velocity = this.physics.arcade.velocityFromAngle(bullet.angle, diff, bullet.velocity);
                bullet.body.gravity.y = bulletGravity;
                //Set the bullet time so we can't shoot right away.
                bulletTime = mainGame.time.now + 500;       
                shot.play();
            }
        }
    },

    resetBullet: function (bullets) {
        bullets.kill();
    },

    hits: function(target, bullets){
        
        life = life -1;
        bullets.kill();
        explosion.play();

        //Check if the life of the target got to 0.
        if (life ==0){
            console.log('next level! Level completted:' +  menu.level);
            //Check what level we should load next.
            if(menu.level == 1){
                console.log('Start level 2');
                lvlone.killBricks();
                lvltwo.initBricks();
                life = 2;
            }else if(menu.level == 2)
            {
                console.log('Start level 3');
                lvltwo.killBricks();
                lvlthree.initBricks();
                life = 3;
            }else if(menu.level == 3)
            {
                console.log('Start level 4');
                lvlthree.killBricks();
                lvlfour.initBricks();
                life = 4;
            }else if(menu.level == 4)
            {
                console.log('Start level 5');
                lvlfour.killBricks();
                lvlfive.initBricks();
                life = 5;
            }else if(menu.level == 5)
            {
                game.state.start('menu');
            } 
            menu.level++;
            levelText.text = 'Level: ' + menu.level;
            //Reposition the player and the target
            player.x = 32;
            player.y = 350;
            target.x = 600;
            target.y = 200;
            target.body.velocity.x = 0; 
            target.body.velocity.y = 0;
        }

        lifeText.text = 'Life of target: ' + life;
    },

    targetHitsLava: function(target, lava) {
        console.log("Target is dead");
        target.kill();
        game.state.start('gameover');
    },
    
    showInstructions: function(){
        //Add and make the objects used for instructions visible
        infoRect=graphics.drawRect(100, 70, 600, 280);
        instructions = game.add.text(140, 80, 'Press the spacebar to shot, hold it to shoot harder!\n Use arrows to move and aim.', { font: '24px Arial', align: "center", fill: '#000' });
        instructions.inputEnabled = true;
        keyboard.visible = true;
    },

    removeInstructions: function(){
        //Destroy and remove the objects used for instructions
        instructions.destroy();
        infoRect.visible = false;
        keyboard.visible = false;
    },

    pauseMusic: function(){
        //Toggle the mute/unmute button and pause the music.
        muteText.destroy();
        if(mute){
            muteText = game.add.text(600, 20, 'Unmute', { font: '24px Arial', fill: '#000' });
            mute = false;
            music.pause();
        }
        else
        {
            muteText = game.add.text(600, 20, 'Mute', { font: '24px Arial', fill: '#000' });
            mute = true;
            music.resume();
        }
    },

    bulletHitBrick:  function (bullets, bricks) {
        bricks.kill();
        bullets.kill();
        explosion.play();
    },

    gameOver: function(player, lava) {
        console.log("Game over");
        player.kill();
        bazooka.kill();
        game.state.start('gameover');
        music.pause();
    },
};