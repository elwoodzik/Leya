(function(){
    var my = require("../../lib/myclass.js"); 
    var Multiplayer = require("./Multiplayer");
    var that = null;

    var Game = my.Class({
        
        constructor: function(io){
            that = this;
            
            this.initialize(io);
        },

        initialize: function(io){
            Multiplayer = new Multiplayer(io);

            Multiplayer.socket.initializeSockets(function(socket){
                that.socket = socket;
                
                Multiplayer.users.addNewUser('name', socket, function(err, user){
                    if(err){
                        console.error("\nWystąpił błąd przy probie dodania nowego użytkownika\n");
                    }else{
                        Multiplayer.rooms.joinRoom('global', socket, function(err){
                            if(err){
                                console.error(err);
                            }else{
                                console.log('dolaczyles do pokoju');
                                // tutaj wprowadzac swoje sockety
                                socket.on("message", that.message);
                                socket.on("disconnect", that.disconnect);
                                Multiplayer.socket.emitToAll("message", "This is my message");
                            }
                        })
                    }
                });
            });
        },

        disconnect: function(){
            Multiplayer.users.removeUser(this.id, function(err, user){
                if(err){
                    console.error("\nWystąpił błąd przy probie disconnect\n");
                }else{
                    console.log("\nUżytkownik poprawnie WYLOGOWANY z servera" + user.id +"\n");
                   
                    Multiplayer.rooms.leaveRoom(user.room.name, that.socket);
                }
            })
        },

        message: function(data){
          
            
        }
    });

    module.exports = Game;
})();



