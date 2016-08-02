define(['Class'], function(my){
	var that;

	var Levels = my.Class({
        
        STATIC: {
            LEVEL: 0
        },
		
        constructor: function(game){
			that = this;
            that.game = game;
            that.lvls = [];
            that.savedLevels = that.game.loadData('levels');

            this.create();
		},
		
		create: function(){
			this.createBlockLevels(250, 150, 90, 6, 24);
		},

		update: function(){
			that.game.mouse.trigger(that.lvls, function(lvl){
                if(lvl.playable){
                    Levels.LEVEL = lvl.lvl;
                    that.game.state.start('Irobot2')
                }
				
			},true);
		},

        createBlockLevels: function(posX, posY, margin, breaks, count){
            var lvl_x = posX;
			var lvl_y = posY;
            var lvl;

            that.game.removeData('levels');

            for(var i = 1; i <= count; i++){
				lvl = that.game.add.sprite('main', lvl_x, lvl_y, 'levels') 
                
				lvl.animations.add('stars0', 0, 0, 64, 64, [0]);
				lvl.animations.add('stars1', 64, 0, 64, 64, [0]);
				lvl.animations.add('stars2', 64*2, 0, 64, 64, [0]);
				lvl.animations.add('stars3', 64*3, 0, 64, 64, [0]);
				lvl.animations.add('locked', 64*4, 0, 64, 64, [0]);
                if(i==1){
                    lvl.animations.play('stars0');
                    lvl.playable = true;
                    lvl.lvl = i;
                    lvl.icon = 'stars0';
                    that.game.add.text('main', i, lvl_x+5, lvl_y+22, 22, "black", null);
                }else{
                    lvl.animations.play('locked');
               	    lvl.playable = false;
                    lvl.lvl = i;
                    lvl.icon = 'locked';
                }

				

				lvl_x += margin;

				if(i % breaks == 0 ){
					lvl_y+= margin;
					lvl_x = posX;
				}

                that.lvls.push(lvl);

                if(!that.savedLevels){
                    that.savedLevels = this.saveLevelsType({playable: lvl.playable, icon:lvl.icon, lvl: lvl.lvl});
                }
			}
           // this.setPlayableLevels();
        },

        saveLevelsType: function(data){
            that.game.saveDataAd('levels', data)
        },

        setPlayableLevels: function(){
            var levelType = that.game.loadData('levels');

            for(var i = 0; i < levelType.length; i++){
                 that.lvls[i].animations.play(levelType[i])
            }
        }
	})
	
	return Levels;
})