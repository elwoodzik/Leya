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
    var that,
        PREVIOUS = 0,
        FPS = 60,
        step = 1/FPS,
        LAG = 0,
        loop = null,
        elapsed = 0,
        lagOffset = 0,
        actualFps = 0,
        dts = 0,
        i = 0,
        last = 0,
        now = 0,
        u = 0,
        dt = 0,
        iMax,
        uMax,
        entityUpdate,
        entityRender,
        entityRenderStatic,
        entityRenderOnStatic;
    
    var Game = my.Class({
        
        STATIC: {
            
        },

        constructor: function(width, height, orientation){
            that = this;

            this.VAR = {};

            this.ARR = {};

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

            this.map = null;

            this.cTime = 0;

            this.renderer = true;

            this.states = {};
            this.gameObject = [];
            this.gameObjectStatic = [];
            this.gameObjectOnStatic = [];
            //
            this.createCanvas(width, height, orientation);

            this.useFpsCounter = false;

            
        },

        timestamp: function() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        },

        animationLoop : function(timestamp) {
            
            if(!timestamp){
                timestamp = 0;
            }
            dt = (dt + Math.min(1, (timestamp - last) / 1000));
           
            while(dt > step) {
              dt = dt - step;
              this.update(step);
            }
            this.render(dt);
            last = timestamp;
  
            requestAnimationFrame( this.animationLoop.bind(this) );
          
            // if (!timestamp) {
            //     timestamp = 0;
            // } 
            // now = this.last;
            // console.log(now - this.last)
            // dt = dt + Math.min(1, (now - this.last) / 1000);
            
           
            // requestAnimationFrame( this.animationLoop.bind(this) );
            
            // elapsed = timestamp - PREVIOUS;
            
            // if (elapsed > 1000 || elapsed < 0) {
            //     elapsed = this.FRAMEDURATION;
            //     LAG = 0;
            // }
           
            // LAG += elapsed;
            
            
            // while (LAG >= this.FRAMEDURATION) {  
            //    //this.capturePreviousPositions(this.gameObject);
            //    this.cTime += this.FRAMEDURATION;
               
            //    this.update(this.cTime);
              
            //    LAG -= this.FRAMEDURATION;
            // }

            // lagOffset = LAG / this.FRAMEDURATION;
            
            // this.render(lagOffset);
            
            // this.showFPS(elapsed);
            
            // PREVIOUS = timestamp;
          
        },
        
        render: function(dt){
            if(this.renderer){
                this.clearCanvas(this.ctx);
                
                for(i=0, iMax=this.gameObject.length; i<iMax; i++){
                    entityRender = this.gameObject[i];
                    if(entityRender && entityRender.contextType === 'main'){
                       
                        if(!entityRender.isOutOfScreen && entityRender.used){            
                            if(entityRender.body && entityRender.body.angle != 0 ){
                                this.ctx.save();
                                this.ctx.translate(entityRender.x + entityRender.currentWidth * entityRender.body.anchorX, entityRender.y + entityRender.currentHeight * entityRender.body.anchorY);
                                this.ctx.rotate( entityRender.body.angle*Math.PI/180 ); 
                                this.ctx.translate(-entityRender.x - entityRender.currentWidth * entityRender.body.anchorX, -entityRender.y - entityRender.currentHeight * entityRender.body.anchorY);
                            }

                            entityRender.draw(dt);
                            
                            if(entityRender.body && entityRender.body.angle!=0 ){
                                this.ctx.restore();
                            }
                        }
                    }
                } 
            }
        },

        renderStatic: function(dt){
            if(this.renderer){
                 this.clearCanvas(this.bgctx);
                console.log(this.gameObjectStatic.length)
                for(i=0, iMax=this.gameObjectStatic.length; i<iMax; i++){
                    entityRenderStatic = this.gameObjectStatic[i];
                    if(entityRenderStatic && entityRenderStatic.contextType === 'background'){
                        if(!entityRenderStatic.isOutOfScreen && entityRenderStatic.used){            
                            if(entityRenderStatic.body && entityRenderStatic.body.angle != 0 ){
                                this.bgctx.save();
                                this.bgctx.translate(entityRenderStatic.x + entityRenderStatic.currentWidth * entityRenderStatic.body.anchorX, entityRenderStatic.y + entityRenderStatic.currentHeight * entityRenderStatic.body.anchorY)
                                this.bgctx.rotate( entityRenderStatic.body.angle*Math.PI/180 ); 
                                this.bgctx.translate(-entityRenderStatic.x - entityRenderStatic.currentWidth * entityRenderStatic.body.anchorX, -entityRenderStatic.y - entityRenderStatic.currentHeight * entityRenderStatic.body.anchorY)
                            }
                           
                            entityRenderStatic.redraw(dt);
                            
                            if(entityRenderStatic.body && entityRenderStatic.body.angle!=0 ){
                                this.bgctx.restore();
                            }
                        }
                    }
                } 
            }
        },

        renderOnStatic: function(dt){
            if(this.renderer){
                this.clearCanvas(this.onbgctx);
                
                for(i=0, iMax=this.gameObjectOnStatic.length; i<iMax; i++){
                    entityRenderOnStatic = this.gameObjectOnStatic[i];
                    if(entityRenderOnStatic && entityRenderOnStatic.contextType === 'onbackground'){
                        if(!entityRenderOnStatic.isOutOfScreen && entityRenderOnStatic.used){            
                            if(entityRenderOnStatic.body && entityRenderOnStatic.body.angle != 0 ){
                                this.onbgctx.save();
                                this.onbgctx.translate(entityRenderOnStatic.x + entityRenderOnStatic.currentWidth * entityRenderOnStatic.body.anchorX, entityRenderOnStatic.y + entityRenderOnStatic.currentHeight * entityRenderOnStatic.body.anchorY)
                                this.onbgctx.rotate( entityRenderOnStatic.body.angle*Math.PI/180 ); 
                                this.onbgctx.translate(-entityRenderOnStatic.x - entityRenderOnStatic.currentWidth * entityRenderOnStatic.body.anchorX, -entityRenderOnStatic.y - entityRenderOnStatic.currentHeight * entityRenderOnStatic.body.anchorY)
                            }

                            entityRenderOnStatic.draw(dt);
                            
                            if(entityRenderOnStatic.body && entityRenderOnStatic.body.angle!=0 ){
                                this.onbgctx.restore();
                            }
                        }
                    }
                } 
            }
        },

        update: function(dt){  
            for(u=0, uMax=this.gameObject.length; u<uMax; u++){
                entityUpdate = this.gameObject[u];
                //if(!entityUpdate.isOutOfScreen && entityUpdate.used){            
                    if(entityUpdate && entityUpdate.update && entityUpdate.used){
                        //if(!entityUpdate.isOutOfScreen){   
                            entityUpdate.update(dt);
                        //}
                    }
                //}
            } 
            if(this.currentState && typeof this.currentState.update === 'function'){
                this.currentState.update.apply(this, arguments);
            }
        },
        
        createBgCanvas: function(){
            var that = this;
            //
            this.bgcanvas = document.createElement('canvas');
            this.bgctx = this.bgcanvas.getContext("2d");
         
            this.bgcanvas.style.zIndex = 3;
            this.bgcanvas.id = "background";
            this.bgcanvas.width = ((this.screenWidth));
            this.bgcanvas.height = ((this.screenHeight));

            this.bgcanvas.style.position = 'absolute';
            this.bgcanvas.style.left = '50%';
            this.bgcanvas.style.marginLeft = -this.screenWidth/2 + "px";
                
            document.body.appendChild(this.bgcanvas);

            // this.resizeCanvas(this.bgcanvas, this.orientation);
            
            // window.addEventListener("resize", function() {
            //     that.resizeCanvas(that.bgcanvas, that.orientation);
            // }, false);
        },

        createOnBgCanvas: function(){
            var that = this;
            //
            this.onbgcanvas = document.createElement('canvas');
            this.onbgctx = this.onbgcanvas.getContext("2d");
          
            this.onbgcanvas.style.zIndex = 4;
            this.onbgcanvas.id = "onbackground";
            this.onbgcanvas.width = ((this.screenWidth));
            this.onbgcanvas.height = ((this.screenHeight));

           
            this.onbgcanvas.style.position = 'absolute';
            this.onbgcanvas.style.left = '50%';
            this.onbgcanvas.style.marginLeft = -this.onbgcanvas.width/2 + "px";
            
         
                
            document.body.appendChild(this.onbgcanvas);

            // this.resizeCanvas(this.onbgcanvas, this.orientation);
            
            // window.addEventListener("resize", function() {
            //     that.resizeCanvas(that.onbgcanvas, that.orientation);
            // }, false);
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
            this.canvas.id = "main";
            this.canvas.width = ((this.screenWidth));
            this.canvas.height = ((this.screenHeight));

             this.canvas.style.width = this.canvas.width + "px";
            this.canvas.style.height = this.canvas.height + "px";
            this.canvas.style.position = 'absolute';
            this.canvas.style.left = '50%';
            this.canvas.style.marginLeft = -this.canvas.width/2 + "px";
            this.scale1 = 1;
            
            
            document.body.style.overflow = 'hidden';
                
            document.body.appendChild(this.canvas);
            // this.resizeCanvas(this.canvas, that.orientation);
            
           
            // window.addEventListener("resize", function() {
            //     that.resizeCanvas(that.canvas, that.orientation);
            // }, false);
            

            this.animationLoop();
        },

        destroyCanvas: function(){

        },
        
        resizeCanvas: function(canvas, orientation) {
            if(!orientation){
                var w = window.innerWidth;
                var h =  window.innerHeight;

               
                this.portViewWidth = this.portViewWidth;
                this.portViewHeight = this.portViewHeight;
                if(this.scaleUsed){
                    this.scale1 = Math.max(0.2,Math.min(
                        (Math.min(w,w)/this.screenWidth), 
                        (Math.min(h,h)/this.screenHeight)
                    ));

                    var width = Math.min(Math.floor(this.screenWidth * this.scale1), w);
                    var height = Math.min(Math.floor(this.screenHeight * this.scale1),h);
               
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
            var that = this;
            this.scaleUsed = bool;
            this.resizeCanvas(this.canvas, this.orientation);
            if(that.bgcanvas){
                this.resizeCanvas(this.bgcanvas, this.orientation);
            }
            if(that.onbgcanvas){
                this.resizeCanvas(this.onbgcanvas, this.orientation);
            }

            window.addEventListener("resize", function() {
                that.resizeCanvas(that.canvas, that.orientation);
                if(that.bgcanvas){
                    that.resizeCanvas(that.bgcanvas, that.orientation);
                }
                if(that.onbgcanvas){
                    that.resizeCanvas(that.onbgcanvas, that.orientation);
                }
            }, false);
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
        
        clearCanvas: function(context) {
            context.clearRect(0, 0,  this.canvas.width, this.canvas.height);
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

        saveDataAd: function(name, data) {
            var oldItems = this.loadData(name) || [];
            oldItems.push(data);
           
            localStorage.setItem(name, JSON.stringify(oldItems));
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

        removeData: function(name){
            localStorage.removeItem(name);
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