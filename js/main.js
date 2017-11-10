/**
 * @author  Ikaros Kappler
 * @date    2017-11-10
 * @version 1.0.0
 **/

 (function($) {

 	var $container;

 	var init = function() {
 		console.log('init');
 		$container = $('#container').empty();

 		var hatchCount = 24;
 		var validator = null;

 		// Add some hatches
 		for( var i = 0; i < hatchCount; i++ ) {
 			console.log(i);
 			var $hatch = $( '<div/>' )
 				.html( i+1 )
 				.addClass('hatch')
 				.addClass('index-'+i )
 				.attr('id','index-'+i)
 				.data('index',i)
 				.data('color',randomColor())
 				.data('frequency', randomFloat( 493.883/3-100, 493.883/3+100 ) )
 				.mouseover( function() { 
 						$(this).addClass('hover');
 				} )
 				.mouseout( function() { 
 						$(this).removeClass('hover');
 				} )
 				.click( function() {
 					if( simon.playing )
 						return;
 					var index = $(this).data('index'); 
 					simon.animateElement( index, function() { 
 						console.log('element animated.'); 
 						if( validator == null || !validator.validate(index) ) {
	 						alert('WRONG');
	 						validator = null;
	 						return;
	 					}
 						else if( validator.endReached() ) {
	 						alert( 'YOU GOT IT');
	 						validator = null;
	 						prepareNext();
	 					}
 					} );
 					
 				} );
 			$container.append( $hatch );
 		} // END for


 		var prepareSequence = function() {
 			$('#level').empty().html( simon.sequenceLength );
 			simon.play( function() { console.log('sequence played.') ; } );
 			validator = simon.getValidator();
 		};

 		var prepareNext = function() {
 			simon.next(); 
 			prepareSequence();
 		};


 		var synth = null;
 		try {
 			synth = new Synthesizer();
			//synth.play(493.883/3);
		} catch( e ) {
			console.log( 'Failed to create audio context.' );
		}



 		var simon = new Simon( hatchCount, synth );
 		$('button#start').click( function() { 
 				simon.start(); 
 				prepareSequence();
 			} );
 		$('button#next').click( function() { 
 				prepareNext();
 			} );

 	}; // END function init


 	$(document).ready( init );

 })($);



var randomColor = function() {
 	var COLORS = [
 		'#d80000',
 		'#88ff00',
 		'#00ff88',
 		'#0088ff',
 		'#00a800',
 		'#0000a8'
 	];
 	return COLORS[ randomInt(0,COLORS.length) ];
};

var randomInt = function(min,max) {
 	return min + Math.floor( Math.random()*(max-min) );
};

var randomFloat = function(min,max) {
	return min + Math.random()*(max-min);
}
