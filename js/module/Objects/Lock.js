define([
    'Class',
    'lib_module/client/Sprite'
], function(my, Sprite){
    var that;

    var Lock = my.Class(Sprite, {

        constructor: function(game, context, x, y, key, width, height){
            Lock.Super.apply(this, arguments);
            
            that = this;

            this.anims();
        },
        
        update: function(dt){
            superUpdate.call(this, dt);

            that.game.physic.overlap(that.game.VAR.player, this, this.putIn);
        },

        putIn: function(player, lock){
            var hudKey = player.keysIcon[lock.state];
            var lockState = lock.state;
            
            if(hudKey.available && this.game.keyboard.use['SPACE'].pressed){
                hudKey.moveToPoint(lock.x+lock.currentHalfWidth, lock.y-lock.currentHalfHeight, 10, function(){
                    hudKey.used = false;
                    hudKey.available = false;
                })
            }
        },

        anims: function(){
            this.animations.add('blue', 6*72, 7*72, 70, 70, [0]);
            this.animations.add('green', 1*72, 8*72, 70, 70, [0]);
            this.animations.add('yellow', 6*72, 4*72, 70, 70, [0]);
            this.animations.add('red', 6*72, 5*72, 70, 70, [0]);
        },

        configure: function(options){
            var lock = options.lock || 'blue';
            this.animations.playOnce(options.lock, 7);
        }
    })

    var superUpdate = Lock.Super.prototype.update;
    
    return Lock;
})