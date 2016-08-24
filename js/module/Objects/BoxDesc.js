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
           
            
            var rand = that.game.rand(2,3);
            for( i=0; i<rand; i++){
                randVelocityY = that.game.rand(-580,-100);
                randVelocityX = that.game.rand(-100,200);
                
                var coin = Coin.pnew(that.game, true,'main', this.x, this.y, 'coin');
               
                coin.body.velocity.y = randVelocityY;
                coin.body.velocity.x = randVelocityX;
                coin.body.immoveable = true; 
                coin = null;
            }
            for(var i=0; i<6; i++){
                var randVelocityY = this.game.rand(-730,-650);
                var randVelocityX = this.game.rand(-160,440);
                particle = ParticleBox.pnew(that.game, true, 'main', this.x+this.currentHalfWidth, this.y+this.currentHeight, 'particleBox');
                particle.body.velocity.y = randVelocityY;
                particle.body.velocity.x = randVelocityX;
                particle.body.immoveable = true;
               // this.game.ARR.particleBoxYellow.push(particle);
            }
             this.pdispose();
            // var i=0;
            
            // for(var i =0; i<300; i++){
            //   
               
            // }
            // this.used = false;
        //     var coin;
        

        //    // console.log(this.game.gameObject.length)
        //    for(var i=0; i<6; i++){
        //         var randVelocityY = this.game.rand(-730,-650);
        //         var randVelocityX = this.game.rand(-160,440);
        //         particle = that.poolParticleBoxDesc.get(this.x+this.currentHalfWidth, this.y+this.currentHeight);
        //         particle.body.velocity.y = randVelocityY;
        //         particle.body.velocity.x = randVelocityX;
        //         particle.body.immoveable = true;
        //        // this.game.ARR.particleBoxYellow.push(particle);
        //     }
            //that.game.poolBoxDesc.free(this, that.game.ARR.boxDescBlocks);
            

            
            
           
            //superDestroy.apply(this, arguments)
        },

        configure: function(){

        }
	})

    var superUpdate = BoxDesc.Super.prototype.update;
    var superDestroy = BoxDesc.Super.prototype.destroy;
	
	return BoxDesc;
})