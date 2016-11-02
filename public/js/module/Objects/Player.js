define([
	'Class',
	'lib_module/client/Sprite',
    'module/Objects/Hud',
    'module/Objects/Coin',
], function(my, Sprite, Hud, Coin){
	var that;

	var Player = my.Class(Sprite, Hud, {

		constructor: function(game, polled, context, x, y, key, width, height){
			Player.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
            this.used = false;

            this.Coin = Coin.getActivePool();
            this.BoxDesc = that.game.CLASS.BoxDesc.getActivePool();
            this.Water = that.game.CLASS.Water.getActivePool();
            this.Box = that.game.CLASS.Box.getActivePool();
            this.Lift = that.game.CLASS.Lift.getActivePool();
            this.JumpPlatform = that.game.CLASS.JumpPlatform.getActivePool();
            this.Lever = that.game.CLASS.Lever.getActivePool();
            this.Keys = that.game.CLASS.Keys.getActivePool();
            this.Switch = that.game.CLASS.Switch.getActivePool();
       
            this.leftPad = {};
            this.rightPad = {};
            this.jumpPad = {};

            this.oClass = 'Player';

            
            // this.pads = [];

            // this.leftPad = that.game.add.sprite('main', 90, that.game.height-140, 'left');
            // this.leftPad.zIndex = 10;
            // this.leftPad.animations.add('idle', 0, 0, 90, 90, [0]);
            // this.leftPad.animations.play('idle')
            // this.leftPad.static = true;

            // this.rightPad = that.game.add.sprite('main', 260, that.game.height-140, 'right');
            // this.rightPad.zIndex = 10;
            // this.rightPad.animations.add('idle', 0, 0, 90, 90, [0]);
            // this.rightPad.animations.play('idle')
            // this.rightPad.static = true;

            // this.jumpPad = that.game.add.sprite('main', that.game.width - 190, that.game.height-140, 'jump');
            // this.jumpPad.zIndex = 10;
            // this.jumpPad.animations.add('idle', 0, 0, 90, 90, [0]);
            // this.jumpPad.animations.play('idle')
            // this.jumpPad.static = true;
            
            // this.pads.push(this.leftPad)
            // this.pads.push(this.rightPad)
            // this.pads.push(this.jumpPad)

            this.startX = x;
            this.startY = y;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
            
            superUpdate.call(this, dt);

   //          that.leftPad.active = false;
   //          that.rightPad.active = false;
   //          that.jumpPad.active = false;
   //          document.getElementById('a').innerHTML = "1 NIE"
   //          document.getElementById('b').innerHTML = "2 NIE"
   //          document.getElementById('c').innerHTML = "3 NIE"

   //          that.game.mouse.touchtrigger(that.pads[0], true, function(pad){
   //              pad.active = true;
   //              document.getElementById('a').innerHTML = "1 Tak"
			// },false);
   //          that.game.mouse.touchtrigger(that.pads[1], true, function(pad){
   //              pad.active = true;
   //              document.getElementById('b').innerHTML = "2 Tak"
   //          },false);
   //           that.game.mouse.touchtrigger(that.pads[2], true, function(pad){
   //              pad.active = true;
   //              document.getElementById('c').innerHTML = "3 Tak"
   //          },false);
            
            that.game.physic.overlap(this, this.Keys, this.collectKeys);

            that.game.physic.overlap(this, this.Lever, this.collideLever);

            that.game.physic.collide(this, this.JumpPlatform, this.collideJumpPlatform);

            that.game.physic.collide(this, this.Box, this.collideMoveBox);

            that.game.physic.collide(this, this.BoxDesc, this.collideDestroyBox);

            that.game.physic.collide(this, this.Lift, this.collideLifts);

            that.game.physic.overlap(this, this.Water, this.overlapWater);

            that.usePotion();

            //that.game.physic.overlap(this, this.Coin, this.overlapWater);

            this.body.platformer.move(dt);
		},

        usePotion: function(){
            if(this.game.keyboard.use['1'].pressed){
                if(that.game.VAR.player.life < 3){
                    that.game.VAR.player.life++;
                    that.game.ARR.playerLifes[that.game.VAR.player.life-1].animations.play('full');
                }  
            }else{
                // dodac odglos
            }
            this.game.keyboard.use['1'].pressed = false;
        },
        

        collectKeys:function(p, k, dir, oy, ox){
            var hudKey = p.keysIcon[k.state];
            hudKey.available = true;
            hudKey.animations.playOnce(k.state+'active');
            hudKey.scaleUp(2, 0.07, function(){
                hudKey.scaleDown(1, 0.07, null)
            })
            k.pdispose();
        },

        collideLever: function(p, l, dir, oy, ox){
            if(this.game.keyboard.use['SPACE'].pressed && !l.active){
         	    l.animations.playOnce('active');
                l.active = true;
                l.actived();
            }
        },

        collideJumpPlatform: function(p, j, dir, oy, ox){
            if(dir === 'b'){
                if(p.body.jumping){
                    p.body.falling = false;
                    p.body.jumping = false;
                    p.body.velocity.y = 0;
                    p.body.platformer.ddy = 0;
                    return;
                }else{
                    p.body.platformer.ddy = j.jump;
                    that.game.sounds.play('jump-platform');
                    j.animations.playOnce('jump', 14 , function(){
                        j.animations.playOnce('idle')
                        j.y = j.startY;
                    });
                    j.y = j.startY -28;
                    return;    
                }
                           
            }
        },

        overlapWater: function(p, w, dir, oy, ox){
            if(p.life > 1 ){
                p.life--;
               	that.game.ARR.playerLifes[p.life].animations.play('empty');
                p.x = p.startX;
                p.y = p.startY;
                p.renderX = p.startX;
                p.renderY = p.startY;
                p.previousX = p.startX;
                p.previousY = p.startY;
                p.used = false;
                that.game.VAR.camera.moveToPoint(p.startX, p.startY, 11, function(){
                    p.body.velocity.y = 0;

                    that.game.VAR['ufo'].startPoint();
                    //that.game.VAR['ufo'].used = true;
                    //
                    // that.game.VAR.ufo.moveToPoint(p.startX, 270, 30, function(u){
                    //     p.used = true;
                    //     that.game.VAR.camera.follow(that, that.game.width/2, that.game.height/2);
                    //     u.moveToPoint(-530, -50, 40, function(u){
                    //         u.used = false
                    //     })
                    // })
                })
            }else{
                that.game.state.start('LevelSelect');
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
            this.createKeysIcon();
            
            // dodaje obsluge kamery do gracza
            that.game.VAR.camera = this.game.add.camera(0, 0, this.game.width, this.game.height, this.game.portViewWidth, this.game.portViewHeight);
            that.game.VAR.camera.follow(this, this.game.width/2, this.game.height/2);

            
        },
	})

    var superUpdate = Player.Super.prototype.update;
	
	return Player;
})