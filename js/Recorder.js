function Recorder(){
  var key=0;
  var duration=0;
  var downTime=[];
  var upTime = 0;
  var that = this;
  this.record = function(keyCode, time, state){
    console.log('recording');
    if( state == 'down' ){
      key++;
      downTime.push(time);

      if(key>1)
        that.gap(downTime.length);
      else
        that.gap(0);
      // console.log(downTime[0] - upTime );
      
    }

    else if( state == 'up'){
      upTime = time;
      downTime.push(time);
      duration = downTime[downTime.length - 1] - downTime[0];
      recordedSong.push({keyCode: keyCode, frequency: notesByKeyCode[keyCode].frequency, time: duration });
      key = 0;
      downTime = [];
      duration = 0;


    }

    this.gap = function(gapp){
      var gap = downTime[gapp] - upTime;
      recordedSong.push({keyCode: null, frequency: 0, time: gap });


    }


  }


}