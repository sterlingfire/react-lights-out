import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board (default 5)
 * - ncols: number of cols of board (default 5)
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *   (default 0.5))
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

function Board({
  nrows = 5,
  ncols = 5,
  chanceLightStartsOn = 0.5 }) {

  const [board, setBoard] = useState(createBoard);


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let r = 0; r < nrows; r++) {
      initialBoard[r] = [];
      for (let c = 0; c < ncols; c++) {
        let isLit = (Math.random() < chanceLightStartsOn); //? true : false;
        initialBoard[r][c] = (isLit);
      }
    }
    return initialBoard;
  }



  /* Determines if the game has been won */

  function hasWon() {
    return board.every(row => row.every(col => col === false));
  }

  /* Called when a cell is clicked.
   * Flips lights on/off in a + pattern around the center.

   * Takes in a coord ('r-c') where r is the row and c is the 
   * column. 
   * 
   * sets board, given existing board and returns a board copy.
   */

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      console.log('coord is', coord);

      const [r, c] = coord.split("-").map(Number);

      const flipCell = (r, c, boardCopy) => {
        // if this coord is actually on board, flip it

        if (c >= 0 && c < ncols && r >= 0 && r < nrows) {
          boardCopy[r][c] = !boardCopy[r][c];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = board.slice().map(r => r.slice());

      flipCell(r, c, boardCopy);
      flipCell(r + 1, c, boardCopy);
      flipCell(r - 1, c, boardCopy);
      flipCell(r, c + 1, boardCopy);
      flipCell(r, c - 1, boardCopy);

      return boardCopy;
    });
  }

  /* Creates DOM board from board state */

  function createDOMBoard() {
    // TODO: make this into a map
    let tableArr = [];
    for (let r = 0; r < nrows; r++) {
      let rowArr = [];
      for (let c = 0; c < ncols; c++) {
        rowArr.push(
          <Cell
            isLit={board[r][c]}
            key={`${r}-${c}`}
            flipCellsAroundMe={flipCellsAround}
            // alternatively, could do ={flipCellsARound( () => flipCells(coord))}
            coord={`${r}-${c}`}
          />);
      }
      rowArr = <tr key={r}>{rowArr}</tr>;
      tableArr.push(rowArr);
    }
    return <table><tbody>{tableArr}</tbody></table>;
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (<div>
      <h2>You've won!</h2>
    </div>);
  }

  else {
    return createDOMBoard();
  }
}

export default Board;
