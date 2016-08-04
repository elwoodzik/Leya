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
		},

        anims: function(){
            this.animations.add('idle', 0, 0, 37, 38, [0,1,2,3,4]);
            this.animations.play('idle', 5);
        },

        configure: function(){
           
        },

        collect: function(player, coin){
            coin.destroy(that.game.ARR.coins);
        }
	})

    var superUpdate = Coin.Super.prototype.update;
	
	return Coin;
})