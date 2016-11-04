define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
    'use strict';
	var that;

	var Lever = my.Class(Sprite, {

		constructor: function(game, polled, context, x, y, key, width, height){
			Lever.Super.apply(this, arguments);
            
            that = this;
            this.Box = that.game.CLASS.Box

            this.anims();
           // this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);
		},
       
        anims: function(){
            this.animations.add('active', 490, 0, 82, 70, [0]);
            this.animations.add('idle', 490, 71, 82, 70, [0]);
            this.animations.playOnce('idle', 7);
        },

        configure: function(options){
           
            this.moveToX = options.moveToX || 0;
            this.moveToY = options.moveToY || 0;
            this.actionObj = options.actionObj;

            this.active = false;
        },

        action: function(options){
            that.game.CLASS[that.actionObj].pnew(that.game, true,'main', 2000, 150, 'mapa');
            setTimeout(function(){
                that.game.VAR.camera.moveToPoint(that.game.VAR.player.x, that.game.VAR.player.y, 15, function(){
                    that.game.VAR.camera.follow(that.game.VAR.player, that.game.width/2, that.game.height/2);
                })
            }, 800)
            
        },

        actived: function(){
            that.game.VAR.camera.moveToPoint(this.moveToX, this.moveToY, 25, function(){
                that.action();
            })
        }
	})

    var superUpdate = Lever.Super.prototype.update;
	
	return Lever;
})