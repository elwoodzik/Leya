define([
	'Class',
	'lib_module/client/Sprite',
    'module/Objects/Coin',
    'module/Objects/ParticleBox',
], function(my, Sprite, Coin, ParticleBox){
	var that;

	var BoxDesc = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			BoxDesc.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
            
            this.Coin = that.game.CLASS.Coin.getActivePool();
            
            this.ParticleBox = that.game.CLASS.ParticleBox.getActivePool();


            this.anims();
            this.configure();
		},
		
		// update: function(dt){
		// 	superUpdate.call(this, dt);
		// },

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
        },

        anims: function(){
            this.animations.add('idle', 0*72, 2*72, 70, 70, [0]);
            this.animations.play('idle');
        },

        destroy:function(arr){
            var randCoin = that.game.rand(2,3);
            var randParticle = that.game.rand(3,8);

            for( i=0; i<randCoin; i++){
                randVelocityY = that.game.rand(-580,-100);
                randVelocityX = that.game.rand(-100,200);
                
                var coin = Coin.pnew(that.game, true,'main', this.x, this.y, 'coin');
               
                coin.body.velocity.y = randVelocityY;
                coin.body.velocity.x = randVelocityX;
                coin.body.immoveable = true; 
                coin = null;
            }

            for(var i=0; i<randParticle; i++){
                var randVelocityY = this.game.rand(-730,-350);
                var randVelocityX = this.game.rand(-160,440);
                
                particle = ParticleBox.pnew(that.game, true, 'main', this.x+this.currentHalfWidth, this.y+this.currentHeight, 'particleBox');
                particle.body.platformer.ddy = randVelocityY;
                particle.body.platformer.ddx = randVelocityX;

                if(randVelocityX < 0){
                     particle.animations.play('left', 3);
                }else{
                     particle.animations.play('right', 3);
                }
                particle.body.immoveable = true;
               // this.game.ARR.particleBoxYellow.push(particle);
            }
            this.pdispose();
        },

        configure: function(){

        }
	})

    var superUpdate = BoxDesc.Super.prototype.update;
    var superDestroy = BoxDesc.Super.prototype.destroy;
	
	return BoxDesc;
})