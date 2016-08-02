define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var Box = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Box.Super.apply(this, arguments);
            
            that = this;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);

            if(this.body.immoveable){
                 this.body.platformer.collision(dt);
            }

            if(this.body.immoveable){
                this.game.physic.collide(this.game.ARR.waterBlocks, this, function(p, b , dir, oy, ox){
                    b.body.immoveable = false;
                    if(dir === 'b'){
                        b.body.velocity.y = 0;
                    }   
                })
            }

            this.game.physic.collide(this, this.game.ARR.boxBlocks, function(p, b , dir, oy, ox){
                 if(dir === 'b'){
                    b.body.velocity.y = oy
                }   
            })
		},

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
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