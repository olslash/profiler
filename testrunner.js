var arrayGenerator = require('./arrayGenerator');

// given a function, run it until the generator returns undefn
// time each function and insert results into rows of an array

function runTest(fn, generator) {
  var results = [
    ['size', 'runtime']
  ];
  
  while(true) {
    var dataset = generator();
    

    if(dataset === undefined) {
      return results;
    }
    var datasize = dataset.length;

    var timer = process.hrtime();
    fn(dataset);
    var executiontime = process.hrtime(timer);
    var decimalseconds = (executiontime[1] / 1000000000).toFixed(2);
    var executionresult = +executiontime[0] + +decimalseconds;
    results.push([datasize, executionresult]);
  }

  return results;
}
var doathing = function(data) {
  var assign = 0;
  for(var i = 0; i < data.length; i++) {
    assign = data + 20;
  }
};

params = {
  charset: {
    // alpha: true, // random upper and lower letters
    minNumber: 1,
    maxNumber: 100
  },
  minLength: 5,
  maxLength: 20000,
  steps: 10
};

var myGen = arrayGenerator(params);

console.log(runTest(doathing, myGen))