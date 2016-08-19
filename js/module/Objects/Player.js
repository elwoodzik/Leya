define([
	'Class',
	'lib_module/client/Sprite'
], function(my, Sprite){
	var that;

	var Player = my.Class(Sprite, {

		constructor: function(game, context, x, y, key, width, height){
			Player.Super.apply(this, arguments);
            
            that = this;
            that.game = game;

            this.startX = x;
            this.startY = y;

            this.anims();
            this.configure();
		},
		
		update: function(dt){
			
            superUpdate.call(this, dt);

            that.game.physic.collide(this, that.game.ARR.boxBlocks, this.collideMoveBox);

            that.game.physic.collide(this, that.game.ARR.boxDescBlocks, this.collideDestroyBox)

            that.game.physic.collide(this, that.game.ARR.lifts, this.collideLifts);

            that.game.physic.overlap(this, that.game.ARR.waterBlocks, this.overlapWater);

            this.body.platformer.move(dt);
		},


        overlapWater: function(p, w, dir, oy, ox){
            p.x = p.startX;
            p.y = p.startY;
            p.checkLife();
        },

        collideMoveBox: function(p, b, dir, oy, ox){
            if(dir === 'b'){
                p.body.falling = false;
                p.body.jumping = false;
                
                if(b.body.immoveable){
                    b.y -= oy;
                }                 
            }
        },

        collideDestroyBox: function(p, b, dir, oy, ox){
             if(dir === 'b'){
                p.body.falling = false;
                p.body.jumping = false;
                
                if(b.body.immoveable){
                    b.y -= oy;
                }                 
            }
            if(dir === 't'){
                p.body.velocity.y = p.body.velocity.y/2;
                b.destroy(that.game.ARR.boxDescBlocks);
            }
            if(dir === 'l'){
                p.body.velocity.x = -p.body.velocity.x/2
            }
        },

        collideLifts: function(p, b, dir, oy, ox){
            if(dir === 'b'){
                p.body.falling = false;
                p.body.jumping = false;
                
                if(this.game.keyboard._pressed['D'] || this.game.keyboard._pressed['A'] || this.game.keyboard._pressed['left'] || this.game.keyboard._pressed['right']){
                    p.body.platformer.onplatform = false;
                }else{
                    p.body.velocity.x = b.body.velocity.x ;
                    p.body.platformer.onplatform = true;
                    p.y = b.y - p.currentHeight+2;
                }
                
            }
            if(dir === 't'){
                p.body.velocity.y = p.body.velocity.y/2
            }

            if(dir === 'r'){
                p.body.velocity.x = -p.body.velocity.x/2
            }
        },

        checkLife: function(){
            if(this.life > 1 ){
                this.life--;
               	that.game.ARR.playerLifes[this.life].animations.play('empty')
            }else{
                that.game.ARR.playerLifes[0].animations.play('empty')
                that.game.state.start('Menu');
            }
        },

        changeImage: function(key){
            return this.image = this.loader.assetManager.get(key); 
        },

        anims: function(){
            this.animations.add('idle', 0,195, 65, 90, [0]);
            this.animations.add('moveRight', 0, 0, 73, 90, [0,1,2,3,4]);
            this.animations.add('moveLeft', 0, 0, 73, 90, [0,1,2,3,4], true);
            this.animations.play('idle');
        },

        configure: function(){
            this.body.colideWorldSide = true;
            this.body.immoveable = true;
            
            this.zIndex = 6;
            this.life = 3;

            var lifeX = 30; 
            that.game.ARR.playerLifes = [];

            for(var i=0; i<this.life; i++){
                this.lifeSprite = that.game.add.sprite('main', lifeX, 20, 'life');
                this.lifeSprite.animations.add('full', 0,0, 53, 45, [0]);
                this.lifeSprite.animations.add('empty', 53,0, 53, 45, [0]);
                this.lifeSprite.animations.play('full')
                this.lifeSprite.static = true;
                this.lifeSprite.zIndex = 10;
                lifeX += 60;

                that.game.ARR.playerLifes.push(this.lifeSprite);
            }
            
            // dodaje obsluge kamery do gracza

            var camera = this.game.add.camera(0, 0, this.game.width, this.game.height, this.game.portViewWidth, this.game.portViewHeight);
            camera.follow(this, this.game.width/2, this.game.height/2);

            
        }
	})

    var superUpdate = Player.Super.prototype.update;
	
	return Player;
})