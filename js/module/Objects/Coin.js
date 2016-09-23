define([
	'Class',
	'lib_module/client/Sprite',
], function(my, Sprite){
	var that;

	var Coin = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Coin.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
          
            this.Water = that.game.CLASS.Water.getActivePool();
            
            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);

            that.game.physic.overlap(that.game.VAR.player, this, this.collect);

            that.game.physic.overlap(this.Water, this, this.collideWater);

            if(this.body.immoveable){
                this.body.platformer.collision(dt);
            }
		},

        anims: function(){
            this.animations.add('gold', 1.5, 0, 39.5, 38, [0,1,2,3,4,5,6,7,8,9]);
            this.animations.add('silver', 1, 38, 39.5, 38, [0,1,2,3,4,5,6,7,8,9]);
            this.animations.add('bronze', 1.5, 76, 39.5, 38, [0,1,2,3,4,5,6,7,8,9]);
            //this.animations.add('idle', 0, 0, 55, 57, [0,1,2,3,4]);
            this.animations.play('bronze', 4);
        },

        configure: function(){
            this.body.immoveable = true;
            this.body.platformer.configure({
                gravity: 200
            })
            this.zIndex = 5;
        },

        collect: function(player, coin){
            player.score.add(1);
            that.game.sounds.play('coin-take');
            coin.pdispose();
        },

        collideWater: function(water, coin){
            coin.immoveable = false;
            coin.pdispose();
        }
	})

    var superUpdate = Coin.Super.prototype.update;
	
	return Coin;
})