define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var Water = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Water.Super.apply(this, arguments);
            
            that = this;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
            superUpdate.call(this, dt);
		},

        anims: function(){
            this.animations.add('idle', 5*72, 8*75, 72, 70, [0,1]);
            this.animations.play('idle',6);
        },

        configure: function(){
            this.zIndex = 8;
        }
	})

    var superUpdate = Water.Super.prototype.update;
	
	return Water;
})