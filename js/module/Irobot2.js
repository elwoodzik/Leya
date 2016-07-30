define(['Class'], function(my){
	
    var that;
    var player;
    var bg;
    var ground;
    var box;
    var boxes = [];
    
    var watersBlockPlaces = [
        {
            x: 5,
            y: 9 
        },
        {
            x: 6,
            y: 9 
        },
        {
            x: 12,
            y: 9 
        },
        {
            x: 13,
            y: 9 
        },
        {
            x: 29,
            y: 9 
        },
        {
            x: 30,
            y: 9 
        },
        {
            x: 31,
            y: 9 
        }
    ]
    var map;
    var mapTab = [
        'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        'bffffffffffffffffffffffffffffffffffffffb',
        'bfffffffggffffffffffffffffggfffffffffffb',
        'bfffffffffffffffffffggfffffffffffffffffb',
        'bfffffffffffffgggffffffffffffffffgggfffb',
        'bffffgffffffffffffffffffgffffffffffffffb',
        'bfffffffggffffffffffffffffggfffffffffffb',
        'bfffffffffffffffgffffffffffffffffffffffb',
        'bgggcfffgffffffgfffffffgfffffffffffffffb',
        'baaafffgggggffgggggggggggggggfffggggggbb',
    ];
    var mapElements = {
        'f':{x: 12*72, y:4*72, type:'empty', sub_type: 'board'},
        'g':{x:7*72, y:8*72, type:'solid', sub_type: 'board'},
        'w':{x:6*72, y:8*72, type:'solid', sub_type: 'board'},
        'b':{x:0, y:6*72, type:'solid', sub_type: 'board'},
        't':{x:8*72, y:2*72, type:'solid', sub_type: 'board'},
        'a':{x:8*72, y:12*72, type:'solid', sub_type: 'board'},
        'c':{x:8*72, y:8*72, type:'solid', sub_type: 'board'},
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
            bg = that.game.add.image('background', 0, 0, 'bg', 2800, 700);
            that.watersBlock = [];
            that.map = that.game.add.map('main', 'mapa', mapTab, 70,70, false);
            that.map.setElements(mapElements);

            //ground = that.game.add.image('background', 120, 50, 'ground');

            player = that.game.add.sprite('main', 370, 90, 'player3');
            player.animations.add('idle', 0,195, 65, 90, [0]);
            player.animations.add('moveRight', 0, 0, 73, 90, [0,1,2,3,4]);
            player.animations.add('moveLeft', 0, 0, 73, 90, [0,1,2,3,4], true);
            player.animations.play('idle');
           // player.body.gravity.y = 175;
            player.body.colideWorldSide = true;
            player.body.immoveable = true;
            //player.rpgCollision();
            //
            box = that.game.add.sprite('main' , 210, 280, 'mapa');
            box.animations.add('idle', 0, 0, 70, 70, [0]);
            box.animations.play('idle');
            box.body.immoveable = true;
            box.body.colideWorldSide = true;

            for(var i = 0; i < watersBlockPlaces.length; i++){
                var pos = watersBlockPlaces[i];
                that.watersBlock.push(that.game.add.sprite('main', 70*pos.x, 70*pos.y+30, 'mapa'));
                that.watersBlock[that.watersBlock.length-1].animations.add('idle', 5*72, 8*75, 72, 70, [0,1]);
                that.watersBlock[that.watersBlock.length-1].animations.play('idle',8);
                
               // this.watersBlock[this.watersBlock.length-1].body.velocity.x = 200;
            }

           
            for(var i = 0; i < 1; i++){
               boxes.push(that.game.add.sprite('main', 70*2, 70*8, 'mapa'));
               boxes[boxes.length-1].animations.add('idle', 0*72, 9*72, 72, 70, [0]);
               boxes[boxes.length-1].animations.play('idle',7);
               boxes[boxes.length-1].body.velocity.y = -40;
               // this.watersBlock[this.watersBlock.length-1].body.velocity.x = 200;
            }
           

            that.game.add.camera(player);
            that.game.world.setPortView(2800,700)
		},

		update: function(dt){
            if(box.body.immoveable){
                that.game.physic.collide(that.watersBlock, box, function(p, b , dir, oy, ox){
                    b.body.immoveable = false;
                    if(dir === 'b'){
                        b.body.velocity.y = 0;
                        
                    }   
                    console.log('asd')
                })
             }
            that.game.physic.collide(player, box, function(p, b , dir, oy, ox){
                if(dir === 'b'){
                    p.body.falling = false;
                    p.body.jumping = false;
                    if(b.body.immoveable){
                        b.y -= oy;
                    }
                    
                }
            })

            that.game.physic.collide(player, boxes, function(p, b , dir, oy, ox){
                  if(dir === 'b'){
                    p.body.falling = false;
                    p.body.jumping = false;
                   
                  }
                 if(dir === 't'){
                     p.body.velocity.y = oy

                 }
            })
            
            player.body.platformer.move(dt);
            if(box.body.immoveable){
                 box.body.platformer.collision(dt);
            }
          
  
           
            // if(!this.keyboard.hold){
            //     
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