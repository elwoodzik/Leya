define(['Class'], function(my){
	
    var that;

	var Pool = my.Class( {
		
		constructor: function(_game, _type, _count){
            that = this;
            that.game = _game;

            this.pool = [];
            this.type = _type;
            this.count = _count;
		},

        createSprite: function(game, context, x, y, key, width, height){

            for(i = 0; i < this.count; i++){
                var obj = new this.type(game, context, x, y, key, width, height);
                obj.used = false;
                this.pool[i] = obj;
            }   
        },

        get: function(_x,_y){
            var b = null;

            if (this.pool.length > 0){
                b = this.pool.pop();
                b.x = _x;
                b.y = _y;
                b.used = true;
            }else{
                throw "Probujesz stworzyc wiecej obiektow niz zostało to przypisane do obiektu Pool"
            }

            //that.game.gameObject.push(b);
            return b;

        },

        free: function(b, arr){
            // for (var i=0, l=arr.length; i < l; i++){
            //     if (arr[i] == b){
            //        
            //         b.kill(arr);
            //     }
            // }
            b.used = false;
            b.x = -1100;
            b.y = -1100;
            b.kill(arr);
            this.pool.unshift(b);
            b = null;

        }

	  	
	});

	return Pool;
});