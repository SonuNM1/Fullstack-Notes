## What is ReactJS? 

- React.js is an open-source JavaScript library developed by Facebook for building user interfaces. 

    It focuses on the view layer (UI) of applications. 

    Follows component-based architecture. 

    Offers Virtual DOM for faster rendering. 

    Ideal for Single-Page Applications (SPAs)

**React focuses on the View Layer**

- First: What is an application made of? 

    A typical web app has 3 layers: 

    1. Data layer - API, database, backend logic

    2. Business logic layer - validations, rules

    3. View Layer (UI) - what the user sees and interacts with 

- View Layer = UI

    The view layer is everything related to: HTML structure, UI components (buttons, forms, modals), Rendering data on screen, Handling user interactions visually 

- What React does 

    React: Renders UI components, Updates UI when data changes, Manages component state, Efficiently update the DOM 

- React does not: 

    Fetch data by default, Handle routing, Handle global state, Handle backend logic 

    That's why React is called a view library, not a full framework. 

- React focuses on the view layer because it is responsible only for rendering and updating the user interface. 

**Single Page Application (SPA)**

- Traditional Website (Multi-Page App)

    Every click -> new HTML page from server. Full page reload. Slower navigation. 

    /home -> /about -> /contact (each page reloads)

- SPA (Single Page Application)

    An SPA loads one HTML page once, and then JavaScript updates the content dynamically. 

    No page reload. Faster UX. App-like behaviour. 

    React is ideal for SPAs because it updates only parts of the UI. 

- Real world example: Gmail, Google Doc, Instagram Web, etc. You never see full page reloads. 

- What actually happens in SPA

    1. Browser loads `index.html`
    2. React renders components
    3. User clicks -> React updates UI
    4. API calls fetch new data
    5. DOM updates without reload 

- A SPA loads oncce and updates content dynamically without reloading the page. 

## Library Vs. Framework 

A library provides reusable functions that developers call, while a framework provides a complete structure and controls the application flow. 

    React is a library because it focuses only on the UI and gives developers flexibility to choose other tools.

- A **library** is a collection of reusable functions or tools that the developer calls when needed.  

- Key points: Developer is in control, No fixed structure, Used only when required, Easy to integrate 

- Control Flow: You (developer) call the library. 

- A **framework** is a complete structure that controls the flow of the application and calls your code. 

- Key points: Framework is in control, Predefined structure, Rules & conventions

- Control Flow: Frameworks controls your code. 

**Why React is library:** 

    - Only handles view layer (UI)
    - Les developers choose their own tools 
    - Doesn't include routing, HTTP, state management


## Components 

- Building block of React app. 

- A component is a reusable, independent piece of UI in React. 

    Components return UI (JSX)
    Components can accept props. 
    Components manage state

1. Function Component

    - is a JS function that returns JSX. 
    - Uses Hooks for state & lifecycle
    - No `this` keyword 
    - Modern approach. Less code. Better performance. 

