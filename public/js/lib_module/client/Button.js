define(['Class'], function(my){
    
   var Button = my.Class( {

        constructor: function(game, text, x, y, width, height, background, backgroundHover, textColor, action){
            //Button.Super.apply(this, arguments); 
            //
            this.game = game;
            this.used = true;

            this.isOutOfScreen = false;
            this.updateOfScreen = true;
            //
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.currentWidth = width; 
            this.currentHeight = height;
            this.background = background; 
            this.backgroundHover = backgroundHover;
            this.textColor = textColor;

            this.hovered = false;
            this.scale = 1;
            this.text = text;
            this.action = action;
            this.zIndex = 5;

            this.contextType = 'main';
            
            this.colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];
            //
            //this.game.physic.outOfScreen(this)
            this.game.gameObjectLength = Object.keys(this.game.gameObject).length;
            this.game.gameObject[this.game.gameObjectLength] = this; 
        },

        update: function() {
            var wasNotClicked = this.game.mouse.click;
            
            if (this.game.mouse.updateStats(this) && wasNotClicked && typeof this.action === 'function') {
                this.game.mouse.click = false;
                
                this.action.call(this.game, this);
            }
        },

        draw: function() {
            if (this.hovered) {
                this.game.ctx.fillStyle = this.backgroundHover;
                this.col = this.backgroundHover
            } else { 
                this.game.ctx.fillStyle = this.background;
                this.col = this.background
            }
         
            //draw button

            this.game.ctx.beginPath();
            this.game.ctx.rect(this.x , this.y , this.width, this.height);
            
            this.game.ctx.strokeStyle = this.col;
            this.game.ctx.lineWidth = 2;
            this.game.ctx.stroke();
            //this.game.ctx.fill();
            this.game.ctx.closePath();
            //text options
            var fontSize = 42;
            this.game.ctx.fillStyle = this.textColor;
            this.game.ctx.font = fontSize + "px Forte";
         
            //text position
            var textSize = this.game.ctx.measureText(this.text);
            var textX = this.x + (this.width/2) - (textSize.width / 2);
            var textY = this.y  + (this.height/2) + (fontSize/2)-(fontSize/7);

            //draw the text
            this.game.ctx.fillText(this.text, textX , textY );
           // this.game.ctx.fillText(this.text, textX - this.game.camera.xScroll, textY - this.game.camera.yScroll);
        },
        
        destroy: function(arr){
            this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
            
            if(Array.isArray(arr)){
                arr.splice(arr.indexOf(this), 1);
            }
            else if(typeof arr === 'object'){
                return arr = null;
            }
            
        },
    })

    return Button;
})