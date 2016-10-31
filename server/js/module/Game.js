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

                socket.on("disconnect", that.disconnect);

                Multiplayer.users.addNewUser('name', socket, function(err, user){
                    if(err){
                        console.error(err);
                    }else{
                        Multiplayer.rooms.joinRoom('global', socket, function(err){
                            if(err){
                                console.error(err);
                            }else{
                                //console.log('dolaczyles do pokoju');
                                // tutaj wprowadzac swoje sockety
                                socket.on("message", that.message);
                                socket.on("add object", Multiplayer.objs.add);
                                socket.on("update obj", that.update);
                                
                                Multiplayer.objs.getObj(socket.id);
                            }
                        })
                    }
                });
            });
        },

        disconnect: function(){
            var id = this.id;
            Multiplayer.users.removeUser(this.id, function(err, user){
                if(err){
                    console.error("\nWystąpił błąd przy probie disconnect\n");
                }else{
                    Multiplayer.rooms.leaveRoom(user, function(err){
                        if(err){
                            console.error("\nWystąpił błąd przy probie disconnect\n");
                        }else{
                            //console.log("\nUżytkownik poprawnie WYLOGOWANY z servera" + id +"\n");
                            
                            Multiplayer.objs.remove(id);
                        }
                    })
                }
            })
        },

        message: function(data){
          
        },

        addObject: function(data, callback){
            Multiplayer.objs.add(data, this.id, this, function(obj){
                callback(false, obj.sockID);
            });   
        },

        update: function(data){
            Multiplayer.objs.update(data, this)
        }
        
    });

    module.exports = Game;
})();



