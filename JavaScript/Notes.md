## JavaScript Prototype Object & Prototypal-Inheritance 

1. **Java (Class-based Inheritance)**

    class Animal {
        void speak() {}
    }

    class Dog extends Animal {}

- Classes are blueprints. 
- Objects are created from classes.
- Inheritance happens between classes. 
- Fixed, compile-time structure 

2. **JavaScript (Prototype-based Inheritance)**

    function Animal() {}
        Animal.prototype.speak = function () {
        console.log("sound");
    };

    let dog = new Animal();

- Objects inherit directly from other objects. 

- No real "classes" at core level. 

- Each object has a hidden link to another object -> prototype. 

- **Difference:** In JavaScript, inheritance happens via prototype chains between objects, whereas in Java it happens via classes. 


## Hoisting 

- Hoisting is JavaScript's behaviour of moving declarations to the top of their scope during the compilation phase. 

    Declarations are hoisted, not initializations or values. 


1. **`var` hoisting** 

        console.log(a);
        var a = 10;

    Internally JS treats it as: 

        var a; 
        console.log(a) ; // undefined 
        a = 10; 

    Declarations hoisted. Value not hoisted 

2. **`let` and `const` hoisting** 

        console.log(b) ; 
        let b = 20 ; 

    ReferenceError. Why? 

        let and const are hoisted but placed in Temporal Dead Zone (TDZ). 

        TDZ = time between declaration and initialization whose access is forbidden. 

3. **Function hoisting**

        sayHi();

        function sayHi() {
            console.log("Hi");
        }

    fully hoisted (function + body) ✔

        sayHello();

        var sayHello = function () {
            console.log("Hello");
        };

    Error: sayHello is undefined 


| Type                 | Hoisted            | Accessible Before Declaration |
| -------------------- | ------------------ | ----------------------------- |
| `var`                | Yes                | Yes (undefined)               |
| `let`                | Yes                | No (TDZ)                      |
| `const`              | Yes                | No (TDZ)                      |
| Function declaration | Yes                | Yes                           |
| Function expression  | Depends on var/let | No                            |



- Hoisting is JavaScript's behaviour of moving declarations to the top of their scope during compilation. 

    Variables declared with `var` are hoisted and initialized as undefined, while `let` and `const` are hoisted but remain in the temporal dead zone until initialized. 
    
    Function declarations are fully hoisted. 


**Why `var` is hoisted differently from `let` and `const`?**


- `var` hoisting (old JS design)

    var is hoisted, initialized to undefined. 

    Why? Early JS allowed flexible, function-scoped variables, avoid runtime crashes 

- `let` & `const` hoisting (modern JS fix)

    hoisted, but not initialized. This creates the Temporal Dead Zone (TDZ). 

    TDZ = means you cannot access the variable before its declaration line. 

    Accessing -> ReferenceError 

    Why? Prevents bugs caused by var. Enforces better coding practices, Make code more predictable. 

    let and const are hoisted but kept in the temporal dead zone until initialized, which prevents accidental access before declaration.


- Function declarations are fully hoisted, function expressions are not fully hoisted. 


**Why Hoisting significant?**


- Enables function-first programming 
- Allows readable top-down logic 
- Explains JS execution model 
- Prevents crashes (with var)


## this keyword 

- `this` refers to the object that is calling the function. 

    1. Global Context 

        console.log(this) ; 

            Browser -> window, Node.js -> {}

    2. Object method 

    3. Regular function 

        Non-strict -> window
        Strict     -> undefined 

    4. Arrow function 

        Arrow function do not have their own `this`. They inherit `this` from parent scope. 

- the value of `this` depends on the call site, not the function definition. 


**Why we haven't used `this` in development?**

- Because: We mostly use - Arrow functions, React hooks, Functional programming. 

- Arrow functions don't have their own `this`. Modern frameworks hide `this`. Earlier frameworks (AngularJS, jQuery) heavily used `this`

