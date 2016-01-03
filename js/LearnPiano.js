function LearnPiano(){
  var intervalId;
  var i = 0;
  var song = [];
  var keyName = null;
  var key = new CreateKeys();
	this.guidePlaying = function(songName){
    if(songName == 'twinkleTwinkle')
      song = twinkleTwinkle;
    console.log(song);
    setTimeout(function(){
      intervalId = setInterval(function(){

      if(i>0)
        key.inActiveKey(keyName);

      keyName = notesByKeyCode[song[i].keyCode].noteName;

      key.activeKey(keyName);
      console.log(song.length,'length');
      i++;

      if(song.length <= i){
        key.inActiveKey(keyName);

        clearInterval(intervalId);

      }


    },song[i].duration);

    }, 5000);
    
	}

}