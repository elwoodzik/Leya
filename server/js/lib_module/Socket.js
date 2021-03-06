(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    var that = null;

    var Socket = my.Class({
        
        constructor: function(multiplayer, io){
            that = this;
            this.io = io;
            this.socket = null;
            this.multiplayer = multiplayer;
            //this.initializeSockets(callback);
        },

        initializeSockets: function(callback){
            this.io.on('connection', function(socket){
                socket.on("disconnect", that.multiplayer.users.removeUser);

                that.multiplayer.users.addNewUser(socket, function(err){
                    if(err){
                        socket.emit("not connected", "Nie udało się połączyć. \n"+err )
                    }else{
                        socket.on("add object", that.multiplayer.objs.add);
                        socket.on("update obj", that.multiplayer.objs.update);

                        // callback socketow zdefiniowanych przez uzytkownika w Classie Game.
                        callback.call(this, socket);
                    }
                })
            });
        },

        onSocket: function(name, callback){
            if(typeof callback === 'function'){
                that.io.on(name, callback);
            }else{
                throw 'Metoda przyjmuje dwa parametry. Nazwe Socketu (String) i callback (Function)';
            }
        },

        // wysyla wiadomosc do wszystkich
        emitToAll: function(name, data){
            if(!name){
                throw 'musisz podac jako pierwszy parametr nazwe socketu';
            }
            
            this.io.emit(name, data);
        },

        // wysyla wiadomosc tylko do osoby wysylajacej socketa
        // emitToMe: function(name, data){
        //     if(!name){
        //         throw 'musisz podac jako pierwszy parametr nazwe socketu';
        //     }
            
        //     this.socket.emit(name, data);
        // },

        // wysyla wiadomosc do wszystkich z podanego pokoju (room)
        emitToRoom: function(name, room, data){
            if(!name){
                throw 'musisz podac jako pierwszy parametr nazwe socketu';
            }
            
            this.io.in(room).emit(name, data);
        },

        // wysyla wiadomosc tylko do okreslonego gracza
        emitToPlayer: function(name, id, data){
            if(!name){
                throw 'musisz podac jako pierwszy parametr nazwe socketu';
            }
            
            this.socket.broadcast.to(id).emit(name, data);
        },
        
        // wysyla wiadomosc do wszystkich oprocz osoby ktora wyslala socketa
        // broadcastToAll: function(name, data, sock){
        //     if(!name){
        //         throw 'musisz podac jako pierwszy parametr nazwe socketu';
        //     }
            
        //     sock.broadcast.emit(name, data);
        // }
    });

    module.exports = Socket;
})();



