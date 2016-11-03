define(['Class'], function(my){
	
    var that;

	var _ObjectSettings = my.Class({

        initializeGlobalSettings: function(options){
            var Loader = require('module/Loader');

            that = this;
            this.game = options.game;
            this.pooled = options.pooled;
            this.contextType = options.context;
            this.x = options.x
            this.y = options.y 
            this.key = options.key 
            this.isOutOfScreen = false;
            this.updateOfScreen = true;
            this.used = true;

            if(this.key){
                this.image = Loader.assetManager.get(this.key); 
            }

            this.currentWidth = options.width  || this.image.width || 0;
			this.currentHeight = options.height || this.image.height || 0;

            this.currentHalfWidth = this.currentWidth / 2;
	        this.currentHalfHeight = this.currentHeight / 2;

            this.useCollision = true; // NIE WIEM CZY POTRZEBNE NIE PAMIETAM TRZEBA SPRAWDZIC
           
            if(!this.pooled){
                this.setContext(this.contextType);
            } 
        },

        changeContext: function(context, array){
            if(this.contextType != context){
                this.destroy(array);
                this.setContext(context);
            }
            return this;
        },

        setContext: function(context){
            if( context){
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

        setScale: function(scale){
            this.scale = scale;
        },

        scaleUp: function(too, speed, callback){
            this.scaleUpTrig = true;
            this.scaleSpeed = speed;
            this.scaleToo = too;
            this.scallUpCallback = callback;
        },

        scaleDown: function(too, speed, callback){
            this.scaleDownTrig = true;
            this.scaleSpeed = speed;
            this.scaleToo = too;
            this.scallDownCallback = callback;
        },

        scaleUpDownHandler: function(){
            if(this.scaleUpTrig){
                if(this.scale < this.scaleToo){
                    this.scale += this.scaleSpeed;
                }else{
                    this.scaleUpTrig = false;
                    if(typeof this.scallUpCallback === 'function'){
                        this.scallUpCallback();
                    }
                   
                }
            }else if(this.scaleDownTrig){
                if(this.scale > this.scaleToo){
                    this.scale -= this.scaleSpeed;
                }else{
                    this.scaleDownTrig = false;
                    this.scale = 1;
                    if(typeof this.scallDownCallback === 'function'){
                        this.scallDownCallback();
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

        doInTime: function(time, callback){
            this.timeLocal = 0; 
            this.timeMax = time;
            this.timeCallback = callback;
            this.inTime = true;
        },

        doInTimeHandler: function(){
            if(this.inTime){
                
                this.timeLocal += this.game.FRAMEDURATION;

                if(this.timeLocal > this.timeMax ){
                    this.timeLocal = 0;
                    this.inTime = false;
                    this.timeCallback.call(this, this);
                }
            }
        },
        
	});

   

	return _ObjectSettings;
});