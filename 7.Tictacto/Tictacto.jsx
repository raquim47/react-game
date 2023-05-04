import React, { useEffect, useReducer, useCallback, useState } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  currentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 직접 바꾸면 안됌, 새로운 객체를 만들어서 state를 업데이트
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        currentCell: [action.row, action.cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const Tictacto = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, currentCell } = state;

  useEffect(() => {
    const [row, cell] = currentCell;
    if (row < 0) return; // 처음 렌더링 될 때 제외

    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }

    if (win) {
      // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true;// all이 true면 무승부
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if(all){ // 무승부
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [currentCell]);
  return (
    <>
      <Table
        tableData={state.tableData}
        dispatch={dispatch}
      />
      {winner && <div>{winner}의 승리</div>}
    </>
  );
};

export default Tictacto;
