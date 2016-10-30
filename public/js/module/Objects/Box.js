define([
	'Class',
	'lib_module/client/Sprite',
    // 'module/Objects/Water',
], function(my, Sprite){
	var that;

	var Box = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Box.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
            this.Water = that.game.CLASS.Water.getActivePool();
            this.Box = that.game.CLASS.Box.getActivePool();
            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);
            
            if(this.body.immoveable){
                 this.body.platformer.collision(dt);
            }
            if(this.body.immoveable){
                this.game.physic.collide(this.Water, this, this.waterCollide);
            }
            
            this.game.physic.collide(this.Box, this, this.boxCollide);
		},

        boxCollide: function(p, b , dir, oy, ox){
            if(dir === 'b'){
                p.y -= oy;
                p.body.immoveable = true;
            }
            if(dir === 't'){
                b.y += oy;
                b.body.immoveable = false;
            }
        },

        waterCollide: function(p, b , dir, oy, ox){
            b.body.immoveable = false;
            
            if(dir === 'b'){
                b.body.velocity.y = 0;
            }   
        },

        anims: function(){
            this.animations.add('idle', 0, 0, 70, 70, [0]);
            this.animations.play('idle');
        },

        configure: function(){
           
            this.body.immoveable = true;
            this.body.colideWorldSide = true;
           
        }
	})

    var superUpdate = Box.Super.prototype.update;
	
	return Box;
})