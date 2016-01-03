 function Media(frequency,audioContext) {

  // console.log(audoContext);
  this.context = audioContext;
  // console.log(context);
  this.osc = this.context.createOscillator(); // Create oscillator node
  this.pressed = false; // flag to indicate if sound is playing

  if(typeof frequency !== 'undefined') {
      this.osc.frequency.value = frequency;
  }

  /* Set waveform type. */
  this.osc.type ='triangle';
  this.osc.start(0);


  }


Media.prototype.play = function() {
  console.log('play');

  if(!this.pressed) {
    this.pressed = true;
    var attack = 10,
    // gainValue = 10000;
    decay = 3000,
    gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();

    this.osc.connect(gainNode);
 
    gainNode.connect(this.context.destination);
    gainNode.gain.setValueAtTime(0, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + attack / 1000);
    gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + decay / 1000);
    
    // this.osc.connect(gain);
    // gainNode.gain.value = gainValue;  

  }
}

Media.prototype.stop = function() {
  this.pressed = false;
  this.osc.disconnect();

}
