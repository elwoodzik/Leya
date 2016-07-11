define(['Class', 'lib_module/Sprite'], function(my, Sprite){
	
	var pony;

	var Card = my.Class(Sprite, {

		constructor: function( ff,cc){
		 	Card.Super.apply(this, arguments);
		 	console.log(cc)
		},

		

	})

	return Card;
})