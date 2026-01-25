### dependencies Vs. devDependencies 

- dependencies: used in production. These packages are required for your application to run. 

    Example: express -> your server won't work without it. dotenv -> used to load environment variables your app needs 

- devDependencies: used only during development. These packages are needed while building or developing, but not required for production. 

    Example: nodemon -> restarts server during development. Testing tools (Jest, Mocha). Linters (ESLint), Bundlers (Webpack, Vite)


### type commonjs vs type module 


- type "commonjs": This is the older Node.js module system. Not the modern JavaScript standard. 

    Not ideal for modern bundlers and frontend code sharing 

- type "module": Modern JavaScript module system. You enable it by adding this in package.json 

    "type": "module"

    Modern, standard JavaScript. Supports top-level await. Better compatibility with TypeScript, bundlers, and modern frameworks. File extensions are required (.js)

    supports browser + server code consistency 

## curl 

- It's a command-line tool used to make network requests. Think of it like a browser without a GUI.

    When you type a URL in chrome, Chrome sends a request to a server. When you type a URL using curl, curl does the same thing - but from the terminal. 

**What curl dooes:**

- Send HTTP GET request (fetch data)
- Send POST requests (submit data)
- Call APIs
- Test servers and containers 
- Check if a URL is working 
- Debug endpoints 


## req.body, req.params , req.query


## Middleware 

- middleware functions sit in between the request and the final route handler. 

- A middleware must call next() to tell Express: I am done here. Pass control to the next middleware or the final route. 

**What if we DON'T use next()?**

- the request will get stuck 
- the next route will never run 
- the client will not receive any response 
- the request will eventually timeout 



## Why do we always use Express with Node.js? 

- Node.js by itself is not a web framework. It's just a JavaScript runtime - it can run JavaScript outside the browser. So, while Node can technically create a HTTP server, it is very low-level. 

    It doesn't has: routing, middleware, request parsing, error handling, JSON handling, built-in utilities. 

    This is where Express comes in. 

- Express solves the problems Node alone doesn't. Express is minimal, flexible web framework built on top of Node. It gives you everything you need to build real-world APIs. 

- What Express adds: Routing, Middleware system (to process requests, validate, authenticate), JSON body parsing, Error handling, Cleaner API

- Alternatives to Express: Fastify, NestJS, Next.js API, Remix 


## Local MongoDB Vs. MongoDB Atlas (Cloud Database)

1. Local MongoDB (Installed App): 

    MongoDB is running on your own machine, Port 27017 (default), No username/password, No SSL requirement, Works only on your local computer 

    Will not work in production, because only your computer can access "localhost" 

    mongodb://localhost:27017/Zomato

2. MongoDB Atlas 

    Your database lives on MongoDB's cloud servers, Accessible from anywhere (internet), Requires username/password, Production ready 

    mongodb+srv://username:password@cluster0.abcde.mongodb.net/Zomato?retryWrites=true&w=majority


## Why does Mongoose pluralize the model name? 


## express.json() middleware 

## JWT TOken generator 

## Base64

## What is NODE_ENV? 

NODE_ENV is just a built-in variable in Node.js that tells your app: 

    Are we running in DEVELOPMENT mode? 

    Or, PRODUCTION mode? 

Node automatically sets this: When we run: 

    node server.js

Node automatically sets: 

    NODE_ENV = "development"

    Unless you manually override it. 


**Why does this matter for cookies?**

This line: 

    secure: process.env.NODE_ENV === "production"

Means: 

If we are in production (meaning your app is hosted ONLINE, with HTTPS): 

- secure: true
- Cookie will only be sent over HTTPS websites
- This protects the cookie 

If we are in development (you are running it on localhost, no HTTPS): 

- secure: false
- Cookie still works on localhost 

**Why do we need to differentiate between these two?**

Because, On localhost you can't use HTTPS.

If secure: true, the cookie will NOT be set at all. So during development, we keep it false. 

On production, always use HTTPS. If "secure:false", your token could be stolen. 

- When developing locally - you don't need this: 

    NODE_ENV = development 

    Because Node already assumes "development" 

- When deploying to production, add: 

    NODE_ENV = production

    Then your cookie becomes more secure. 


- Password Validation


## Node.js Features 

- Single-threaded
- Non-Blocking, Asynchronous I/O
- Cross Platform
- V8 Engine 
- Event driven architecture 
- Real-time data handling 
- Libuv 


## REST API as an Architectural Pattern

REST (Representational State Transfer) is an architectural style for designing networked applications using HTTP. 

**Core Principles of REST**

1. Client-Server separation

2. Statelessness

3. Resource-based URLs: In REST, URLs represent resources (nouns), not actions (verbs)

    ```http
    /users
    /users/1
    ```

4. HTTP methods: GET, POST, PUT/PATCH, DELETE 

