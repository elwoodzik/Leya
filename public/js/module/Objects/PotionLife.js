define([
	'Class',
	'lib_module/client/Image'
], function(my, Image){
    'use strict';
	var that;

	var PotionLife = my.Class(Image, {

        STATIC:{
            MAX: 0
        },

		constructor: function(game, context, x, y, key, width, height){
			PotionLife.Super.apply(this, arguments);
            
            that = this;
            that.game = game;

            //this.anims();
            this.configure();
		},
	
        anims: function(){
            this.animations.add('idle', 0*72, 9*72, 72, 70, [0]);
            this.animations.play('idle', 7);
        },

        configure: function(){
            this.currentPotions = 2;
        }
	})

    
	
	return PotionLife;
})