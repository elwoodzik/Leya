define(['Class', 'lib_module/client/PlatformerMove'], function(my, PlatformerMove){
    
    var Body = my.Class({
        
        constructor: function(game, sprite){
            this.game = game;
            this.sprite = sprite;

           

            this.platformerMove = new PlatformerMove(this);

            
            this.velocity = {
                x: 0,
                y: 0
            };
            this.gravity = {
                x: 0,
                y: 0
            }
            //
            this.angle = 0;
            this.angleSpeed = 0;
            this.anchorX = 0;
            this.anchorY = 0;
            //
            this.colideWorldSide = false;
            this.colideWorldSideLeft = true;
            this.colideWorldSideRight = true;
            this.colideWorldSideBottom = true;
            this.colideWorldSideTop = true;

            this.isGround = false;

            this.worldBounds = false;
            this.isOutOfScreen = false;
        },

        useGravity: function(obj){
            // !obj.body.isGround && 
            if(obj.y + obj.states[obj.state].fH < obj.game.canvas.height && !obj.body.ground ){
                obj.body.velocity.y += obj.body.gravity.y/1000;
            }else{
                obj.body.velocity.y = 0;
                obj.body.ground = false;
            }
        },

        rotate: function(val){
            return this.angle = val;
        },
        
        setAnchor: function(x,y){
           this.anchorX = x;
           this.anchorY = y;
        },

        rotateByMouse: function(min, max){
            var _min = min || false;
            var _max = max || false;
            var _ang = Math.atan2(this.game.mouse.mouseY - this.sprite.y - this.sprite.currentHalfWidth, this.game.mouse.mouseX - this.sprite.x - this.sprite.currentHalfHeight)*(180/Math.PI);
            if(_min && _max){
                if(_ang <= max && _ang >= min){
                     this.angle = Math.atan2(this.game.mouse.mouseY - this.sprite.y - this.sprite.currentHalfWidth, this.game.mouse.mouseX - this.sprite.x - this.sprite.currentHalfHeight)*(180/Math.PI);
                }
            }else{
                this.angle = Math.atan2(this.game.mouse.mouseY - this.sprite.y - this.sprite.currentHalfWidth, this.game.mouse.mouseX - this.sprite.x - this.sprite.currentHalfHeight)*(180/Math.PI);
            }
            
            return this.angle;
        }
    });

    return Body;
})
