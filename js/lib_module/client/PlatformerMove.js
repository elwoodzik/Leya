define(['Class'], function(my){
    
    var PlatformerMove = my.Class({
        
        constructor: function(body, sprite){
            this.body = body;
            this.game = body.game;
            this.sprite = body.sprite;
            

            this.configure({});

        },

        configure: function(options){
            this.tile     = options.tile || 115;              // the size of each tile (in game pixels)
            this.meter    = this.tile/100;            // abitrary choice for 1m
            this.gravity  = options.gravity || this.meter ;    // very exagerated gravity (6x)
            this.maxdx    = options.maxdx || this.meter * 6;         // max horizontal speed (20 tiles per second)
            this.maxdy    = options.maxdy || this.meter * 60;         // max vertical speed   (60 tiles per second)
            this.accel    = options.accel || 0.1;          // horizontal acceleration -  take 1/2 second to reach maxdx
            this.friction = options.maxdx || 2;          // horizontal friction     -  take 1/6 second to stop from maxdx
            this.jump     = options.meter || 17;     
              
            this.ddy = 0;  
        },

        use: function(){
             
            var wasleft  = this.ddx < 0,
                wasright = this.ddx > 0,
                falling  = this.body.falling;
           
                this.ddx = 0;
                this.ddy = this.gravity;
       
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
            
            if (this.game.keyboard._pressed['SPACE'] && !this.body.jumping && !falling) {
                this.ddy = this.ddy - this.jump;     // apply an instantaneous (large) vertical impulse
                this.body.jumping = true;
            }

            this.body.velocity.x = this.bound(this.body.velocity.x + (this.ddx), -this.maxdx, this.maxdx);
            this.body.velocity.y = this.bound(this.body.velocity.y + (this.ddy), -this.maxdy, this.maxdy);

            if ((wasleft  && (this.body.velocity.x > 0)) ||
                (wasright && (this.body.velocity.x < 0))) {
                   this.body.velocity.x = 0; 
                   this.ddx = 0;// clamp at zero to prevent friction from making us jiggle side to side
            }

            this.collision();   
           
        },

        collision: function(){
            var tolerance = this.sprite.currentHeight - this.game.map.currentHeight;
            var tolerance2 = this.sprite.currentWidth - this.game.map.currentWidth;
            
            var tx        = this.p2t(this.sprite.x),
                ty        = this.p2t(this.sprite.y),
                nx        = this.sprite.x % 70,         // true if player overlaps right
                ny        = this.sprite.y % 70,         // true if player overlaps below
                cell      = this.tcell(tx,     ty),
                cellright = this.tcell(tx + 1, ty),
                celldown  = this.tcell(tx,     ty + 1),
                celldiag  = this.tcell(tx + 1, ty + 1);
                // this.game.ctx.fillStyle="red"
                // this.game.ctx.fillRect(this.sprite.x, this.sprite.y, 170,170)
                
                if(this.body.velocity.y > 0){
                    if ((celldown.type === 'solid' && cell.type != 'solid') || (celldiag.type === 'solid'  && cellright.type != 'solid' && nx)) {
                        this.sprite.y = this.t2p(ty);
                        
                        this.body.velocity.y = 0;
                         
                        this.body.falling = false;   // no longer falling
                        this.body.jumping = false;
                        ny = 0;
                    }
                }
                if (this.body.velocity.y < 0) {
                    if ((cell.type === 'solid' && celldown.type != 'solid' ) || (cellright.type === 'solid' && celldiag.type != 'solid' && nx)) {
                        this.sprite.y = this.t2p(ty + 1) ;   // clamp the y position to avoid jumping into platform above
                        this.body.velocity.y = 0;            // stop upward velocity
                        cell      = celldown;     // player is no longer really in that cell, we clamped them to the cell below 
                        cellright = celldiag;     // (ditto)
                        ny        = 0; 
                     }
                }
                if (this.body.velocity.x > 0) {
                    if(cellright.type === 'solid' && cell.type != 'solid' || celldiag.type === 'solid'  && celldown.type != 'solid' && ny){
                        this.sprite.x = this.t2p(tx);
                        this.body.velocity.x = 0;
                    }
                }else if (this.body.velocity.x < 0) {
                    if(cell.type === 'solid' && cellright.type != 'solid' || celldown.type === 'solid' && celldiag.type != 'solid' && ny){
                        this.sprite.x = this.t2p(tx+1);
                        this.body.velocity.x = 0;
                    }
                }
                
                this.body.falling = ! (celldown.type === 'solid' || (nx && celldiag.type === 'solid'));
               // console.log(this.body.falling)
        },

        bound:function(x, min, max) {
            return Math.max(min, Math.min(max, x));
        },

        t2p: function(t){
            return t*this.game.map.currentWidth;
        },

        p2t: function(p){
            return Math.floor(p/this.game.map.currentWidth);
        },
        
        tcell: function(tx, ty) {
            return this.game.map.b[ty][tx]; 
        },

    });

    return PlatformerMove;
})