2. Class Component 

    - is a JS class that extends `React.Component`
    - Uses `this` keyword
    - More boilerplate code 
    - Lifecycle methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`

    Cons: More code, harder to understand, `this` binding issues 

- Why Function components preferred? 

    - Introduced Hooks (React 16)
    
    - Simplified state & lifecycle logic
    
    - Avoid `this` confusion
    
    - Better code reuse 


## JSX 

- JavaScript XML is a syntax extension that lets you write HTML-like code inside JS. 

    const element = <h1>Hello</h1> ; 

- Why JSX? 

    Makes UI code readable
    Combines UI + logic

- JSX rules 

    Must return a single parent element. 

    Use `className` instead of `class`

    JS expressions iside `{}`


## Controlled Vs. Uncontrolled Components 

Controlled components are managed by React state, whereas uncontrolled components rely on the DOM for form data. 

1. **Controlled Components**

- Form elements whose value is controlled by React state. 

    const Input = () => {
    const [value, setValue] = React.useState("");

    return (
        <input
        value={value}
        onChange={e => setValue(e.target.value)}
        />
    );};

- React controls input. Easy validation. Single source of truth. 

2. **Uncontrolled Components**

- Form elements that manage their own state using the DOM. 

    const Input = () => {
    const inputRef = React.useRef();

    return <input ref={inputRef} />;
    };


- Less code, Uses refs, Harder to validate 


## Props Vs State 

1. **Props**

- Props are read-only data passed from a parent component to a child component. 

- Props (properties) are inputs passed from parent to child components. They are read-only. 

- Passed as function parameters, Immutable (cannot be changed by child), Used to customize components 

    function Greeting(props) {
    return <h1>Hello {props.name}</h1>;
    }

    <Greeting name="Rahul">

- Read-only, Passed from parent, Makes components reusable 

2. **State**

- State is data managed inside component that can change over time. 

- Mutable, Controlled by component, Triggers re-render when updated 

    const Counter = () => {
    const [count, setCount] = React.useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
    };

- Local to component, Can be updated, Controls component behaviour 

## Real DOM Vs. Virtual DOM 

1. **Real DOM**

- The Real DOM is the actual browser DOM - a tree structure representing the HTML elements on the page. 

- Directly updated the browser. Slow to manipulate. 

- Every change causes reflow & repaint. 

- Heavy memory operations. Whole tree is re-rendered. 

    document.getElementById("title").innerText = "Hello";

2. **Virtual DOM**

- The Virtual DOM is an in-memory representation of DOM. It's a lightweight JavaScript object that represents the real DOM. 

- Exists in memory. Faster to update. Managed by React. Only changes are re-rendered. 

- Not directly rendered on screen. 

| Feature     | Real DOM    | Virtual DOM  |
| ----------- | ----------- | ------------ |
| Type        | Browser DOM | JS Object    |
| Speed       | Slow        | Fast         |
| Update cost | High        | Low          |
| Re-render   | Whole tree  | Only changes |


## How Virtual DOM Improves Performance 

- **Problem with Real DOM** 

    Updating DOM is expensive. 
    
    Browser recalculates layout & paints 
    
    Frequent updates = slow UI 

- **React's Solution** 

    State or props change. 

    React creates a new Virtual DOM tree. 

    React compares old vs new Virtual DOM (Diffing)

    Identifies minimal changes

    Updates only changed nodes in Real DOM. 

- This process is called: `Reconciliation`

    If only a button text changes: React updates only that button. Not the entire page. 

- **Why Virtual DOM is Faster**

    Batch updates. 

    Minimal DOM manipulation. 

    Efficient diffing algorithm. 

    Reduces reflows & repaints. 


- The Virtual DOM is an in-memory representation of the real DOM that allows React to efficiently update only the changed parts of the UI. 

    React improves performance by minimmizing expensive DOM operations through diffing and reconciliation. 


## What if Webpack & Babel didn't exist? 

- **Webpack** combines JS, CSS, images. Resolves dependencies. Optimizes code. Creates bundles for browser. 

- If it wasn't Webpack, browsers wouldn't understand: ES modules, JSX, Imports from npm. 

    Webpacks prepares code for the browser. 

- **Babel** is a JavaScript compiler that converts modern JavaScript (ES6+) & JSX into browser-compatible JavaScript. 

- Babel converts JSX -> JS,

- **What if Webpack & Babel didn't exist?** 

    Browsers couldn't understand JSX. 
    No module system. 
    No npm imports
    No optimization 
    Poor performance. 


## SSR (Server-Side Rendering) & SSG (Static Site Generation)

1. **Server Side Rendering**

- HTML is generated on the server for every request and sent to browser. 

- Faster first load. Better SEO. 

2. **Static Site Generation**

- HTML pages are pre-generated at build time. 

- Extremely fast. SEO friendly. CDN caching.


## Why Next.js is Preferred over React (SPA)

- React alone: Client-side rendering only, Poor SEO, Slower initial load 

- Next.js: SSR & SSG, File-based routing, API routes, Better performance, SEO friendly

## Significance of `key`

- A `key` is a special attribute used by React to uniquely identify elements in a list. 

    items.map(item => <li key={item.id}>
        {item.name}
    </li> )

**Why React needs `key`?**

React uses Virtual DOM and diffing algorithm. 

Keys help React identify which items have changed, added, or removed, improving rendering performance and correctness. 

- Without keys: 

    React cannot identify which item changed. 
    
    Causes unnecessary re-renders

    Leads to UI bugs 

- With keys: 

    React knows exactly which element changed. 

    Updates only necessary DOM nodes. 


## One-Way Data Binding 


In React, data flows in one direction - from parent to child via props. Child cannot directly change parent's state. 


| Feature   | One-Way (React) | Two-Way (Angular) |
| --------- | --------------- | ----------------- |
| Data flow | Parent → Child  | Both directions   |
| Debugging | Easy            | Hard              |
| Control   | High            | Low               |

- React follows one-way data binding, where data flows from parent to child, making applications predictable and easier to debug. 


## Lifting State Up


- When multiple components need the same state, we lift the state up to their common parent. 

- Problem it solves: Multiple components need same data

- In React, data flows only from Parent -> Child. Child cannot directly change parent's state. 

    This rule creates problem: `What if two child components need to share or update the same data?`

    Solution: `Lifting state up`

- Lifting state up means moving state to the closest common parent so it can be shared via props. 

**Example Problem (Without lifting state):**

    ChildA (needs data)
    ChildB (needs same data)

- They cannot talk to each other. One-way data flow blocks this. 

**Solution (With lifting state up):**

    Parent (state lives here)
        ├── ChildA (receives data)
        └── ChildB (receives data)

- Parent owns the state. Passes data down via props. Maintains one-way data binding. 


## "Child communicates via callbacks" - what does this mean? 


- The Problem: Child cannot change props, but child needs to update parent's state. 

    How is this possible? 

- The trick: Callback Functions 

    Parent passes a function to the child as a prop. 

    1. Parent creates state
    2. Parent passes function to child 
    3. Child calls that function 
    4. Parent updates its own state 
    5. Data flows down again 

- In React, child components communicate with parents using callback functions, passed as props. 

- If children could change parents directly, debugging becomes hard, state changs become unpredictable, app becomes complex. 


## Fragments in React 


- A fragment lets you group multiple elements without adding an extra node to the DOM. 

- No extra DOM node. Cleaner markup. 

- `React.Fragment` Vs. <></>


## Default Props 

- Default props provide fallback values for props if they are not passed. 

    function Button({ text = "Click me" }) {
        return <button>{text}</button>;
    }

- Prevent undefined values. Reduce error handling. 

- Default props provide default values to components when props are not passed. 


## How React Handles Forms 


React handles forms using controlled and uncontrolled components, with controlled components being the preferred approach. 

1. **Controlled Forms**

- React controls form inputs using `state`. 

    function Form() {
    const [name, setName] = React.useState("");

    return (
        <input
        value={name}
        onChange={e => setName(e.target.value)}
        />
    );
    }

- React is source of truth. Easy validation. Predictable behaviour. 


2. **Uncontrolled Forms**

- Form state is handled by the DOM. 

    const inputRef = React.useRef();
    <input ref={inputRef} />;

- Less code, Harder validation. 


## Component Lifecycle 

The React Lifecycle describes the stages a component goes through from creation to removal. 

**Lifecycle in Class Components**

1. Mounting (component appears)

    - constructor()
    - render()
    - componentDidMount()

    Used for: API calls, Subscriptions 

2. Updating (state/props change)

    - render()
    - componentDidUpdate()

    Used for: Responding to prop changes 

3. Unmounting (component removed)

    - componentWillMount()

    Used for: cleanup (timers, listeners)


- Lifecycle Diagram: 

    Mount -> Update -> Unmount 

- React hooks replaced lifecycle methods. (useEffect hook)


## Ways to Style Components in React 

1. CSS Stylesheet 

2. Inline Styling 

3. CSS Module

4. Styled Components 

5. SASS / SCSS 

6. Utility Libraries 


## Lazy loading & Suspense 

## Params Vs. Query 

## How SPA Works

## Protected Routes and Auth-based access logic 

## JSON.stringify Vs JSON.parse 

## Stateless Vs Stateful (component, architecture)

## Why Stateful Architecture problematic

- Stateful architecture = Server remembers User 

- Server stores session -> Session is stored in memory/DB -> User identified via sessionId cookie 

**Problem 1: Scaling Issue** 

    1 Server -> works fine. Now, user increases. 

    To handle load, we add multiple servers. 

    Load Balancer
        ↓
    Server A   Server B   Server C

    What goes wrong? 

    - User logs in -> session stored on Server A

    - Next request -> load balancer sends request to Server B

    - Server B doesn't have the session. 

        User appears logged out. 

**Problem 2: Server Crash = User logout**

    If server restarts: Memory cleared, All users logged out 

**Problem 3: Cloud & Microservices Unfriendly**

    Modern apps use: Auto scaling, Containers, Serverless 

    Stateful systems -> don't work well with dynamic servers 

**Why Stateless is better?**

    Stateless = server doesn't remember anyone 

    - Every request is independent 
    - Any server can handle any request 
    - Easy scaling 
    - Cloud-friendly 


## React Hooks

- Hooks are functions that lets us use state and lifecycle features in functional components 

- Introduced in React 16.8, replaces class components. 

- Makes code more reusable, concise and less complex. 

- Hooks should be called at the top level of React function component. 

    Because React relies on the call ORDER of hooks. React stores hooks in an array, based on call order. 

    Hooks rely on consistent call order, which is why they must be called at the top level. 

- Hooks must be called in the same order on every render. If used in loops, the order breaks, causing errors. 

## Context API 

- Avoids passing props manually 
- Provides global data 

- Why named Context? 

    Because it provides contextual data to components. 

    Example: User context, Theme context, Auth context 

- It has 3 things: 

    createContext, Provider, Consumer 

- How it works 

    const UserContext = createContext() ; 

    <UserContext.Provider value={user}>
        <App/>
    </UserContext.Provider>

    const user = useContext(UserContext)


- User needed in Profile but passed through 4 layers. 

    `App → Navbar → Menu → Profile → User`

- Why this is bad? Unnecessary props, Hard to maintain, Tight coupling 

- Context API solution: Global store for specific data, Components access directly. Also Redux is heavy for simple cases. 

- We have: Logged-in user, Theme (dark/light), Language, Cart count. These are needed everywhere. 

    Without context, we end up doing: 

    <App user={user}>
        <Navbar user={user}>
            <Profile user={user}/>
        </Navbar>
    </App>

    Prop drilling, ugly, harder to maintain. 


**Step 1: Create Context**

    import { createContext } from "react";

    export const AuthContext = createContext(null);

**Step 2: Provide context at top level**

    function App() {
    const user = {
        name: "John",
        role: "admin"
    };

    return (
        <AuthContext.Provider value={user}>
        <Navbar />
        <Dashboard />
        </AuthContext.Provider>
    );
    }

**Step 3 - Consume context everywhere**

    import { useContext } from "react";
    import { AuthContext } from "./AuthContext";

    function Navbar() {
    const user = useContext(AuthContext);

    return <h3>Welcome {user.name}</h3>;
    }


## useRef 

- `useRef` persists values across renders without triggering re-render. 

- Access DOM, Doesn't cause re-render 

- Using state causes re-render: 

    const [timer, setTimer] = useState(0) ; 

    Each update -> re-render ❌

    `useRef` working 

    const timerRef = useRef(0) ; 
    timerRef.current += 1 ; 

- Value persists on refresh, no re-render

- Use cases: Accessing DOM


## `useMemo` & `useCallback`

**1. useMemo**

- Problem: Expensive calculation runs every render. 

    const total = calculateTotal(items) ; 

- Solution: 

    const total = useMemo(
        () => calculateTotal(items),
        [items]
    );

    Recomputed only when items change. 

- Use case: filtering large lists, sorting, heavy computations


**2. useCallback**

- Problem: Functions recreated every render. 

    const handleClick = () => {} ; 

- Solution: 

    const handleClick = useCallback(() => {}, []) ; 

- `useCallback` memoizes functions to prevent unnecessary re-renders. 


## Heavy Computation - Real eCommerce `useMemo` example 

- Real Problem - eCommerce product list with: Filtering, Sorting, Searching 

    products = 20,000 items

    Every keystroke -> re-render -> expensive filter 

- Without `useMemo`

    const filteredProducts = products.filter(p =>
    p.name.includes(search)
    );

    This runs on every render 

- With `useMemo`

    const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter(p =>
        p.name.includes(search)
    );
    }, [products, search]);

    - Runs only when `search` changes. Performance boost. 

- `useMemo` prevents expensive recalculations by memoizing results. 


## `useCallback` - Example 

- **Problem:** We have - A Parent component, A Child component, Parent passes a function to child

    Example - A product page passes an `addToCart` function to a product card. 

- What React does by default

    Every time parent re-renders: A new function is created. Child sees it as a new prop. 

    Child re-renders. 

    Even if logic didn't change. 

- Why this is bad? 

    Large product lists, Many child components, Performance issues. 

**What `useCallback` does**

- Stores the function in memory and reuses it unless dependencies change. 

- So: Parent re-renders, Function reference stays same.

    Child does NOT re-render. 

- `useCallback` prevents unnecessary child re-renders by memoizing function references. 

## React Rendering & Reconciliation 

- Rendering = React calling our component functions to get JSX. 

    What triggers rendering? 

        State change, Props change, Context change 

- Reconciliation = React comparing old UI with new UI. 

    React: Creates Virtual DOM, Compares old vs new, Updates only cahnged nodes 

    - Fast UI, Efficient updates 

- Reconciliation is the process where React efficiently updates the DOM by comparing virtual DOM trees. 


## Why do React Components re-render? 

A component re-renders when: 

- Its state changes
- Its props (including context value) changes 
- Its parent re-renders and passes new props 
- Key changes for a list item


## `React.memo`

- `React.memo` is a higher-order component that: 

    Prevents re-rendering if props haven't changed. 

- Its like "if inputs are same, output is same - no need to re-run". 

- React.memo memoizes a component based on props. 

**`useMemo` Vs `React.memo`**

- useMemo - data 
- React.memo - compoent 
- useCallback - function 


## useLayoutEffect 

- `useLayoutEffect` is like `useEffect`, but: It runs synchronously after DOM updates but before the browser paints the screen. 

    Render -> DOM updated -> useLayoutEffect -> Browser Paints -> useEffect 

- Why do we need it? 

    You must read or update DOM immediately before the user sees anything. 

- `useLayoutEffect` runs synchronously before paint and is used for DOM measurements. 

## How do we know a component is re-rendering? 

- A component re-renders when: 

    Its state changes 
    Its props change 
    Its context value changes 
    Its parent re-renders 

    Re-render = component function runs again. 

- React DevTools   

    Components flash when they re-render 

- React Profiler 


## Throttling Expensive UI Updates (Search/Scroll)

- Throttling and Debouncing optimize frequent UI events like scroll and search. 

- The Problem: Search input, Scroll events. 

    They fire too quickly. 

- Throttle: execute at fixed intervals 

- Debounce: execute after user stops 

- Real-life SEARCH (Debounce)

    r → re → rea → reac → react

    Only final search should run. 

- Real-life SCROLL (Throttle)

    Scroll event fires 100s times per second. 

    Throttle to once every 200ms. 

- How do we throttle/debounce in React

    Use `setTimeout`, or `lodash`


## Custom Hooks 

- They are reusable functions that let us extract and share logic between functional components. 

- They are JS functions whose names start with `use`.

- Custom hooks should always start with `use`, like useFetch or useForm. 

- Without custom hook ❌

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data)) ; 
    }, [])

    You write this everywhere. 

- With custom hook ✅

    // useFetch.js 

    import {useEffect, useState} from "react" ; 

    function useFetch(url){
        const [data, setData] = useState(null) ; 

        useEffect(() => {
            fetch(url)
                .then(res => res.json())
                .then(data => setData(data))
        },[url])

        return data
    }

    export default useFetch ; 

- Usage: 

    const products = useFetch("/api/products") ; 

- Cleaner, reusable and easier to test 


## Redux 

- Redux is predictable state management library for React apps. 

🔴 **Problem: Prop Drilling**

    App
    └── Navbar
        └── CartIcon

    Cart count needed everywhere. Passing props throgh many levels = messy & harder to maintain. 

- Redux Solution: 

    Central global store, Any component can access it, Predictable state updates and behaviour. 

**Core Redux (SARD)**

1. Store: Single source of truth. A big object that holds data. Global Memory. 

    {
        cart: {...}, 
        auth: {...},
        products: {...}
    }

2. Action: Plain object describing what happened 
3. Reducer: Pure JS function that updates state 
4. Dispatch: Send action to store 

**Data flow in Redux**

    UI -> dispatch(action) -> reducer -> store -> UI updates 

**Why Redux is predictable**

- Single store
- One-way data flow 
- Pure reducers 

**When to use Redux**

- Large apps
- Shared global state
- Complex updates 

    In small apps, Context API is enough

**Redux Flow**

    Component
        ↓ dispatch()
    Action (auto-created by slice)
        ↓
    Reducer (inside slice)
        ↓
    Store
        ↓
    Component re-renders


**Slice**

- One slice = One feature 

- Example: authSlice, cartSlice, productSlice, userSlice 

    Cart feature -> cartSlice 
    Auth feature -> authSlice 

```js
// cartSlice.js 