- The `this` keyword is confusing because its value is determined by how a function is called rather than where it is defined. 


## call, apply, bind 


- The `this` keyword refers to the object that invokes a function and can be explicitly controlled using `call`, `apply`, `bind`. 

- `call`, `apply`, `bind` are used to explicitly control the value of `this`. They are used to manually set the value of `this`, so the value of `this` doesn't get lost. 


1. **call**

- Calls function immediately. 

- Arguments passed one by one. 

2. **apply**

- Same as `call`. Calls the function immediately 

- Arguments passed as array 

3. **bind**

- Does not call immediately. 

- Returns a new function. Used to create a new function. 


## Closures 


- A closure is a function that remembers variables from its outer scope even after the outer function has finished executing. 

    Function keeps a reference to their lexical environment. Not a copy - an actual reference. 

- Where are closures used? 

    Data hiding / encapsulation, Counters, Callbacks, Event handlers, setTimeout/setInterval 

- Closures allow functions to retain access to variables from their lexical scope even after the outer function has executed. 

    Closures allow functions to preserve state by retaining access to variables from their lexical environment. 


**Lexical Scoping** means variables are accessible based on where they are written in the code, not where functions are called. 

- JS stores a reference to the lexical environment. Not a copy. 



## Why do we need Async JavaScript? 


- JavaScript is single-threaded: One call stack, One thing at a time. 

    But JS needs to handle: API calls, Timers, User interactions, File / network I/O

    Async JS allows JS to do non-blocking operations. 


## Event loop 

- The Event loop continuously checks: 

    1. Is Call Stack empty? 
    2. If yes -> executes all microtasks
    3. Then execute one macrotask 
    4. Repeat 

- JavaScript uses an event loop to handle asynchronous operations despite being single-threaded. 

    The event loop prioritizes microtasks like Promises over macrotasks like timers. 
    
    Promises represent future values and help avoid callback hell, while async/await provides a cleaner syntax built on Promises, improving readability and error handling. 


## Promises 

- A Promise represents a value that may be available now, later or never. 

- They are objects used for asynchronous operations. 

- They represent the eventual completion or failure of an asynchronous operation and allow chaining and handling of success or error cases. 

- Promise states: Pending, Fulfilled, Rejected 

- Promises were introduced to fix callback hell.

## async / await (Syntactic Sugar)

- async/await is built on top of Promises to make async code look synchronous. 

- `async` function always returns a Promise. `await` pauses execution inside that function only. Does not block the event loop. 

- `async/await` is just syntax built on top of Promises. 

    They are not different mechanisms - `async/await` makes promise-based code easier to read and write. 

- Promise-based code 

    .fetchData()
        .then(data => process(data))
        .then(result => save(result))
        .catch(err => console.error(err)) ; 

- async/await version 

    async function handleData(){
        try{
            const data = await fetchData() ; 

            const result = await process(data) ; 

            await save.result() ; 
        }catch(err){
            console.error(err) ; 
        }
    }


## Shallow Vs Deep Copy

- Copying means a new variable/reference from an existing object or array. 

    But in JS, objects & arrays are reference types, so copying is tricky. 

- Shallow copies duplicate only the top-level structure, while deep copies recursively copy all nested objects to avoid shared references. 

- Shallow copies duplicate only top-level references, while deep copies create completely independent nested objects. 

- Shallow copies are preferred for performance, while deep copies are used when complete data isolation is required. 

1. **Shallow Copy**

- A shallow copy copies only the first level. Nested objects still share the same reference. 

2. **Deep Copy**

- A deep copy copies all levels, creating completely independent objects. 

- No shared references. Handles nested objects. 


## Garbage Collection 

- It's the proess by which JavaScript automatically frees memory that is no longer reachable. 

- If an object isn't reachable, it is eligible for garbage collection. 

- Reachable means: Referenced by a variable, Referenced by a closure, Referenced by global scope, Referenced by DOM

**How GC Works?**

Modern JS uses Mark-and-Sweep algorithm: 

