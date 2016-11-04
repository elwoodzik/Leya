define([
	'Class',
	'lib_module/client/Image'
], function(my, Image){
    'use strict';
	var that;

	var Ufo = my.Class(Image, {

        
		constructor: function(game, context, x, y, key, width, height){
			Ufo.Super.apply(this, arguments);
            
            that = this;

            this.configure();
		},
       
        configure: function(){
            this.currentPotions = 2;
            this.startPoint();
            this.zIndex = 4;
        },

        startPoint: function(){
            this.used = true;
            this.moveToPoint(that.game.VAR.player.x+that.game.VAR.player.currentHalfWidth, that.game.VAR.player.y, 30, this.moveToPointCallback);
        },

        moveToPointCallback: function(ufo){
            that.game.VAR.player.used = true;
            that.game.VAR.camera.follow(that.game.VAR.player, that.game.width/2, that.game.height/2);
            ufo.moveToPoint(-530, -50, 40, function(ufo){
                ufo.used = false;
            })
        }

	})

    var superUpdate = Ufo.Super.prototype.update;
	
	return Ufo;
})