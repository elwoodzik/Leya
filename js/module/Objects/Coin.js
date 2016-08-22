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

            //that.game.physic.overlap(that.game.VAR.player, this, this.collect);

            if(this.body.immoveable){
                this.body.platformer.collision(dt);
            }

            if(this.body.immoveable){
                that.game.physic.collide(this, that.game.ARR.boxBlocks, function(p, b , dir, oy, ox){
                    if(dir === 'b'){
                        b.y -= oy;
                        p.body.velocity.x = p.body.velocity.x * 0.009;
                    }   
                })
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
        },

        collect: function(player, coin){
           // this.game.poolCoin.free(coin, that.game.ARR.coins);
           coin.pdispose();
        }
	})

    var superUpdate = Coin.Super.prototype.update;
	
	return Coin;
})