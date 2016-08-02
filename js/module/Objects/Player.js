define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var Player = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Player.Super.apply(this, arguments);
            
            that = this;
            that.game = game;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
			

            this.body.platformer.move(dt);

            that.game.physic.collide(this, that.game.ARR.boxBlocks, function(p, b , dir, oy, ox){
                if(dir === 'b'){
                    p.body.falling = false;
                    p.body.jumping = false;
                    
                    if(b.body.immoveable){
                        b.y -= oy;
                    }                 
                }
            })

            superUpdate.call(this, dt);
		},

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
        },

        anims: function(){
            this.animations.add('idle', 0,195, 65, 90, [0]);
            this.animations.add('moveRight', 0, 0, 73, 90, [0,1,2,3,4]);
            this.animations.add('moveLeft', 0, 0, 73, 90, [0,1,2,3,4], true);
            this.animations.play('idle');
        },

        configure: function(){
            this.body.colideWorldSide = true;
            this.body.immoveable = true;
        }
	})

    var superUpdate = Player.Super.prototype.update;
	
	return Player;
})