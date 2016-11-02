(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    var Multiplayer = require("./../lib_module/Multiplayer");
    var that = null;

    var Game = my.Class({
        
        constructor: function(io){
            that = this;
            
            this.initialize(io);
        },

        initialize: function(io){
            Multiplayer = new Multiplayer(io);
            
            Multiplayer.socket.initializeSockets(function(socket){
                // tutaj sockety uzytkownika
                // socket.on(name,function)  
            });
        }

    });

    module.exports = Game;
})();



