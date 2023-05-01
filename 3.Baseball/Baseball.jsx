import React, { useRef, useState, useCallback } from 'react';
import Try from './Try';

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const Baseball = () => {
  const [answer, setAnswer] = useState(getNumbers);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);
  console.log(answer, tries);

  const resetGame = () => {
    alert('게임을 다시 실행합니다');
    setResult('');
    setAnswer(getNumbers());
    setTries([]);
  };

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setTries((prev) => [...prev, { try: value, result: '홈런' }]);
      setResult('홈런');
      setTimeout(() => resetGame(), 100);
    } else {
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
        setTimeout(() => resetGame(), 100);
      } else {
        console.log('답은', answer.join(''));
        for (let i = 0; i < 4; i += 1) {
          if (Number(value[i]) === answer[i]) {
            console.log('strike', value[i], answer[i]);
            strike += 1;
          } else if (answer.includes(Number(value[i]))) {
            console.log('ball', value[i], answer.indexOf(value[i]));
            ball += 1;
          }
        }
      }

      setTries((prev) => [
        ...prev,
        {
          try: value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`,
        },
      ]);
    }
    setValue('');
    inputEl.current.focus();
  }, [value, answer]);

  const onChangeInput = useCallback((e) => setValue(e.target.value), []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          minLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default Baseball;
