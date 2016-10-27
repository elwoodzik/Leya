var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        
    });
});
// router.get('/:id', function (req, res, next) {
//     res.render('templates/main/layout', {
//         menu: menu.mainMenu
//     });
// });

// router.get('/:id/:id', function (req, res, next) {
//     res.render('templates/main/layout', {
//         menu: menu.mainMenu
//     });
// });

// router.get('/:id/:id/:id', function (req, res, next) {
//     res.render('templates/main/layout', {
//         menu: menu.mainMenu
//     });
// });
// router.get('/:id/:id/:id/:id', function (req, res, next) {
//     res.render('templates/main/layout', {
//         menu: menu
//     });
// });

module.exports = router;