1. Start from root objects (window, global)
2. Mark all reachable objects 
3. Sweep (delete) unmarked objects 


## Memory Leaks 

- A memory leak occurs when memory is no longer needed but still referenced, so GC cannot clean it. 

- Common causes of memory leaks: 

    1. Forgotten global variables

    2. Closures holding references 

    3. setInterval not cleared 

    4. Event listeners not removed 

- How to avoid memory leaks 

    1. use `let` / `const`
    2. Clear intervals & timeouts 
    3. Remove event listeners 
    4. Prefer shallow copy unless needed 


## debugger


- It's a JavaScript keyword that pauses code execution and opens the debugging tools at that exact line. 

- It works like a manual breakpoint written directly in your code. 

    function calculate(a, b) {
        debugger;   // execution pauses here
        return a + b;
    }

When this line runs: 

    - Execution stops 
    - Browser DevTools open 
    - We can inspect: variables, Call stack, Scope, Closures, this 

- Where does `debugger` work: 

    Browser, Node.js, VS Code Debugger


- The `debugger` keyword is used to pause JavaScript execution at a specific point, allowing developers to inspect variables, scope, call stack, and execution flow using developer tools. 


## `var` vs. `let`

- The `var` keyword declares a global variable, which means that the variable can be accessed from anywhere in the code. 

- The `let` keyword declares a local variable, which means that the variable can only be accessed within the block of code where it's declared. If we try to access them, then we get `ReferenceError`.  


## NaN

- Not a Number 