// createSlice is a helper from Redux Toolkit
// It helps us write Redux code easily
import { createSlice } from "@reduxjs/toolkit";

// This is the initial data for the cart feature
// Think: "How should cart look when app loads?"
const initialState = {
  items: [],          // all products in cart
  totalQuantity: 0    // total items count
};

// createSlice creates:
// 1. reducer function
// 2. action creators automatically
const cartSlice = createSlice({
  name: "cart",   // name of this slice (feature)
  initialState,   // initial data
  reducers: {
    // This runs when we add a product
    addToCart(state, action) {
      // action.payload = product we send
      state.items.push(action.payload);
      state.totalQuantity++;
    },

    // This runs when we remove a product
    removeFromCart(state, action) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
      state.totalQuantity--;
    }
  }
});

// Export actions (used in components)
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export reducer (used in store)
export default cartSlice.reducer;
```

- What this file does: Stores cart data, Knows how to update (add, delete products) cart

    One slice = one feature 


**Reducer**

- Pure function that updates the state based on action. 

- It specifies how the application's state changes in response to actions. 

    It makes Redux predictable. 

- A reducer takes 2 arguments: 

    Current state - the existing state of your application 

    Action - an object describing what happened

    It returns a new state based on the action type. 

    `(state, action) => newState`

**Store**

- Connect all slices 

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Store collects all slices

const store = configureStore({
  reducer: {
    cart: cartReducer // cart slice goes here
  }
});

export default store;
```

