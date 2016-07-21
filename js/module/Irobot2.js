define(['Class'], function(my){
	
    var that;
    var player;
    var water;
    var map;
    var mapTab = [
        'ffffffffff',
        'ffffffffff',
        'ffffffffff',
        'ffffffffff',
        'ffffffffff',
        'ffffffffff',
        'fggggffggg',
    ];
    var mapElements = {
        'f':{x: 12*72, y:4*72, type:'empty', sub_type: 'board'},
        'g':{x:7*72, y:8*72, type:'solid', sub_type: 'board'},
        'w':{x:6*72, y:8*72, type:'solid', sub_type: 'board'},
        // 'W':{sx:33, sy:33, type:'solid', sub_type: 'board'},
        // 'X':{sx:0, sy:528, type:'solid', sub_type: 'board'},
        // 'box':{sx:126, sy:0, type:'soft', sub_type: 'board', ko_obj : 'Crate'}
    };
       

	var Irobot2 = my.Class({

		constructor: function(){
            that = this;
		},

		create: function(){
            that.game = this;

            map = that.game.add.map('background', 'mapa', mapTab, 70,70, false);
            map.setElements(mapElements);

            player = that.game.add.sprite(130, 130, 'player');
            player.animations.add('idle', 0, 190, 65, 90, [0]);
            player.animations.add('moveRight', 0, 0, 70,90, [0,1,2,3,4]);
            player.animations.add('moveLeft', 0, 0, 70,90, [0,1,2,3,4], true);
            player.animations.play('idle');
            player.body.gravity.y = 175;
            player.body.colideWorldSide = true;
            player.rpgCollision();
            //
            water = that.game.add.sprite(70*5, 70*6+30, 'mapa');
            water.animations.add('idle', 5*72, 8*75, 70, 40, [0,1]);
            water.animations.play('idle', 6);
           
		},

		update: function(){
            player.body.platformerMove.use();
            // if(!this.keyboard.hold){
            //     player.animations.play('idle');
            //     //player.body.velocity.x = 0;
            // }
            //
            
            // if(that.game.keyboard._pressed){

            //     if(that.game.keyboard._pressed['W']){
            //         that.moveUp();
            //     }

            //     if(that.game.keyboard._pressed['D']){
            //         that.moveRight();
            //     }
            //     else if(that.game.keyboard._pressed['A']){
            //         that.moveLeft();
            //     }
            // }
            // else{
            //      player.animations.play('idle');
            // }
            // if(that.game.keyboard._pressed['W']){
            //     player.body.velocity.y = -7;
            // }

            that.game.physic.overLap(player, water, function(){
                that.game.state.start('Irobot2')
            })
            
		},

        moveRight: function(_player){
            player.x += 3;
            player.animations.play('moveRight');
        },

        moveUp: function(_player){
            player.body.velocity.y = -7;
           // player.animations.play('idle');
        },

        moveLeft: function(_player){
            player.x -= 3;
            
        }

	});

	return Irobot2;
})