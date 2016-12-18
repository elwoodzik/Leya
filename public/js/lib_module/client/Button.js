define(['Class', 'lib_module/client/_ObjectSettings'], function(my, Settings){
    'use strict';
    var Button = my.Class(null, Settings, {

        constructor: function(game, text, x, y, width, height, background, backgroundHover, strokeStyle, strokeStyleHover, textColor, action){
            //Button.Super.apply(this, arguments); 
            //
            this.initializeGlobalSettings({
				game: game,
				pooled: false,
				context: 'main',
				x: x || 1,
				y: y || 1,
				key: null,
				width: width,
				height: height
			});
            
            this.size = 42;
            this.fillStyle = background; 
            this.fillStyleHover = backgroundHover;
            this.strokeStyle = strokeStyle;
            this.strokeStyleHover = strokeStyleHover;
            this.textColor = textColor;
            this.borderWidth = 2;

            this.text = text;
            this.action = action;
            this.zIndex = 5;

            this.colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];
        },

        update: function() {
            var wasNotClicked = this.game.mouse.click;

            if(!this.touchActive){
                this.game.mouse.touchIntersects(this, true);
            }
            
            if ( this.touchActive && typeof this.action === 'function') {
                this.action.call(this.game, this);
            }else if ( !this.touchActive && this.game.mouse.updateStats(this, true) && wasNotClicked && typeof this.action === 'function') {
                this.game.mouse.click = false;
                
                this.action.call(this.game, this);
            }
            
            
            
        },

        draw: function() {
            if (this.hovered) {
               
                this.game.ctx.fillStyle = this.backgroundHover;
                
                this.fillCol = this.fillStyleHover ? this.fillStyleHover : 'transparent';
                this.strokeCol = this.strokeStyleHover;
            } else { 
                this.game.ctx.fillStyle = this.background;
                this.fillCol = this.fillStyle ? this.fillStyle : 'transparent';;
                this.strokeCol = this.strokeStyle;
            }
         
            //draw button
            this.game.ctx.strokeStyle = this.strokeCol;
            this.game.ctx.fillStyle = this.fillCol;

            if(this.strokeStyle === null){
				this.game.ctx.fillRect(this.x , this.y , this.currentWidth, this.currentHeight);
			}else if(this.fillStyle === null && this.fillStyleHover === null){
				this.game.ctx.beginPath();
                this.game.ctx.rect(this.x , this.y , this.currentWidth, this.currentHeight);
                this.game.ctx.lineWidth = this.borderWidth;
                this.game.ctx.stroke();
                this.game.ctx.closePath();
			}else{
				this.game.ctx.beginPath();
                this.game.ctx.rect(this.x , this.y , this.currentWidth, this.currentHeight);
                this.game.ctx.lineWidth = this.borderWidth;
                this.game.ctx.stroke();
                this.game.ctx.fill();
                this.game.ctx.closePath();
			}

            //text options
            var fontSize =  this.size;
            this.game.ctx.fillStyle = this.textColor;
            this.game.ctx.font = fontSize + "px Forte";
         
            //text position
            var textSize = this.game.ctx.measureText(this.text);
            var textX = this.x + (this.currentWidth/2) - (textSize.width / 2);
            var textY = this.y  + this.currentHeight - this.currentHeight/4 ;

            //draw the text
            this.game.ctx.fillText(this.text, textX , textY );
           // this.game.ctx.fillText(this.text, textX - this.game.camera.xScroll, textY - this.game.camera.yScroll);
        },

        changeText: function(text){
            this.text = text;
        }
    })

    return Button;
})