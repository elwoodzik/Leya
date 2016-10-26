(function(){
    var my = require("../../lib/myclass.js"); 
    var that = null;
        
    var Users = my.Class({
        
        constructor: function(){
           that = this;
           this.users = [];
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
                return callback(false, user);
            }
            return callback(true);
        }
        
    });

    module.exports = Users;
})();



