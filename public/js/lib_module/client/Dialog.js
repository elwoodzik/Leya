define(['Class', 'lib_module/client/_ObjectSettings'], function(my, Settings){
	
    var that;

	var Dialog = my.Class(null, Settings, {
		
		constructor: function(game, context, x, y, width, height, strokeColor, fillColor){
            that = this;
            that.game = game;

            this.isOutOfScreen = false;
            this.updateOfScreen = true;

            this.pooled = false;

            this.x = x || 1; 
			this.y = y || 1; 

            this.obj = [];
            
            this.fW = width || 100;
            this.fH = height || 100;

            this.strokeColor = strokeColor;
            this.fillColor = fillColor;

	        if(!this.pooled){
                this.setContext(context);
	        }

            this.static = true;
            
            this.border = that.game.add.rect('main', this.x, this.y, this.fW,this.fH, this.strokeColor, this.fillColor);
            this.border.static = true;

            this.button1 = that.game.add.button('Menu', this.x + 110, this.y + this.fH - 80 , 180, 60, null, null, 'black', 'green', '#333', null);
            this.button1.static = true;
            
            this.button2 = that.game.add.button('Ok', this.x + this.fW - 290, this.y + this.fH - 80 , 180, 60, null, null, 'black', 'green', '#333', null);
            this.button2.static = true;
            
            this.headline = that.game.add.text('main', 'Jestem tytułem', this.x + 200, this.y + 60, 44, '#333', null);
            this.headline.static = true;
		},

        update: function(dt){
			
		},

        toggle: function(bool){
            if(!bool){
                this.border.used = false;
                this.button1.used = false; 
                this.button2.used = false;
            }else{
                this.border.used = true;
                this.button1.used = true; 
                this.button2.used = true;
            }
        },

        configure: function(options){
            var alfa = options.alfa || 1;
            var borderWidth = options.borderWidth || 1;
            this.used = options.used === false ? false : true;
            this.toggle(this.used);
            this.main = options.main || null;

            if(options.close){
                this.closeButton = that.game.add.button('X', this.x + this.fW - 45, this.y  , 45, 45, null, 'red', 'black', 'black', '#333', that.close);
                this.closeButton.static = true;
            }
           
            if(options.button1){
                this.button1.text = options.button1.text || 'Menu';
                this.button1.currentWidth = options.button1.width || 180;
                this.button1.currentHeight = options.button1.height || 60;
                this.button1.strokeStyle = options.button1.strokeColor || '#333';
                this.button1.strokeStyleHover = options.button1.strokeColorHover || 'green';
                this.button1.fillStyle = options.button1.fillColor || null;
                this.button1.fillStyleHover = options.button1.fillColorHover || null;
                this.button1.textColor = options.button1.textColor || '#333';
                this.button1.borderWidth = options.button1.borderWidth || 2;
                this.button1.action = options.button1.action || null;
            }
            if(options.button2){
                this.button2.text = options.button2.text || 'Menu';
                this.button2.currentWidth = options.button2.width || 180;
                this.button2.currentHeight = options.button2.height || 60;
                this.button2.strokeStyle = options.button2.strokeColor || '#333';
                this.button2.strokeStyleHover = options.button2.strokeColorHover || 'green';
                this.button2.fillStyle = options.button2.fillColor || null;
                this.button2.fillStyleHover = options.button2.fillColorHover || null;
                this.button2.textColor = options.button2.textColor || '#333';
                this.button2.borderWidth = options.button2.borderWidth || 2;
                this.button2.action = options.button2.action || null;
            }
            if(options.headline){
                this.headline.text = options.headline.text || 'Jestem tytułem';
                this.headline.x = this.x + options.headline.x || this.x + 200;
                this.headline.y = this.y + options.headline.y || this.y + 60;
                this.headline.size = options.headline.size || 42;
                this.headline.color = options.headline.color || '#333';
            }
            this.border.setBorderWidth(borderWidth);
			this.border.setAlfa(alfa);
            
            if(this.main){
                this.main.call(this, this);
            }
        },

        add: function(obj){
            if(typeof obj !== 'object'){
                return console.error('oczekiwano obiektu!');
            }else{
                that.obj.push(obj);
            }
        },

        close: function(){
            that.destroy();
            that.border.destroy();
            that.button1.destroy();
            that.button2.destroy();
            if(that.closeButton){ 
                that.closeButton.destroy();
            }
            that.headline.destroy();

            for(var i = 0; i<that.obj.length; i++){
                that.obj[i].destroy();
            }
            that.obj = [];
        }
	});

   

	return Dialog;
});