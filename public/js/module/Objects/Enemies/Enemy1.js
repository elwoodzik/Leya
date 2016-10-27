define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var Enemy1 = my.Class(Sprite, {

		constructor: function(game, polled, context, x, y, key, width, height){
			Enemy1.Super.apply(this, arguments);
            
            that = this;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
            superUpdate.call(this, dt);
            if(this.body.velocity.x < 0){
                this.animations.play('moveLeft', 12);
            }else{
                this.animations.play('moveRight', 12);
            }
            // this.body.platformer.ddx = 0;
            // this.body.platformer.ddx = this.body.platformer.ddx - 5;
          
           // this.body.platformer.collision(dt);
           if(this.used){
                this.body.velocity.x = this.body.platformer.bound(this.body.velocity.x + (dt * this.body.platformer.ddx), -this.body.platformer.maxdx, this.body.platformer.maxdx);
                this.body.velocity.y = this.body.platformer.bound(this.body.velocity.y + (dt * this.body.platformer.ddy), -this.body.platformer.maxdy, this.body.platformer.maxdy);
                
                this.body.platformer.ddy = this.body.falling ? this.body.platformer.gravity : 0;
            
                this.body.tolerance = this.currentHeight - this.body.platformer.tile;
                
                var tx        = this.body.platformer.p2t(this.x ),
                    ty        = this.body.platformer.p2t(this.y + this.body.tolerance+1)  ,
                    nx        = this.x % this.body.platformer.tile,         // true if player overlaps right
                   
                    celldown  = this.body.platformer.tcell(tx,     ty + 1),
                    celldiag  = this.body.platformer.tcell(tx + 1, ty + 1);

            
                if(this.body.velocity.y > 0){
                    if(this.body.platformer.checkmove(this.x, this.y + this.body.tolerance)){
                        this.body.velocity.y = 0;
                        this.body.falling = false;   // no longer falling
                        this.body.jumping = false;
                        this.y = this.body.platformer.t2p(ty) - this.body.tolerance-1;
                        
                    }
                }
                this.body.falling = ! (celldown.type === 'solid' || (nx && celldiag.type === 'solid'));
            }
		},

       
        anims: function(){
            this.animations.add('moveLeft', 0, 124, 50, 28, [0, 1]);
            this.animations.add('moveRight', 0, 124, 50, 28, [0, 1], true);
            this.animations.add('jump', 430, 222, 72, 85, [0]);
            this.animations.play('moveLeft', 12);
            // this.animations.add('moveRight', 0, 0, 73, 90, [0,1,2,3,4]);
            // this.animations.play('moveRight');
        },

        configure: function(arrMethod){
            this.startX = this.x;
            this.startY = this.y;
            //this.body.velocity.x = -55
            //this.thereAndBack(200, 'left', 160);
        }
	})

    var superUpdate = Enemy1.Super.prototype.update;
	
	return Enemy1;
})