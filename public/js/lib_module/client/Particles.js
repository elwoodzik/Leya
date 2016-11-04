define(['Class', 'lib_module/client/_ObjectSettings'], function(my, Settings){
	
  
	var Particles = my.Class(null, Settings, {
		constructor: function(game, x, y, options){
           
            this.options =  options || {};
           
			this.initializeGlobalSettings({
				game: game,
				pooled: false,
				context: 'main',
				x: x || 1,
				y: y || 1,
				key: null,
				width: 1,
				height: 1
			});

			
			this.zIndex = 7;
            
            this.repeatX = x;
			this.repeatY = y;
		    //
			this.speed = this.options.speed || {x: -3+Math.random()*5, y: -4+Math.random()*5};

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
            this.life = this.options.life || this.game.rand(10,35);
            this.remaining_life = this.life;
            //
            this.colors = this.options.colors || {
                r: this.game.rand(188,255),
                g: this.game.rand(0,200),
                b: 0
            }
            //
            this.composite = this.options.composite || "lighter"; //screen, lighter
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
	
			this.x =  (this.x  + (dt * this.velocity.x));
            this.y =  (this.y  + (dt * this.velocity.y));
			this.remaining_life--;
			this.radius-=0.6;
			
			if(this.remaining_life < 0 || this.radius < 0){
				//a brand new particle replacing the dead one
				if(this.options.radius){
                    this.radius = this.game.rand(this.options.radius.min, this.options.radius.max) + this.options.radius.static;
                }else{
                    this.radius = this.game.rand(0,10)+7;
                }
               
			    this.speed = this.options.speed || {x: -1+Math.random()*2, y: -3};
				this.velocity ={
					x: this.speed.x,
					y: this.speed.y
				}

				this.remaining_life = this.life;
                
				this.x = this.repeatX;
				this.y = this.repeatY;
			}
		}
	});

	return Particles;
})
