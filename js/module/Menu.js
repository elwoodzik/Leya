define(['Class'], function(my){
	
	var pony;
	var cards = [];
	var cardsR = [];
	var cards1 = [];
	var cards2 = [];

	var Menu = my.Class({

		constructor: function(){

		},

		create: function(){
			
			this.add.text("Pasjans Królewski", (this.canvas.width/2)-522, 170, 152, "white", null);

			this.add.button("Nowe rozdanie", this.canvas.width/2-130, this.canvas.height/2+130, 360, 90,'#cccccc','white','white', this.currentState.playGame);

			this.add.button("Opcje", this.canvas.width/2-130, this.canvas.height/2+250, 360, 90,'#cccccc','white','white', this.currentState.showOptions);		
			
			var x = 1000;
			var y = 280;
			var ang = 0;
			var ind = 8;
			for(var i=0; i<9; i++){
				var rCardColor = this.rand(0,3);
				var rType = this.rand(0,12);
				
				cards1[i] = this.add.sprite(x,y,this.res.res.cardsImg);
	            cards1[i].animations.add('card', 0,214*rCardColor, this.res.res.cardW, this.res.res.cardH, [rType]);
	            cards1[i].animations.play('card');
	            cards1[i].body.setAnchor(0, 1);
	            cards1[i].body.angle = ang;
	           	cards1[i].setIndex(ind);
				
	            //x-= 10;
	            //y+= 10;
	            ang -= 12;
	            ind--;
			}

			var x1 = 1000;
			var y1 = 280;
			var ang1 = 0;
			var ind1 = 10;
			for(var i=0; i<4; i++){
				var rCardColor = this.rand(0,3);
				var rType = this.rand(0,12);

				cards2[i] = this.add.sprite(x1,y1,this.res.res.cardsImg);
	            cards2[i].animations.add('card', 0,214*rCardColor, this.res.res.cardW, this.res.res.cardH, [rType]);
	            cards2[i].animations.play('card');
	            cards2[i].body.setAnchor(0, 1);
	            cards2[i].body.angle = ang1;
	            cards2[i].setIndex(ind1)
				//cards2[i].setScale(1.5);
	           
	            //x1+= 10;
	            //y1+= 10;
	            ang1 += 12;
	            ind1++;
			}
			
            //c1.setIndex(3);

			for(var i=0; i<6; i++){
				var rVelY = this.rand(2,5);
				var rVelX = 0;//this.randF(0.3,0.2);
				var rX = this.rand(0, 350);
				var rY = this.rand(-200, -1200);
				var rAngle = this.randF(-1,1);
				var rCardColor = this.rand(0,3);
				var rType = this.rand(0,12);
				
				if(rAngle === 0){
					rAngle = 1;
				}
				cards[i] = this.add.sprite(1,1,this.res.res.cardsImg);
	            cards[i].animations.add('card', 0,214*rCardColor, this.res.res.cardW, this.res.res.cardH, [rType]);
	            cards[i].animations.play('card');
	            cards[i].x = rX;
	            cards[i].y = rY;
	            cards[i].body.velocity.y = rVelY;
	            cards[i].body.velocity.x = rVelX;
	            cards[i].body.setAnchor(0.5, 0.5);
	            cards[i].rAngle = rAngle+1;
			}

			for(var j=0; j<6; j++){
				var rVelY = this.rand(2,5);
				var rVelX = 0;//this.randF(0.3,0.2);
				var rX = this.rand(1350, this.canvas.width-120);
				var rY = this.rand(-200, -1200);
				var rAngle = this.randF(-1,1);
				var rCardColor = this.rand(0,3);
				var rType = this.rand(0,12);
				
				if(rAngle === 0){
					rAngle = 1;
				}
				cardsR[j] = this.add.sprite(1,1,this.res.res.cardsImg);
	            cardsR[j].animations.add('card', 0,214*rCardColor, this.res.res.cardW, this.res.res.cardH, [rType]);
	            cardsR[j].animations.play('card');
	            cardsR[j].x = rX;
	            cardsR[j].y = rY;
	            cardsR[j].body.velocity.y = rVelY;
	            cardsR[j].body.velocity.x = rVelX;
	            cardsR[j].body.setAnchor(0.5, 0.5);
	            cardsR[j].rAngle = rAngle+1;
			}
	 		
            
		},

		update: function(){
			for(var i=0; i<cards.length; i++){
				var card = cards[i];
				card.body.angle += card.rAngle;

				if(card.y > this.canvas.height){
					var rVelY = this.rand(1,4);
					var rVelX = 0; //;this.rand(-1,1);
					var rX = this.rand(50, 300);
					var rY = this.rand(-1500, -200);
					var rAngle = this.randF(-2,2);
					var rCardColor = this.rand(0,3);
					var rType = this.rand(0,12);
					card.body.velocity.y = rVelY;
	            	card.body.velocity.x = rVelX;
	            	card.x = rX;
	            	card.y = rY;
					card.states.card.f[0] = rType;
					card.states.card.y = 214 * rCardColor;
				}
			}

			for(var j=0; j<cardsR.length; j++){
				var card = cardsR[j];
				card.body.angle += card.rAngle;

				if(card.y > this.canvas.height){
					var rVelY = this.rand(1,4);
					var rVelX = 0; //;this.rand(-1,1);
					var rX = this.rand(1350, this.canvas.width-120);
					var rY = this.rand(-1500, -200);
					var rAngle = this.randF(-2,2);
					var rCardColor = this.rand(0,3);
					var rType = this.rand(0,12);
					card.body.velocity.y = rVelY;
	            	card.body.velocity.x = rVelX;
	            	card.x = rX;
	            	card.y = rY;
					card.states.card.f[0] = rType;
					card.states.card.y = 214 * rCardColor;
				}
			}
			
		},

		playGame: function(){
            this.state.start("Solitaire");
		},

		showOptions: function(){
            this.state.start("Options");
		}

	})

	return Menu;
})