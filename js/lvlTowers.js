var lvlTowers = {

    initBricks:  function() {

        brickInfo = {
            width: 27,
            height: 27,
            count: {
                row: 4,
                col: 9
            },
            offset: {
                top: 228,
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
                row: 4,
                col: 9
            },
            offset: {
                top: 228,
                left: 660
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

    killBricks: function(){
        bricks.destroy();
    },
};