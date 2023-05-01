import React, { useState, useRef, useCallback } from 'react';

const Response = () => {
  const initialState = {
    status: 'waiting',
    message: '클릭해서 시작',
    result: []
  };
  const [state, setState] = useState(initialState);
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state.status === 'waiting') {
      timeout.current = setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          status: 'now',
          message: '지금 클릭'
        }));
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState(prev => ({
        ...prev,
        status: 'ready',
        message: '초록색이 되면 클릭하세요.'
      }));
    } else if (state.status === 'ready') {
      clearTimeout(timeout.current);
      setState(prev => ({
        ...prev,
        status: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
      }));
    } else if (state.status === 'now') {
      endTime.current = new Date();
      setState(prev => ({
        ...prev,
        status: 'waiting',
        message: '클릭해서 시작',
        result: [...prev.result, endTime.current - startTime.current]
      }));
    }
  }, [state.status]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  return (
    <>
      <div id='screen' className={state.status} onClick={onClickScreen}>
        {state.message}
      </div>
      <Average result={state.result} onReset={onReset} />
    </>
  );
};

const Average = ({ result, onReset }) => {
  return result.length === 0 ? null : (
    <>
      <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
      <button onClick={onReset}>리셋</button>
    </>
  );
};
export default Response;
