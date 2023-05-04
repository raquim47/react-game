import React, { memo, useMemo } from 'react';
import Td from './Td';
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((_, i) =>
          useMemo(
            () => (
              <Td
                key={i}
                cellIndex={i}
                cellData={rowData[i]}
                rowIndex={rowIndex}
                dispatch={dispatch}
              />
            ),
            [rowData[i]]
          )
        )}
    </tr>
  );
});

export default Tr;
