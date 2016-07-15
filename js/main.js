requirejs.config({
    waitSeconds: 110,
    paths: {
        'Class': 'lib/myclass',
        'AssetManager': 'lib_module/client/AssetManager',
        'Socket': 'http://localhost:3000/socket.io/socket.io',
        'Game': 'lib_module/client/Game'
    },
});
    
    
require([ 
    'module/Loader',
]);
