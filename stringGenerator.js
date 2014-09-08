var randomIntFromInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function makeCharacterPool(alpha, ascii, numbers, spaces) {
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
    for(i = 33; i <= 47; i++) {
      characterPool.push(i);
    }
    for(i = 58; i <= 64; i++) {
      characterPool.push(i);
    }
    for(i = 91; i <= 96; i++) {
      characterPool.push(i);
    }
    for(i = 123; i <= 126; i++) {
      characterPool.push(i);
    }
  }

  if(numbers) {
    for(i = 48; i <= 57; i++) {
      characterPool.push(i);
    }
  }
  if(spaces) {
    // give spaces a good chance of showing up
    for(i = 0; i < 5; i++) {
      characterPool.push(32);
    }
  }
  return characterPool;
}

// console.log(makeCharacterPool(false, true));
function stringGenerator(params) {
  var callCounter = 0;

  var alpha = true;
  var ascii = false;
  var numbers = false;
  var spaces = false;

  var minLength = params.minLength || 10;
  var maxLength = params.maxLength || 1000;
  var steps = params.steps || 5;
  
  if(params.charset) {
    alpha = params.charset.alpha === undefined ? alpha : params.charset.alpha;
    ascii = params.charset.ascii === undefined ? ascii : params.charset.ascii;
    numbers = params.charset.numbers  === undefined ? numbers : params.charset.numbers;
    spaces = params.charset.spaces  === undefined ? spaces : params.charset.spaces;
  }
  var pool = makeCharacterPool(alpha, ascii, numbers, spaces);

  var stepLength = (maxLength - minLength) / steps + minLength;

  return function() {
    callCounter++;

    if(callCounter > steps) return;
    var result = [];

    for(var i = 0; i < stepLength * callCounter; i++) {
      var randomChar = pool[randomIntFromInterval(0, pool.length - 1)];
      var thisChar = String.fromCharCode(randomChar);
      result.push(thisChar);
    }

    return result.join('');
  };
}

params = {
  charset: {
    alpha: true, // random upper and lower letters charcodes 65 to 90, 97 to 122
    ascii: false, // charcodes 32 to 64, 91 to 96, 123 to 126, excl 48 to 57
    numbers: true, // charcodes 48 to 57
    spaces: true // 32
  },
  minLength: 5,
  maxLength: 20,
  steps: 10
};

module.exports = stringGenerator;
// var myGen = stringGenerator(params);
// console.log(myGen());
// console.log(myGen());
// console.log(myGen());
