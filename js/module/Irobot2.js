define([
    'Class',
    'module/maps/Maps',
    'module/Levels',
    'module/Objects/Player',
    ], function(my, Maps, Levels, Player){
	
    var that;
    var ground;
    var boxes = [];
    
	var Irobot2 = my.Class(null, Maps, {

		constructor: function(game){
            that = this;
            that.game = game; 
           
            that.game.VAR.player;
		},

		create: function(){
            that.game = this;
            
            // tworzy tlo
            that.game.add.image('main', 0, 0, 'bg', 2800, 700);

            // tworzy mape
            that.map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);

            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            that.map.setElements(that.getElements());

            // tworzy obiekty zdefinoiwane w maps/Maps.js
            that.map.createObjOnMap('main','mapa');

            // tworzy gracza
            that.game.VAR.player = new Player(that.game, 'main', 370, 90, 'player3');

            // dodaje obsluge kamery do gracza
            that.game.add.camera(that.game.VAR.player);
          
            for(var i = 0; i < 1; i++){
               boxes.push(that.game.add.sprite('main', 70*2, 70*8, 'mapa'));
               boxes[boxes.length-1].animations.add('idle', 0*72, 9*72, 72, 70, [0]);
               boxes[boxes.length-1].animations.play('idle',7);
               boxes[boxes.length-1].body.velocity.y = -40;
               // this.watersBlock[this.watersBlock.length-1].body.velocity.x = 200;
            }

            that.game.world.setPortView(2800,700);
		},

		update: function(dt){
            

           

            that.game.physic.collide(that.game.VAR.player, boxes, function(p, b , dir, oy, ox){
                if(dir === 'b'){
                    p.body.falling = false;
                    p.body.jumping = false;
                }
                if(dir === 't'){
                    p.body.velocity.y = oy
                 }
            })
            
            
            // if(box.body.immoveable){
            //      box.body.platformer.collision(dt);
            // }
          
  
           
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
          
            
            
		}
	});

	return Irobot2;

})