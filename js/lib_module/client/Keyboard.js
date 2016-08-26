define(['Class'], function(my){
   var that;

   var Keyboard = my.Class({
        constructor: function(game){
            this.game = game;

            that = this;

            this.use = {
                'left': {
                    hold: false,
                    pressed: false,
                    name:"left"
                },
                'up': {
                    hold: false,
                    pressed: false,
                    name:"up"
                },
                'down':{
                    hold: false,
                    pressed: false,
                    name:"down"
                },
                'right': {
                    hold: false,
                    pressed: false,
                    name:"right"
                },
                'W': {
                    hold: false,
                    pressed: false,
                    name:"W"
                },
                'S': {
                    hold: false,
                    pressed: false,
                    name:"S"
                },
                'A': {
                    hold: false,
                    pressed: false,
                    name:"A"
                },
                'D': {
                    hold: false,
                    pressed: false,
                    name:"D"
                },

                'SPACE': {
                    hold: false,
                    pressed: false,
                    name:"SPACE"
                },
            }

            this.lastKeyCode = null;

            this.keys = {
                '37': 'left',
                '38': 'up',
                '40': 'down',
                '39': 'right',
                '87': 'W',
                '83': 'S',
                '65': 'A',
                '68': 'D',

                '32': 'SPACE'
            }
            this.hold = false;
       
        },

        initialize: function(){
            var that = this;
            window.document.addEventListener("keydown", that.keyDown);
            window.document.addEventListener("keyup", that.keyUp);
        },

        keyDown: function(e){
            var code = e.which || e.keyCode;

            var key = that.getKeyByCode(e, code);
            
            if(!that.use[key]){
                return false;
            }

            if(that.lastKeyCode === code){
                that.use[key].hold =  true;
                return;
            }
            
            that.lastKeyCode = code;
            that.use[key].pressed =  true;
       
        },
        
        keyUp: function(e){
            var code = e.which || e.keyCode;
            var key = that.getKeyByCode(e, code);
            that.hold = false;
            that.lastKeyCode = null;
            
            if(that.use[key] && that.use[key].pressed){
                that.use[key].pressed = false;
                that.use[key].hold = false;
            }
            
            // if(Object.keys(this._pressed).length <= 0){
            //     return this._pressed = false;
            // }
            
        },

        trigger: function(currentKey, hold){
        //     var key = this._pressed[currentKey] ;
           
        //     if(this._pressed[currentKey]){

        //         if(key.pressed || key.hold){
                   
        //             key.hold = hold ? true : false;
        //       	    //key.pressed = false;
                     
        //             return true;
        //         }
        //    }else{
        //        return false;
        //    }
            
            
           
            // 
            // if(!this.hold){
               
            // }else{
            //     return false;
            // }
        },

        getKeyByCode: function(e,code){
            if(this.keys[code]){
                e.preventDefault();
                return this.keys[code];
            }else{
                return;
            }
        }
    });

   return Keyboard;
})