import React, { useState, useContext } from 'react';
import { START_GAME, TableContext } from './Mine';
const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = (e) => {
    setRow(e.target.value);
  };
  const onChangeCell = (e) => {
    setRow(e.target.value);
  };
  const onChangeMine = (e) => {
    setRow(e.target.value);
  };
  const onClickStart = () => {
    dispatch({ type: START_GAME, row, cell, mine });
  };

  return (
    <div>
      <input
        type='number'
        placeholder='세로'
        value={row}
        onChange={onChangeRow}
      />
      <input
        type='number'
        placeholder='가로'
        value={cell}
        onChange={onChangeCell}
      />
      <input
        type='number'
        placeholder='지뢰'
        value={mine}
        onChange={onChangeMine}
      />
      <button onClick={onClickStart}>시작</button>
    </div>
  );
};

export default Form;
