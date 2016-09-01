define([
	'Class',
	'lib_module/client/Sprite',

], function(my, Sprite, Coin){
	var that;

	var Player = my.Class(Sprite, {

		constructor: function(game, polled, context, x, y, key, width, height){
			Player.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
            this.used = false;

            this.Coin = that.game.CLASS.Coin.getActivePool();
            this.BoxDesc = that.game.CLASS.BoxDesc.getActivePool();
            this.Water = that.game.CLASS.Water.getActivePool();
            this.Box = that.game.CLASS.Box.getActivePool();
            this.Lift = that.game.CLASS.Lift.getActivePool();
            
            this.pads = [];

            this.leftPad = that.game.add.sprite('main', 90, that.game.height-140, 'left');
            this.leftPad.zIndex = 10;
            this.leftPad.animations.add('idle', 0, 0, 90, 90, [0]);
            this.leftPad.animations.play('idle')
            this.leftPad.static = true;

            this.rightPad = that.game.add.sprite('main', 260, that.game.height-140, 'right');
            this.rightPad.zIndex = 10;
            this.rightPad.animations.add('idle', 0, 0, 90, 90, [0]);
            this.rightPad.animations.play('idle')
            this.rightPad.static = true;

            this.jumpPad = that.game.add.sprite('main', that.game.width - 190, that.game.height-140, 'jump');
            this.jumpPad.zIndex = 10;
            this.jumpPad.animations.add('idle', 0, 0, 90, 90, [0]);
            this.jumpPad.animations.play('idle')
            this.jumpPad.static = true;
            
            this.pads.push(this.leftPad)
            this.pads.push(this.rightPad)
            this.pads.push(this.jumpPad)

            this.startX = x;
            this.startY = y;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
            
            superUpdate.call(this, dt);

            that.leftPad.active = false;
            that.rightPad.active = false;
            that.jumpPad.active = false;

            that.game.mouse.touchtrigger(that.pads, true, function(pad){
                pad.active = true;

			},false);


            that.game.physic.collide(this, this.Box, this.collideMoveBox);

            that.game.physic.collide(this, this.BoxDesc, this.collideDestroyBox)

            that.game.physic.collide(this, this.Lift, this.collideLifts);

            that.game.physic.overlap(this, this.Water, this.overlapWater);

            //that.game.physic.overlap(this, this.Coin, this.overlapWater);

            this.body.platformer.move(dt);

            
		},


        overlapWater: function(p, w, dir, oy, ox){
            //p.checkLife();

            if(p.life > 1 ){
                p.life--;
               	that.game.ARR.playerLifes[p.life].animations.play('empty');
                p.x = p.startX;
                p.y = p.startY;
                p.renderX = p.startX;
                p.renderY = p.startY;
                p.used = false;
                that.game.VAR.camera.moveToPoint(p.startX, p.startY, 22, function(){
                    p.body.velocity.y = 0;
                
                    that.game.VAR['ufo'].used = true;
                    //
                    that.game.VAR.ufo.moveToPoint(320, 270, 30, function(u){
                        p.used = true;
                        that.game.VAR.camera.follow(that, that.game.width/2, that.game.height/2);
                        u.moveToPoint(-530, -50, 40, function(u){
                            u.used = false
                        })
                    })
                })
            }else{
                that.game.state.start('Menu');
            }
        },

        collideMoveBox: function(p, b, dir, oy, ox){
            if(dir === 'b'){
                p.body.falling = false;
                p.body.jumping = false;
                
                if(b.body.immoveable){
                    b.y -= oy;
                }                 
            }
        },

        collideDestroyBox: function(p, b, dir, oy, ox){
             if(dir === 'b'){
                p.body.falling = false;
                p.body.jumping = false;
                
                if(b.body.immoveable){
                    b.y -= oy;
                }                 
            }
            if(dir === 't'){
                p.body.velocity.y = p.body.velocity.y/2;
                b.destroy();

            }
            if(dir === 'l'){
                p.body.velocity.x = -p.body.velocity.x/2
            }
        },

        collideLifts: function(p, b, dir, oy, ox){
            if(dir === 'b'){
                p.body.falling = false;
                p.body.jumping = false;
                
                if(this.game.keyboard.use['D'].pressed || this.game.keyboard.use['A'].pressed || this.game.keyboard.use['left'].pressed || this.game.keyboard.use['right'].pressed){
                    p.body.platformer.onplatform = false;
                }else{
                    p.body.velocity.x = b.body.velocity.x ;
                    p.body.platformer.onplatform = true;
                    p.y = b.y - p.currentHeight+2;
                }
                
            }
            if(dir === 't'){
                p.body.velocity.y = p.body.velocity.y/2
            }

            if(dir === 'r'){
                p.body.velocity.x = -p.body.velocity.x/2
            }
        },

        checkLife: function(){
            
           
        },

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
        },

        anims: function(){
            this.animations.add('idle', 0,195, 65, 90, [0]);
            this.animations.add('moveRight', 0, 0, 73, 90, [0,1,2,3,4]);
            this.animations.add('moveLeft', 0, 0, 73, 90, [0,1,2,3,4], true);
            this.animations.play('idle');
        },

        configure: function(){
            this.body.colideWorldSide = true;
            this.body.immoveable = true;
            
            this.zIndex = 6;

            this.createPlayerIcon();
            this.createLifeHud();
            this.createScoreHud();
            
            // dodaje obsluge kamery do gracza

            that.game.VAR.camera = this.game.add.camera(0, 0, this.game.width, this.game.height, this.game.portViewWidth, this.game.portViewHeight);
            that.game.VAR.camera.follow(this, this.game.width/2, this.game.height/2);

            
        },

        createPlayerIcon : function(){
            var playerIcon; 
            playerIcon = that.game.add.sprite('main', 25, 17, 'hud');
            playerIcon.animations.add('icon', 52,48, 52, 50, [0]);
            playerIcon.animations.playOnce('icon');
            playerIcon.static = true;
            playerIcon.zIndex = 10;
        },

        createLifeHud: function(){
            this.life = 3;

            var lifeX = 95; 
            that.game.ARR.playerLifes = [];

            for(var i=0; i<this.life; i++){
                var lifeSprite = that.game.add.sprite('main', lifeX, 20, 'life');
                lifeSprite.animations.add('full', 0,0, 53, 45, [0]);
                lifeSprite.animations.add('empty', 53,0, 53, 45, [0]);
                lifeSprite.animations.playOnce('full');
                lifeSprite.static = true;
                lifeSprite.zIndex = 10;
                lifeX += 60;

                that.game.ARR.playerLifes.push(lifeSprite);
            }
        },

        createScoreHud: function(){
            this.scoreIcon = that.game.add.sprite('main', 350, 20, 'hud');
            this.scoreIcon.animations.add('icon', 55,0, 48, 48, [0]);
            this.scoreIcon.animations.playOnce('icon');
            this.scoreIcon.static = true;
            this.scoreIcon.zIndex = 10;

            // this.scoreimage = that.game.add.sprite('main', 550, 20, 'hud');
            // this.scoreimage.static = true;
            // this.scoreimage.zIndex = 10;
            // this.scoreimage.animations.add('0', 230, 0, 32, 40, [0]);
            // this.scoreimage.animations.add('1', 195,40, 32, 40, [0]);
            // this.scoreimage.animations.add('2', 55,97, 32, 40, [0]);
            // this.scoreimage.animations.add('3', 237, 81, 32, 40, [0]);
            // this.scoreimage.animations.add('4', 237, 121, 32, 40, [0]);
            // this.scoreimage.animations.add('5', 237, 161, 32, 40, [0]);
            // this.scoreimage.animations.add('6', 230, 40, 32, 40, [0]);
            // this.scoreimage.animations.add('7', 225, 203, 34, 40, [0]);
            // this.scoreimage.animations.add('8', 190, 203, 34, 42, [0]);
            // this.scoreimage.animations.add('9', 196, 0, 32, 40, [0]);
            // this.scoreimage.animations.playOnce('0');

            this.score = that.game.add.text('main', 0, 410, 60, 50, '#795548', null);
        }
	})

    var superUpdate = Player.Super.prototype.update;
	
	return Player;
})