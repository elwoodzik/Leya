(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
  
        
    var Rooms = my.Class({
        
        constructor: function(multiplayer){
            this.rooms = [];
            this.multiplayer = multiplayer;
        },


        joinRoom: function(roomName, socket, callback){
            var room = this.findRoomByName(roomName);
            var user = this.multiplayer.users.findUserById(socket.id);

            if(room && user){
                if(room.maxUsers === 0 || room.users < room.maxUsers){
                    user.room = roomName;
                    room.players.push(user);
                    room.users++;
                    socket.join(roomName);
                   
                    callback(false, room)
                    console.log(this.getUsersIdList(roomName));
                }else{
                    callback('Pokoj jest pełny', room);
                }
            }else{
                 callback('Podany pokoj nie istnieje', room)
            }
        },

        getUsersIdList: function(roomName){
            var room = this.findRoomByName(roomName);
            var users = [];
            if(room){
                for(var i =0; i<room.players.length; i++){
                    users.push(room.players[i].id);
                }
                return  users;
            }
        },

        leaveRoom: function(user, callback){
            var room = this.findRoomByName(user.room);

            if(user){
                var index = room.players.indexOf(user);      
                room.players.splice(index, 1);
                room.users--;
                user.socket.leave(user.room);
                callback(false);
            }else{
                callback('wystapil blad');
            }
        },

        createRoom: function(roomName, maxUsers){
            var room = this.findRoomByName(roomName);

            if(!room){
                var room = {
                    name: roomName,
                    maxUsers: maxUsers,
                    users: 0,
                    players: []
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



