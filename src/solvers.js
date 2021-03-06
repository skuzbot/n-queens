/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// helper functions:
var makeMatrix = function (n) {
  var matrix = [];
  for (var x = 0; x < n; x++) {
    var emptyRow = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0);
    emptyRow.splice(x, 1, 1);
    matrix.push(emptyRow);
  }
  return matrix;
};

var makeEmptyMatrix = function (n) {
  return _(_.range(n)).map(function () {
    return _(_.range(n)).map(function () {
      return 0;
    });
  });
};

var permutate = function (array) { //given an array
  var result = []; //final array of arrays to be returned as all possible permutations
  perm = function(array, accumulator) { // recursive fuction takes a unique array, and 
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
  };
  return perm(array);
};

//start of solver
window.findNRooksSolution = function (n) {

  var solution = makeMatrix(n); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var matrix = makeMatrix(n);
  var arr = permutate(matrix);
  var solutionCount = arr.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = 0;
  if (n === 0) {
    return [];
  }
  if (n === 2 || n === 3) {
    return makeEmptyMatrix(n);
  }

  var matrix = makeMatrix(n);
  var arr = permutate(matrix);
  for (var x = 0; x < arr.length; x++) {
    var board = new Board(arr[x]);
    if (!board.hasAnyQueensConflicts()) {
      solution = arr[x];
    }
  }







  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  var matrix = makeMatrix(n);
  var permArrays = permutate(matrix);

  var solution = 0;
  if (n === 0) {
    return 1;
  }

  if (n === 2 || n === 3) {
    return 0;
  }

  for (let i = 0; i < permArrays.length; i++) {
    var board = new Board(permArrays[i]);
    if (!board.hasAnyQueensConflicts()) {
      solutionCount++;
    }
  }






  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

console.log(permutate(array1));