- Store now looks like this: 

```js
{
  cart: {
    items: [],
    totalQuantity: 0
  }
}
```

**Provider**

- Give store to react 

```js
import { Provider } from "react-redux";
import store from "./store";

<Provider store={store}>
  <App />
</Provider>
```

- Now every component can access cart data.


**Using Redux in Components**

- Add product to cart 

```js
import {useDispatch} from "react-redux" ; 
import {addToCart} from "./cartSlice"

const dispatch = useDispatch() ; 

dispatch(addToCart(product)) ; 
```

- Read cart count 

```js
import {useSelector} from "react-redux"

const cartCount = useSelector(
    state => state.cart.totalQuantity
)
```

**What happens step-by-step**

1. Button clicked
2. Dispatch sends action 
3. Slice updates data
4. Store updates 
5. React re-renders UI

**Mental model**

- One slice = One feature 
- One store = Whole app 
- Dispatch = triggers change 
- Selector = Read data 


## Interview Questions - Redux 

- Slice: feature-based collection of state, reducers and action in one file 

    One slice = one feature 

- Store: central place that holds the entire application state 

- Action: plain object that describes what happened in the application 

- Reducer: pure function that updates the state based on the action. 

- dispatch: used to send actions from components to the Redux store 

- `useSelector`: used to read data from the Redux store in a component. 

