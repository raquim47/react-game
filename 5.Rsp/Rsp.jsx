import React, { useState, useRef, useEffect } from 'react';
import useInterval from './useInterval';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

// 좌표를 받아서 key를 반환
const computerChoice = (imgCoord) => {
  return Object.keys(rspCoords).find((key) => rspCoords[key] === imgCoord);
};

const Rsp = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const changeHand = () => {
    const nextKey = {
      바위: '가위',
      가위: '보',
      보: '바위',
    };
    setImgCoord(rspCoords[nextKey[computerChoice(imgCoord)]]);
  };

  // const interval = useRef();
  // useEffect(() => {
  //   // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
  //   console.log('다시 실행');
  //   interval.current = setInterval(changeHand, 100);
  //   return () => {
  //     // componentWillUnmount 역할
  //     console.log('종료');
  //     clearInterval(interval.current);
  //   };
  // }, [imgCoord]);
  // 커스텀 훅으로 대체
  const [isRunning, setIsRunning] = useState(true);
  useInterval(changeHand, isRunning ? 100 : null);
  //
  
  const onClickBtn = (choice) => () => {
    if (isRunning) {
      setIsRunning(false);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;

      if (diff === 0) {
        setResult('비겼습니다!');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!');
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult('졌습니다!');
        setScore((prevScore) => prevScore - 1);
      }
      setTimeout(() => {
        setIsRunning(true);
      }, 1000);
    }
  };

  return (
    <>
      <div
        id='computer'
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id='rock' className='btn' onClick={onClickBtn('바위')}>
          바위
        </button>
        <button id='scissor' className='btn' onClick={onClickBtn('가위')}>
          가위
        </button>
        <button id='paper' className='btn' onClick={onClickBtn('보')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default Rsp;
