import React, { memo, useCallback, useContext, useMemo } from 'react';
import {
  CLICK_MINE,
  CODE,
  FLAG_CELL,
  NORMALIZE_CELL,
  OPEN_CELL,
  QUESTION_CELL,
  TableContext,
} from './Mine';



const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    console.log('left')
    if (halted) return;

    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const getTdtext = useMemo(() => {
    console.log('getTdtext');
    const code = tableData[rowIndex][cellIndex];
    switch (code) {
      case CODE.NORMAL:
        return '';
      case CODE.MINE:
        return 'X';
      case CODE.CLICKED_MINE:
        return '펑';
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        return '!';
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return '?';
      default:
        return code || '';
    }
  }, [tableData[rowIndex][cellIndex]]);

  const getTdStyle = useMemo(() => {
    const code = tableData[rowIndex][cellIndex];
    switch (code) {
      case CODE.NORMAL:
      case CODE.MINE:
        return {
          background: '#444',
        };
      case CODE.CLICKED_MINE:
      case CODE.OPENED:
        return {
          background: 'white',
        };
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return {
          background: 'yellow',
        };
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        return {
          background: 'red',
        };
      default:
        return {
          background: 'white',
        };
    }
  },[tableData[rowIndex][cellIndex]]);

  const onRightClickTd = useCallback(
    (e) => {
      console.log('right');
      e.preventDefault();
      if (halted) return;

      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE: {
          console.log('nomal');
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;
        }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  );
  return (
    <td
      style={getTdStyle}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdtext}
    </td>
  );
});

export default Td;