- `useDispatch`: used to send actions to the Redux store 

- `useReducer`: Uses a reducer function that takes state and action, then returns a new state. Helps keep state updates predictable and organized. 

- Why can't reducers have API calls? 

    Reducers must be pure functions and API calls cause side effects. 

- Redux Thunk? 

    is a middleware that allows async logic and API calls in Redux. 

- `createAsyncThunk`

    It simplifies async logic and automatically handles loading and error states. 

## Pure Function 

A pure function is a function that: 

- Gives the same output for the same input 

- Doesn't change anything outside itself 

- Example 

```js
function add(a, b){
    return a+b ; 
}
```

    It will always return same output for the same input. It doesn't change anything else. 

- Not pure example 

    ```js
    function getCurrentTime(){
        return new Date() ;
    }
    ```

    Same input -> different output every time. 


## Redux Thunk 

Redux expects: 

- Same `state + action` -> same `newState`

- No side effects 

- Wrong reducer (NOT pure)

```js
    function reducer(state, action){
        fetch("/api/data") ; // No API call
        state.count++; // no mutation
        return state; 
    }
```

- Why bad? 

    API call = side effect. Redux cannot predict state. 

- This is where **Redux Thunk** comes in. 

- API calls are asynchronous. 

- Redux thunk allows us to dispatch functions instead of objects. 


