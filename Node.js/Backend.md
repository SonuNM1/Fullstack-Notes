## NodeJS

- Node.js is aan open-source JavaScript runtime environment built on Chrome's V8 Engine, that allows JavaScript to run outside the browser. 

- It uses an event-driven, non-blocking I/O model and an event loop to efficiently handle thousands of concurrent I/O operations. 

- Before Node.js: JavaScript could only run inside browsers. Without a browser: JavaScript had nowhere to run. 

- Node introduced Event driven and non-blocking I/O which allowed: thousands of concurrent requests, using a very few threads. 

**Node.js is excelled for:** 

- REST APIs, 
- Real-time Chat Apps, 
- WebSockets, 
- Streaming services, 
- Microservices, 
- BFF (Backend For Frontend)

- Is Node.js a framework? No, Framework is Express, NestJS, Next.js .. Node.js is the runtime on which those frameworks run. 

**Advantages**

- Event driven
- Non blocking I/O 
- High concurrency


### Event Loop 

It is the mechanism that allows Node.js to perform non-blocking asynchronous operations despite being single-threaded. 

**Node.js is single-threaded. Then how does it handle thousands of requests?**

- The event loop is the mechanism that allows Node.js to perform non-blocking asynchronous operations even though JavaScript executes on a single 
    thread. It allows Node.js to handle asynchronous operations without blocking the main JavaScript thread. 

**Why it exists?**

- Node.js is: single threaded. Meaning: one javascript task executes at a time. 

- If Node waited for every: Database query, API call, File read - the server would become extremely slow. 

    The event loop solves this by allowing Node.js to continue executing other code while waiting for I/O operations to complete. 

- Common Async operations - Database queries, API calls, File reading, timers, network requests 

- Example: 

`
console.log("A") ; 

setTimeout(() => {
    console.log("B") ; 
}, 1000) ; 

console.log("C") ; 
`

Output - 
A 
C 
B

Reason - setTimeout is delegated, Node continuous execution, Callback runs later - Main thread never waits 


### Call Stack 

- The call stack is a data structure that keeps track of function execution in JavaScript. 

    Stack = Function execution tracker 

- It's a data structure used by JavaScript to manage function execution. 

- Event loop waits until call stack (LIFO) is empty. 

- Functions are pushed onto the stack when called and removed when execution completes. The Event loop checks whether the call stack is empty before executing 
    asynchronous callbacks. 

- Example: 

`
function one(){
    two() ; 
}

function two(){
    three() ; 
}

function three(){
    console.log("Hello") ; 
}

one() ; 
`

- Execution: 

one()
 ↓
two()
 ↓
three()
 ↓
console.log()

- Call stack: 

console.log()
three() 
two() 
one()

- After execution: 

console.log removed 
three removed
two removed
one removed 

    Therefore, Stack becomes empty. 


### Microtask Queue Vs. Callback Queue 

- When async work completes, callbacks don't directly go to the Call Stack. They first enter queues. 

- Whenever call stack becomes empty: 

    1. Execute ALL microtasks
    2. Then execute callback queue tasks 

    Microtask queue always has higher priority. 

- JavaScript is single-threaded, which means it can execute only one piece of JavaScript code at a time. However, modern applications perform many asynchronous operations 
    such as API calls, database queries, timers, and file operations. 

    If JavaScript waited for every asynchronous operation to complete, the application would become slow and unresponsive. 

    To solve this problem, complete asynchronous tasks are temporarily stored in queues and executed later when the Call Stack becomes empty. 

    The Event Loop is responsible for managing these queues and deciding which task should execute next. 

**Callback Queue / Macrotask Queue**

- The Callback Queue (or Macrotask Queue) stores completed asynchronous callbacks such as timers and I/O operations, which are executed after higher-priority tasks have 
    finished. 

- Example

    ```js
    setTimeout()
    setInterval()
    setImmediate() 
    I/O callbacks
    ```

    When one of these operations finishes, its callback is not immediately exectuted. Instead, it is placed into the Callback Queue and waits for the Event loop 
    to move it into the Call Stack. 