- represents result of an invalid or undefined mathematical operation. 

    0 / 0 ; 
    Number("abc) ; 
    Math.sqrt(-1)

- `typeof NaN`: // "number" 

    This is because JS has only one numeric type ("number")

- Why does `NaN` exist? 

    To represent failed numeric calculations without crashing the program. 

- `NaN` is never equal to itself 

    NaN === NaN // false
    NaN == NaN  // false

    IEEE floating-point standard defines `NaN` as unequal to anything, including itself. 

- `NaN` represents an invalid number result in JavaScript. It is of type `number`, is not equal to itself, and should be checked using `Number.isNaN()` to avoid type coercion issues. 


## Pass by Value Vs. Pass by Reference 


- In JavaScript, primitive data types are passed by value and non-primitive data types are passed by reference. 

- "Pass by value" means that when a variable (like strings, numbers or Booleans) is assigned to another new variable, the value in the original variable is copied to the new variable. 

- "Pass by reference" means that when a variable associated with an object (like arrays or functions) is assigned to another new variable, it passes the reference of the object to the new variable, so both direct to the same memory space. 


## Immediately Invoked Function Expression (IIFE)

- An IIFE is a function that is executed immediately after it is defined. 

    (function (){
        console.log("I run immediately") ; 
    })() ; 

    Executed immediately, No need to call it separately 

- Why do we need IIFE? 

    1. Avoid polluting the global scope 
    2. Create a private scope 
    3. Used in older JS (before ES6 modules)


## Strict mode 

- Strict mode is a special mode in JS that enables stricter parsing and error handling, helping developers write safer and cleaner code. 

    "use strict"

- Why do we need Strict mode? 

    JavaScript was very flexible and forgiving, which caused: Silent bugs, Accidental globals, Security issues 

    Strict mode: Catches error early, Prevents bad practices, Makes JS more predictable 

- `this` behaviour changes. 

    Non-strict: window
    Strict: undefined 

- Strict mode enforces better coding practices by preventing accidental globals, changing `this` behaviour, and converting silent errors into explicit errors, making JS more secure, reliable and predictable.

    In modern JS, ES6 modules are strict by default. So, no need to write "use strict" manually. 


## ECMAScript (ES)

- ECMAScript is the standard/specification that defines how JavaScript should work. 

    JavaScript is an implementation of ECMAScript. 

    Browsers & Node.js follow this standard. 

- Think of it like: 

    ECMAScript -> Rule book
    JavaScript -> Actual book 


**ES6 (2015)**

- Introduced modern JS. 

- Key ES6 features: 

    let & const 
    Arrow functions 
    Classes 
    Modules
    Template literals 
    Destructuring 
    Promises

- ES6 introduced block scoping, arrow functions, classes, modules, and promises, making JS more readable, maintainable, and scalable. 


## Higher Order Function 


- A higher-order function is a function that takes another function as an agument OR returns a function. 

- Common built-in HOF 

    map (transform array), filter (Filter values), reduce (Accumulate), forEach (iterate), find (Find element)

- Good for abstraction, reusability and functional programming. Used heavily in React, Redux. 


## Scope of a Variable in JS

Scope = where a variable can be accessed. JS has 3 main types of scope: 

1. Global Scope - A variable declared outside any function or block. 

    - accessible everywhere 

2. Function Scope (var) - Variables declared with `var` are function-scoped. 

    function demo() {
        var a = 5;
    }

    console.log(a); // ❌ ReferenceError

3. Block Scope (let, const)

    Variables declared inside `{}` using `let` and `const`. 


- Lexical scope: Scope is determined by where variables are written in the code, not how functions are called. 


## `map`, `forEach`, `filter`, `reduce`


These are array higher-order functions introduced in ES5. 

1. **map()- Transform array**

    Returns a new array by applying a function to each element. 

        const nums = [1,2,3] ; 
        const doubled = nums.map(n => n*2) ;

    Returns new array

    The `map()` function is used to iterate over an array and apply a transformation or computation on each element. It returns a new array with the results of the transformation. 

2. **forEach() - Iterate only**

    Executes a function for each element. Does not return anything. 

        nums.forEach(n => console.log(n));

3. **filter() - Select elements**

    Returns a new array with elements that satisfy a condition 

        const evens = nums.filter(n => n % 2 === 0)

    Removes unwanted elements. Returns new array. 

4. **reduce() - Accumulates to single value**

    Reduces array to one value. Used for transformation, selection and aggregation. 

        const sum = nums.reduce((acc, curr) => acc + curr, 0) ; 

    Can return number, object, array. 

    The `reduce()` function is used to reduce an array to a single value by applying a function to each element and accumulating the result. 

        const numbers = [1,2,3,4,5] ; 

        const sum = numbers.reduce(function(acc, num){
            return acc + num ; 
        }, 0) ; 


## Callbacks 

- A callback is a function that is passed as an argument to another function and is executed later, usually after some opearation completes. 

- Why do callbacks exist in JS? 

    JS is: Single-threaded, Non-blocking

    Callbacks allows JS to: perform async operation, avoid blocking the main thread. 

- Callback is a function passed to another function and executed later. 

## Callback Hell 

- Nested callbacks that make code hard to read and maintain. 

    Hard to read, hard to debug, error handling nightmare. 

**How Callback Hell was solved**

1. Promises 

2. async/await    

- A callback is a function passed to another function and executed later, commonly used for handling asynchronous operations in JS. 

    Callbacks enable non-blocking behaviour but can lead to callback hell when nested deeply, which is why modern JS prefers Promises and async/await for better readability and error handling. 


## Event loop 


- The event loop is a mechanism that allows JS to perform non-blocking asynchornous operations event though JS is single-threaded. 

- JS has: one call stack, one main thread. 

    If JS waited for: API calls, timers, file reads, the entire app would freeze. 

    The event loop prevents this. 


**Core Components of the Event Loop**

1. Call Stack 

    - Executes synchronous code. 
    - LIFO (Last In, First Out)

2. Web API (Browser / Node APIs)

    Handles async operations: setTimeout, fetch, DOM events 

3. Callback / Task Queues 

There are two main queus: 

    - Macrotask queue: setTimeout, setInterval, DOM events 

    - Microtask queue: Promises(.then, catch), async/await

Microtasks run before Macrotasks.

4. Event loop (the coordinator)

    Continuously checks: 
        
        Is the call stack empty?

        If yes -> run all microtasks. 
        
        Then -> run one macrotask

**How Event Loop Works**

    console.log("Start");

    setTimeout(() => console.log("Timeout"), 0);

    Promise.resolve().then(() => console.log("Promise"));

    console.log("End");


- Execution Order: 

    Start
    End
    Promise 
    Timeout 

- Why: 

    1. Sync code -> call stack 
    2. Promise -> microtask queue 
    3. setTimeout -> macrotask queue 
    4. Microtasks run before macrotasks 

- JS is single-threaded with event loop. 

- The event loop is a JavaScript mechanism that manages execution of synchronous code and asynchronous callbacks. It continuously monitors the call stack and executes tasks from the microtask queue and macrotask queue when the stack is empty, allowing JavaScript to be non-blocking despite being single-threaded. 

- JavaScript is single-threaded, and the event loop allows it to handle asynchronous operations without blocking the main thread. 

    It executes synchronous code first, then processes promise callbacks (microtasks), and finally timer annd I/O callbacks (macrotasks). 


## Memoization 

Memoization is a technique that can be used to improve the performance of JS code. Memoization works by storing the results of expensive calculations in a cache. 

- This allows JS code to avoid re-performing the expensive calculations if the same input is provided again. 

## Recursion 

Recursion is a programming technique that allows a function to call itself. Recursion can be used to solve a variety of problems, such as finding the factorial of a number or calculating the Fibonacci sequence. 


## Event Delegation

Event delegation is a technique where a single event listener is attached to a parent element instead of multiple child elements. 

- Better performance, Less memory usagem, handles dynamically added elements 

- Event delegation improves performance by reducing the number of event listeners and works by leveraging event bubbling. 

    <ul id="list">
        <li>Apple</li>
        <li>Banana</li>
        <li>Orange</li>
    </ul>

    document.getElementById("list").addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
        console.log(e.target.innerText);
    }
    });


