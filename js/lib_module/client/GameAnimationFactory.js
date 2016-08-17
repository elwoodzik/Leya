define(['Class'], function(my){
    
   var GameAnimationFactory = my.Class( {
        
        constructor: function(sprite){
            this.sprite = sprite;
            
        },

        add: function (key, x, y, w, h, f, flip) {
            return this.sprite.states[key] = {
                key: key, 
                sx: x, 
                sy: y,
                fW: w,
                fH: h,
                f: f,
                flip: flip
            };
        },

        play: function (key, delay, callback, callbackDellay ) {
            if(key != this.sprite.state){
                this.sprite.current_f = 0;
                this.sprite.once = false;
                this.sprite.state = key;
                this.sprite.currentWidth = this.sprite.states[this.sprite.state].fW * this.sprite.scale;
                this.sprite.currentHeight = this.sprite.states[this.sprite.state].fH * this.sprite.scale;
                this.sprite.currentHalfWidth = (this.sprite.states[this.sprite.state].fW / 2) * this.sprite.scale;
                this.sprite.currentHalfHeight = (this.sprite.states[this.sprite.state].fH / 2) * this.sprite.scale;
                this.sprite.f_max_delay = delay || 4;
                if(typeof callback === 'function'){
                    this.sprite.playCallback = callback;
                    this.sprite.playCallbackDellay = callbackDellay || 1;
                }
            }
        },

        playOnce: function (key, delay, callback) {
            if(key != this.sprite.state){
                this.sprite.once = true;
                this.sprite.current_f = 0;
                this.sprite.state = key;
                this.sprite.currentWidth = this.sprite.states[this.sprite.state].fW * this.sprite.scale;
                this.sprite.currentHeight = this.sprite.states[this.sprite.state].fH * this.sprite.scale;
                this.sprite.currentHalfWidth = (this.sprite.states[this.sprite.state].fW / 2) * this.sprite.scale;
                this.sprite.currentHalfHeight = (this.sprite.states[this.sprite.state].fH / 2) * this.sprite.scale;
                this.sprite.f_max_delay = delay || 4;
                if(typeof callback === 'function'){
                    this.sprite.onceCallback = callback;
                }
            }
        },

        setImage: function(image){
            this.sprite.image = this.sprite.loader.assetManager.get(image); 
            this.sprite.current_f = 0;
        }
    });

    return GameAnimationFactory;
})
