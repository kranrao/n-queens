// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
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
    hasRowConflictAt: function(rowIndex) {
      // set up counter to count whether any data in row
      var counter = 0;
      // set up row variable to get array
      var row = this.get(rowIndex);

      // a for loop on the row
      for (var i = 0; i < row.length; i++) {
        // for each index, add to counter
        counter+=row[i]
      }
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Declare size variable to get length of board
      var size = this.get('n');
      // create a for loop for size
      for(var i = 0; i < size; i++){
        // check if row conflict exists
        if(this.hasRowConflictAt(i)){
          return true;
        }

      }

      return false
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
    /*console.log(colIndex);*/
    // declare variable size that is equal to 'this.get('n')'
    var size = this.get('n');
    // declare counter, make 0
    var counter = 0;
    //create a for loop on the size
    for(var i = 0; i < size; i++){
      //counter += this.get on i to get rows, get the first value of each row
      counter+=this.get(i)[colIndex];
    }

    return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // declare size variable for this.get('n')
      var size = this.get('n');

      // create for loop on size
      for (var i = 0; i < size; i++) {
        // if hasColConflictAt(i)
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // get size in variable
      var size = this.get('n');
      // counter variable at 0
      var counter = 0;
      // col index = input
      var colIndex = majorDiagonalColumnIndexAtFirstRow;

      // for loop on size
      for (var i = 0; i < size; i++) {
        // if col = n - 1
        if (colIndex === size - 1 || colIndex < 0) {
          break;
        }

        counter+=this.get(i)[colIndex];
        colIndex++;
      }

      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // declare size variable for this.get('n')
      var size = this.get('n');

      // create for loop on size
      for (var i = 0; i < size; i++) {
        // if hasColConflictAt(i)
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
            // get size in variable
      var size = this.get('n');
      // counter variable at 0
      var counter = 0;
      // col index = input
      var colIndex = minorDiagonalColumnIndexAtFirstRow;

      // for loop on size
      for (var i = 0; i < size; i++) {
        // if col = n - 1
        if (colIndex < 0 || colIndex > size - 1) {
          break;
        }

        counter+=this.get(i)[colIndex];
        colIndex--;
        //console.log('array :', i, 'column :', colIndex, 'counter :', counter);
      }

      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // declare size variable for this.get('n')
      var size = this.get('n');

      // create for loop on size
      for (var i = size - 1; i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
