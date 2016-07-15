define([
    'Class',
    'lib_module/client/GameObjectFactory',
    'lib_module/client/GameStateFactory',
    'lib_module/client/World', 
    'lib_module/client/Mouse',
    'lib_module/client/Keyboard',
    'lib_module/client/Physic'
], function(my, GameObjectFactory, GameStateFactory, World, Mouse, Keyboard, Physic){
    
    'use strict';
    //private
    var PREVIOUS = 0,
        FPS = 60,
        
        LAG = 0,
        loop = null,
        elapsed = 0,
        lagOffset = 0,
        actualFps = 0,
        i = 0,
        u = 0,
        iMax,
        uMax,
        entityUpdate,
        entityRender;
    
    var Game = my.Class({
        
        constructor: function(width, height, orientation){
            this.FRAMEDURATION = 1000/FPS;
            
            this.add = new GameObjectFactory(this);

            this.state = new GameStateFactory(this);

            this.world = new World(this);

            this.mouse = new Mouse(this);

            this.keyboard = new Keyboard(this);

            this.physic = new Physic(this);

            this.camera = {
                xScroll : 0,
                yScroll : 0
            };

            this.map;

            this.cTime = 0;

            this.renderer = true;

            this.states = {};
            this.gameObject = [];
            //
            this.createCanvas(width, height, orientation);

            this.useFpsCounter = false;
        },

        animationLoop : function(timestamp) {
           
            if (!timestamp) {
                timestamp = 0;
            } 
           
            requestAnimationFrame( this.animationLoop.bind(this) );
            
            elapsed = timestamp - PREVIOUS;
            
            if (elapsed > 1000 || elapsed < 0) {
                elapsed = this.FRAMEDURATION;
                LAG = 0;
            }
           
            LAG += elapsed;
        
            while (LAG >= this.FRAMEDURATION) {  
               //this.capturePreviousPositions(this.gameObject);
               this.cTime += this.FRAMEDURATION;
               this.update(this.cTime);
               LAG -= this.FRAMEDURATION;
            }

            lagOffset = LAG / this.FRAMEDURATION;
            
            this.render(lagOffset);
            
            this.showFPS(elapsed);
            
            PREVIOUS = timestamp;
          
        },
        
        render: function(lagOffset){
            if(this.renderer){
                this.clearCanvas();
                
                for(i=0, iMax=this.gameObject.length; i<iMax; i++){
                    entityRender = this.gameObject[i];
                    if(entityRender){
                        if(!entityRender.isOutOfScreen && entityRender.used){            
                            if(entityRender.body && entityRender.body.angle != 0 ){
                                this.ctx.save();
                                this.ctx.translate(entityRender.x + entityRender.currentWidth * entityRender.body.anchorX, entityRender.y + entityRender.currentHeight * entityRender.body.anchorY)
                                this.ctx.rotate( entityRender.body.angle*Math.PI/180 ); 
                                this.ctx.translate(-entityRender.x - entityRender.currentWidth * entityRender.body.anchorX, -entityRender.y - entityRender.currentHeight * entityRender.body.anchorY)
                            }

                            entityRender.draw(lagOffset);
                            
                            if(entityRender.body && entityRender.body.angle!=0 ){
                                this.ctx.restore();
                            }
                        }
                    }
                } 
            }
        },

        update: function(time){
            
            if(this.currentState && typeof this.currentState.update === 'function'){
                this.currentState.update.apply(this, arguments);
            }
            
            for(u=0, uMax=this.gameObject.length; u<uMax; u++){
                entityUpdate = this.gameObject[u];
                if(entityUpdate && entityUpdate.update && entityUpdate.used){
                    //if(!entityUpdate.isOutOfScreen){
                            
                        entityUpdate.update(time);
                    //}
                }
            } 
        },
        
        createCanvas: function(width, height, orientation){
            var that = this;
            //
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext("2d");
            this.screenWidth = width || 960;
            this.screenHeight = height || 540;
            this.portViewWidth = width;
            this.portViewHeight = height;
            this.orientation = orientation || false;
            this.canvas.style.zIndex = 5;
            this.canvas.id = "test";
            
            document.body.style.overflow = 'hidden';
                
            document.body.appendChild(this.canvas);
            this.resizeCanvas(this.canvas, that.orientation);
            
            window.addEventListener("resize", function() {
                that.resizeCanvas(that.canvas, that.orientation);
            }, false);
            
            this.animationLoop();
        },

        destroyCanvas: function(){

        },
        
        resizeCanvas: function(canvas, orientation) {
            if(!orientation){
                var w = window.innerWidth;
                var h =  window.innerHeight;

                canvas.width = ((this.screenWidth));
                canvas.height = ((this.screenHeight));
                this.portViewWidth = this.portViewWidth;
                this.portViewHeight = this.portViewHeight;
                if(this.scaleUsed){
                    this.scale1 = Math.max(0.2,Math.min(
                        (Math.min(w,w)/this.screenWidth), 
                        (Math.min(h,h)/this.screenHeight)
                    ));

                    var width = Math.min(Math.floor(this.screenWidth * this.scale1), w) ;
                    var height = Math.min(Math.floor(this.screenHeight * this.scale1),h) ;
               
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.style.position = 'absolute';
                    canvas.style.left = '50%';
                    canvas.style.marginLeft = -width/2 + "px";
                 }else{
                    this.scale1 = 1;
                    canvas.style.position = 'absolute';
                    canvas.style.left = '50%';
                    canvas.style.marginLeft = -this.screenWidth/2 + "px";
                 }
            }else{
                var w = window.innerHeight; 
                var h =  window.innerWidth;

                canvas.width = this.screenHeight//((screenWidth));
                canvas.height = this.screenWidth//((screenHeight));
                this.portViewWidth = this.portViewHeight;
                this.portViewHeight = this.portViewWidth;

                this.scale1 = Math.max(0.2,Math.min(
                    (w/this.screenWidth), 
                    (h/this.screenHeight)
                ));

                var width = Math.floor(this.screenWidth * this.scale1);
                var height = Math.floor(this.screenHeight * this.scale1);

                canvas.style.width = height  + "px";
                canvas.style.height = width + "px";
            }
        },

        scallable: function(bool){
            this.scaleUsed = bool;
            this.resizeCanvas(this.canvas, this.orientation);
        },

        sortByIndex: function(){
            this.gameObject.sort(function(obj1, obj2) {
                if(obj1.zIndex > obj2.zIndex)
                    return 1;
                else if(obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },
        
        clearCanvas: function() {
            this.ctx.clearRect(0, 0,  this.canvas.width, this.canvas.height);
        },

        rand: function(min,max){
            return Math.floor(Math.random()*(max-min+1))+min;
        },

        randF: function(min,max){
            return (Math.random()*(max-min+1))+min;
        },

        saveData: function(name, data) {
            localStorage.setItem(name, JSON.stringify(data));
        },

        loadData: function(name) {
            var data = localStorage.getItem(name);
            //
            if(data){
                return JSON.parse(data);
            }
            else{
                return false;
            }
        },

        capturePreviousPositions: function(entities){
            for(u=0, uMax=entities.length; u<uMax; u++){
                var entity = entities[u];
                entity.previousX = entity.x;
                entity.previousY = entity.y;
            }
        },

        shuffle:function(arr){
            var counter = arr.length;
            var tmp;
            var index;
            while(counter > 0){
                counter--;
                index = Math.floor(Math.random() * counter);
                //
                tmp = arr[counter];
                //
                arr[counter] = arr[index];
                //
                arr[index] = tmp;
            }
            return arr;
        },

        showFPS: function(_elapse){
            if(this.useFpsCounter){
                actualFps = Math.floor(1000 / _elapse);

                this.ctx.fillStyle = "red";
                this.ctx.font = 16 + "px Arial";
                this.ctx.fillText(actualFps, this.canvas.width- 50, this.canvas.height- 50);
            }
        }
    })
    
    return Game;
})