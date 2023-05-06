# 리액트 공부_제로초 리액트

## 1. 구구단

### 1-1. 리액트는 자바스크립트다.
### 1-2. 컴포넌트
- **컴포넌트**란 데이터(state)와 화면(render의 return부분)을 하나로 묶는 덩어리.
### 1-3. jsx
- 가독성을 위해 React.createElement 대신 등장한 것이 JSX.
- 대신 JSX 코드를 브라우저에서 직접 실행할 수는 없으므로 Babel 라이브러리를 사용하여 JSX코드를 React.createElement 호출로 변환한다.
### 1-4. 리액트 render 18버전 변경사항 
- 17ver : ReactDOM.render(<LikeButton/>, document.querySelector('#root'));
- 18ver : ReactDOM.createRoot(document.querySelector('#root')).render(<LikeButton/>)
### 1-5. 컴포넌트의 이름은 꼭 대문자로 시작.
### 1-6. **객체를 함부로 바꾸지 말 것(불변성)** 
```
  this.state.liked = true; // X
  this.state= {liked : true}; // O
```

### 1-7. 리액트 자체는 라이브러리, 하지만 리액트 생태계를 통틀어서 프레임워크라고 한다.
### 1-8. 함수형 setState
  ```
    // 이전 값을 사용해서 state를 바꿀 땐 함수형으로
    setState(prev => !prev);
  ```

### 1-9. useRef
- 리액트에서는 직접 DOM 요소에 접근(document.querySelector 등등)하는 대신 useRef훅으로 가상 DOM에 접근하는 것을 권장한다. (코드 간결화, 성능 최적화)

### 1-10. 리액트에서 컴포넌트가 렌더링 되는 경우
  - 최초렌더링
  - 컴포넌트의 Props 변경
  - 컴포넌트의 State 변경
  - 부모 컴포넌트의 리렌더링
  - 컴포넌트의 Context가 변경

### 1-11. setState의 특징
- React는 setState() 메서드를 모아서 한 번에 처리하여 성능을 최적화하는 방식을 사용한다. 때문에 연속적으로 호출되는 setState에 대한 렌더링이 중복되지 않고, 최종적으로 한 번만 실행된다

## 2. 끝말잇기

### 2-1. 웹팩. 
- 애플리케이션에서 사용되는 모든 자원(JavaScript, CSS, 이미지 등)을 모듈로 보고 이를 하나의 번들 파일로 묶어서 처리

1. npm init
2. npm i react react-dom
3. npm -D webpack webpack-cli

### 2-2. 웹팩 데브 서버와 핫 리로딩
1. npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
2. npm i -D webpack-dev-server
```
  // pakage.json 수정
  "scripts": {
    "dev": "webpack serve --env development"
  },
  // webpack.config.js 플러그인 장착
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin';

  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],

  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true
  }
```
### 2-3. 컨트롤드 인풋
- 컨트롤드 인풋이란, input태그에 value와 onChange 속성을 지정해서 제어할 수 있게 만든 것.
- 유효성 검사 등 value값을 활용하는 경우에 필요. 
- 언컨트롤드 인풋에서 value값이 필요하다면 defaultValue로 넣을 것.

## 3. 숫자야구

### 3-1. import vs require
  - import : 리액트에서 주로 사용, 컴파일 시점에 모든 모듈이 이미 결정.
  - require : node.js의 모듈 시스템, 런타임에 모듈을 가져오기 때문에 동적으로 불러올 수 있음, 리액트에서도 간혹 사용.
  ```
    import React from 'react';
    import { useState, useEffect } from 'react';

    const React = require('react');
    const { useState, useEffect } = require('react');
  ```

### 3-2. map 반복문
- 배열에 있는 여러 요소를 매핑할 때 key를 입력, 리액트가 효율적인 렌더링 및 요소 갱신을 수행하기 위함.
- 그러나 인덱스를 key로 사용하는 것은 권장되지 않는다.
  1. 순서 변경시 변경된 순서를 제대로 추적하지 못함.
  2. 배열에 새 항목이 추가되거나 제거될 경우 전체 인덱스가 변경, 효율적인 리렌더링을 방해, 성능 저하 초래.

