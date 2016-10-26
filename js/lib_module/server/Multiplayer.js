(function(){
    var my = require("../../lib/myclass.js"); 
    var Socket = require("./Socket");
    var Users = require("./Users");
    var Rooms = require("./Rooms");
        
        
    var Multiplayer = my.Class({
        
        constructor: function(io){
            this.socket = new Socket(this, io);
            this.users = new Users(this);
            this.rooms = new Rooms(this);
            this.rooms.createRoom('global', 0);
        },
        
    });

    module.exports = Multiplayer;
})();



