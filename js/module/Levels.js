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
			this.createBlockLevels(440, 260, 90, 6, 24);
		},

		update: function(){
			that.game.mouse.trigger(that.lvls,true, function(lvl){
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

            for(var i = 0; i < count; i++){
				lvl = that.game.add.sprite('main', lvl_x, lvl_y, 'levels') 
                
				lvl.animations.add('stars0', 0, 0, 64, 64, [0]);
				lvl.animations.add('stars1', 64, 0, 64, 64, [0]);
				lvl.animations.add('stars2', 64*2, 0, 64, 64, [0]);
				lvl.animations.add('stars3', 64*3, 0, 64, 64, [0]);
				lvl.animations.add('locked', 64*4, 0, 64, 64, [0]);
                
                if(!that.savedLevels){
                    if(i==0){
                        lvl.animations.play('stars0');
                        lvl.playable = true;
                        lvl.lvl = i+1;
                        lvl.stars = 0;
                        lvl.icon = 'stars'+ lvl.stars;
                        that.game.add.text('main', lvl.lvl, lvl_x+5, lvl_y+22, 22, "white", null);
                    }else{
                        lvl.animations.play('locked');
                        lvl.playable = false;
                        lvl.lvl = i+1;
                        lvl.stars = -1;
                        lvl.icon = 'locked';
                    }
                }else{
                    lvl.animations.play(that.savedLevels[i].icon);
                    lvl.playable = that.savedLevels[i].playable;
                    lvl.lvl = i+1;
                    lvl.stars = that.savedLevels[i].stars;
                    lvl.icon = that.savedLevels[i].icon;
                    if(lvl.playable){
                        that.game.add.text('main', that.savedLevels[i].lvl, lvl_x+5, lvl_y+22, 22, "white", null);
                    }
                }

				lvl_x += margin;

				if(i % breaks == 5 ){
					lvl_y+= margin;
					lvl_x = posX;
				}

                that.lvls.push(lvl);

                if(!that.savedLevels){
                    that.savedLevels = this.saveLevelsType({playable: lvl.playable, icon:lvl.icon, lvl: lvl.lvl, stars: lvl.stars});
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