**Microtask Queue**

- It stores high-priority asynchronous callbacks that should execute immediately after the current synchronous code completes. 

- Example: `Promise`

    Microtasks have a higher priority than Macrotasks. Whenever the Call Stack becomes empty, the Event Loop first executes all pending Microtasks before processing 
    any task from the Callback/Macrotask Queue. 

- The Microtask Queue stores high-priority asynchronous tasks such as Promise callbacks. The Event loop always processes all Microtasks before executing any Macrotask. 

**Relationship with Event Loop**

- The event loop is the coordinator between the call stack and the queues. 

    Its job is to continuously check whether the Call Stack is empty. 

- When the Call Stack becomes empty: 

    1. The Event Loop executes all tasks from Microtask Queue. 
    2. After the Microtask Queue becomes empty, it executes one task from the Macrotask Queue. 
    3. The cycle repeats continuously. 

    Because of this priority order, Promise callbacks always execute before setTimeout callbacks. 

**Execution Priority**

The execution order followed by the Event loop is: 

    1. Synchronous code 
    2. Microtask Queue (Promise)
    3. Macrotask Queue (Timers)


### How does Node.js handle thounsands of concurrent requests despite being single-threaded? 


Node.js executes JavaScript on a single thread, but it delegates asynchronous operations such as network requests, database calls, file system operations, 
and cryptographic tasks to libuv and the operating system. 

    While these operations are running, the main JavaScript thread remains free to handle other requests. Once the operation completes, the callback is queued and later 
    executed by the Event Loop. 

**Flowchart**

    Request Arrives
        ↓
    Async Work Delegated
        ↓
    Main Thread Remains Free
        ↓
    Other Requests Processed
        ↓
    Result Returns
        ↓
    Callback Executed

## Libuv

- Libuv is the C library responsible for Node.js asynchronous capabilities. 

- It's responsible for implementing the Event loop, managing the Thread Pool, and handling non-blocking I/O operations. 

**Why does Node.js need Libuv?**

- JavaScript itself is single-threaded and cannot perform asynchronous operations on its own. If Node.js relied only on the JavaScript thread, operatons such as: 

    1. File reading 
    2. Database calls 
    3. Network requests
    4. DNS Lookups 

    would block execution. 

- Libuv solves this problem by providing mechanisms that allow Node.js to execute these operations asynchronously while keeping the main JavaScript thread available. 

- When an asynchronous operation is encountered, the JavaScript thread does not execute the operation itself. Instead: 

    JavaScript
        ↓
    Libuv
        ↓
    Operating System / Thread Pool
        ↓
    Operation Completes
        ↓
    Callback Queue
        ↓
    Event Loop
        ↓
    Callback Executes

- This allows Node.js to continue processing other requests while waiting for the operation to finish. 

- Therefore, Libuv is the C library that enables Node.js to perform asynchronous and non-blocking operations. It provides the Event loop, manages the Thread pool, and 
delegates expensive operations away from the main JavaScript thread, allowing Node.js to handle high concurrency efficiently. 


## Thread Pool

- The thread pool is a collection of worker threads managed by libuv that executes expensive or asynchronous operations without blocking the main JavaScript thread. 

**Why does thread pool exist?**

- Some operations cannot be efficiently handled directly by the operating system's asynchronous APIs.

- Executing those operations on the main JS thread would block the Event loop and reduce application performance.

    To avoid blocking, Libuv delegates these tasks to worker threads in the Thread Pool. 

- Default size: 4 Threads (the default thread pool size ins Node.js is 4 threads)

**Internal Working**

When a request arrives: 

    Request Received
        ↓
    Async Operation Detected
        ↓
    Operation Delegated To OS or Thread Pool
        ↓
    Main Thread Continues Processing Requests
        ↓
    Operation Completes
        ↓
    Callback Queued
        ↓
    Event Loop Executes Callback


