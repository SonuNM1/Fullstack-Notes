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

- Returns a new function. 


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

- Promise states: Pending, Fulfilled, Rejected 

- Promises were introduced to fix callback hell.

## async / await (Syntactic Sugar)

- async/await is built on top of Promises to make async code look synchronous. 

- `async` function always returns a Promise. `await` pauses execution inside that function only. Does not block the event loop. 


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