## Why Redux is synchronous by default 

Redux was designed as a predictable state container. 

    Key word: predictable 

- That means: Given previous state, Given an action, Redux must immediately compute next state. 

    `newState = reducerr(oldState, action)`

    no waiting, no async, no side effects 

- With API, Redux has no idea: when API finishes, what data comes back, how state will change later 

    Redux loses control, State becomes unpredictable

    Therefore, Redux reducers must be synchronous. 

    API call = side effect. Depends on network, Can fail, Can be slow, Not deterministic 

- Redux is synchronous by default to keep state updates predictable and traceable. 

- Reducers must be: synchronous, pure, predictable. 


## Why do we need Redux Thunk 

- Redux only allowed 

    `dispatch({type:"Action"})`

    But API calls are async. 

- Thunk allows this: 

```js
dispatch(async (dispatch) => {
  const data = await fetch("/api");
  dispatch({ type: "SUCCESS", payload: data });
});
``` 

    Async logic -> Thunk. State updates -> Reducer 


## What Redux Thunk actually is 

- Redux Thunk is a middleware. Middleware sits between: 

    `dispatch()` and the `reducer`

- Thunk allows us to: 

    delay dispatching an action. Performs async operations (API calls). dispatch multiple actions based on result. 

    Instead of dispatching an action object, we can dispatch a function. 