## Prototypes in JS

- Prototypes are a mechanism used by JS objects for inheritance. 

    Every JS object has a prototype, which provides properties and methods that can be accessed by that object. 

- In JavaScript, every object has a prototype, which is another object from which it inherits properties and methods. 

- JS uses prototype-based inheritance, and ES6 classes are just syntactic sugar over prototypes. 


## Generator function & `yield`

- A generator is a function that can pause and resume execution. 

- Why generators are used? Lazy execution, Iterators, Controlled async flow (before async/await)

- Generators allow functions to pause execution using `yield` and resume later. 


## Function declarations and Function expression 

- Function declarations are defined using the function keyword, while function expressions are defined by assigning a function to a variable. 

- Function declarations are hoisted, while function expressions are not. 

## Synchronous and Asynchronous programming 

- In synchronous programming, the program execution occurs sequentially, and each statement blocks the execution until it is completed. 

- In asynchronous programming, multiple tasks can be executed concurrently, and the program doesn't wait for a task to finish before moving to the next one. 

## Event Bubbling 

- Event bubbling is the process where an event triggers on a nested element, and then the same event is propagated to its parent elements in the DOM. 

- It starts from the innermost element and goes up the documemt root. 

- When an event occurs on an element, it propagates upwards from child -> parent -> document.

- Enables event delegation. Improves performance. 


## DOM (Document Object Model)

- The DOM is a tree representation of an HTML document, where each element is an object that JavaScript can manipulate. 

- DOM Tree example

    document
        └── html
            ├── head
                └── body
                    └── div
                        └── button

- Accessing DOM elements 

    document.getElementById("id");
    document.querySelector(".class");
    document.querySelectorAll("div");

- Modifying DOM

    element.textContent = "Hello";  
    element.innerHTML = "<b>Hi</b>";
    element.style.color = "red";

- Creating & removing elements 

    const el = document.createElement("div");
    document.body.appendChild(el);
    el.remove();

- DOM event listeners 

    element.addEventListener("click", handler);

    Events: click, input, change, submit, keydown 

