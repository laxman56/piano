function PlayKeyBoard() {
  // Create audio (context) container
  var counter = 0;
  var newKey = new CreateKeys();
  var playing;
  var state;
  var recorder = new Recorder();
  var recordFlag = false;
  var recordCounter = 0;
  var recordButton = document.getElementById("startRecording");
  var playButton = document.getElementById("playRecorded");
  var visual = new AudioVisualizer();
  var bgAudio = new AudioInBackground();
  var learn = new LearnPiano();
  var timer = null;
  var drum = false;
  var timeoutTime = 2000;
  var keyPressed = null;
  var tempKeyCode = null;
  this.init = function() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

  var audioContext = new (AudioContext || webkitAudioContext)();
  that = this;


  for(var i = 0; i<Object.keys(noteList).length; i++){
  // console.log(Object.keys(noteList).length,'length');

      newKey.createNewKeys(noteList[i].name,noteList[i].notePitch, i);

  }

  this.generateSound = function(frequency) {
  var keySound = new Media(frequency,audioContext);
  return {sound:keySound};

  }

  this.loadNoteFrequency = function(notes) {
    console.log('loadNote');
    for(var keyCode in notes) {
      var note = notes[keyCode];
      note.key = that.generateSound(note.frequency);
    }
  };

  this.loadRecordedFrequency = function(notesRecorded){
    for(var frequency in notesRecorded) {
      var noteRecorded = notesRecorded[frequency];
      noteRecorded.key = that.generateSound(noteRecorded.frequency);
    }

  }

  this.playNote = function(event) {
    console.log(timer,'timer');
    keyPressed = true;

    var keyCode = event.keyCode;

    console.log(keyCode);
    
    notesByKeyCode[keyCode].key.sound.play();
    if(notesByKeyCode[keyCode].counter == 0){
      newKey.activeKey(notesByKeyCode[keyCode].noteName);
      notesByKeyCode[keyCode].counter = 1;
    }
    
    visual.updateVisuals('down',keyCode);

    if(recordFlag)
      recorder.record(keyCode,event.timeStamp,'down');

    if(tempKeyCode != keyCode){
      notesByKeyCode[tempKeyCode].key.sound.stop();
      tempKeyCode = null;
    }

    else {
      notesByKeyCode[tempKeyCode].key.sound.play();
    }
      

   

  };
  
  this.endNote = function(event) {
    var keyCode = event.keyCode;
    tempKeyCode = keyCode;
    timer = setTimeout(function(){
    notesByKeyCode[keyCode].key.sound.stop();

    },timeoutTime);
    
    newKey.inActiveKey(notesByKeyCode[keyCode].noteName);
    notesByKeyCode[keyCode].counter = 0;

    state = true;
    visual.updateVisuals(state, keyCode);

    if (recordFlag)
      recorder.record(keyCode,event.timeStamp,'up');

    visual.updateVisuals('up', keyCode);
    keyPressed = false;



  };

  this.filterRecordedMusic = function(){

    that.loadRecordedFrequency(recordedSong);
    console.log(recordedSong[0].time);

    if(recordedSong[0].time >= 10000)
      recordedSong.splice(0, 1);

    playing = 0;
    that.playRecorded();

  }

  this.playRecorded = function(){
    // playing = 0;
    console.log(recordedSong[playing]);
    recordedSong[playing].key.sound.play();
    
    setTimeout(function(){
      recordedSong[playing].key.sound.stop();
      playing++;
      if(recordedSong.length != playing)
      that.playRecorded();
    }, recordedSong[playing].time+200);
      
  }

  window.addEventListener('keydown', this.playNote);
  window.addEventListener('keyup', this.endNote);
  window.addEventListener('load', this.loadNoteFrequency(notesByKeyCode));

  playButton.addEventListener("click",function(){
    console.log(recordCounter);
    if(recordedSong.length == 0){
      window.alert("Please Record Audio First");
    }

    else if(recordCounter == 0){
      that.filterRecordedMusic();
      playButton.className = 'record pause';
    }

  });


  recordButton.addEventListener("click",function(){
    if(recordCounter == 0){
      recordFlag = true;
      recordButton.className = 'record active';
      recordCounter++;
    }

    else{
      recordFlag = false;
      recordButton.className = 'record in-active';
      recordCounter = 0;
    }
   
  });


stopPlaying.addEventListener("click",function(){
  // recordedSong = [];  
  playing = recordedSong.length -1;
  recordedSong[playing].key.sound.stop();
  // recordCounter = 1;


});

  drum1.addEventListener("click",function(){
    if(!drum){
      drum1.className = 'drum active';
      bgAudio.loadAudio('music/wipeout161.mp3');
      bgAudio.playAudio();
      drum = true;
    }

    else{
      drum1.className = 'drum';
      bgAudio.pauseAudio();
      drum = false;
    }
    
  });

  drum2.addEventListener("click",function(){
    if(!drum){
      drum2.className = 'drum active';
      bgAudio.loadAudio('music/wipeout161.mp3');
      bgAudio.playAudio();
      drum = true;
    }

    else{
      drum2.className = 'drum';
      bgAudio.pauseAudio();
      drum = false;
    }

  });

  drum3.addEventListener("click",function(){
    if(!drum){
      drum3.className = 'drum active';
      bgAudio.loadAudio('music/wipeout161.mp3');
      bgAudio.playAudio();
      drum = true;
    }

    else{
      drum3.className = 'drum';
      bgAudio.pauseAudio();
      drum = false;
    }
  });

  volume.addEventListener("change",function(){
   bgAudio.volumeController(document.getElementById('volume').value);

  });

  volume.addEventListener("mousewheel",function(){
    console.log(laxman);
   bgAudio.volumeController(document.getElementById('volume').value);

  });

  learnPiano.addEventListener("change",function(){
    console.log(learnPiano.value,'value');
    learn.guidePlaying(learnPiano.value);
  })

}

