var n = 4;

var counter = 0;

var makeMatrix = function (n) {
  var matrix = [];
  for (var x = 0; x < n; x++) {
    var emptyRow = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0);
    emptyRow.splice(x, 1, 1);
    matrix.push(emptyRow);
  }
  return matrix;
};
var matrix = makeMatrix(n);

var permutate = function (array) {
  //given a matrix
  var result = []; //final array of unique matrix combinations 
  perm = function (array, accumulator) {
    // recursive fuction takes a unique array, and
    var currentArray;
    accumulator = accumulator || [];
    for (var i = 0; i < array.length; i++) {
      currentArray = array.splice(i, 1);
      if (array.length === 0) {
        result.push(accumulator.concat(currentArray));
      }
      perm(array.slice(), accumulator.concat(currentArray));
      array.splice(i, 0, currentArray[0]);
    }
    return result;
  };
  return perm(array);
};
console.log(permutate(matrix));