### 3-3. 배열 state에 값을 추가할 때
- 중요한 것은 불변성, 기존 객체나 배열을 직접 수정하지 않고, 새로운 객체나 배열을 생성하여 업데이트하는 것.
- 배열의 전개 연산자(spread operator)를 사용.

### 3-4. state에 함수 넣을 때 주의사항
- const [answer, setAnswer] = useState(getNumbers)
- getNumbers를 넣으면 getNumbers의 return 값이 초기값으로 할당되고 함수 자체는 더 이상 실행되지 않음.
- getNumbers()를 넣어도 문제는 없다. getNumbers은 컴포넌트가 렌더링될 때마다 매번 실행되지만 useState가 두번째 실행부턴 return값을 무시하기 때문, **그러나 getNumbers가 불필요하게 계속 실행된다는 사실에는 변함이 없으므로 성능 저하를 야기시킬 수 있다.**
- 따라서 state에 함수의 return값을 할당할 때는 함수 호출이 아니라 함수 자체를 입력한다.-> lazy init, 늦은 초기화

### 3-5. 억울한 자식 리렌더링 막기
- 컴포넌트가 리렌더링이 되는 경우 : state가 바뀔 때, props가 바뀔 때, 부모 컴포넌트가 리렌더링 될 때
- memo를 사용하면 부모컴포넌트가 리렌더링되어도 자식 컴포넌트가 리렌더링 되지 않도록 할 수 있다. (state, props가 바뀔 땐 리렌더링된다)
```
const Try = memo(({tryInfo}) => {
  return (
    <li></li>
  );
});
// memo를 씌웠을 때 dev tools에서 이름이 바뀌는 것을 다시 돌려줌 
Try.displayName = 'Try';
```

### 3-6. 자식은 Props를 바꾸면 안돼
- 바꿔야 한다면 Props를 state에 넣어서 state를 바꿔야 부모에 영향을 주지 않는다.

### 3-7. useCallback
- 함수를 메모이제이션, 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용
- 해당 함수가 의존성 배열에 포함된 상태나 props가 변경될 때만 함수가 새로 생성
- 함수 자체가 외부 변수를 사용하지 않는 경우 의존성 배열에 빈 배열([])을 사용
- **모든 함수를 useCallback하면 좋을까?** : 그렇지 않다. useCallback은 함수를 메모이제이션하기 때문에 메모리 사용량이 증가한다. 성능 개선이 미미한 경우 (컴포넌트의 리렌더링이 잦지 않음, 함수가 컴포넌트 내에서만 사용) useCallback을 사용하지 않는 것이 더 효율적일 수 있다.

## 4. 반응속도 체크

### 4-1. React 컴포넌트를 작성하려면 React를 import
- CRA에서는 React를 import 하지 않아도 된다.

### 4-2. useRef의 또 다른 쓰임
- 일반적인 가변값을 저장하는 데 사용
- 변수를 useRef로 저장하면, 컴포넌트가 리렌더링될 때 변수값이 유지되는 효과가 있음.
- state와 다르게 값이 바뀌어도 재렌더링이 없음.
- 이벤트 핸들러와 같은 함수에서 지속적으로 사용되는 값을 저장하는 데 유용

## 5. 가위바위보 게임

### 5-1. 고차함수 패턴
```
const onClickDiv = (text) => {
    console.log(text)
  }
<div onClick={() => onClickDiv('hi')}>h</div>;
// 아래와 같이 고차함수를 활용하여 변경 가능
const onClickDiv = (text) => () => {
    console.log(text)
  }
<div onClick={onClickDiv('hi')}>h</div>;
// event 객체 전달
const onClickDiv = (e,text) => {
    console.log(e.target)
    console.log(text)
  }
<div onClick={(e) => onClickDiv(e,'hi')}>h</div>;
// event 객체 전달 고차 함수 패턴
const onClickDiv = (text) => (e) => {
    console.log(e.target);
    console.log(text)
  }
<div onClick={onClickDiv('hi')}>h</div>;
```

