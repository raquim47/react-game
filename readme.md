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
- 이벤트 핸들러와 같은 함수에서 지속적으로 사용되는 값을 저장하는 데 유용