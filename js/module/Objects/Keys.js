define([
    'Class',
    'lib_module/client/Sprite'
], function(my, Sprite){
    var that;

    var Keys = my.Class(Sprite, {

        constructor: function(game, context, x, y, key, width, height){
            Keys.Super.apply(this, arguments);
            
            that = this;

            this.anims();
        },
        
        update: function(dt){
            superUpdate.call(this, dt);
        },

        anims: function(){
            this.animations.add('blue', 130, 0*72, 72, 70, [0]);
            this.animations.add('green', 130, 2*72, 72, 70, [0]);
            this.animations.add('yellow', 65, 5*72, 72, 70, [0]);
            this.animations.add('red', 65, 6*72, 72, 70, [0]);
        },

        configure: function(options){
            var key = options.key || 'blue';
            this.animations.playOnce(options.key, 7);
        }
    })

    var superUpdate = Keys.Super.prototype.update;
    
    return Keys;
})