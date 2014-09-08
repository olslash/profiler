var randomIntFromInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function makeCharacterPool(alpha, ascii) {
  var characterPool = [];
  var i;
  if(alpha) {
    for(i = 65; i <= 90; i++) {
      characterPool.push(i);
    }
    for(i = 97; i <= 122; i++) {
      characterPool.push(i);
    }
  }

  if(ascii) {
    for(i = 33; i <= 74; i++) {
      characterPool.push(i);
    }
    for(i = 91; i <= 96; i++) {
      characterPool.push(i);
    }
    for(i = 123; i <= 126; i++) {
      characterPool.push(i);
    }
  }

  return characterPool;
}

// console.log(makeCharacterPool(false, true));
function stringGenerator(params) {
  var callCounter = 0;

  var alpha = true;
  var ascii = false;
  var minLength = params.minLength || 10;
  var maxLength = params.maxLength || 1000;
  var steps = params.steps || 5;
  
  if(params.charset) {
    alpha = params.charset.alpha || alpha;
    ascii = params.charset.ascii || ascii;
  }
  var pool = makeCharacterPool(alpha, ascii);
  var stepLength = (maxLength - minLength) / steps + minLength;

  return function() {
    callCounter++;

    if(callCounter > steps) return;
    var array = [];

    for(var i = 0; i < stepLength * callCounter; i++) {
      array.push(pool[randomIntFromInterval(0, pool.length)]);
    }

    return array;
  };
}

params = {
  charset: {
    alpha: true, // random upper and lower letters charcodes 65 to 90, 97 to 122
    ascii: true // charcodes 33 to 74, 91 to 96, 123 to 126
  },
  minLength: 5,
  maxLength: 20,
  steps: 10
};

// var myGen = stringGenerator(params);
// console.log(myGen());
// console.log(myGen());
// console.log(myGen());
