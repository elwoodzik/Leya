(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    var that = null;
        
    var Users = my.Class({
        
        constructor: function(multiplayer){
           that = this;
           this.users = [];
           this.multiplayer = multiplayer;
        },

        addNewUser: function(socket, callback){
            var user = {
                id: socket.id,
                //name: name,
                socket: socket,
            }
            that.users.push(user);
           
            that.multiplayer.rooms.joinRoom('global', socket, function(err, room, sock){
                if(err){
                    console.error(err);
                    callback(err);
                }else{
                    that.multiplayer.objs.getObj(socket)
                    callback(false);
                }
            })
        },

        findUserById: function(id){
            for(var i=0; i<this.users.length; i++){
                var user = this.users[i];

                if(user.id === id){
                    return user;
                }
            }
            return console.error('Nie znaleziono uzytkownika o id: ' + id);
        },

        removeUser: function(){
            var id = this.id;
            var user = that.findUserById(id);
            if(user){
                var index = that.users.indexOf(user);
                that.users.splice(index, 1);
                that.multiplayer.rooms.leaveRoom(user, function(err){
                    if(err){
                        console.error("\nWystąpił błąd przy probie disconnect\n");
                    }else{
                        //console.log("\nUżytkownik poprawnie WYLOGOWANY z servera" + id +"\n");
                        that.multiplayer.objs.remove(id);
                    }
                })
            }
            else {
                console.error('blad kurwa!');
            }
           
        }
        
    });

    module.exports = Users;
})();