- Redux thunk allows dispatching functions instead of plain objects, enabling async logic like API calls before updating the store. 

**Mental Flow**

1. Component triggers an event
2. Thunk runs async logic (API call)
3. Based on result: dispatch success action, or dispatch failure action
4. Reducer updates state asynchronously 

- Async work outside reducer
- State update inside reducer 


## How React handles forms 

- Default HTML form behaviour 

```js
<form>
    <button type="button">
        Submit 
    </button>
</form>
```

    Browser will: Submit form, Refresh page, Lose React state. 

    Bad for SPA. 

- `e.preventDefault()`

```js
function handleSubmit(e){
    e.preventDefault() ; 
}
```

    What it does? Stops browser's default behaviour, Prevents page reload, Allows React to handle form. 

- What if we don't use `e.preventDefault()`

    Page refresh, State lost, Redux store reset, Bad UX 


## Zustand 

Zustand is a lightweight state management library for React that uses hooks and a centralized store without boilerplate. 

- It allows us to create global state using simple JS functions, without reducers, actions, or providers like Redux. 

**Why Zustand exists**

- Problems with Redux (that Zustand addresses)

    Too much boilerplate (actions, reducers, slices)

    Complex setup 

    Harder learning curve

    Overkill for small/medium apps 

- Zustand goals

    Minimal, No boilerplate

    No provider wrapping

    Fine-grained re-render control


Zustand was created to simplify global state management by removing boilerplate and making state usage more intuitive. 


| Feature        | Redux Toolkit | Zustand          |
| -------------- | ------------- | ---------------- |
| Boilerplate    | High          | Very low         |
| Reducers       | Required      | ❌ Not needed     |
| Actions        | Required      | ❌ Not needed     |
| Middleware     | Yes           | Yes              |
| Async handling | Thunks        | Built-in support |
| Provider       | Required      | ❌ Not required   |
| Learning curve | Steep         | Easy             |


