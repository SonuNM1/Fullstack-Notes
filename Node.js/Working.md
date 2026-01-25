
## Node.jS Working 

Node.js executes JS in a single thread, but it handles concurrency using an event-driven, non-blocking I/O model. 

    When an asynchronous operation like a database call or file read is initiated, Node delegates it to the OS or libuv thread pool, freeing the main thread to handle other requests. 

    Once the operation completes, its callback is placed in the event loop queue and executed. 


- Node.js is single-threaded for JS execution, but it achieves high concurrency through non-blocking asynchronous I/O and an event-driven architecture using the event loop. 

**If Node is single-threaded, how is it fast?**

Because it uses non-blocking I/O and delegates heavy work to libuv and the OS. 

**FIFO or LIFO**

Event loop queue follows FIFO.


- Node.js executes JavaScript in a single thread using the V8 engine, which JIT-compiles JavaScript into machine code. 

    It handles concurrency using an event-driven, non-blocking I/O model powered by libuv. 

    Heavy operations are delegated to the OS or thread pool, and callbacks are queued and executed by the event loop in FIFO order (queue), allowing Node.js to efficiently handle thounsands of concurrent requests. 

    

## How Node handles many requests with one thread 

Client Request
↓
JS Thread receives request
↓
If async task → delegate it
↓
JS thread stays free
↓
Callback is queued later


**What is libuv?**

libuv is a C library that provides Node.js with asynchronous, non-blocking I/O and a thread pool. 

    JS doesn't talk directly to OS. libuv acts as the middleman. 

- JS execution is single-threaded, but Node uses a thread pool internally via libuv. 

**Event loop**

- A mechanism that continuously checks if there is work to execute on the main JS thread. 

    Event loop runs until there is nothing left to excute. 


1. **Single Thread ≠ Single Task**

- Node.js runs JavaScript on one main thread. 

- This thread does not wait for slow operations like: 

    File I/O, Database calls, Network requests 

2. **What happens when a request comes in**

- Request reaches Node.js 
- Synchronous JS logic runs on the main thread 
- If an async operation is encountered: 

    ```js
    fs.readFile(...)
    db.query(...)
    ```

- That operation is offloaded to libuv 

- Main thread becomes free immediately. 

3. **Role of libuv**    

- libuv is a C library behind Node.js 
- It provides: Event loop, Thread pool, Async I/O handling 

- libuv handles async work in 2 ways: 

    1. OS Async APIs (network, requests)
    2. Thread Pool (file system, crypto, DNS)

- So while JS stays single-threaded. Actual heavy work runs outside the JS thread. 


4. **Event loop - The Coordinator**

- Event loop runs on the main thread.
- Its job: 

    Watch for completed async tasks. Push their callbacks back to JS. Execute them one by one. 

`Request → Async task → libuv → callback → Event Loop → JS thread` 

5. **How Concurrency is achieved**

- Node.js does not execute callbacks in parallel

- Instead, it: 

    - Handles thousands of request concurrently
    - By never blocking the main thread
    - By switching tasks when async work is pending 

This is called non-blocking concurrency. 


**Node.js executes JS on a single thread, but when an asynchronous operation like I/O or database access occurs, it delegates that work to libuv. libuv uses OS-level async APIs or a thread pool to handle these operations in the background. Once the operation completes, the event loop pushes the callback to the main thread for execution. Because the main thread never blocks, Node.js can handle many concurrent requests efficiently.**

- Node.js achieves high concurrency not through multithreading, but through non-blocking I/O and an event-driven architecture. 


## Thread Pool in Node.js 

The thread pool is a set of worker threads managed by libuv that execute blocking or CPU-intensive tasks so that t he main JS thread remains free. 

**Why Node.js Needs a Thread Pool**

- JavaScript runs on one thread 
- Some operations cannot be truly async at OS level: 

    File system, Crypto, DNS lookups, Compression. 

    These tasks are sent to the thread pool. 

    Not all tasks can be handled directly by the operating system in a non-blocking way. Some tasks block the thread while executing, so Node.js must move them to a thread pool. 

**How it works**

1. JS code hits an async task: 

    `fs.readFile("data.txt", callback)`

2. Task is delegated to libuv thread pool 
3. Worker thread executes it 
4. When done, callback is queued 
5. Event loop executes callback on JS thread 


## Event-Driven Architecture in Node.js 

- Node.js reacts to events instead of waiting for tasks to finish. 

- Examples of events: HTTP request received, File read completed, Timer expired, WebSocket message 

**How Event-Driven Architecture Works**

1. Event occurs (request, I/O completion)
2. Event is emitted 
3. Listener (callback) is triggerd 
4. Event loop schedules execution 


- Node.js uses an event-driven architecture, where the application reacts to events and executes callbacks, instead of blocking threads. 

## Node.js Core Modules (`https`, `fs`, `os`, `path`, `crypto`)

**`fs` (File System)**

Used for: 

- Read/write files
- Upload handling 
- logs
- config files 

    fs.readFile("data.txt", callback);

**`path`**

Used for: 

- Cross-platform paths: Windows uses `\`, Linux uses `/`

**`os`**

Used for: 

- CPU info
- Memory 

**`https`**

Used for: 

- Secure servers
- APIs 

**`crypto`**

What crypto is used for: 

- Password hashing 
- JWT signing 
- Encryption 
- Decryption 
- Secure random tokens 

- Crypto module provides cryptographic functionality for secure data handling.




## Thread Pool Starvation 

When all thread pool threads are busy, new tasks must wait, causing delays. 

**Why it happens**

- Default thread pool size = 4 
- Too many operations like: 

    `fs.readFile`, `bcrypt.hash`, compression, DNS lookups, Compression (involves CPU-heavy computation, so Node executes it in the libuv thread pool)

    All compete for limited threads. 

    Only 4 run at once, Others wait and performance drops 

- Thread pool starvation occurs when long-running tasks occupy all worker threads, delaying execution of other async operations. 

**How to prevent it**

- Avoid CPU-heavy work in Node
- Increase thread pool size 
- Use worker threads 
- Offload work to separate services 


**Why CPU-heavy tasks are bad in node.js**

- Node executes JS on one main thread 

- CPU-heavy JS: blocks event loop, delays all other requests 

- Examples: Image processing, Video encoding, Big JSON parsing, Encryption loops 

**How to handle CPU-heavy work**

- Worker threads
- Background jobs
- Separate microservices 



## Avoiding CPU-Heavy work in Node.js - What does it actually mean? 


CPU-heavy work = long calculations 

- Examples: Image resizing, Video encoding, PDF generation, Password hashing in bulk

- Why not inside Node main thread? 

    Blocks event loop, All requests wait, App becomes unresponsive 


