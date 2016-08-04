define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
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

        configure: function(){

        }
	})

    var superUpdate = BoxDesc.Super.prototype.update;
	
	return BoxDesc;
})