var n = 1;
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
  function perm(array, accumulator) {
    // recursive fuction takes a unique array, and
    var currentArray;
    accumulator = accumulator || [];
    for (var x = 0; x < array.length; x++) {
      currentArray = array.splice(x, 1);
      if (array.length === 0) {
        result.push(accumulator.concat(currentArray));
      }
      perm(array.slice(), accumulator.concat(currentArray));
      array.splice(x, 0, currentArray[0]);
    }
    return result;
  }
  return perm(array);
};
console.log(matrix)
//console.log(permutate(matrix))[
  //console.log(permutate(matrix));

  