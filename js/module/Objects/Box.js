define([
	'Class',
	'lib_module/client/Sprite',
    'module/Objects/Water',
], function(my, Sprite, Water){
	var that;

	var Box = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Box.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
            this.Water = that.game.CLASS.Water.getActivePool();
            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);

            if(this.body.immoveable){
                this.game.physic.collide(this.Water, this, function(p, b , dir, oy, ox){
                    console.log('a')
                    b.body.immoveable = false;
                    if(dir === 'b'){
                        b.body.velocity.y = 0;
                    }   
                })
            }

            // this.game.physic.collide(this, this.game.ARR.boxBlocks, function(p, b , dir, oy, ox){
            //     if(dir === 'b'){
            //         b.body.velocity.y = oy
            //     }   
            // })

            if(this.body.immoveable){
                 this.body.platformer.collision(dt);
            }
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
            //this.zIndex = 5;
        }
	})

    var superUpdate = Box.Super.prototype.update;
	
	return Box;
})