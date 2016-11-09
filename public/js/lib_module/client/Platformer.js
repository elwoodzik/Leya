define(['Class'], function(my){
    'use strict';
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
            this.gravity  = options.gravity || 1//this.meter * 9.8 * 4 ;    // very exagerated gravity (6x)
            this.maxdx    = options.maxdx || 3//this.meter * 3 - 30;         // max horizontal speed (20 tiles per second)
            this.maxdy    = options.maxdy || 26//this.meter * 40;         // max vertical speed   (60 tiles per second)
            this.accel    = options.accel || 0.1//this.maxdx / (1 / 3);          // horizontal acceleration -  take 1/2 second to reach maxdx
            this.friction = options.maxdx || 0.7//this.maxdx / (1/6);          // horizontal friction     -  take 1/6 second to stop from maxdx
            this.jump     = options.meter || 19//this.meter * 800;     
              
            this.ddx = 0;
            this.ddy = 0;  
        },

        move: function(dt){
            this.keys();
            this.collision(dt);   
        },

        keys: function(dt){
            this.wasleft  = !this.onplatform ? (this.body.velocity.x < 0) : 0;
            this.wasright = !this.onplatform ? (this.body.velocity.x > 0) : 0;
            this.body.falling  = this.body.falling;

            this.ddx = 0;

            if (this.game.keyboard.use['A'].pressed  || this.game.keyboard.use['left'].pressed || this.sprite.leftPad.active){
                this.ddx = this.ddx - this.accel;     // player wants to go left
                this.sprite.animations.play('moveLeft') 
               
            }else if (this.wasleft){
                this.ddx = this.ddx + this.friction;  // player was going left, but not any more 
                
                this.sprite.animations.playOnce('idle') 

            }else if(this.wasleft === 0){
                 this.sprite.animations.playOnce('idle')   
            }
             if ( this.game.keyboard.use['D'].pressed  || this.game.keyboard.use['right'].pressed || this.sprite.rightPad.active){
                this.ddx = this.ddx + this.accel;
                this.sprite.animations.play('moveRight')   
            }else if (this.wasright){
               // console.log(this.ddx)
                this.ddx = this.ddx - this.friction ;
                this.sprite.animations.playOnce('idle');
            }else if(this.wasright === 0){
                this.sprite.animations.playOnce('idle')   
            }
            if ((this.game.keyboard.use['W'].pressed  || this.game.keyboard.use['up'].pressed || this.sprite.jumpPad.active ) && !this.body.jumping && !this.body.falling) {
                this.ddy = this.ddy - this.jump;     // apply an instantaneous (large) vertical impulse
                this.body.jumping = true;
                this.onplatform = false;
                this.game.sounds.play('player-jump');
            }
        },

        collision: function(dt){
            
            if(this.sprite.used){

                
                this.body.velocity.x = this.bound(this.body.velocity.x + (dt * this.ddx), -this.maxdx, this.maxdx);
                this.body.velocity.y = this.bound(this.body.velocity.y + (dt * this.ddy), -this.maxdy, this.maxdy);
                
                //var toleranceWidth = this.sprite.currentWidth >= 70 ? this.sprite.currentWidth  : this.sprite.currentWidth;

            //    this.checkmove(this.sprite.x, this.sprite.y + this.sprite.currentHeight) // DOWN
            //    this.checkmove(this.sprite.x, this.sprite.y) // TOP
            //    this.checkmove(this.sprite.x, this.sprite.y) // LEFT
                //this.checkmove(this.sprite.x+this.sprite.currentWidth, this.sprite.y) // RIGHT COLLISION


                if ((this.wasleft  && (this.body.velocity.x > 0)) ||
                    (this.wasright && (this.body.velocity.x < 0))) {
                        
                    //this.ddx = 0
                    this.body.velocity.x = 0; 
                }
                
            //     this.ddy = this.body.falling ? this.gravity : 0;
            
            //     this.body.tolerance =  this.sprite.currentHeight > 70 ? (this.sprite.currentHeight - this.tile) : (this.tile - this.sprite.currentHeight);
            //     //this.body.tolerance2 = Math.abs(this.sprite.currentWidth - this.tile);
                
            //     var tx        = this.p2t(this.sprite.x ),
            //         ty        = this.p2t(this.sprite.y + this.body.tolerance+1),
            //         nx        = this.sprite.x % this.tile,         // true if player overlaps right
            //         ny        = this.sprite.y % this.tile,         // true if player overlaps below
            //     // cell      = this.tcell(tx,     ty),
            //         //cellright = this.tcell(tx + 1, ty),
            //         celldown  = this.tcell(tx,     ty + 1),
            //         celldiag  = this.tcell(tx + 1, ty + 1);
            //         // this.game.ctx.fillStyle="red"
            //         // this.game.ctx.fillRect(this.sprite.x, this.sprite.y, 170,170)
                    
            // //console.log(this.checkmove(this.sprite.x, this.sprite.y))
            
            //     if(this.body.velocity.y > 0){
            //         if(this.checkmove(this.sprite.x, this.sprite.y + this.body.tolerance)){
            //             this.body.velocity.y = 0;
                        
            //             this.body.falling = false;   // no longer falling
            //             this.body.jumping = false;
            //             var tol = this.sprite.currentHeight > 70 ? (this.sprite.currentHeight - this.tile - 1) : - (this.tile - this.sprite.currentHeight-1);
                      
            //             this.sprite.y = this.t2p(ty) - tol; 
                        
            //         }
            //     }else if(this.body.velocity.y < 0){
            //         if(this.checkmove(this.sprite.x, this.sprite.y - this.body.tolerance)){
            //             this.sprite.y = this.t2p(ty) + 3
            //             this.body.velocity.y = 0;   

            //         }
            //     }

            var toleranceWidth = this.sprite.currentWidth < 70 ? -this.sprite.currentWidth : 0

                if (this.body.velocity.x > 0 || this.body.pushedRight) {
                
                    if(this.checkmove(this.sprite.x+toleranceWidth, this.sprite.y)){
                        //this.body.pushedLeft = false;
                        this.body.pushedRight = false;
                        this.body.velocity.x = 0;
                        console.log('bb')
                       
                        //this.sprite.x = this.sprite.x - toleranceWidth;
                    }
                }
                else if (this.body.velocity.x < 0 || this.body.pushedLeft) {  
                    if(this.checkmove(this.sprite.x+toleranceWidth, this.sprite.y)){
                        this.body.pushedLeft = false;
                        console.log('aa')
                        this.body.velocity.x = 0;
                        //this.sprite.x = this.sprite.x + toleranceWidth;
                        
                    }
                }
                
                //this.body.falling = ! (celldown.type === 'solid' || (nx && celldiag.type === 'solid'));
            }
                ///this.onplatform = false;
        },

        bound:function(x, min, max) {
            return Math.max(min, Math.min(max, x));
        },

        t2p: function(t){
            return t*this.tile;
        },

        p2t: function(p){
            return Math.floor(p/this.tile);
        },
        
        tcell: function(tx, ty) {
            return this.game.map.b[ty][tx]; 
        },

        checkmove: function(x, y) {
            var floorX = (x/70) >> 0;
            var floorY = (y/70) >> 0;
            var ceilX = ((x/70) + 1 ) >> 0;
            var ceilY = ((y/70) + 1 ) >> 0;
            
            return this.game.map.b[floorY][floorX].type === 'solid' ||
                this.game.map.b[ceilY][floorX].type === 'solid' ||
                this.game.map.b[floorY][ceilX].type === 'solid' ||
                this.game.map.b[ceilY][ceilX].type === 'solid';
            }

    });

    return Platformer;
})
