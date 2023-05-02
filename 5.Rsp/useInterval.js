import { useRef, useEffect } from 'react';

const useInterval = (callback, delay) => {
  // useRef 훅을 사용하여 현재 콜백 함수를 저장
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => savedCallback.current();
    if(delay !== null) {
      let id = setInterval(tick, delay);
      // 클린업 
      return () => clearInterval(id);
    }
  }, [delay]);
  // return값을 다른데서 쓰고싶어하는 사람을 위해 제공
  return savedCallback.current;
};

export default useInterval;
