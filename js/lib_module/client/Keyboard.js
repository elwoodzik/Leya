define(['Class'], function(my){
    
   var Keyboard = my.Class({
        constructor: function(game){
            this.game = game;

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
            window.document.addEventListener("keydown", function(e){that.keyDown(e)});
            window.document.addEventListener("keyup", function(e){that.keyUp(e)});
        },

        keyDown: function(e){
            var code = e.which || e.keyCode;
            var key = this.getKeyByCode(e, code);
            
            if(!this.use[key]){
                return false;
            }

            if(this.lastKeyCode === code){
                this.use[key].hold =  true;
                return;
            }
            
            this.lastKeyCode = code;
          
            if(!this.use[key].pressed){
                this.use[key].pressed =  true;
            }else{
               return;
            }
        },
        
        keyUp: function(e){
            var code = e.which || e.keyCode;
            var key = this.getKeyByCode(e, code);
            this.hold = false;
            this.lastKeyCode = null;
            
            if(this.use[key] && this.use[key].pressed){
                this.use[key].pressed = false;
                this.use[key].hold = false;
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