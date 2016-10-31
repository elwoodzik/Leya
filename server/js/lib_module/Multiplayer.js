(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    var Socket = require("./Socket");
    var Users = require("./Users");
    var Rooms = require("./Rooms");
    var Objs = require("./Objs");
              
    var Multiplayer = my.Class({
        
        constructor: function(io){
            this.socket = new Socket(this, io);
            this.users = new Users(this);
            this.rooms = new Rooms(this);
            this.objs = new Objs(this);
            this.rooms.createRoom('global', 0);
        },

        getSocketId: function(){
            console.log('skasowac getSOCKET')
            //return this.socket.io;
        }
        
    });

    module.exports = Multiplayer;
})();



