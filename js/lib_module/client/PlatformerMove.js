define(['Class'], function(my){
    
    var PlatformerMove = my.Class({
        
        constructor: function(body, sprite){
            this.body = body;
            this.game = body.game;
            this.sprite = body.sprite;
            

            this.configure({});

        },

        configure: function(options){
            this.tile     = options.tile || 70;              // the size of each tile (in game pixels)
            this.meter    = this.tile/100;            // abitrary choice for 1m
            this.gravity  = options.gravity || this.meter ;    // very exagerated gravity (6x)
            this.maxdx    = options.maxdx || this.meter * 6;         // max horizontal speed (20 tiles per second)
            this.maxdy    = options.maxdy || this.meter * 60;         // max vertical speed   (60 tiles per second)
            this.accel    = options.accel || 0.1;          // horizontal acceleration -  take 1/2 second to reach maxdx
            this.friction = options.maxdx || 2;          // horizontal friction     -  take 1/6 second to stop from maxdx
            this.jump     = options.meter || 20;     
              
            this.ddy = 0;  
        },

        use: function(){
            var wasleft  = this.ddx < 0,
                wasright = this.ddx > 0;
                falling  = this.sprite.falling
                this.ddy = this.gravity;
this.ddx = 0;

            if (this.game.keyboard._pressed['A']){
                this.ddx = this.ddx - this.accel;     // player wants to go left
            }
            else if (wasleft){
                this.ddx = this.ddx + this.friction;  // player was going left, but not any more 
            }

            if ( this.game.keyboard._pressed['D']){
                this.ddx = this.ddx + this.accel;  
            }else if (wasright){
                this.ddx = this.ddx - this.friction ;
            }
            
            if (this.game.keyboard._pressed['SPACE'] && !this.sprite.jumping && !falling) {
                this.ddy = this.ddy - this.jump;     // apply an instantaneous (large) vertical impulse
                //this.sprite.jumping = true;
            }

            

            
            this.body.velocity.x = this.bound(this.body.velocity.x + (this.ddx), -this.maxdx, this.maxdx);
            this.body.velocity.y = this.bound(this.body.velocity.y + (this.ddy), -this.maxdy, this.maxdy);

            if ((wasleft  && (this.body.velocity.x > 0)) ||
                (wasright && (this.body.velocity.x < 0))) {
                   this.body.velocity.x = 0; 
                   this.ddx = 0;// clamp at zero to prevent friction from making us jiggle side to side
            }
               
        },

        bound:function(x, min, max) {
            return Math.max(min, Math.min(max, x));
        }

    });

    return PlatformerMove;
})
