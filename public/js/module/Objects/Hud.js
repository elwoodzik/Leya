define([
	'Class',
], function(my){
	var that;

	var Hud = my.Class({

		createLifeHud: function(){
            this.life = 3;

            var lifeX = 95; 
            this.game.ARR.playerLifes = [];

            for(var i=0; i<this.life; i++){
                var lifeSprite = this.game.add.sprite('main', lifeX, 20, 'life');
                lifeSprite.animations.add('full', 0,0, 53, 45, [0]);
                lifeSprite.animations.add('empty', 53,0, 53, 45, [0]);
                lifeSprite.animations.playOnce('full');
                lifeSprite.static = true;
                lifeSprite.zIndex = 10;
                lifeX += 60;

                this.game.ARR.playerLifes.push(lifeSprite);
            }
        },

        createPotionIcon: function(){
            var potionIcon; 
            potionIcon = this.game.add.sprite('main', 25, 17, 'hud');
            potionIcon.animations.add('icon', 52,48, 52, 50, [0]);
            potionIcon.animations.playOnce('icon');
            potionIcon.static = true;
            potionIcon.zIndex = 10;
        },

        createPlayerIcon : function(){
            var playerIcon; 
            playerIcon = this.game.add.sprite('main', 25, 17, 'hud');
            playerIcon.animations.add('icon', 52,48, 52, 50, [0]);
            playerIcon.animations.playOnce('icon');
            playerIcon.static = true;
            playerIcon.zIndex = 10;
        },
        
        createScoreHud: function(){
            this.scoreIcon = this.game.add.sprite('main', 350, 20, 'hud');
            this.scoreIcon.animations.add('icon', 55,0, 48, 48, [0]);
            this.scoreIcon.animations.playOnce('icon');
            this.scoreIcon.static = true;
            this.scoreIcon.zIndex = 10;
            this.score = this.game.add.text('main', 0, 420, 63, 60, '#795548', null);
        },

        createKeysIcon : function(){
        	var keys = this.game.CLASS.Keys.getActivePool();
        	var x = this.game.width - 150;
        	var conf = {
        		'red':{sx:190, sy:162, Asx:192 , Asy:77 },
        		'green':{sx:102, sy:36, Asx: 190, Asy:120 },
        		'blue':{sx:149, sy:36, Asx: 144, Asy: 144 },
        		'yellow':{sx:145, sy:80 , Asx: 144, Asy: 188},
        	}
        	
        	this.keysIcon = [];
        	for(var i=0; i<keys.length; i++){
        		if(keys[i]){
        			this.keysIcon[keys[i].state] = this.game.add.sprite('main', x, 25, 'hud');
        			this.keysIcon[keys[i].state].animations.add(keys[i].state, conf[keys[i].state].sx, conf[keys[i].state].sy, 48, 44, [0]);
        			this.keysIcon[keys[i].state].animations.add(keys[i].state+'active', conf[keys[i].state].Asx, conf[keys[i].state].Asy, 48, 44, [0]);
            		this.keysIcon[keys[i].state].animations.playOnce(keys[i].state);
            		this.keysIcon[keys[i].state].static = true;
                    this.keysIcon[keys[i].state].available = false;
            		this.keysIcon[keys[i].state].zIndex = 10;
        			
        			x -= 60;
        		}
        		
        	}
        	
        },
	})

   
	
	return Hud;
})