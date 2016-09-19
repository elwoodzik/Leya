define([
    'Class',
    'lib_module/client/Sprite'
], function(my, Sprite){
    var that;

    var Switch = my.Class(Sprite, {

        constructor: function(game, context, x, y, key, width, height){
            Switch.Super.apply(this, arguments);
            
            that = this;

            this.Box = that.game.CLASS.Box.getActivePool();

            this.anims();
        },
        
        update: function(dt){
            superUpdate.call(this, dt);

            that.game.physic.overlap(that.game.VAR.player, this, this.standIn);
            that.game.physic.overlap(this.Box, this, this.standIn);

            if(this.state === 'idle' && this.active){
                this.previousY = this.startY + 29;
                this.renderY = this.startY + 29;
                this.y = this.startY + 29;
                this.animations.playOnce('active', 12);
                return false;
            }else if(this.state === 'active' && !this.active){
                this.animations.playOnce('idle', 7);
                this.previousY = this.startY;
                this.renderY = this.startY;
                this.y = this.startY ;
                this.actOut(this.callbackOut);
                return false;
            }

            this.active = false;
        },

        standIn: function(player, sw){
            if(sw.state === 'idle'){
                sw.actIn(sw.callbackIn);
            }
            sw.active = true;
        },

        actIn: function(callback){
            if(typeof callback === 'function'){
                callback.call(this);
            }
        },

        actOut: function(callback){
            if(typeof callback === 'function'){
                callback.call(this);
            }
        },

        anims: function(){
            this.animations.add('idle', 360, 365, 72, 65, [0]);
            this.animations.add('active',360, 322, 72, 45, [0]);
            this.animations.playOnce('idle', 7);
        },

        configure: function(options){
            this.startX = this.x;
            this.startY = this.y;
            this.actOn = options.actOn;
            this.callbackIn = options.callbackIn;
            this.callbackOut = options.callbackOut;
        }
    })

    var superUpdate = Switch.Super.prototype.update;
    
    return Switch;
})