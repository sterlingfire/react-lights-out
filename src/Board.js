import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5}) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let r=0; r<nrows; r++){
      initialBoard[r] = [];
      for (let c=0; c<ncols; c++){
        let isLit = (Math.random() < chanceLightStartsOn) ? true : false;
        initialBoard[r][c] = (isLit);
    }
  }
  return initialBoard;
}



  /* Determines if the game has been won */
  function hasWon() {
    return board.every(row => row.every(col => col===true));
  }

  /* Called when a cell is clicked.
   * Flips lights on/off in a + pattern around the center
   */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }
  /* Creates DOM board from board state */
  function createDOMBoard(){
    let tableArr = [];
    for (let r=0; r<nrows; r++){
      let rowArr = [];
      for (let c=0; c<ncols; c++){
        rowArr.push(<Cell isLit={board[r][c]}/>);
      }
      rowArr = <tr>{rowArr}</tr>;
      tableArr.push(rowArr);
    }
    return <table>{tableArr}</table>;
  }
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()){
    return (<div>
      <h2>You've won!</h2>
    </div>);
  }
  // make table board
  else {
    return createDOMBoard();
  }
}

export default Board;
