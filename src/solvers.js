/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});

  // declare variable size which will be n
  var size = n;
  // declare variable colIndex, will start at 0, tracks column index
  var colIndex = 0;
  // inner function for recursion, argument is colIndex

  var createRook = function(column){
    if(colIndex === size){
      return;
    }
    // for loop on size
    for(var i = 0; i < size; i++){
      //start with if statement, will have a condition of 'if(no row or column conflict)'
      // make matrix slot 1
      solution.get(i)[colIndex] = 1;
      // if conflict doesn't exists
      if(!solution.hasRowConflictAt(i) && !solution.hasColConflictAt(colIndex)){
        // keep matrix slot 1
        solution.get(i)[colIndex] = 1;
      } else {
        // remove matrix slot 1
        solution.get(i)[colIndex] = 0;
      }
    }
    colIndex++;
    createRook(colIndex);
  }

  createRook(colIndex);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({n:n});
  var size = n;
  var colIndex = 0;
  var finalCol = 0;
  var finalRow = 0;
  // set variable for finalrow

  var createRook = function(column){

    if(colIndex === size){
      solutionCount++;
      finalCol++;
      if(finalCol - 1 && finalRow === size - 1){
        return solutionCount;
      } else if(finalCol > size - 1){
        finalCol = 0;
        finalRow++;
        solution = new Board({n:n});
        createRook(finalCol);
      } else {
        solution = new Board({n:n});
        createRook(finalCol);
      }

      alert(solutionCount);

      // above states a board has been created
      // solutionCount gets incremented
      //
      // if our new finalrow finalcol have not reached
        // reset colIndex to 0
        // run new board
        // run create rook on this new board at
        // with a new starting point instead of row[0], column[0]
      // else
        // break
    }

    for(var i = 0; i < size; i++){
      solution.get(i)[colIndex] = 1;

      if(!solution.hasRowConflictAt(i) && !solution.hasColConflictAt(colIndex)){
        solution.get(i)[colIndex] = 1;
      } else {
        solution.get(i)[colIndex] = 0;
      }
      colIndex++;
      createRook(colIndex);
    }


  }


  createRook(colIndex);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
