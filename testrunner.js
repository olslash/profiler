var arrayGenerator = require('./arrayGenerator');


google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  params = {
    charset: {
      // alpha: true, // random upper and lower letters
      minNumber: 1,
      maxNumber: 10
    },
    minLength: 5,
    maxLength: 2000,
    steps: 40
  };
  var options = {
         title: 'Performance',
         curveType: 'function'
       };
  var myGen = arrayGenerator(params);
  var data = google.visualization.arrayToDataTable(runTest(doathing, myGen));
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}



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
    var start = window.performance.now();
    // var timer = process.hrtime();
    fn(dataset);
    // var executiontime = process.hrtime(timer);
    // var decimalseconds = (executiontime[1] / 1000000000).toFixed(2);
    // var executionresult = +executiontime[0] + +decimalseconds;
    var executionresult = window.performance.now() - start;
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
