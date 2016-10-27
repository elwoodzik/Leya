requirejs.config({
    waitSeconds: 110,
    paths: {
        'Class': 'lib/myclass',
        'AssetManager': 'lib_module/client/AssetManager',
        //'Socket': 'http://localhost:4000/socket.io/socket.io.js', // /socket.io/socket.io.js
        'Socket': '/socket.io/socket.io.js',
        'Game': 'lib_module/client/Game'
    },
});
    
    
require([ 
    'module/Loader',
]);
