define([
	'Class',
	'lib_module/client/Image',
    'module/Levels'
], function(my, Image, Levels){
    'use strict';
	var that;

	var Exit = my.Class(Image, Levels, {

		constructor: function(game, context, x, y, key, width, height){
			Exit.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);

            that.game.physic.overlap(that.game.VAR.player, this, this.endLevel);
		},

        configure: function(){
            
           this.startX = this.x;
           this.startY = this.y;
           this.updateOfScreen = false;
        },

        endLevel: function(player, exitDoor){
            if((this.game.VAR.padAction.touchActive || this.game.keyboard.use['SPACE'].pressed)){
                var loadLevels = that.game.loadData('levels');
                var level = loadLevels[Levels.LEVEL-1];
                var levelNext = loadLevels[Levels.LEVEL];

                if(player.life > level.stars){
                    level.stars = player.life ;
                    level.icon = 'stars'+level.stars;
                }

                if(!levelNext.playable){
                    levelNext.icon = 'stars0';
                    levelNext.playable = true;
                }

                that.game.saveData('levels', loadLevels);

                var d = new that.game.CLASS.DialogBox(that.game, 'main', 350, 150, 700, 450, '#333', 'white');
                d.configure({
                    main: d.winMain,
                    headline: {
                        text: 'Wygrałeś!',
                        x: 235,
                        y: 60,
                        color: '#333',
                        size: 45
                    },
                    button1: {
                        text: 'Menu',
                        action: d.loseButton1
                    },
                    button2: {
                        text: 'Dalej',
                        action: d.levelSelect
                    }
                })
                
                //that.game.state.start('Menu');
            }
        }
	})

    var superUpdate = Exit.Super.prototype.update;
	
	return Exit;
})