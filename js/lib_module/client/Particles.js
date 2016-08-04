define(['Class', 'require'], function(my, require){
	
  
	var Particles = my.Class({
		constructor: function(game, x, y, options){
           
            this.options =  options || {};
           
			this.game = game; 
			this.used = true;
			this.x = x || 0; 
			this.y = y || 0; 
			
			this.zIndex = 5;

			this.contextType = 'main';
            
            this.repeatX = x;
			this.repeatY = y;
		    //
			this.speed = this.options.speed || {x: Math.random()*3, y: -4+Math.random()*4};

			this.velocity ={
				x: this.speed.x,
				y: this.speed.y
			}
            //
            if(this.options.radius){
                this.radius = this.game.rand(this.options.radius.min, this.options.radius.max) + this.options.radius.static;
            }else{
                 this.radius = this.game.rand(0,10)+5;
            }
		
            //
            this.life = this.options.life || this.game.rand(135,145);
            this.remaining_life = this.life;
            //
            this.colors = this.options.colors || {
                r: this.game.rand(155,255),
                g: this.game.rand(0,180),
                b: 0
            }
            //
            this.composite = this.options.composite || "lighter"; //screen, lighter
            //
			//this.game.physic.outOfScreen(this)

			this.gameObjectLength = Object.keys(this.game.gameObject).length;
			this.game.gameObject[this.gameObjectLength] = this; 

		},

		draw: function(){
			this.game.ctx.globalCompositeOperation = this.composite; 
			this.opacity = Math.round(this.remaining_life/this.life*100)/100;
		
			this.game.ctx.beginPath();
			var gradient = this.game.ctx.createRadialGradient(this.x - this.game.camera.xScroll, this.y - this.game.camera.yScroll, 0, this.x- this.game.camera.xScroll, this.y- this.game.camera.yScroll, this.radius);
			gradient.addColorStop(0, "rgba("+this.colors.r+", "+this.colors.g+", "+this.colors.b+", "+this.opacity+")");
			gradient.addColorStop(0.5, "rgba("+this.colors.r+", "+this.colors.g+", "+this.colors.b+", "+this.opacity+")");
			gradient.addColorStop(1, "rgba("+this.colors.r+", "+this.colors.g+", "+this.colors.b+", 0)");
			this.game.ctx.fillStyle = gradient;
			this.game.ctx.arc(this.x - this.game.camera.xScroll, this.y - this.game.camera.yScroll, this.radius, Math.PI*2, false);
			this.game.ctx.fill();
			this.game.ctx.closePath();
			
			this.game.ctx.globalCompositeOperation = "source-over";
		},

		update: function(dt){
			this.x =  Math.floor(this.x  + (dt * this.velocity.x));
            this.y =  Math.floor(this.y  + (dt * this.velocity.y));
			this.remaining_life--;
			this.radius-=0.5;
			if(this.remaining_life < 0 || this.radius < 0){
				//a brand new particle replacing the dead one
				if(this.options.radius){
                    this.radius = this.game.rand(this.options.radius.min, this.options.radius.max) + this.options.radius.static;
                }else{
                    this.radius = this.game.rand(0,10)+5;
                }
                this.speed = this.options.speed || {x: Math.random()*3, y: -3+Math.random()*3};
				
				this.remaining_life = this.life;
                
				this.x = this.repeatX;
				this.y = this.repeatY;
                
				
			}
		},

		destroy: function(array){
			this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
            if(array){
                array.splice(array.indexOf(this), 1);
            }
		},
	});

	return Particles;
})