**Other API Architecture Patterns apart from REST**

1. SOAP: XML-based, Very strict, Heavy, Used in legacy enterprise systems 

2. GraphQL: Client decides what data it needs 

    Solves over-fetching and under-fetching. 

3. gRPC: Binary protocol, Fast, Uses HTTP/2, used in Microservices. 

4. WebSockets APIs: full-duplex communication, Real-time data, Chat and live updates 

5. Event-Driven APIs: Communication via events, Kafka, RabbitMQ 

    Producer -> Broker -> Consumer 

## Microservices Architecture 

Microservices is an architecture where an application is split into small, independent services that communicate over APIs. 

- Each service: has its own codebase, owns its data, can be deployed independently 

- Communication via: REST, gRPC, Events 

- Microservices architecture breaks an application into independently deployable services that communicate over APIs, improving scalability and resilience. 

## REPL 

- Read-Eval-Print-Loop 

- An interactive environment where we can execute JS code line by line. 

- How to start: `node`

- What can we do: Test JS code, Debug small snippets

- REPL is an interactive Node.js shell used for quick testing and debugging. 


## ORM 

Object Relational Mapping. A technique that maps database tables to JavaScript objects. 

- Without ORM: `SELECT * FROM users;`

- With ORM: `User.findAll()`

- Popular ORMs: Sequelize, TypeORM, Prisma, Mongoose (ODM for MongoDB)

- Advantages: Less SQL, Cleaner code

- ORM abstracts database operations by mapping tables to objects, simplify data access and operations. 


## Event-driven Programming 


- Event-driven programming is a paradigm where the flow of the program is determined by events such as user actions, I/O completions, or messages. 

- In Node.js: Requests, File read completion, Timers, WebSocket messages 

**How It Works**

1. Event occurs
2. Listener is triggered 
3. Callback executes 

    `server.on("request", handler);`

- Node.js follows event-driven programming where actions are triggered by events. 


## Buffer 

- Used to handle raw binary data 

- JavaScript normally works with strings & objects. Node.js deals with files, streams, etc. These are binary, not text -> Buffer is needed. 

**Why Buffer exists**

JavaScript originally had no way to handle binary data. 

- Node.js needs to handle: File system data, Network sockets, Images, videos, PDFs. 

    Buffer bridges the gap between binary data and JavaScript. 

- Buffer allows Node.js to work with binary data. 

## Streams 

A stream is a way to process data piece by piece, instead of all at once. 

**Why do Streams exist?**

Problem: 

- Large files = large memory usage
- Loading full file blocks memory 

Solution: 

- Process data in chunks 

**How do Streams work?**

1. Data is split into small chunks 
2. Each chunk is a Buffer
3. Chunks are processed as they array 

`File -> [Buffer][Buffer][Buffer] -> App`

**Buffer + Stream Relationship**

- Stream = flow of data
- Buffer = single chunk of data 


- Streams allow Node.js to handle large data efficiently by processing it in chunks using buffers, instead of loading it all in the memory directly.

**Types of Streams**

- Readable (read data)
- Writable (write data)
- Duplex (Read + Write)
- Transform (modify data)


**Real-life problem Streams solve**

- Scenario: You want to send a large file (video/image/log file) to the client. 

- Without Streams: High memory usage, Server can crash for large files, Slow response 

- With Streams: File is not loaded fully, Data comes in small chunks, Each chunk is a Buffer, Memory stays low, Client starts receiving data immediately. 


## Crypto module 

- Real-world needs: Password hashing, Data encryption, Token signing, Secure communication

    Never store passwords as plain text. 

- `bcrypt` and `JWT` are built on top of the crypto module. 

    They do not replace `crypto`, they use crypto internally. 

- `bcrypt` and `JWT` are higher-level libraries that internally rely on Node's `crypto` module.

**Password Hashing Vs. Encryption**

| Hashing            | Encryption       |
| ------------------ | ---------------- |
| One-way            | Two-way          |
| Cannot be reversed | Can be decrypted |
| Used for passwords | Used for data    |
| bcrypt             | crypto           |


## How `bcrypt` works?

`bcrypt` is a password hashing algorithm designed to be slow and secure. 

**Why bcrypt is slow (by design)**

- Prevents brute-force attacks
- Each hash takes measurable time 
- Attackers can't try millions of passwords quickly 

**Salt**

- Random data added to password before hashing 

- Example: password = "hello123", salt = "x9#@!2"
    
    bcrypt hashes: `x9#@!2 + hello123`

- Why salt is needed? 

    Same passwords -> different hashes 
    Each user has unique hash 

## JWT Internals (Header, Payload, Signature)

JWT (JSON Web Token) is a self-contained token used to securely transmit information between client and server. 

**JWT Structure**

`HEADER.PAYLOAD.SIGNATURE`

    Each part is Base64URL encoded. 

