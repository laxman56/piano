
function GetStream(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var realAudioInput = null, inputPoint = null, rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;
var analyserNode;

/* TODO:

- offer mono option
- "Monitor input" switch
*/


function updateAnalysers() {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }
    // console.log(analyserNode);
    // analyzer draw code here
        var spacing = 5;
        var barWidth = 3;
        var numBars = Math.round(canvasWidth / barWidth);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';

        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; i++) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * spacing, canvasHeight, barWidth, -magnitude);
            // console.log('laxman');
        }
    
    rafID = window.requestAnimationFrame( updateAnalysers );
}


function gotStream(stream) {
    inputPoint = audioContext.createGain();
    console.log(gotStream);

    realAudioInput = audioContext.createMediaStreamSource(stream);
    realAudioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    // audioRecorder = new Recorder( inputPoint );

   /* zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );*/
    updateAnalysers();
}

this.initAudio = function() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

// window.addEventListener('load', initAudio );



}
