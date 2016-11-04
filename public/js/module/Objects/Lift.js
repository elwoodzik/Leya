define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
    'use strict';
	var that;

	var Lift = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Lift.Super.apply(this, arguments);
            
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
            this.animations.add('idle', 0*72, 9*72, 72, 70, [0]);
            this.animations.play('idle', 7);
        },

        configure: function(){
            
          // this.body.velocity.y = -40;
        }
	})

    var superUpdate = Lift.Super.prototype.update;
	
	return Lift;
})