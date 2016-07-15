define(['Class'], function(my, io){
    
   var Multiplayer = my.Class({

        constructor: function(game, _ip){
            require(['Socket'], function(io){
                this.socket = io.connect(_ip);
            });
        },

        onSocket: function(name, callback){
            if(typeof callback === 'function'){
                this.socket.on(name, callback);
            }else{
                throw 'Metoda przyjmuje dwa parametry. Nazwe Socketu (String) i callback (Function)';
            }
            
        },
        
        emit: function(name, data){
            if(!name){
                throw 'musisz podac jako pierwszy parametr nazwe socketu';
            }
            this.socket.emit(name, data);
        }
    });

    return Multiplayer;
})