- Header: signing algorithm (HS256). Tells the server how to verify the token 

- Payload: what data is inside

    Contains claims - user data, expiry time, roles 

    Payload isn't encrypted. Anyone can decode it. 

- Signature: Created using secret/private key. Prevents tampering. 

    If payload is changed -> signature mismatch -> token invalid 


## Authentication Flow 

JWT authentication is stateless because the server doesn't store session data. 

1. **User logs in**

    `Client -> POST / login`

2. **Server verifies credentials**

- Compare password using `bcrypt.compare`

- If valid -> proceed. 

3. **Server creates JWT**

`jwt.sign({userId, role}, SECRET_KEY, {expiresIn: "1h"})`

4. **Token sent to client**

- Stored in: Http-only cookie (recommended) OR localStorage 

5. **Client sends token on every request**

`Authorization: Bearer <token>`

6. **Server verifies token (middleware)**

`jwt.verify(token, SECRET_KEY)`

- Signature verified, Expiry checked, Payload decoded 

7. **Request allowed or denied**

- Valid token: next()
- Invalid: 401 Unauthorized


## Timers module in NodeJS

The timers module provides functions to schedule code execution after a delay or repeatedly. 

1. **`setTimeout`**

```js
setTimeout(()=> {
    console.log("Runs once after delay")
}, 1000) ; 
```

    - Execute once

2. **`setInterval()`**

```js
setInterval(() => {
  console.log("Runs repeatedly");
}, 2000);
```

    - Executes repeatedly
    - Can cause memory leaks if not cleared 

3. **clearTimeout** and **setTimeout**


## Refresh Tokens Vs. Access Tokens

Access tokens authorize requests, while refresh tokens reissue access tokens without re-authentication. 

**Access Token**

- A short-lived token used to access protected APIs. 

- Sent with every request. Expires quickly (minutes), Limits damage if leaked 

**Refresh Token**

- A long-lived token used to obtain a new access token. 

- Stored securely.
- Used only when access token expires. 
- Reduces need for frequent login.  


## Cookies Vs. localStorage 

Cookies are safer for authentication because they can be HTTP-only and protected from JavaScript access. 

**Cookies**

Small data stored by browser and automatically sent with every HTTP request. 

- Size limit: 4KB (max size of one cookie). The whole key + value cannot exceed ~4 KB
- Can be HTTP-only (secure)
- Used for authentication

**localStorage**

Browser storage accessible only via JavaScript. 

- Size: 5MB
- Not sent automatically 
- Vulnerable to XSS 

## spawn() Vs. fork()

**Why Node even needs `spawn/fork`**

Node.js is: 

- Single-threaded
- Event-loop based 

So: 

- One CPU-heavy task = everything blocks 
- One long-running command = server freezes 

Solution: 

- Create separate processes 

That's where `child_process` comes in. 

**spawn**

- `spawn` starts a new OS-level process to run any system command and streams the output. 

Used to launch a new external process. 

- Executes system commands 
- Streams output 
- Lightweight 

**Why we haven't used it**

Because: 

- Express/Nest/APIs rarely need system commands
- DevOps tools handle this 
- Libraries internally use spawn 

**fork**

Used to create a new Node.js process. 

- Special case of spawn 
- Enables IPC (inter-proccess communication)
- Used for CPU-heavy JS tasks 

- `fork` exists because JS can: block CPU (loops, hashing, parsing), Freeze server if heavy work runs on main thread. 

    So, `fork` moves heavy work to another CPU core. Keeps server responsive. 

- Libraries abstract it. Worker queues handle it. Node clusters auto-fork. 


## `passport` module in NodeJS

Passport is an authentication middleware for Node.js 

- It doesn't: hash passwords, store users, create tokens 

- It only: authenticates requests 

**Why Passport exists**

- Authentication logic varies: local login, Google login, Facebook login, JWT login 

    Passport gives: One common interface for all strategies. 



## body-parser 

Middleware that parses incoming request bodies. 

- Without it: 

    `req.body === undefined`

**Why do we need it?**

- HTTP requests send data as: JSON, URL-encoded, Form data 

- Node receives it as: `raw stream`

- `body-parser`: Reads the stream, Converts it to JS object, Attaches it to `req.body`

- body-parser parses the incoming request bodies and makes the data available on req.body. Express now includes it internally. 


## CORS

CORS is a browser security mechanism that controls cross-origin HTTP requests. 

    It's a browser rule. 

- It restricts cross-origin requests unless the server explicitly allows them.    

## NODE_ENV

## Cluster

## Manage session in Node.js

## Implement authentication and authorization 

## File uploading - Multer 

## Connection with MongoDB Database 

## NodeJS Redis 

## WebSocket 

## setImmediate() Vs. setTimeout()

## Event emitter 
