define(['Class'], function(my){
    
   var Keyboard = my.Class({
        constructor: function(game){
            this.game = game;

            this._pressed = {};
            this.keys = {
                '37': 'left',
                '38': 'up',
                '40': 'down',
                '39': 'right',
                '87': 'W',
                '83': 'S',
                '65': 'A',
                '68': 'D',

                '32': 'space'
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
            this._pressed = {};
            this._pressed[this.getKeyByCode(e, code)] = true;
            return this._pressed[code]; 
        },

        keyUp: function(e){
            var code = e.which || e.keyCode;
            this.hold = false;
            delete this._pressed[this.getKeyByCode(e, code)];
        },

        trigger: function(currentKey, callback, hold){
            if(!this.hold){
                if(this._pressed[currentKey]){
                    this.hold = hold ? true : false;
                    if(typeof callback === 'function'){
                        callback.call(this);
                    }
                }
            }else{
                return false;
            }
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