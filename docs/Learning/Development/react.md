### React

1. **What is React?**
   - A JavaScript library for building user interfaces.
   - Component-based, declarative, and handles stateful applications.
2. **JSX (JavaScript XML):**

   - Syntax extension that looks like HTML and allows embedding JavaScript expressions.

   ```jsx
   const element = <h1>Hello, World!</h1>;
   ```

3. **Components:**

   - **Functional Components:**
     - Functions that return JSX.
     ```jsx
     function MyComponent() {
       return <h1>Hello</h1>;
     }
     ```
   - **Class Components:**
     - ES6 classes that extend `React.Component` and require a `render()` method.
     ```jsx
     class MyComponent extends React.Component {
       render() {
         return <h1>Hello</h1>;
       }
     }
     ```

4. **Props:**

   - Properties passed from parent to child components.
   - Read-only, used for rendering dynamic data.

   ```jsx
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }
   ```

   ```jsx
   <Welcome name="John" />
   ```

5. **State:**

   - Holds data that can change over time and trigger UI updates.
   - For class components:

     ```jsx
     class MyComponent extends React.Component {
       constructor(props) {
         super(props);
         this.state = { count: 0 };
       }

       render() {
         return <h1>{this.state.count}</h1>;
       }
     }
     ```

   - For functional components using hooks:
     ```jsx
     const MyComponent = () => {
       const [count, setCount] = useState(0);
       return <h1>{count}</h1>;
     };
     ```

### React Hooks (Functional Components):

1. **`useState`:**
   - Manages state in functional components.
   ```jsx
   const [count, setCount] = useState(0);
   ```
2. **`useEffect`:**

   - Side effects like data fetching, subscriptions, etc.
   - Runs after rendering and can optionally clean up or run only on certain updates.

   ```jsx
   useEffect(() => {
     // Component did mount
     return () => {
       // Component will unmount (cleanup)
     };
   }, [count]); // Optional dependency array
   ```

3. **`useContext`:**

   - Used to consume values from a React `Context` without passing props manually.

   ```jsx
   const value = useContext(MyContext);
   ```

4. **`useReducer`:**

   - Alternative to `useState` for more complex state logic.

   ```jsx
   const [state, dispatch] = useReducer(reducer, initialState);
   ```

5. **`useRef`:**

   - Holds a reference to a DOM element or value between renders.

   ```jsx
   const inputRef = useRef();
   ```

6. **`useMemo` and `useCallback`:**
   - Optimize performance by memoizing expensive computations or functions.
   ```jsx
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   const memoizedCallback = useCallback(() => doSomething(), [dependency]);
   ```

### Component Lifecycle Methods (Class Components):

1. **Mounting (component creation):**
   - `constructor()`
   - `componentDidMount()`: Called after the component is rendered.
2. **Updating (re-rendering):**
   - `componentDidUpdate()`: Invoked after updating state or props.
3. **Unmounting (component removal):**
   - `componentWillUnmount()`: Cleanup before the component is removed from the DOM.

### Forms & Events:

1. **Handling Events:**

   - Similar to DOM events but in camelCase.

   ```jsx
   function handleClick() {
     console.log("Button clicked");
   }
   <button onClick={handleClick}>Click Me</button>;
   ```

2. **Controlled Components:**

   - Form inputs whose value is controlled by React state.

   ```jsx
   const [value, setValue] = useState("");

   return <input value={value} onChange={(e) => setValue(e.target.value)} />;
   ```

3. **Uncontrolled Components:**

   - Form inputs where React does not control the value. Uses `ref` to access DOM elements directly.

   ```jsx
   const inputRef = useRef();
   const handleSubmit = () => {
     console.log(inputRef.current.value);
   };

   return <input ref={inputRef} />;
   ```

### Conditional Rendering:

1. **`if/else` Rendering:**
   ```jsx
   if (isLoggedIn) {
     return <Dashboard />;
   } else {
     return <Login />;
   }
   ```
2. **Ternary Operator:**

   ```jsx
   return isLoggedIn ? <Dashboard /> : <Login />;
   ```

3. **Short-circuit (`&&`) Rendering:**
   ```jsx
   return isLoggedIn && <Dashboard />;
   ```

### Lists and Keys:

1. **Rendering Lists:**

   ```jsx
   const list = [1, 2, 3];
   return (
     <ul>
       {list.map((item) => (
         <li key={item}>{item}</li>
       ))}
     </ul>
   );
   ```

2. **Keys:**
   - Unique identifiers to help React track and optimize list re-rendering.
   - Always use a unique key for each list item.

### React Router:

1. **Routing in React:**

   - Enables navigation between different views.

   ```bash
   npm install react-router-dom
   ```

2. **Basic Example:**

   ```jsx
   import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

   function App() {
     return (
       <Router>
         <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/about" component={About} />
         </Switch>
       </Router>
     );
   }
   ```

### React Context API:

1. **Context Setup:**
   - Provides a way to pass data through the component tree without prop drilling.
   ```jsx
   const MyContext = React.createContext();
   ```
2. **Providing Context:**

   ```jsx
   <MyContext.Provider value={value}>
     <MyComponent />
   </MyContext.Provider>
   ```

3. **Consuming Context:**
   - Using `useContext` in functional components.
   ```jsx
   const value = useContext(MyContext);
   ```

### Styling in React:

1. **Inline Styles:**

   ```jsx
   <div style={{ color: "red", fontSize: "20px" }}>Hello</div>
   ```

2. **CSS Modules:**

   - Scoped CSS with unique class names.

   ```css
   /* styles.module.css */
   .myClass {
     color: red;
   }
   ```

   ```jsx
   import styles from "./styles.module.css";
   <div className={styles.myClass}>Hello</div>;
   ```

3. **Styled Components:**

   - CSS-in-JS library for dynamic styling.

   ```bash
   npm install styled-components
   ```

   ```jsx
   import styled from "styled-components";

   const Button = styled.button`
     background-color: blue;
     color: white;
   `;

   <Button>Click Me</Button>;
   ```

### Performance Optimization:

1. **`React.memo()`:**

   - Memoizes functional components to prevent unnecessary re-renders.

   ```jsx
   const MyComponent = React.memo(function (props) {
     return <div>{props.name}</div>;
   });
   ```

2. **`shouldComponentUpdate()`:**

   - Used in class components to prevent re-rendering when unnecessary.

   ```jsx
   shouldComponentUpdate(nextProps, nextState) {
     return nextProps.value !== this.props.value;
   }
   ```

3. **Code Splitting (Dynamic Imports):**

   - Load components dynamically to reduce the initial load.

   ```jsx
   const OtherComponent = React.lazy(() => import("./OtherComponent"));

   <Suspense fallback={<div>Loading...</div>}>
     <OtherComponent />
   </Suspense>;
   ```

### React Fragments:

- Avoids unnecessary div wrappers around components.
  ```jsx
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>Content</p>
    </React.Fragment>
  );
  ```

### Media Queries (with CSS-in-JS):

- Use media queries in JS with styled components or inline styles.

  ```jsx
  const Container = styled.div`
    width: 100%;
    @media (max-width: 768px) {
      width: 50%;
    }
  `;
  ```

- **Component-Based Architecture**: Reusable components for building UI.
- **Hooks**: Enable state and side effects in functional components.
- **React Router**: For handling client-side routing.
- **Context API**: Share data across components without passing props.
- **Performance Optimization**: `React.memo()`, dynamic imports, and `useCallback()`.
- **JSX**: Combines HTML-like syntax with JavaScript expressions.
