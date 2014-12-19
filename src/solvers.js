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
  var solution;
    // initialize a new board
  var board = new Board({n:n});
  // recursive function that finds solutions
  var findSolutions = function(row){
    // base case
    // when row is equal to n
    if(row === n){
      return board.rows();
    }

    // set up for loop
    for(var i = 0; i < n; i++){
      // put toggle on
      board.togglePiece(row, i);
      // check if conflict
      if(!board.hasAnyRooksConflicts()){
        return findSolutions(row+1);
      }
      // toggle off
      board.togglePiece(row, i);
    }
  };

  solution = findSolutions(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // initialize a new board
  var board = new Board({n:n});
  // recursive function that finds solutions
  var findSolutions = function(row){
    // base case
    // when row is equal to n
    if(row === n){
      //increment solution count
      solutionCount++;
      return;
    }

    // set up for loop
    for(var i = 0; i < n; i++){
      // put toggle on
      board.togglePiece(row, i);
      // check if conflict
      if(!board.hasAnyRooksConflicts()){
        findSolutions(row+1);
      }
      // toggle off
      board.togglePiece(row, i);
    }
  };

  // invoke recursive solution on row
  findSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  // initialize a new board
  var board = new Board({n:n});
  // recursive function that finds solutions
  var findSolutions = function(row){
    // base case
    // when row is equal to n
    if(row === n){
      return board.rows();
    }

    // set up for loop
    for(var i = 0; i < n; i++){
      // put toggle on
      board.togglePiece(row, i);
      // check if conflict
      if(!board.hasAnyQueensConflicts()){
        return findSolutions(row+1);
      }
      // toggle off
      board.togglePiece(row, i);
    }
  };

  // make edge case for 0 and 2

  solution = findSolutions(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
    // initialize a new board
  var board = new Board({n:n});
  // recursive function that finds solutions
  var findSolutions = function(row){
    // base case
    // when row is equal to n
    if(row === n){
      //increment solution count
      solutionCount++;
      return;
    }

    // set up for loop
    for(var i = 0; i < n; i++){
      // put toggle on
      board.togglePiece(row, i);
      // check if conflict
      if(!board.hasAnyQueensConflicts()){
        findSolutions(row+1);
      }
      // toggle off
      board.togglePiece(row, i);
    }
  }

  // invoke recursive solution on row
  findSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

