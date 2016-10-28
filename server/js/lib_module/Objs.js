(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    
    var Objs = my.Class({

        STATIC: {
            ID: 0
        },

        constructor: function(multiplayer){
            this.objs = [];
            this.multiplayer = multiplayer;
            this.ID = 0;
        },

        add: function(obj, id, callback){
            obj.ID = Objs.ID;
            obj.socketID = id;
            this.objs.push(obj);

            callback(this.objs);
        },

        remove: function(obj, id, callback){
            obj.ID = this.ID;
            obj.socketID = id;

            this.objs.push(obj);
            this.ID++;
            callback(this.objs);
        }
        
    });

    module.exports = Objs;
})();



