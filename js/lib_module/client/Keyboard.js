define(['Class'], function(my){
    
   var Keyboard = my.Class({
        constructor: function(game){
            this.game = game;

            this._pressed = {};

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
            window.document.addEventListener("keydown", function(e){that.keyDown(e)});
            window.document.addEventListener("keyup", function(e){that.keyUp(e)});
        },

        keyDown: function(e){
            var code = e.which || e.keyCode;
            var key = this.getKeyByCode(e, code);

            if(this.lastKeyCode === code){
                return;
            }

            this.lastKeyCode = code;

            if(!this._pressed[key]){
                this._pressed[key] = {
                    hold: true,
                    pressed: true,
                    name: key
                };
            }else{
                this._pressed[key].hold = true;
                this._pressed[key].pressed = true;
                this._pressed[key].name = key;
            }
        },
        
        keyUp: function(e){
            var code = e.which || e.keyCode;
            this.hold = false;
            this.lastKeyCode = null;
           
            this._pressed[this.getKeyByCode(e, code)].pressed = false;
            this._pressed[this.getKeyByCode(e, code)].hold = false;
            
            // if(Object.keys(this._pressed).length <= 0){
            //     return this._pressed = false;
            // }
            
        },

        trigger: function(currentKey, hold){
            var key = this._pressed[currentKey] ;
           
            if(this._pressed[currentKey]){

                if(key.pressed || key.hold){
                   
                    key.hold = hold ? true : false;
              	    //key.pressed = false;
                     
                    return true;
                }
           }else{
               return false;
           }
            
            
           
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