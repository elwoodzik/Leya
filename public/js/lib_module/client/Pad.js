define(['Class','Sprite'], function(my, Sprite){
	
    var that;

	var Pad = my.Class(Sprite, {
		
		constructor: function(game, context, x, y, key, width, height){
            Pad.Super.apply(this, arguments);
            
            this.active = false;
		},

        update: function(dt){
			that.game.mouse.trigger(this, function(pad){
                pad.active = true;
			},true);
		},

        anims: function(){
            this.animations.add('idle', 0, 0, 55, 57, [0,1,2,3,4]);
            this.animations.play('idle', 5);
        },

        configure: function(){
           
        },
	});

   

	return Pad;
});