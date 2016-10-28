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

                Multiplayer.users.addNewUser('name', socket, function(err, user){
                    if(err){
                        console.error(err);
                    }else{
                        Multiplayer.rooms.joinRoom('global', socket, function(err){
                            if(err){
                                console.error(err);
                            }else{
                                console.log('dolaczyles do pokoju');
                                // tutaj wprowadzac swoje sockety
                                socket.on("message", that.message);
                                socket.on("add object", that.addObject);
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
                    Multiplayer.rooms.leaveRoom(user, function(err){
                        if(err){
                            console.error("\nWystąpił błąd przy probie disconnect\n");
                        }else{
                            console.log("\nUżytkownik poprawnie WYLOGOWANY z servera" + that.id +"\n");
                        }
                    })
                }
            })
        },

        message: function(data){
          
        },

        addObject: function(data){
            var id = Multiplayer.socket.socket.id;
            Multiplayer.objs.add(data, id, function(arr){
                console.log(arr)
               // Multiplayer.socket.emitToAll("message", "This is my message");
            });
        }
    });

    module.exports = Game;
})();



