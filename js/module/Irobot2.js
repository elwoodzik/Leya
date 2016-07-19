define(['Class'], function(my){
	
    var that;
    var player;
    var map;
    var mapTab = [
        'ffffff',
        'ffffff',
        'ffffff',
        'ffffff',
        'efefee',
        'efefef',
    ];
    var mapElements = {
        'f':{x: 12*72, y:4*72, type:'empty', sub_type: 'board'},
        'e':{x:7*72, y:8*72, type:'solid', sub_type: 'board'},
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

            player = that.game.add.sprite(140, 140, 'player');
            
            player.animations.add('idle', 0, 190, 65, 90, [0]);
            player.animations.add('move', 0, 0, 70,90, [0,1,2,3,4]);
            player.animations.play('idle');

            player.body.gravity.y = 53;

            player.rpgCollision();
		},

		update: function(){
            that.game.keyboard.trigger('D', that.moveLeft);
		},

        moveLeft: function(_player){
            player.x += 3;
        }

	});

	return Irobot2;
})