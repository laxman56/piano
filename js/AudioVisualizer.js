function AudioVisualizer() {
  var ctx = null;
  var canvasHeight, canvasWidth;
  var spacing = 10; 
  var barWidth = 10; 

  this.updateVisuals = function(state, keyCode){
    if (!ctx){
    var canvas = document.getElementById('analyser');
    // console.log(canvas);
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    // console.log(canvasHeight,canvasWidth,'height-width');
    var ctx = canvas.getContext('2d');
  }

  var i = 0;
  var dec = 1;
  var divider = notesByKeyCode[keyCode].frequency/1000;
  var interval = setInterval(function(){
     // ctx.arc(x, y, radius+2*i, startAngle, endAngle);

    // var fillColor = getRandomColor();
    for(j = 0; j<Object.keys(freqData).length; j++){
      // console.log(freqData[j].freqValue);
      if(j%2 == 0){
        ctx.beginPath();
        ctx.moveTo(j*spacing,canvasHeight);
        ctx.lineTo(barWidth+spacing*j,canvasHeight);
        ctx.lineTo(spacing*j+barWidth,freqData[j].freqValue/divider - dec);
        ctx.lineTo(spacing*j,freqData[j].freqValue/divider - dec);

        ctx.closePath();
        
        ctx.fillStyle = 'red'; 
         // ctx.strokeStyle = fillColor;
        ctx.fill();
        dec++;

      }

      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      
    }
    
    // ctx.stroke();
    i++;
    if(i==5){
      clearInterval(interval);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if(state == 'up'){
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

  },40);
  } 
    

}