### 5-2. 리액트 라이프 사이클
- 리액트 라이프사이클 : 컴포넌트가 생성되고 제거되는 과정에서 일어나는 이벤트와 메서드.
1. 마운트 : 컴포넌트가 DOM에 삽입될 때 발생하는 이벤트. 이 단계에서는 컴포넌트의 초기 상태를 설정하고, 필요한 데이터를 불러오는 등의 작업을 수행.
2. 업데이트 : 컴포넌트의 props, state가 변경될 때 발생하는 이벤트. 이 단계에서는 변경된 속성과 상태를 반영하여 렌더링을 업데이트.
3. 언마운트 : 컴포넌트가 DOM에서 제거될 때 발생하는 이벤트.

### 5-3. useEffect로 라이프 사이클 다루기
- useEffect: 클래스 컴포넌트의 라이프사이클 메서드와 비슷한 역할을 하는 Hook
- useEffect에서 라이프사이클 메서드를 대체하는 방법.
  1. 마운트: 의존성 배열이 비어있는 경우 ([]), 컴포넌트가 마운트된 후에만 이펙트가 실행.
  2. 업데이트: 의존성 배열이 특정 상태 또는 속성을 포함하는 경우, 해당 값이 업데이트 될 때마다 이펙트가 실행.
  3. 언마운트: 이펙트 함수에서 정리(cleanup) 함수를 return하면, 컴포넌트가 언마운트되거나 의존성 배열의 값이 변경될 때 호출

### 5-4. useLayoutEffect
- useEffect는 렌더링 결과가 DOM에 반영된 이후에 비동기적으로 실행.
- useLayoutEffect는 렌더링 결과가 DOM에 반영된 직후, 브라우저가 실제로 화면을 그리기 전에 동기적으로 실행.
- DOM 요소의 크기를 조절하거나 애니메이션을 적용하는 등의 작업을 할 때 사용.

## 6. 로또 추첨

## 6-1. setTimeout 사용시 주의점
- 컴포넌트가 사라질 경우 setTimeout는 메모리 상에서 계속 실행
- 해당 코드에선 useEffect에서 실행한 setTimeout을 useRef 배열에 담아 return 함수에서 clearTimeout.

## 6-2. useMemo (해당 코드에선 사용하지 않음)
- useMemo는 함수가 첫번째 호출되었을 때의 값을 캐시(저장), 컴포넌트가 다시 렌더링 되어도 (의존성 배열 값이 변하지 않으면) 함수를 다시 호출하지 않고 저장된 값을 사용.

## 6-3. useCallback
- useCallback은 함수 자체를 기억(재랜더링 됐을 때 함수를 새로 생성하지 않음), useMemo는 값을 기억
- 자식 컴포넌트에 props로 함수를 넘길 때는 useCallback을 해줘야한다. useCallback이 없으면 매번 새로운 함수가 생성되고 그 함수를 받는 자식 컴포넌트 또한 무의미하게 재렌더링되게 된다.

## 6-4. useEffect를 componentDidUpdate로 쓰기
- useEffect를 componentDidUpdate로 쓰고 싶다면(마운트될 때는 실행X)
```
const isMount = useRef(false);
useEffect(() => {
  if(!isMount.current){
     isMount.current = true;
  } else {
    // 실행 코드 
    // 마운트 될 때 실행되지 않고 '바뀌는 값'이 바뀔 때만 실행
  }
}, [바뀌는 값])
```

## 7. 틱택토

### 7-1. useReducer
- 상태 값이 여러 개일 때 useReducer를 사용하여 복잡한 상태 관리가 가능
- 리덕스는 state가 동기적으로 바뀌지만 useReducer는 비동기로 바뀐다는 것에 유의할 것
```
const [state, dispatch] = useReducer(reducer, initialState);
```

## 8. 지뢰찾기

### 8-1. Context Api
- React에서 전역 상태를 관리하기 위한 기능을 제공하는 API
- 작은 규모의 애플리케이션에서는 Redux보다 더 적은 코드로 전역 상태를 관리
```
const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});
const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};
```

### 8-2. Context API 성능 최적화 유의점
```
const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};
```
- value에 직접 객체를 넘기면 해당 컴포넌트가 리렌더링될 때 마다 객체가 매번 새로 생긴다. 객체가 새로 생기면 Context API를 쓰는 자식들도 전부 리렌더링되기 때문에 useMemo로 객체를 캐싱해준다.
