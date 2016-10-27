(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    var that = null;
        
    var Users = my.Class({
        
        constructor: function(multiplayer){
           that = this;
           this.users = [];
           this.multiplayer = multiplayer;
        },

        addNewUser: function(name, socket, callback){
            if(!socket || typeof callback !== 'function'){
                return callback(true);
            }else{
                var user = {
                    id: socket.id,
                    name: name,
                    socket: socket,
                }
                this.users.push(user);
                return callback(false, user);
            }
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

        removeUser: function(id, callback){
            var user = this.findUserById(id);
            if(user){
                var index = this.users.indexOf(user);
                this.users.splice(index, 1);
                if(typeof callback === 'function'){
                     return callback(false, user);
                }
            }
            else if(typeof callback === 'function'){
                return callback("\nWystąpił błąd przy probie dodania nowego użytkownika\n");
            }
           
        }
        
    });

    module.exports = Users;
})();



