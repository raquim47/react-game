import React, { memo } from 'react';
import { CLICK_CELL } from './Tictacto';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = () => {
    if (cellData) return;
    console.log('clicked')
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  };

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
