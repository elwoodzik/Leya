define(['Class'], function(my){
    
    var Platformer = my.Class({
        
        constructor: function(body, sprite){
            this.body = body;
            this.game = body.game;
            this.sprite = body.sprite;
            

            this.configure({});

        },

        configure: function(options){
            this.tile     = options.tile || 70;              // the size of each tile (in game pixels)
            this.meter    = this.tile;            // abitrary choice for 1m
            this.gravity  = options.gravity || this.meter * 9.8 * 5 ;    // very exagerated gravity (6x)
            this.maxdx    = options.maxdx || this.meter * 4;         // max horizontal speed (20 tiles per second)
            this.maxdy    = options.maxdy || this.meter * 40;         // max vertical speed   (60 tiles per second)
            this.accel    = options.accel || this.maxdx * 3;          // horizontal acceleration -  take 1/2 second to reach maxdx
            this.friction = options.maxdx || this.maxdx * 136;          // horizontal friction     -  take 1/6 second to stop from maxdx
            this.jump     = options.meter || this.meter * 1000;     
              
            this.ddx = 0;
            this.ddy = 0;  
        },

        move: function(dt){
             
            
            this.keys();
            
            

           this.collision(dt);   
           
        },

        keys: function(dt){
            this.wasleft  = this.ddx < 0;
            this.wasright = this.ddx > 0;
            this.body.falling  = this.body.falling;

            if (this.game.keyboard._pressed['A'] || this.game.keyboard._pressed['left']){
                this.ddx = this.ddx - this.accel;     // player wants to go left
                this.sprite.animations.play('moveLeft')   
            }else if (this.wasleft){
                this.ddx = this.ddx + this.friction;  // player was going left, but not any more 
                this.sprite.animations.play('idle')   
            }
            if ( this.game.keyboard._pressed['D'] || this.game.keyboard._pressed['right']){
                this.ddx = this.ddx + this.accel;
                this.sprite.animations.play('moveRight')   
            }else if (this.wasright){
                this.ddx = this.ddx - this.friction ;
                this.sprite.animations.play('idle');
            }
            if ((this.game.keyboard._pressed['SPACE'] || this.game.keyboard._pressed['up'] )&& !this.body.jumping && !this.body.falling) {
                this.ddy = this.ddy - this.jump;     // apply an instantaneous (large) vertical impulse
                this.body.jumping = true;
            }

          
        },

        collision: function(dt){
            this.body.velocity.x = this.bound(this.body.velocity.x + (dt * this.ddx), -this.maxdx, this.maxdx);
            this.body.velocity.y = this.bound(this.body.velocity.y + (dt * this.ddy), -this.maxdy, this.maxdy);

            if ((this.wasleft  && (this.body.velocity.x > 0)) ||
                (this.wasright && (this.body.velocity.x < 0))) {
                   this.body.velocity.x = 0; 
            }
          
            this.ddy = this.body.falling ? this.gravity : 0 ;

            
            this.body.tolerance = this.sprite.currentHeight - this.game.map.currentHeight;
            this.body.tolerance2 = Math.abs(this.sprite.currentWidth - this.game.map.currentWidth);
            

            var tx        = this.p2t(this.sprite.x ),
                ty        = this.p2t(this.sprite.y + this.body.tolerance)  ,
                nx        = this.sprite.x % this.tile,         // true if player overlaps right
                ny        = this.sprite.y % this.tile,         // true if player overlaps below
                cell      = this.tcell(tx,     ty),
                cellright = this.tcell(tx + 1, ty),
                celldown  = this.tcell(tx,     ty + 1),
                celldiag  = this.tcell(tx + 1, ty + 1);
                // this.game.ctx.fillStyle="red"
                // this.game.ctx.fillRect(this.sprite.x, this.sprite.y, 170,170)
                
           //console.log(this.checkmove(this.sprite.x, this.sprite.y))
           
            if(this.body.velocity.y > 0){
                if(this.checkmove(this.sprite.x, this.sprite.y + this.body.tolerance)){
                    this.body.velocity.y = 0;
                    this.body.falling = false;   // no longer falling
                    this.body.jumping = false;
                    this.sprite.y = this.t2p(ty) - this.body.tolerance-1;
                   
                }
            }else if(this.body.velocity.y < 0){
                if(this.checkmove(this.sprite.x, this.sprite.y - this.body.tolerance)){
                    this.sprite.y = this.t2p(ty) 
                     this.body.velocity.y = 0;   
                     console.log('down')
                }
            }
            if (this.body.velocity.x > 0 || this.body.pushedRight) {
                if(this.checkmove(this.sprite.x +1, this.sprite.y)){
                     //this.body.pushedLeft = false;
                      this.body.pushedRight = false;
                    this.body.velocity.x = 0;
                    console.log('z')
                   this.sprite.x = this.t2p(tx);
                }
            }else if (this.body.velocity.x < 0 | this.body.pushedLeft) {  
                if(this.checkmove(this.sprite.x-5, this.sprite.y)){
                    this.body.pushedLeft = false;
                    console.log('sasssss')
                  
                    this.body.velocity.x = 0;
                    this.sprite.x = this.sprite.x + 5;
                }
            }
           

           
               
                // if(this.body.velocity.y > 0){
                //     if ((celldown.type === 'solid' && cell.type != 'solid') || (celldiag.type === 'solid'  && cellright.type != 'solid' && nx)) {
                //         this.sprite.y = this.t2p(ty)  - this.body.tolerance;
                        
                        
                //         this.body.velocity.y = 0;
                        
                //         this.body.falling = false;   // no longer falling
                //         this.body.jumping = false;
                //         ny = 0;
                        
                //     }
                // }

                // else if (this.body.velocity.y < 0) {
                //     ty = this.p2t(this.sprite.y - this.body.tolerance) 
                    
                //     cell      = this.tcell(tx,     ty);
                //     cellright = this.tcell(tx + 1, ty);
                //     celldown  = this.tcell(tx,     ty + 1);
                //     celldiag  = this.tcell(tx + 1, ty + 1);
                //     if ((cell.type === 'solid' && celldown.type != 'solid' ) || (cellright.type === 'solid' && celldiag.type != 'solid' && nx)) {
                //         this.sprite.y = this.t2p(ty + 1) + this.body.tolerance ;   // clamp the y position to avoid jumping into platform above
                //         this.body.velocity.y = 0;            // stop upward velocity
                //         cell      = celldown;     // player is no longer really in that cell, we clamped them to the cell below 
                //         cellright = celldiag;     // (ditto)
                //         ny        = 0; 
                //      }
                // }
                // if (this.body.velocity.x > 0 || this.body.pushedRight) {
                //     if(cellright.type === 'solid' && cell.type != 'solid' || celldiag.type === 'solid'  && celldown.type != 'solid' && ny){
                //         this.body.pushedRight = false;
                //         this.sprite.x = this.t2p(tx);
                //         this.body.velocity.x = 0;
                        
                //     }
                // }else if (this.body.velocity.x < 0 || this.body.pushedLeft) {
                  
                //     if(cell.type === 'solid' && cellright.type != 'solid' || celldown.type === 'solid' && celldiag.type != 'solid' && ny){
                //         this.body.pushedLeft = false;
                //         this.sprite.x = this.t2p(tx+1);
                        
                //         this.body.velocity.x = 0;
                        
                //     }
                // }
                
                this.body.falling = ! (celldown.type === 'solid' || (nx && celldiag.type === 'solid'));
                //console.log(this.body.falling)
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

         checkmove: function(x, y) {
          var floorX = (x/70) >> 0;
          var floorY = (y/70) >> 0;
          var ceilX = ((x/70) + 1 - Number.EPSILON) >> 0;
          var ceilY = ((y/70) + 1 - Number.EPSILON) >> 0;


          return this.game.map.b[floorY][floorX].type === 'solid' ||
              this.game.map.b[ceilY][floorX].type === 'solid' ||
              this.game.map.b[floorY][ceilX].type === 'solid' ||
              this.game.map.b[ceilY][ceilX].type === 'solid';
        }

    });

    return Platformer;
})