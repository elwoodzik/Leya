define(['Class'], function(my){
    
   var Text = my.Class({
        constructor: function(game, text, x, y, size, color, action){
            this.game = game;
            //
            this.used = true;
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.text = text;
            this.action = action;
            this.currentWidth = size
            this.currentHeight = size
            this.zIndex = 5;
            //
            this.game.physic.outOfScreen(this);
            this.game.gameObjectLength = Object.keys(this.game.gameObject).length;
            this.game.gameObject[this.game.gameObjectLength] = this; 
        },

        draw: function() { 
            var fontSize = this.size;
            this.game.ctx.fillStyle = this.color;
            this.game.ctx.font = fontSize + "px Sans";
    
            var textSize = this.game.ctx.measureText(this.text);
            this.currentWidth = textSize.width;
            var textX = this.x  ;
            var textY = this.y  ;
           
            this.game.ctx.fillText(this.text, textX, textY);
        },

        add: function(count){
            return this.text+=count;
        },

        destroy: function(array){
            this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
            if(Array.isArray(array)){
                array.splice(array.indexOf(this), 1);
            }

            return null;
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


        remove: function(count){
            return this.text-=count;
        },

        getText: function(){
            return this.text;
        }
    });

    return Text;
})
