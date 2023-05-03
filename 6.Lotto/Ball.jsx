import React, { memo } from 'react';

const Ball = memo(({ number }) => {
  const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
  const colorIndex = Math.floor((number - 1) / 10);
  const background = colors[colorIndex];

  return (
    // background: background 객체의 키와 변수 이름이 같기 때문에 생략
    <div className="ball" style={{ background }}>{number}</div>
  )
});

export default Ball;
