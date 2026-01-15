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