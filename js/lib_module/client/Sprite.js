define(['Class', 'require', 'lib_module/client/Body', 'lib_module/client/GameAnimationFactory', 'lib_module/client/Map',], function(my, require, Body, GameAnimationFactory, Map){
   var id = 0; 
   var Sprite = my.Class({
        constructor: function(game, context, x, y, key, width, height){
            this.loader = require('module/Loader');

            this.used = true;
            this.game = game; 
            this.x = x || 0; 
            this.y = y || 0; 
            this.key = key;
            this.zIndex = 3;
            this.image = this.loader.assetManager.get(this.key); 

            this.fW = this.image.width || 500;
            this.fH = this.image.height || 500; 

            this.currentWidth = null;
            this.currentHeight = null;
            this.currentHalfWidth = null;
            this.currentHalfHeight = null;
            
            this.timeLocal = 0;

            this.clicked = false;
            this.hovered = false;

            this.state = 'static';
            this.states =  {
                'static': {sx:0, sy:0, fW:this.fW,fH:this.fH, f:[0]}
            };

            this.scale = 1;

            this.static = false;

            this.contextType = 'main';
            
            this.animations = new GameAnimationFactory(this);
            
            this.body = new Body(this.game, this);

            this.useCollision = true;
            this.useRpgCollision = false;

            this.body.tolerance = 0;

            this.current_f = 0;
            this.change_f_delay = 0;
            this.f_max_delay = 4;
            this.playCallbackDellayCurrent = 0;
            
              //
            // this.ID = id;
            // id++;
            // this.game.gameObject.push(this); 
            
            // this.sortByIndex();
            this.setContext(context);

        },

        sortByIndex: function(){
            this.game.gameObject.sort(function(obj1, obj2) {
                if(obj1.zIndex > obj2.zIndex)
                    return 1;
                else if(obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },

        draw: function(dt){
            
            
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
            this.game.ctx.drawImage(
               this.image,
               this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.states[this.state].fW,
               this.states[this.state].sy,
               this.states[this.state].fW,
               this.states[this.state].fH,
               Math.floor(this.states[this.state].flip ? (-this.states[this.state].fW-this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX  - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
               Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
               this.states[this.state].fW ,
               this.states[this.state].fH 
            )

             if(this.states[this.state].flip){
                this.game.ctx.restore();
            }

            if(this.useRpgCollision){
                this.rowAndColumn();
            }
            this.frameUpdate();
            //this.inRange();
            //this.collide();
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
               this.states[this.state].flip ? (-this.states[this.state].fW-this.renderX + this.game.camera.xScroll) : Math.floor(this.renderX  - this.game.camera.xScroll), // * this.scale
               this.renderY - this.game.camera.yScroll,// * this.scale
               this.states[this.state].fW * this.scale,
               this.states[this.state].fH * this.scale
            )

            if(this.states[this.state].flip){
                this.game.ctx.restore();
            }

            if(this.useRpgCollision){
                this.rowAndColumn();
            }
        },

        update: function(dt){
            //this.body.useGravity(this);
            this.worldBounce();
            this.moveToPointHandler();
            this.useThereAndBack();
            
            this.x =  (this.x  + (dt * this.body.velocity.x));
            this.y =  (this.y  + (dt * this.body.velocity.y));
          
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

        destroy: function(array){  
            if(Array.isArray(array)){
                array.splice(array.indexOf(this), 1);
            }
            return this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
        },

        kill: function(array){
            if(Array.isArray(array)){
                array.splice(array.indexOf(this), 1);
            }
        },

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

        t2p: function(t){
            return t*this.game.map.currentWidth;
        },

        p2t: function(p){
            return Math.floor(p/this.game.map.currentWidth);
        },
        
        tcell: function(tx, ty) {
            return this.game.map.b[ty][tx]; 
        },

        worldBounce: function(){
            if(this.body.colideWorldSide){
                if(this.body.colideWorldSideBottom && this.y + this.currentHeight > this.game.portViewHeight ){
                    this.body.velocity.y = this.body.worldBounds ? this.body.velocity.y*-1 : 0;
                    this.y = this.game.portViewHeight - this.currentHeight;
                }
                else if(this.body.colideWorldSideTop && this.y < 0){
                    this.body.velocity.y = this.body.worldBounds ? this.body.velocity.y*-1 : 0;
                    this.y = 0;
                }
                if(this.body.colideWorldSideRight && this.x + this.currentWidth > this.game.portViewWidth ){
                    this.body.velocity.x = this.body.worldBounds ? this.body.velocity.x*-1 : 0;
                    this.x = this.game.portViewWidth - this.currentWidth;
                }
                else if(this.body.colideWorldSideLeft && this.x < 0){
                    this.body.velocity.x = this.body.worldBounds ? this.body.velocity.x*-1 : 0;
                    this.x = 0;
                }
            }
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
                this.positionToMoveY = Math.floor(y)  ;
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
            
                if(this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY) ){
                    this.x -= ((this.myX - this.positionToMoveX) / this.positionSpeed);  
                    this.y -= ((this.myY - this.positionToMoveY) / this.positionSpeed);
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
                }else if(this.moveTo ){
                    this.body.velocity.x = this.oldVelocityX;
                    this.body.velocity.y = this.oldVelocityY;
                    this.useCollision = this.oldUseCollision;
                    this.x = Math.floor(this.x)
                    this.y = Math.floor(this.y) 
                    this.moveTo = false;
                    if(typeof this.positionCallback === 'function'){
                        this.positionCallback.call(this.game, this);
                    }
                }
            }
            
        },

        doInTime: function(time, callback){
            this.timeLocal += this.game.FRAMEDURATION;

            if(this.timeLocal > time ){
                this.timeLocal = 0;
                callback.call(this);
            }
        },

        setAtributes: function(options){
            for(var i=0; i<Object.keys(options).length; i++){
                this[Object.keys(options)[i]] = options[Object.keys(options)[i]];
            }
        },

        setScale: function(scale){
            this.scale = scale;
        },

        changeContext: function(context, array){
            if(this.contextType != context){
                this.destroy(array);
                this.setContext(context);
            }
            return this;
        },

        setContext: function(context){
        
            if(context === 'main'){
                this.context = this.game.ctx;
                this.contextType = context;
                this.gameObjectLength = this.game.gameObject.length;
                this.game.gameObject[this.gameObjectLength] = this; 
            }else if(context === 'background'){
                this.context = this.game.bgctx;
                this.contextType = context;
                this.gameObjectStaticLength = this.game.gameObjectStatic.length;
                this.game.gameObjectStatic[this.gameObjectStaticLength] = this; 
                //this.redraw(); 
            }
            else if(context === 'onbackground'){
                this.context = this.game.onbgctx;
                this.contextType = context;
                this.gameObjectOnStaticLength = this.game.gameObjectOnStatic.length;
                this.game.gameObjectOnStatic[this.gameObjectOnStaticLength] = this; 
                //this.redraw();
            }else{
                return console.error("Niepoprawna nazwa Contextu. Dostępne nazwy to: \n1. background \n2. onbackground \n3. main")
            }
        },

        setIndex: function(index){
            this.zIndex = index;
            this.game.gameObject.sort(function(obj1, obj2) {
                if(obj1.zIndex > obj2.zIndex)
                    return 1;
                else if(obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },
        
    });  
    return Sprite;    
});
