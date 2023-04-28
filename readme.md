## 리액트 공부_제로초 리액트

### 1. 구구단

- 1-1. 리액트는 자바스크립트다.
- 1-2. **컴포넌트**란 데이터(state)와 화면(render의 return부분)을 하나로 묶는 덩어리.
- 1-3. 가독성을 위해 React.createElement 대신 등장한 것이 JSX. 대신 JSX 코드를 브라우저에서 직접 실행할 수는 없으므로 Babel 라이브러리를 사용하여 JSX코드를 React.createElement 호출로 변환한다. 
- 1-4. 리액트 render 18버전 변경사항 
  - 17ver : ReactDOM.render(<LikeButton/>, document.querySelector('#root'));
  - 18ver : ReactDOM.createRoot(document.querySelector('#root')).render(<LikeButton/>)
- 1-5. 컴포넌트의 이름은 꼭 대문자로 시작.
- 1-6. **객체를 함부로 바꾸지 말 것(불변성)** 
  ```
    this.state.liked = true; // X
    this.state= {liked : true}; // O
  ```

- 1-7. 리액트 자체는 라이브러리, 하지만 리액트 생태계를 통틀어서 프레임워크라고 한다.
- 1-8. 함수형 setState
  ```
    // 이전 값을 사용해서 state를 바꿀 땐 함수형으로
    setState(prev => !prev);
  ```

- 1-9. 리액트에서는 직접 DOM 요소에 접근(document.querySelector 등등)하는 대신 useRef훅으로 가상 DOM에 접근하는 것을 권장한다. (코드 간결화, 성능 최적화)

- 1-10. 리액트에서 컴포넌트가 렌더링 되는 경우
  - 최초렌더링
  - 컴포넌트의 Props 변경
  - 컴포넌트의 State 변경
  - 부모 컴포넌트의 리렌더링
  - 컴포넌트의 Context가 변경

- 1-11. React는 setState() 메서드를 모아서 한 번에 처리하여 성능을 최적화하는 방식을 사용한다. 때문에 연속적으로 호출되는 setState에 대한 렌더링이 중복되지 않고, 최종적으로 한 번만 실행된다

### 끝말잇기

- 2-1. 웹팩. 애플리케이션에서 사용되는 모든 자원(JavaScript, CSS, 이미지 등)을 모듈로 보고 이를 하나의 번들 파일로 묶어서 처리
  1. npm init
  2. npm i react react-dom
  3. npm -D webpack webpack-cli

- 2-2. 웹팩 데브 서버와 핫 리로딩
  - npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
  - npm i -D webpack-dev-server
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
- 2-3. 컨트롤드 인풋
  - 컨트롤드 인풋이란, input태그에 value와 onChange 속성을 지정해서 제어할 수 있게 만든 것.
  - 유효성 검사 등 value값을 활용하는 경우에 필요. 
  - 언컨트롤드 인풋에서 value값이 필요하다면 defaultValue로 넣을 것.