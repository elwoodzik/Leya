define([
	'Class',
	'lib_module/client/Sprite',
    'module/Objects/Coin'
], function(my, Sprite, Coin){
	var that;

	var BoxDesc = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			BoxDesc.Super.apply(this, arguments);
            
            that = this;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);
		},

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
        },

        anims: function(){
            this.animations.add('idle', 0*72, 2*72, 70, 70, [0]);
            this.animations.play('idle');
        },

        destroy:function(arr){
            var rand = this.game.rand(3,5);
            
            var i=0;
            

            this.used = false;

            for(var i=0; i<rand; i++){
                randVelocityY = this.game.rand(-580,-100);
                randVelocityX = this.game.rand(-100,200);
                
                var coin = that.game['poolCoin'].get(this.x, this.y)
                // 
                
                coin.body.velocity.y = randVelocityY;
                coin.body.velocity.x = randVelocityX;
                coin.body.immoveable = true; 
                //this.game.ARR['coins'].push(coin);
            }

            this.game.poolBoxDesc.free(this, that.game.ARR.boxDescBlocks);
            

            
            // for(var i=0; i<6; i++){
            //     var randVelocityY = this.game.rand(-730,-600);
            //     var randVelocityX = this.game.rand(-230,400);
            //     var particle = new ParticleBox(this.game ,'main',this.x+this.currentHalfWidth, this.y+this.currentHeight, 'particleBox');
            //     particle.body.velocity.y = randVelocityY;
            //     particle.body.velocity.x = randVelocityX;
            //     particle.body.immoveable = true;
            //     this.game.ARR.particleBoxYellow.push(particle);
            // }
           
            //superDestroy.apply(this, arguments)
        },

        configure: function(){

        }
	})

    var superUpdate = BoxDesc.Super.prototype.update;
    var superDestroy = BoxDesc.Super.prototype.destroy;
	
	return BoxDesc;
})