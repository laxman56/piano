function AudioInBackground(){
  var audioElement = null;
  that = this;

  this.loadAudio = function(audioSource){
    audioElement = document.createElement('audio');
    audioElement.setAttribute('src', audioSource);

  }

  this.playAudio = function(){

    document.getElementById(drum1)
    audioElement.play();

    audioElement.addEventListener('ended', function() {
    currentTime = 0;
    console.log('finished');
    audioElement.play();
  }, false);


  }

  this.pauseAudio = function(){
    audioElement.pause();
    audioElement.currentTime = 0;

  }


  this.volumeController = function(volume){

    if(audioElement)
      audioElement.volume = volume;

    console.log(volume);
  }

  
}