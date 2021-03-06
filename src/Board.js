// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)
 
(function () {
 
  window.Board = Backbone.Model.extend({
 
    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
 
    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },
 
    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
 
    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
 
    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },
 
    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },
 
    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },
 
    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },
 
    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },
    mirrorMe: function(n, something) {
      max = n - 1;
      //if

    },
    makeMatrix: function(n) {
      var matrix = [];
      for (var x = 0; x < n; x++) {
        var emptyRow = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0);
        emptyRow.splice(x, 1, 1);
        matrix.push(emptyRow);
      }
      return matrix;

    },
 
 
    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/
 
    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      //console.log(this.attributes[rowIndex], 'this is row')
      var row = this.attributes[rowIndex];
      var count = 0;
      for (var x = 0; x < row.length; x++) {
        if (row[x] !== 0) {
          count++;
        }
      }
      if (count > 1) {
        return true; //conflict
      }
 
      return false; // clean
    },
 
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var max = this.attributes['n'];
      var answer = false;
      for (var x = 0; x < max; x++) {
        var result = this.hasRowConflictAt(x);
        if (result) {
          answer = true;
        }
      }
      return answer;
 
    },
 
 
 
    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var colArray = [];
      for (var key in this.attributes) {
        if (key !== 'n') {
          var row = this.attributes[key];
          colArray.push(row[colIndex]);
        }
      }
      var count = 0;
      //console.log(colArray);
      for (i = 0; i < colArray.length; i++) {
        if (colArray[i] !== 0) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },
 
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var max = this.attributes['n'];
      var answer = false;
      for (var x = 0; x < max; x++) {
        var result = this.hasColConflictAt(x);
        if (result) {
          answer = true;
        }
      }
      return answer;
    },
 
 
 
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (mDCIFR) { //majorDiagonalColumnIndexAtFirstRow
      //get n, or max
      var max = (this.attributes['n']) - 1;
      var board = this.attributes;
      //always first row, (0)
      var row = 0;
      //columm = argument
      var col = mDCIFR;
      var count = 0; //global count
      var recurse = function(row, col) { 
        while (col < 0) {
          row++;
          col++;
        }     
        if (board[row][col] === 1) {
          count++;
        }
        row++;
        col++;
        if (col <= max && row <= max) {
          recurse(row, col);
        }
      };
      recurse(row, col);
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },
 
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var result = false;
      //get max-1
      var board = this.attributes.n;
      var max = board - 1;
      for (var x = (-max); x < board; x++) {
        var temp = this.hasMajorDiagonalConflictAt(x);
        if (temp) {
          result = true;
        }
      }
      //for x = -max to max (-3,-2,-1,0,1,2,3){
      //fuction(x)
      
      return result; // fixme
    },
 
 
 
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (mDCIAFR) { //minorDiagonalColumnIndexAtFirstRow
      var max = (this.attributes['n']) - 1;
      var board = this.attributes;
      var row = 0;
      var col = mDCIAFR;
      var count = 0; //global count
      var recurse = function(row, col) { 
        while (col > max) {
          row++;
          col--;
        }     
        if (board[row][col] === 1) {
          count++;
        }
        row++;
        col--;
        if (col >= 0 && row <= max) {
          recurse(row, col);
        }
      };
      recurse(row, col);
      if (count > 1) {
        return true;
      }
      return false; 
    
    },
 
    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var result = false;
      //get max-1
      var board = this.attributes.n;
      var max = board - 1;
      for (var x = 0; x <= (max * 2); x++) {
        var temp = this.hasMinorDiagonalConflictAt(x);
        if (temp) {
          result = true;
        }
      }
      return result; // fixme
    }
 
    /*--------------------  End of Helper Functions  ---------------------*/
 
 
  });
 
  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };
 
}());