## Libuv Vs Event Loop Vs Thread Pool 

- **Libuv** is the underlying library used by Node.js to implement asynchronous I/O. It provides the Event loop, Thread pool, and mechanisms for handling non-blocking
operations. 

    Libuv = infrastructure. It contains multiple components. 

- **Event Loop** is a component of Libuv responsible for continuously checking whether asynchronous callbacks are ready to execute and moving them to the Call Stack if empty. 

    Responsibility = schedule and execute callbacks. It doesn't perform the actual work. 

- **Thread Pool** is a group of worker threads managed by Libuv that execute expensive operations outside the main JS thread. 

    Responsibility = perform the actual work. 

**Relationships between them**

When an asynchronous operation is encountered, Node.js delegates the operation to Libuv. Libuv either uses operating system APIs or its Thread Pool to perform the work in the background. 

    Once the operation completes, Libuv places the associated callback into a queue. The Event loop then detects that the callback is ready and schedules it for execution on the JavaScript thread. 

Libuv = Manager 
Event loop = Scheduler 
Thread pool = Worker 


## Streams 

A Stream is a mechanism in Node.js that allows data to be processed incrementally in small chunks rather than loading the entire data into memory at once. 

**Why Streams Exist**

Suppose our application needs to serve a: `5GB Video File`. 

- Without Streams: 

    `const data = fs.readFileSync("movie.mp4") ;`

    Node.js first loads the entire 5GB file into memory. 

    Problems: high memory usage, poor performance, possible application crash 

- With Streams: 

    `fs.createReadStream("movie.mp4") ;`

    Thie file is read in small chunks. Only a small portion of the file remains in memory at any time. 

- Streams enable efficient handling of large amounts of data by processing data incrementally. 

    Instead of waiting for the complete dataset to be available, applications can start processing data as soon as the first chunk arrives.

    This improves memory efficiency and overall application performance. 

**Why Streams are Important?**

- Lower memory usage 
- Better performance
- Faster response times 
- Suitable for Large files 

**Common Real-world use cases**

- Video Streaming
- File downloads
- File uploads 
- Reading large CSV file 
- Proxy servers 

**Types of Streams**

1. Readable Stream - used for reading data 

    fs.createReadStream()

2. Writable Stream - Used for writing data 

    fs.createWriteStream()

3. Duplex Stream - can read and write 

**Why use Streams instead of fs.readFile()**

- Streams process data in chunks, whereas `fs.readFile` loads the entire file into memory.

    Streams are therefore more memory-efficient and are preferred when dealing with large files or continuous data sources. 


## Express Request Lifecycle - what happens internally when a request hits our Express server? 


The `Express Request Lifecycle` is the sequence of steps a request goes through from the moment it reaches the server until a response is sent back to the client. 

- Example: Whenever a client sends a request: `GET /users`

    Express processes that requests through a series of stages before returning a response. 

    The request may pass through multiple middleware functions, reach the appropriate route handler, perform business logic such as database operations, and finally send
    a response back to the client. 

    Client Request: A client (browser, mobile app, frontend app, Postman) sends a request to the Express server
        ↓
    Express Server
        ↓
    Middleware(s): Before reaching the route handler, Express executes middleware functions. Middleware can: log requests, authenticate users, validate data, parse JSON, handle errors 
        ↓
    Route Matching: After middleware execution, Express attempts to find a matching route. 
        ↓
    Route Handler / Controller: contains the application logic. Responsibilities (fetch data, validate data, call services, perform business logic)
        ↓
    Business Logic / Database: typically the controller interacts with: MongoDB, PostgreSQL, Redis
        ↓
    Response Sent: Response is returned to the client


## Why does Middleware order matter? 

Express executes middleware sequentially in the exact order they are registered. 

- When a request arrives, Express starts from the first middleware and moves downward. Therefore, middelware registered earlier gets executed before middleware 
    registered later. 

- Because middleware can modify the request, response, or control whether execution continues, changing their order can change application behaviour. 

## Middleware 