**Mental Model**

- Redux mental model 

    Action -> Reducer -> Store -> Component 

- Zustand mental model 

    Store -> hook -> Component 


**Core Concepts of Zustand**

Zustand has only 3 main ideas: 

1. Store
2. State 
3. Actions (functions that update state)

- No reducers
- No providers 
- No dispatch

**How Zustand Store Works**

We: 

- create a store
- store contains: state, functions to update state 
- components read & update state directly 

Zustand internally: 

- tracks which state a component uses 
- re-renders only when that part changes 

**Example:**

    In Zustand, a cart store would contain cart items and methods like `addItem` and `removeItem`. Components directly consume the store via hooks. 

**Async Operations in Zustand**

- Redux: needs thunk, middleware setup

- Zustand: Async logic written directly inside store functions 

    Zustand supports async actions, allowing API calls directly inside store functions without middleware. 

    No restriction like "reducers must be pure"

**When Zustand is PERFECT**

- Medium apps
- Dashboard apps 
- Auth state
- Cart state 
- UI state 


**Is Zustand replacing Redux?**

No, Zustand is an alternative for simpler state management, while Redux is better for large-scale applications.

**Does Zustand cause re-renders?**

Only when the selected state changes, thanks to its subscription model. 

**Subscription-based updates**

- Redux/Context: Component re-renders when any state changes. 

- Zustand: Component re-renders only when selected state changes. 

    Zustand uses a subscription model where components only re-render when the selected state changes. 

- Zustand eliminates reducers and action creators by allowing state updates directly through store functions. 


## Why is the `key` prop important in React lists? 

The `key` prop is important because it helps React efficiently manage list rendering. It allows React to identify which items have changed, been added, or removed, instead of re-rendering the entire list. 

- Helps React track elements and update only what's necessary. 

- Prevents unnecessary re-renders, improving performance. 

- Best practice: Use a unique ID as the key instead of the array index whenever possible. 

## Persisting data on Refresh

When the browser refreshes: 

- JavaScript memory is cleared 
- React state is lost
- Redux/Zustand in-memory store is reset 

**Persistence** = saving important state outside JS memory so it survives refresh. 

**Why persistence is needed?**

Persistence is needed to maintain user experience and application continuity across page refreshes. 

Real-life problems without persistence: 

- User logged out on refresh, 
- Cart emptied, 
- Theme prefrence lost, 
- Language lost 

**What data should be persisted**

Persist only essential & safe data. 

| Data                 | Reason              |
| -------------------- | ------------------- |
| Auth token           | Keep user logged in |
| User info (id, role) | Avoid refetch       |
| Cart items           | E-commerce UX       |
| Theme / language     | Preferences         |
| Filters / pagination | UX continuity       |


**How persistence works**

1. App state changes 
2. State saved to: localStorage, sessionStorage, cookies, IndexedDB
3. On reload: state rehydrated into store 


## Optimizing a slow React Application 

To optimize a slow React application, first identify bottlenecks using profiling tools. Then reduce unnecessary re-renders using memoization techniques, optimize state management, apply code splitting, improve network performance, and ensure proper cleanup to avoid memory leaks. 

Most performance issues in React are caused by unnecessary re-renders. 

1. **Reduce unnecessary re-renders**

Techniques: 

- React.memo
- useCallback
- useMemo
- Proper key usage 

2. **Code splitting & lazy loading**

Break the app's bundle into smaller chunks so the browser loads only what's necessary. 

Lazy load: components only when they are needed, instead of loading everything upfront. 

- Problem: large bundle, slow initial load 

- Solution: React.lazy, Suspense

3. **Optimize expensive computations**

- Examples: filtering large lists, Sorting, Calculations 

- Tools: useMemo, useCallback 

4. **Optimizing lists & rendering**

- Pagination 
- Infinite scroll 

5. **Optimize network calls**

- Debounced search
- Throttle scroll
- Cache API responses 
- Avoid duplicate requests 

6. **Optimize assets**

- Image compression
- Lazy load images 
- Use modern formats (webp)

