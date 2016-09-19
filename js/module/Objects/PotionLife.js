define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var Lift = my.Class(Sprite, {

        STATIC:{
            MAX: 0
        },

		constructor: function(game, context, x, y, key, width, height){
			Lift.Super.apply(this, arguments);
            
            that = this;

            

            //this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);

            if(this.game.keyboard.use['1'].pressed){
                this.usePotion();
            }
            console.log('a')
		},

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
        },

        usePotion: function(){
            
        },

        anims: function(){
            this.animations.add('idle', 0*72, 9*72, 72, 70, [0]);
            this.animations.play('idle', 7);
        },

        configure: function(){
            this.currentPotions = 2;
         
        }
	})

    var superUpdate = Lift.Super.prototype.update;
	
	return Lift;
})