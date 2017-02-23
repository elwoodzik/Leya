define([
	'Class',
	'lib_module/client/Sprite',
    // 'module/Objects/Water',
], function(my, Sprite){
    'use strict';
	var that;

	var Trap = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Trap.Super.apply(this, arguments);
            
            that = this;
            that.game = game;
          
            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);
            
            that.game.physic.overlap(that.game.VAR.player, this, this.hit);
		},

        hit: function(p, w, dir, oy, ox){
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
                });
            }else{
               // 
                p.life--;
                that.game.ARR.playerLifes[p.life].animations.play('empty');
                p.used = false;
                p.destroy();
                
                var d = new that.game.CLASS.DialogBox(that.game, 'main', 350, 150, 700, 450, '#333', 'white');
                d.configure({
                    main: d.loseMain,
                    headline: {
                        text: 'Przegrałeś!',
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
                        text: 'Powtórz',
                        action: d.repeatButton1
                    }
                })
            }
        },

        anims: function(){
            this.animations.add('three', 346, 36, 70, 34, [0]);
            this.animations.add('two', 346, 36, 48, 34, [0]);
            this.animations.add('one', 346, 36, 24, 34, [0]);
            
            this.animations.play('three');
        },

        configure: function(options){ 
            options = options || {};
            this.body.immoveable = true;
            this.body.colideWorldSide = true;
            this.animations.play(options.animate ? options.animate : 'three');
        }
	})

    var superUpdate = Trap.Super.prototype.update;
	
	return Trap;
})