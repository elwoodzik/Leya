define([
	'Class',
	'lib_module/client/Dialog'
], function(my, Dialog){
    'use strict';
	var that;

	var Dialog = my.Class(Dialog, {

		constructor: function(game, context, x, y, key, width, height){
			Dialog.Super.apply(this, arguments);
            
            that = this;
		},
		
        configure: function(options){
           	superConfig.call(this, options);
            
            
            this.button1.fillStyleHover = '#17b902';
            this.button1.strokeStyleHover = 'black';
            this.button2.fillStyleHover = '#17b902';
            this.button2.strokeStyleHover = 'black';
        },

        loseMain: function(dialog){
            var dx = [dialog.x + 180, dialog.x + 290, dialog.x + 400];
            var dy = [dialog.y + 150, dialog.y + 90, dialog.y + 150];
            var times = [500, 1200, 2000];

            for(var i=0; i<3; i++){
                var star = that.game.add.sprite('main', dx[i], dy[i], 'stars');
                    star.animations.add('full',0,0, 118,108, [0]);
					star.animations.add('empty',0,106, 118,108, [0]);
					star.animations.play('empty');
                    star.static = true;
        
                    dialog.add(star);
            }
        },

        loseButton1: function(button){
            that.close();
            that.game.state.start('Menu');
        },

        repeatButton1: function(button){
            that.close();
            that.game.state.start('Irobot2');
        }
	})

    var superConfig = Dialog.Super.prototype.configure;
	
	return Dialog;
})