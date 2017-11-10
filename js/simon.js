/**
 * @author  Ikaros Kappler
 * @date    2017-11-10
 * @version 1.0.0
 **/


var Simon = (function() {

	// synth = new Synthesizer();

 	var constructor = function( elementCount, synth ) {

 		var _self = this;
 		this.elementCount = elementCount;
 		this.sequenceLength = 1;
 		this.sequence = [ 0 ];
 		this.playOffset = 0;

 		this.start = function() {
 			_self.sequenceLength = 1;
 			_self.sequence = [];
 			_self.playOffset = 0;
 			for( var i = 0; i < _self.sequenceLength; i++ )
 				_self.sequence.push( randomInt(0,_self.elementCount) );
 		};

 		this.play = function( onComplete ) {
 			if( _self.playing )
 				return;
 			_self.playing = true;
 			_self.playOffset = 0;
 			playStep( function() { _self.playing = false; onComplete() } );
 		};

 		function playStep( onComplete ) {
 				if( _self.playOffset >= _self.sequenceLength ) {
 					onComplete();
 					return false;
 				}
 				var index = _self.sequence[ _self.playOffset ];
 				_self.animateElement( index, 
 					function() { 
 						_self.playOffset++;
 						if( _self.playOffset >= _self.sequenceLendth )
 							onComplete();
 						else
 							window.setTimeout( function() { playStep(onComplete); }, 100 );
 					} );

 				return true;
 		}

 		this.animateElement = function(index, onComplete) {
 			var $elem = $( '#index-'+index );
 			TweenMax.to( $elem, 0.1, { backgroundColor : $elem.data('color'), onComplete : function() {
 				TweenMax.to( $elem, 1.0, { backgroundColor : '#ffffff', onComplete : onComplete } );
 			} } );	
 			if( synth )
 				synth.play( $elem.data('frequency') );
 		};

 		this.next = function() {
 			_self.sequenceLength++;
 			_self.sequence = [];
 			_self.playOffset = 0;
 			for( var i = 0; i < _self.sequenceLength; i++ )
 				_self.sequence.push( randomInt(0,_self.elementCount) );
 		};

 		this.getValidator = function() {
 			return new Validator(_self.sequence.slice(0));
 		};

 	}; // END constructor



 	var Validator = function( sequence ) {
		this.sequence = sequence;
		this.pointer = 0;

		this.endReached = function() {
			return this.pointer >= this.sequence.length;
		};

		this.validate = function(item) {
			if( this.endReached() )
				return false;
			var eq = this.sequence[this.pointer]==item;
			this.pointer++;
			return eq;
		};

	};


 	return constructor;

})();



//var synth = new Synthesizer();
//synth.play(493.883/3);



