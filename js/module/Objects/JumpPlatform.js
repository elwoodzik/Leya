define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var JumpPlatform = my.Class(Sprite, {

		constructor: function(game, polled, context, x, y, key, width, height){
			JumpPlatform.Super.apply(this, arguments);
            
            that = this;

            this.jump = - (this.body.platformer.meter * 1250);

            this.anims();
            //this.configure();
		},
		
		update: function(dt){
            superUpdate.call(this, dt);
		},
       
        anims: function(){
            this.animations.add('idle', 430, 322, 72, 45, [0]);
            this.animations.add('jump', 430, 222, 72, 85, [0]);
            this.animations.playOnce('idle', 7);
        },

        configure: function(options){
            this.startX = this.x;
            this.startY = this.y;
            this.jump = - (this.body.platformer.meter * options.jump)
        }
	})

    var superUpdate = JumpPlatform.Super.prototype.update;
	
	return JumpPlatform;
})