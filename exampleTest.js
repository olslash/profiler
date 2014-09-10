var runner = require('./testrunner');
var arrayGenerator = require('./arrayGenerator');

params = {
  charset: {
    // alpha: true, // random upper and lower letters
    minNumber: 1,
    maxNumber: 1000
  },
  minLength: 30,
  maxLength: 100000,
  steps: 500
};
var myGen = arrayGenerator(params);
var results = runner.runTest(findSmallest, myGen, 10);
console.log(results);
runner.drawChart(results);


function swap(list, one, two) {
  var temp;
  temp = list[one];
  list[one] = list[two];
  list[two] = temp;
}

function partition(list, pivotIndex, left, right) {
  // swap pivotIndex and right
  var pivotValue = list[pivotIndex];
  swap(list, pivotIndex, right);
  // set a pointer at left "storedIndex"
  var storedIndex = left;
  // for every item between left and right - 1
  for(var i = left; i < right; i++) {
  // // if the item's value is < the pivot value, 
    if(list[i] < pivotValue) {
  // // swap it with the storedIndex
      swap(list, i, storedIndex); 
  // // and increment storedIndex
      storedIndex++;
    }
  }
  // swap right (the pivot) and storedIndex
  swap(list, right, storedIndex);
  // return the index of the pivot
  return storedIndex;
}

function findSmallest(list, n, left, right) {
  right || (right = list.length - 1);
  left  || (left = 0);

  // if(left === right) {
  //   console.log("returned");
  //   return list[left];
  // }
  // select a pivot
  var pivotIndex = left;
  // partition the list around that pivot.
  pivotIndex = partition(list, pivotIndex, left, right);
  // if the index of the pivot after partitioning is n, return the subset
  if(pivotIndex === n) { 
    return list.slice(0, n); 
  } else if (pivotIndex < n) {
  // if ... is < n, select a pivot to the right and partition again.
    return findSmallest(list, n, pivotIndex + 1, right);
  } else {
    // if ... is > n, select a pivot to the left and partition again.
    return findSmallest(list, n, left, pivotIndex - 1);
  }
}
