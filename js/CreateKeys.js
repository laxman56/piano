function CreateKeys(){
  that = this;
  var highOctaveClass = 0;
	// document.getElementById('keyBoard');
  var gap = 56;
  // var keyContainer = document.getElementById('keyContainer');
  var octaveNum = 0;
  this.appendTo = function(parentElement){
    // console.log('create keyboard');
    parentElement.appendChild(this.element);
  }

  this.createNewKeys = function(keyName, keyType, i){

    octaveClass = Math.floor(i/7);
    var keyContainer = document.getElementById('octave'+octaveClass);

    // console.log(octaveClass);

    this.element = document.createElement('div');
    // console.log(keyName,keyType,'mustbe')
    // console.log(this.element,'check');

    if(keyType == 'high'){
      octaveNum = i%5;

      
      keyContainer = document.getElementById('octave'+(highOctaveClass));
      this.element.className = 'key' + ' high-notes';

      if(keyName == 'c4#' || keyName == 'c5#' || keyName == 'c6#')
        this.element.style.left = 30;


      else if(keyName == 'd4#' || keyName == 'd5#' || keyName == 'd6#'  )
        this.element.style.left = 30+46;


      else if(keyName == 'f4#' || keyName == 'f5#' || keyName == 'f6#'  )
        this.element.style.left = 174;


      else if(keyName == 'g4#' || keyName == 'g5#' || keyName == 'g6#'  )
        this.element.style.left = 222;


      else if(keyName == 'a4#' || keyName == 'a5#' || keyName == 'a6#' )
        this.element.style.left = 272;



        // this.element.style.left = gap*(octaveNum)+76;

      if(octaveNum == 0){
        highOctaveClass++;
      }

      // if(key)


      

    }
     

    else
      this.element.className = 'key';

    this.element.id = keyName;
    
    // if( keyName == 'f4#' || keyName == 'c5#'){
    //   this.element.style.left = gap*(i-10)+40;
    //   keyNum = i-10;


    //   // this.element.style.Left = 2*gap*(i-10) + 'px';
    // }


    this.element.innerHTML = keyName;

    // if(keyType == 'high'){
    //   document.getElementById('high-notes').appendChild(this.element);
    // }
    // else{

    //   document.getElementById('low-notes').appendChild(this.element);
    // }
    // this.appendTo(document.getElementsByClassName('key-board')[0]);

    /*for(var k = 0; k < 3; k++){
      var keyContainer = document.getElementById('octave'+k);

      console.log('octave'+k);
      for(var j = 0; j <7; j++){
        console.log('append');
        keyContainer.appendChild(this.element);

        
      }
    }
*/  

  
   keyContainer.appendChild(this.element);
  

    keyContainer.style.textAlign = 'center';
    keyContainer.style.fontSize = 25 + 'px';
    keyContainer.style.color = 'red';

  }

  this.activeKey = function(keyName){
    // console.log(keyName,'create');
    var keyClass = document.getElementById(keyName).className;
    // console.log(keyClass);
    if(keyClass == 'key active' || keyClass == 'key high-note active'){}
    
    else
      document.getElementById(keyName).className = keyClass + ' active';
  }

  this.inActiveKey = function(keyName){
    var keyClass = document.getElementById(keyName).className;
    // console.log(keyClass,'inactive');
    var originalKeyClass = keyClass.replace(/active/i, '');
    // console.log(originalKeyClass,'original');
    document.getElementById(keyName).className = originalKeyClass;
  }

}