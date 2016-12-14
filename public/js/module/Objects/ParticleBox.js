define([
	'Class',
	'lib_module/client/Sprite',
], function(my, Sprite){
    'use strict';
	var that;

	var ParticleBox = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			ParticleBox.Super.apply(this, arguments);
            
            that = this;
            that.game = game;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
			superUpdate.call(this, dt);
            
            if(this.body.immoveable){
                 //this.body.platformer.collision(dt);
                this.body.velocity.x = this.body.platformer.bound(this.body.velocity.x + (dt * this.ddx), -this.maxdx, this.maxdx);
                this.body.velocity.y = this.body.platformer.bound(this.body.velocity.y + (dt * this.ddy), -this.maxdy, this.maxdy);
            }

            this.ddy = this.gravity;
            // if(this.body.immoveable){
            //     that.game.physic.collide(this, that.game.ARR.boxBlocks, function(p, b , dir, oy, ox){
            //         if(dir === 'b'){
            //             b.y -= oy
            //             p.body.velocity.x = p.body.velocity.x * 0.009;
            //         }   
            //     })
            // }
            
            this.alfa -= this.alfaSpeed;
            if(this.alfa <= 0){
                this.destroy();
            }
		},

        draw: function(dt){
            this.game.ctx.globalAlpha = this.alfa;
            superDraw.call(this, dt);
            this.game.ctx.globalAlpha = 1;
        },

        anims: function(){
            this.animations.add('left', 0, 0, 29, 25, [3,2,1,0]);
            this.animations.add('right', 0, 0, 29, 25, [0,1,2,3]);
            this.animations.play('left', 9);
        },

        configure: function(){
            this.body.immoveable = true;
            this.alfa = 1;
            this.alfaSpeed = 0.009;
            this.tile     = 70;              // the size of each tile (in game pixels)
            this.meter    = this.tile;            // abitrary choice for 1m
            this.gravity  = this.meter * 9.8 * 2;    // very exagerated gravity (6x)
            this.maxdx    = 3*70;         // max horizontal speed (20 tiles per second)
            this.maxdy    = 12*70;         // max vertical speed   (60 tiles per second)
            this.ddx = 0;
            this.ddy = 0;  
            this.zIndex = 11;

            
        },

        destroy: function(){
            this.pdispose();
        }
	})

    var superUpdate = ParticleBox.Super.prototype.update;
    var superDraw = ParticleBox.Super.prototype.draw;
	
	return ParticleBox;
})