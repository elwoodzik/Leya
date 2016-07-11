define(['Class'], function(my){
    
    var Body = my.Class({
        
        constructor: function(game){

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
            if(obj.y + obj.states[obj.state].fH < obj.game.canvas.height  ){
                obj.body.velocity.y += obj.body.gravity.y/1000;
            }
        },
        
        rotate: function(val){
            return this.angleSpeed = val;
        },
        
        setAnchor: function(x,y){
           this.anchorX = x;
           this.anchorY = y;
        }
    });

    return Body;
})
