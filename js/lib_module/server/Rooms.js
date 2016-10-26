(function(){
    var my = require("../../lib/myclass.js"); 
  
        
    var Rooms = my.Class({
        
        constructor: function(multiplayer){
            this.rooms = [];
            this.multiplayer = multiplayer;
        },


        joinRoom: function(roomName, socket, callback){
            var room = this.findRoomByName(roomName);
            var player = this.multiplayer.users.findUserById(socket.id);

            if(room){
                if(room.maxUsers === 0 || room.users < room.maxUsers){
                    room.users++;
                    player.room = room;
                    socket.join(roomName);
                    callback(false, room)
                    
                }else{
                    callback('Pokoj jest pełny', room);
                }
            }else{
                 callback('Podany pokoj nie istnieje', room)
            }
        },

        leaveRoom: function(roomName, socket){
            var room = this.findRoomByName(roomName);
            
            if(room){
                room.users--;
                socket.leave(roomName);
            }

            console.log(this.rooms);
         
        },

        createRoom: function(roomName, maxUsers){
            var room = this.findRoomByName(roomName);

            if(!room){
                var room = {
                    name: roomName,
                    maxUsers: maxUsers,
                    users: 0
                }
                this.rooms.push(room);
            }
        },

        findRoomByName: function(name){
            for(var i=0; i<this.rooms.length; i++){
                var room = this.rooms[i];

                if(room.name === name){
                    return room;
                }
            }
            return false;
        }
        
    });

    module.exports = Rooms;
})();



