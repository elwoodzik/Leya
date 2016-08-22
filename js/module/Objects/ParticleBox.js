define([
	'Class',
	'lib_module/client/Sprite',
], function(my, Sprite){
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
                 this.body.platformer.collision(dt);
            }

            if(this.body.immoveable){
                that.game.physic.collide(this, that.game.ARR.boxBlocks, function(p, b , dir, oy, ox){
                    if(dir === 'b'){
                        b.y -= oy
                        p.body.velocity.x = p.body.velocity.x * 0.009;
                    }   
                })
            }
            
            this.alfa -= this.alfaSpeed;
            if(this.alfa <= 0){
                that.game.poolParticleBoxDesc.free(this);
            }
		},

        draw: function(dt){
           
            this.game.ctx.globalAlpha = this.alfa;
            superDraw.call(this, dt);
            this.game.ctx.globalAlpha = 1;

            

        },

        anims: function(){
            this.animations.add('idle', 0, 0, 29, 25, [0,1,2,3]);
            this.animations.play('idle', 3);
        },

        configure: function(){
           this.body.immoveable = true;
           this.alfa = 1;
           this.alfaSpeed = 0.015;
           this.body.platformer.configure({
               gravity: 200
           })

           
        },
	})

    var superUpdate = ParticleBox.Super.prototype.update;
    var superDraw = ParticleBox.Super.prototype.draw;
	
	return ParticleBox;
})