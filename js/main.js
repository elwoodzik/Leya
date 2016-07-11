requirejs.config({
    waitSeconds: 110,
    paths: {
        'Class': 'lib/myclass',
        'AssetManager': 'lib_module/AssetManager',
        'Game': 'lib_module/Game'
    },
});
    
    
require([
    'module/Loader',
]);
