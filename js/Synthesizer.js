/**
 * 
 * @date 2017-11-10
 **/

var Synthesizer = function() {

	this.context = new AudioContext();
	/*
	//try {
	  if (typeof AudioContext !== 'undefined') {
	      this.context = new AudioContext();
	  } else if (typeof webkitAudioContext !== 'undefined') {
	      this.context = new webkitAudioContext();
	  } else {
	      //usingWebAudio = false;
	  }
	//} catch(e) {
	    //usingWebAudio = false;
	//}
	*/

	var _self = this;
	this.play = function( freq ) {

		var osc1 = _self.context.createOscillator(),
	    osc2 = _self.context.createOscillator();
	     
		osc1.type = 'triangle';
		osc2.type = 'triangle';

		var volume = _self.context.createGain();
		volume.gain.value = 0.5;

		// Connect oscillators to the GainNode
		osc1.connect(volume);
		osc2.connect(volume);
		 
		// Connect GainNode to the speakers
		volume.connect(_self.context.destination);

		// How long to play oscillator for (in seconds)
		var duration = 2;
		 
		// When to start playing the oscillators
		var startTime = _self.context.currentTime;
		 
		// Start the oscillators
		osc1.start(startTime);
		osc2.start(startTime);
		 
		// Stop the oscillators 2 seconds from now
		osc1.stop(startTime + duration);
		osc1.stop(startTime + duration);

		var frequency = freq; //493.883/3;
	 
		osc1.frequency.value = frequency/2 + 1;
		osc2.frequency.value = frequency*2 - 1;

		// Set the volume to be 0.1 just before the end of the tone
		//volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
		 
		// Make the volume ramp down to zero 0.1 seconds after the end of the tone
		//volume.gain.linearRampToValueAtTime(0, startTime + duration);

		var started = performance.now();
		function adjust() {
			var now = performance.now();
			//console.log( now-started );
			if( now-started >= duration*1000 ) {
				volume.gain.value = 0.0;
				return;
			}

			volume.gain.value *= 0.8;
			//osc1.frequency.value *= 1.3;
			//osc1.frequency.value *= 0.6;

			window.setTimeout( adjust, 50 );
		}
		adjust();
	}
};


var synth = new Synthesizer();
//synth.play(493.883/3);