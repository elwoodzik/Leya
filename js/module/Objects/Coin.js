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

            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);

            that.game.physic.overlap(that.game.VAR.player, this, this.collect);

            if(this.body.immoveable){
                this.body.platformer.collision(dt);
            }
            
		},

        anims: function(){
            this.animations.add('idle', 0, 0, 55, 57, [0,1,2,3,4]);
            this.animations.play('idle', 5);
        },

        configure: function(){
            this.body.immoveable = true;
            this.body.platformer.configure({
               gravity: 200
            })
            this.zIndex = 5;
        },

        collect: function(player, coin){
           // this.game.poolCoin.free(coin, that.game.ARR.coins);
           player.score.add(1);
            
           coin.pdispose();
        }
	})

    var superUpdate = Coin.Super.prototype.update;
	
	return Coin;
})