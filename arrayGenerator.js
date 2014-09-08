var randomIntFromInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function arrayGenerator(params) {
  var callCounter = 0;
  var minNumber = 0;
  var maxNumber = 100000;
  var minLength = params.minLength || 10;
  var maxLength = params.maxLength || 1000;
  var steps = params.steps || 5;
  
  if(params.charset) {
    minNumber = params.charset.minNumber || minNumber;
    maxNumber = params.charset.maxNumber || maxNumber;
  }

  var stepLength = (maxLength - minLength) / steps + minLength;

  return function() {
    callCounter++;

    if(callCounter > steps) return;
    var array = [];
    // make an array of stepLength * callCounter using random numbers from min to max
    for(var i = 0; i < stepLength * callCounter; i++) {
      array.push(randomIntFromInterval(minNumber, maxNumber));
    }

    return array;
  };
}

params = {
  charset: {
    // alpha: true, // random upper and lower letters
    minNumber: 1,
    maxNumber: 10
  },
  minLength: 5,
  maxLength: 20,
  steps: 10
};

var myGen = arrayGenerator(params);
console.log(myGen());
console.log(myGen());
console.log(myGen());