define(['Class', 'require', 'lib_module/client/Body', 'lib_module/client/GameAnimationFactory', 'lib_module/client/Map','lib_module/client/_ObjectSettings'], function(my, require, Body, GameAnimationFactory, Map, Settings){
   'use strict';
   var id = 0; 
   var Sprite = my.Class(null, Settings, {
        constructor: function(game, pooled, context, x, y, key, width, height){
            
            this.initializeGlobalSettings({
				game: game,
				pooled: pooled || false,
				context: context || 'main',
				x: x || 1,
				y: y || 1,
				key: key || null,
				width: width,
				height: height 
			});

            this.type = 'sprite';
            this.zIndex = 3;

            this.state = 'static';
            
            this.states =  {
                'static': {sx:0, sy:0, fW:this.currentWidth, fH:this.currentHeight, f:[0]}
            };
            
            this.animations = new GameAnimationFactory(this);
            
            this.body = new Body(this.game, this);

            this.useRpgCollision = false;

            this.body.tolerance = 0;

            this.current_f = 0;
            this.change_f_delay = 0;
            this.f_max_delay = 4;
            this.playCallbackDellayCurrent = 0;
        },

        draw: function(dt){
            if (this.previousX) { 
                this.renderX = (this.x - this.previousX) * dt + this.previousX //this.x + (this.body.velocity.x * dt);                 
            } else {
                this.renderX = this.x;
            }
            if (this.previousY) {
                this.renderY = (this.y - this.previousY) * dt + this.previousY  //this.y + (this.body.velocity.y * dt);
            } else {
                this.renderY = this.y;
            }
            
            if(this.states[this.state].flip){
                this.game.ctx.save();
                this.game.ctx.scale(-1,1);
            }
            this.game.ctx.drawImage(
               this.image,
               this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.states[this.state].fW,
               this.states[this.state].sy,
               this.states[this.state].fW,
               this.states[this.state].fH,
               Math.floor(this.states[this.state].flip ? (-this.states[this.state].fW-this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX  - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
               Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
               this.states[this.state].fW * this.scale,
               this.states[this.state].fH * this.scale 
            )

            if(this.states[this.state].flip){
                this.game.ctx.restore();
            }

            if(this.useRpgCollision){
                this.rowAndColumn();
            }
            this.frameUpdate();

        },
        redraw: function(dt){

           if (this.previousX) {
                this.renderX = this.x + (this.body.velocity.x * dt);
            } else {
                this.renderX = this.x;
            }
            if (this.previousY) {
                this.renderY = this.y + (this.body.velocity.y * dt);
            } else {
                this.renderY = this.y;
            }
            
            if(this.states[this.state].flip){
                this.game.ctx.save();
                this.game.ctx.scale(-1,1);
            }

            //this.context.clearRect(this.renderX, this.renderY, this.image.width, this.image.height);
            this.frameUpdate();

            this.context.drawImage(
               this.image,
               this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.states[this.state].fW,
               this.states[this.state].sy,
               this.states[this.state].fW,
               this.states[this.state].fH,
               Math.floor(this.states[this.state].flip ? (-this.states[this.state].fW-this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX  - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
               Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
               this.states[this.state].fW * this.scale,
               this.states[this.state].fH * this.scale
            )

            if(this.states[this.state].flip){
                this.game.ctx.restore();
            }

            if(this.useRpgCollision){
                this.rowAndColumn();
            }
            //this.frameUpdate();
        },

        update: function(dt){
            //this.body.useGravity(this);
            this.worldBounce();
            this.moveToPointHandler();
            this.useThereAndBack();
            this.scaleUpDownHandler();
            this.doInTimeHandler();
            
            if(this.body.velocity.x != 0 || this.body.velocity.y != 0){
                this.x =  Math.floor(this.x  + (dt * this.body.velocity.x));
                this.y =  Math.floor(this.y  + (dt * this.body.velocity.y));
            }
        },

        frameUpdate: function(){
            if(!this.once){
                if(this.change_f_delay<this.f_max_delay){
                    this.change_f_delay++;
                }else{
                    this.change_f_delay = 0;
                    this.current_f = this.current_f+1>=this.states[this.state].f.length ? 0 : this.current_f+1;

                    if(this.current_f === this.states[this.state].f.length-1 && typeof this.playCallback === 'function'){
                        this.playCallbackDellayCurrent++;
                        if(this.playCallbackDellay === this.playCallbackDellayCurrent){
                            this.playCallbackDellayCurrent = 0;
                            this.playCallback.call(this.game, this);
                        }  
                    }
                }
            }else{
                if(this.change_f_delay<this.f_max_delay){
                    this.change_f_delay++;
                }else{
                    this.change_f_delay = 0;
                    this.current_f = this.current_f+1>=this.states[this.state].f.length ?  this.states[this.state].f.length-1 : this.current_f+1;

                    if(this.current_f === this.states[this.state].f.length-1 && typeof this.onceCallback === 'function'){
                        return this.onceCallback.call(this.game, this);
                    }
                }
            }
        },

       

        // multiUpdate: function(){
		// 	if(this.previousX !== this.x || this.previousY !== this.y){
		// 		this.game.multiplayer.emit("update obj", {x: this.x, y: this.y, ID: this.ID});
		// 	}
		// },

        

        rpgCollision: function(){
            this.useRpgCollision = this.useRpgCollision ? false : true;
        },

        rowAndColumn: function(){
           
                
                //console.log(celldown)
                // if (celldown && !cell) {
                //    this.body.ground = true;
                // }
                // else if (this.body.velocity.y < 0) {
                //     if ((cell      && !celldown) ||
                //         (cellright && !celldiag && nx)) {
                //           console.log('drugie')
                //     }
                // }

                //  this.falling = ! (celldown || (nx && celldiag));
          
            //     nx        = this.x % this.game.map.currentWidth,         // true if this overlaps right
            //     ny        = this.y % this.game.map.currentWidth,         // true if player overlaps below
            //     cell      = tcell(tx,     ty),
            //     cellright = tcell(tx + 1, ty),
            //     celldown  = tcell(tx,     ty + 1),
            //     celldiag  = tcell(tx + 1, ty + 1);



            // var tolerance = this.currentHeight -  this.game.map.currentHeight;

            // this.column = Math.floor(this.x / this.game.map.currentWidth);
            // this.row = Math.floor((this.y+tolerance) / this.game.map.currentHeight);

            // this.down = this.game.map.b[this.row+1][this.column].type
            // this.rightDown = this.game.map.b[this.row][this.column+1].type
            
            // if(this.down !== 'empty' || this.rightDown !== 'empty'){
            //     this.body.ground = true;
            //     console.log('a')
            // }
            // this.game.ctx.fillRect(this.column*this.game.map.currentWidth - this.game.camera.xScroll, (this.row)*this.game.map.currentWidth - this.game.camera.yScroll, 70, 70)
                // if()
                 
                     
                //         this.next_row =  Math.floor(this.y/70) 
                //         this.next_column = this.column;
                    
                //      if( !(this.row == this.next_row && this.column == this.next_column) && this.game.map.b[this.next_row][this.next_column].type != 'empty'){
                        
                //         this.current_f = 0;
                //         if(this.row != this.next_row ){
                //             this.y = this.row * 70;
                //         }
                //         else {
                //             this.x = this.column * 70;
                //         }
                //      }
                //      else{
                //         if(this.row != this.next_row){
                //             this.x = this.column * 70;
                //         }
                //         else if(this.column != this.next_column){
                //             this.y = this.row * 70;
                //         }
                //      }
              
             


                // if(this.game.keyboard._pressed.W || this.game.keyboard._pressed.S || this.game.keyboard._pressed.D || this.game.keyboard._pressed.A){
                //      if(this.game.keyboard._pressed.A || this.game.keyboard._pressed.D){
                //         this.next_row = this.row;
                //         this.next_column = this.game.keyboard._pressed.A ? Math.floor(this.x/70) : Math.ceil(this.x/70);
                //      }
                //      else{
                //         this.next_row =  this.game.keyboard._pressed.W ? Math.floor(this.y/70) : Math.ceil(this.y/70);
                //         this.next_column = this.column;
                //      }
                //      if( !(this.row == this.next_row && this.column == this.next_column) && this.game.map.b[this.next_row][this.next_column].type != 'empty'){
                        
                //         this.current_f = 0;
                //         if(this.row != this.next_row ){
                //             this.y = this.row * 70;
                //         }
                //         else {
                //             this.x = this.column * 70;
                //         }
                //      }
                //      else{
                //         if(this.row != this.next_row){
                //             this.x = this.column * 70;
                //         }
                //         else if(this.column != this.next_column){
                //             this.y = this.row * 70;
                //         }
                //      }
                // }
                // else{
                //     this.current_f = 0;
                //     this.animations.play('idle');
                //     this.next_row = this.row;
                //     this.next_column = this.column;
                // }
        },

       
        
        thereAndBack: function(_dis, _dir, _speed){
            this.thereAndBack_startX = this.x;
            this.thereAndBack_startY = this.y;
            if(_dir === 'right' || _dir === 'left'){
                this.thereAndBack_dis = _dir === 'right' ? this.x + _dis : this.x - _dis;
            }else{
                this.thereAndBack_dis = _dir === 'down' ? this.y + _dis : this.y - _dis;
            }
           
            this.thereAndBack_dir = _dir;
            this.thereAndBack_speed = _speed;
            this.thereAndBack_site = true; 
            this.thereAndBackUsed = true; 
            
        },

        useThereAndBack: function(){
            if(this.thereAndBackUsed){
                if(this.thereAndBack_dir === 'right'){
                    if(this.x < this.thereAndBack_dis && this.thereAndBack_site ){
                        this.body.velocity.x = this.thereAndBack_speed;
                    }else if(this.x > this.thereAndBack_startX){
                        this.thereAndBack_site = false;
                        this.body.velocity.x = -this.thereAndBack_speed/2;
                    }else{
                        this.thereAndBack_site = true;
                        this.body.velocity.x = this.body.velocity.x * (-1);
                    }
                }else if(this.thereAndBack_dir === 'left'){
                    if(this.x > this.thereAndBack_dis && this.thereAndBack_site ){
                        this.body.velocity.x = -this.thereAndBack_speed/2;
                    }else if(this.x < this.thereAndBack_startX){
                        this.thereAndBack_site = false;
                        this.body.velocity.x = this.thereAndBack_speed;
                    }else{
                        this.thereAndBack_site = true;
                        this.body.velocity.x = this.body.velocity.x * (-1);
                    }
                }
                else if(this.thereAndBack_dir === 'up'){
                    if(this.y > this.thereAndBack_dis && this.thereAndBack_site ){
                        this.body.velocity.y = -this.thereAndBack_speed/2; 
                    }else if(this.y < this.thereAndBack_startY){
                        this.thereAndBack_site = false;
                        this.body.velocity.y = this.thereAndBack_speed;
                    }else{
                        this.thereAndBack_site = true;
                        this.body.velocity.y = this.body.velocity.y * (-1);
                    }
                }
                else if(this.thereAndBack_dir === 'down'){
                    if(this.y < this.thereAndBack_dis && this.thereAndBack_site ){
                        this.body.velocity.y = this.thereAndBack_speed;
                    }else if(this.y > this.thereAndBack_startY){
                        this.thereAndBack_site = false;
                        this.body.velocity.y = -this.thereAndBack_speed/2;  
                    }else{
                        this.thereAndBack_site = true;
                        this.body.velocity.y = this.body.velocity.y * (-1);
                    }
                }
            }else{
                return false;
            }
            
        },

        moveByLine: function(_mouseX, _mouseY, _speed, _maxDistance, _callback){
            if(!_mouseX || !_mouseY){
				return false;
			}
            var dx = (_mouseX - this.x - this.currentHalfWidth);
            var dy = (_mouseY - this.y - this.currentHalfHeight);
			var distance = Math.sqrt(dx * dx + dy * dy);
			var maxDistance = _maxDistance || 4;
			var speed = _speed || 4;
			
			if(distance > maxDistance){
				if(Math.abs(dx) > 1 && Math.abs(dy) > 1){
					var angle = Math.atan2(dy, dx);
					this.body.rotate(angle*(180/Math.PI));

					this.body.velocity.x = Math.cos(angle) * speed;
					this.body.velocity.y = Math.sin(angle) * speed;
				}
			}else{
				this.body.velocity.x = 0;//Math.cos(angle) * speed;
				this.body.velocity.y = 0;//Math.sin(angle) * speed;
				if(typeof _callback === 'function'){
					this._callback.call(this.game, this);
				}
			}
        },

        moveToPoint: function(x, y, speed, callback){
            //if(!this.moveTo){
                this.positionToMoveX = Math.floor(x);
                this.positionToMoveY = Math.floor(y);
                this.positionSpeed = speed;
                this.oldVelocityX = this.body.velocity.x;
                this.oldVelocityY = this.body.velocity.y;
                this.oldUseCollision = this.useCollision;
                this.useCollision = false;
                this.moveTo = true;
                
                this.positionCallback = callback;
            //}
        },

        moveToPointHandler: function(){
            if(this.moveTo){
                
                this.myX = Math.floor(this.x+ this.currentWidth /2);
                this.myY = Math.floor(this.y+ this.currentHeight /2 );

                if(this.moveTo && (this.myX != this.positionToMoveX && this.myY != this.positionToMoveY) ){
                    this.x -= ((this.myX - this.positionToMoveX) / this.positionSpeed);  
                    this.y -= ((this.myY - this.positionToMoveY) / this.positionSpeed);
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
                }else if(this.moveTo ){
                    this.body.velocity.x = this.oldVelocityX;
                    this.body.velocity.y = this.oldVelocityY;
                    this.useCollision = this.oldUseCollision;
                    this.x = Math.floor(this.x);
                    this.y = Math.floor(this.y);
                    this.moveTo = false;
                    if(typeof this.positionCallback === 'function'){
                        this.positionCallback.call(this.game, this);
                    }
                }
            }
        },

        setAtributes: function(options){
            for(var i=0; i<Object.keys(options).length; i++){
                this[Object.keys(options)[i]] = options[Object.keys(options)[i]];
            }
        },
    });  
   
    return Sprite;    
});