- DOM events go to task queue. Handled after call stack is empty. 

- DOM is basically a tree-like object representation of HTML that JavaScript can read, modify and listen to events on. 

## Timer Functions / Web APIs 

- JavaScript is single-threaded. Timer allows us to: delay execution, schedule repeated execution, keeps JS non-blocking. 

1. **setTimeout:** Executes a function once after a specified delay. 

    setTimeout(() => {
        console.log("Runs once after 1s");
    }, 1000);

2. **clearTimeout:** 

    const id = setTimeout(fn, 1000);
    clearTimeout(id);
    
3. **setInterval:**

    Executes a function repeatedly at fixed intervals. 

    setInterval(() => {
        console.log("Runs every 1s");
    }, 1000);

4. **clearInterval:**

    const id = setInterval(fn, 1000);
    clearInterval(id);


- Timer is registered in Web API / libuv (NodeJS). 

    After delay -> callback moves to macrotask queue. 
    
    Event loop executes it when call stack is empty. 


## localStorage Vs. sessionStorage 

Both are Web Storage APIs.

- Both `localStorage` and `sessionStorage` are web storage objects in JavaScript, but they have different scopes and lifetimes. 

- `localStorage` persists data even after the browser window is closed and is accessible across different browser tabs/windows of the same origin. 

    localStorage.setItem("token", "abc");

    Persists even after browser closes. Max 5-10 MB. Shared across tabs. 

- `sessionStorage` stores data for a single browser session and is accessible only within the same tab or window. 

    sessionStorage.setItem("token", "abc");

    Cleared when tab closes. Unique per tab. Same size limit. 


| Feature  | localStorage  | sessionStorage |
| -------- | ------------- | -------------- |
| Lifetime | Permanent     | Tab session    |
| Scope    | All tabs      | Single tab     |
| Use case | Tokens, theme | Form data      |


## splice() and slice()

- `splice()` is used to modify an array by adding, removing, or replacing elements at a specific position. 

    Adds, removes, or replaces elements in original array. 

    Modifies original. Used for insert/delete. 

- `slice()` is used to create a new array that contains a portion of an existing array, specified by the starting and ending indices. 

    Extracts part of an array and returns a new array. 
    
    Doesn't modify original. Used for copying/extracting. 

        const arr = [1,2,3,4] ; 
        const result = arr.slice(1,3) ; 

        console.log(result) ; // [2,3]


## Web API

- Web APIs are browser-provided featurees that JS can use but doesn't implement itself. 

    JavaScript calls them -> browser executes them. 

- Example of Web APIs

    1. Asynchronous APIs: setTimeout, setInterval, fetch, Promises 

    2. DOM APIs: document, querySelector, addEventListener

    3. Storage APIs: localStorage, sessionStorage, indexedDB

    4. Other Web APIs: Geolocation, Clipboard, Canvas, WebSocket 

- Web APIs allow JavaScript to interact with browser features like DOM, timers, and network requests


## Array Vs. Object 

- Array: Ordered, Index-based, Built-in methods (map, filter), Best for lists 

- Object: key-value pairs, Unordered

## fetch() Vs. Axios

- `fetch` is a Web API used to make HTTP requests. Comes with browsers. No installation needed. 

- GET request 

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err)) ; 

- POST request 

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(data)
    })


- **Axios** is a third-party JavaScript library for HTTP requests.

    Offers additional features like `interceptors`, `automatic JSON parsing`, better error handling, and Node.js support. 

    Need to be installed. Built on top of XHR/http

    axios.get(url)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

## Events in JS

Event represent user or browser actions. 

- Mouse Events: click, dblclick, mouseover, mouseout

- Keyboard Events: keydown, keyup

- Form Events: submit, change, input, focus, blur 

- Window Events: load, resize, scroll, unload


## `window` Object 

`window` is the global object in browsers. 

- What it contains: Global variables, DOM, Web APIs, Timers 

- The `window` object represents the browser environment and acts as the global scope. 