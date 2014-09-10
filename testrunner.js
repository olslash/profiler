function runTest(fn, generator) {
  var results = [
    ['size', 'runtime']
  ];
  while(true) {
    var args = [].slice.call(arguments, 2);
    var dataset = generator();
    args.unshift(dataset);

    if(dataset === undefined) {
      return results;
    }
    var datasize = dataset.length;
    var start = window.performance.now();
    // var timer = process.hrtime();
    fn.apply(null, args);
    // var executiontime = process.hrtime(timer);
    // var decimalseconds = (executiontime[1] / 1000000000).toFixed(2);
    // var executionresult = +executiontime[0] + +decimalseconds;
    var executionresult = window.performance.now() - start;
    results.push([datasize, executionresult]);
  }

  return results;
}

function drawChart(rawdata) {
  var options = {
         title: 'Performance',
         curveType: 'function',
         trendlines: { 0: {
          color: "green",
          lineWidth: 10
         } }
       };
  var data = google.visualization.arrayToDataTable(rawdata);
  
  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

module.exports = {
  runTest: runTest,
  drawChart: drawChart
};
