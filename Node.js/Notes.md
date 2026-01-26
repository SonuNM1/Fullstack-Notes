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

**When are two URLs same-origin?**

| Frontend                                       | Backend                                          | Same origin?            |
| ---------------------------------------------- | ------------------------------------------------ | ----------------------- |
| [http://localhost:3000](http://localhost:3000) | [http://localhost:3000](http://localhost:3000)   | ✅ Yes                   |
| [http://localhost:3000](http://localhost:3000) | [http://localhost:5173](http://localhost:5173)   | ❌ No (port differs)     |
| [http://localhost:3000](http://localhost:3000) | [https://localhost:3000](https://localhost:3000) | ❌ No (protocol differs) |
| [http://example.com](http://example.com)       | [http://api.example.com](http://api.example.com) | ❌ No (domain differs)   |

- If any one differs, it's cross-origin. 

**Why CORS exists**

Without CORS: 

- Any website could read your website data 

- Any script could steal private responses 

- CORS prevents malicious websites from reading sensitive responses. 

**Why Postman ignores CORS**

- CORS is a browser security feature, not a server rule. 

- Postman: is not a browser, doesn't enforce browser security, directly shows server response 


## NODE_ENV

An environment variable that tells Node.js which mode it's running in. 

- Common values: development, production, test 

- `NODE_ENV` helps Node applications change behaviour based on environment like development or production. 

## CSRF 

- Cross-Site Request Forgery (CSRF) is an attack where a malicious site tricks a logged-in user's browser into performing unwanted actions on a trusted site. 

**Why CSRF happens?**

Because: 

- Browsers automatically send cookies 
- Server trusts cookies for authentication 

**Does CORS block requests?**

CORS blocks browser access to responses, not the request itself. 


## Cluster

- Node.js: Single-threaded, Uses only one CPU core

    Modern servers: Have multiple CPU cores. 

    `Cluster` allows Node to use all cores. 

- Cluster is a Node.js module that creates multiple Node processes to handle load using the same server port. 

**How it works?**

Master Process
 ├── Worker 1
 ├── Worker 2
 ├── Worker 3

- Each worker runs the same app 
- OS load-balances requests
- If one worker crashes -> others live 

**When to use Cluster**

- High traffic APIs
- CPU-intensive tasks 
- Production deployments 

**Why you rarely use it manually**

Because: 

- PM2 does it for you
- Docker + K8s handles scaling 
- Cloud platforms auto-scale 

`Cluster` enables Node.js to scale across multiple CPU cores by spawning worker processes. 


## Authentication Flow 

- Who are you 
- Verifies identity 
- Example: login with email + password 

**User Signup** 

User sends email -> password, Password is hashed -> User stored in DB 

```js
const bcrypt = require("bcrypt")

app.post("/signup", async(req, res) => {
    const {email, password} = req.body; 

    // hash password 

    const hashedPassword = await bcrypt.hash(password, 10) ; 

    // Save user 

    const user = await User.create({
        email, 
        password: hashedPassword, 
        role: "User"
    })

    res.json({message: "User created"})
})
```

- Why hash: Plain passwords are dangerous, Hashing is one-way

**User Login**

1. User sends credentials
2. Password is compared 
3. JWT is generated 
4. Token is sent to client 

```js
const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // compare password

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // create token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ token });
});
```

**Authentication Middleware**

```js
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

## Authorization 

- Checks role / permission 

- Ensures authenticated users have permission to access a resource 

```js
const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {

    // Read token from header 

    const authHeader = req.headers.authorization ; 

    // If token missing 

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    // Extract token 

    const token = authHader.split(" ")[1] ; 

    try{

        // verify token 

        const decoded = jwt.verify(token, process.env.JWT_SECRET) ; 

        // Attach user info to request 

        req.user = decoded ; 

        // Allow request to continue 

        next() ; 
    }catch(error){
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}
```

## RBAC Vs. ABAC 

**RBAC (Role Based Access Control)**

`if(user.role === "admin") allow`

- Example: Admin, User, Manager 

**ABAC (Attribute Based Access Control)**

`if(user.department === "HR" && resource.ownerId === user.id)`

- Attributes include: User, Resource, Action, Environment

- Example: User can edit document only if they created it and it's a weekday.


## File Uploading - Multer 


- Node receives files as: binary systems. 

- Multer: parses multipart/form-data, saves files, gives file info in `req.file`

- Real life usage: profile images, product images, document uploads, blog images 


## File Upload to AWS S3

Two common approaches: 

1. Backend upload 

    `Client -> Backend -> S3`

2. Direct upload using pre-signed URL

    `Client -> S3 (direct)`

**Backend uploads to S3**

1. Client uploads file 
2. Multer stores file temporarily
3. Backend uploads to S3
4. S3 returns URL
5. Backend sends URL to client 

**Pre-signed URL**

- Why better? 

    Backend doesn't handle large files, Faster uploads, Cheaper, Scales better 

1. Backend generates signed URL
2. Client uploads directly to S3
3. Backend stores file URL 

- In production, we use pre-signed URLs so clients upload directly to S3 without stressing the backend. 


## Connection with MongoDB Database 

We connect using Mongoose (ODM). 

- Why Mongoose? 

    MongoDB is schema-less, Mongoose adds: 

    Schema, Validation, Middleware, Cleaner queries 

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Node.js Redis 

An in-memory data store used for caching, queues, sessions, and pub/sub. 

**Why Redis is fast?**

- Stores data in RAM
- Simple data structures 
- Single-threaded but extremely optimized 

**When Redis is used**

- API caching
- Rate limiting 
- Session storage
- Message queues 
- Pub/Sub 

**Why TTL is important**

- Without TTL: Stale data, Memory leak
- With TTL: Auto-expiry, Fresh data


## Redis Vs. Memcached 

`Memcached` is a simple key-value cache, `Redis` is a full in-memory data store with advanced data structures. 

**Memcached**

- Pure key -> value 
- Data stored only as strings 
- No persistence 
- No data structure

- Use cases: Simple page caching, Session caching (basic)

**Redis**

- In-memory data structure store 
- Supports: Strings, Lists, Sets, Hashes, Sorted sets, Streams

- Use cases: Caching, Rate limiting, Queues, Sessions, Pub/Sub

**What is Cache hit and a Cache miss?**

- Cache Hit: When requested data is found in cache (Redis)

    `Client -> Redis -> Data Found -> Response`

    Very fast, No DB call, Low latency 

    A cache hit occurs when the requested data is available in cache, so the database is not queried. 

- Cache Miss: When requested data is not found in cache. 

    `Client -> Redis (not found) -> MongoDB -> Redis updated -> Response`

    A cache miss happens when data is not present in cache and must be fetched from the database. 

## Cache Invalidation Strategies 

Cache invalidation is the process of keeping cached data consistent with database when the original data changes. 

**Why is cache invalidation a problem?**

- The root issue: Cache is a copy of data. 

    When DB changes: DB updated. Cache still has old data. 

    Now our app serves stale data. 

- Example: 

    User updates the profile name, MongoDB -> Rahul, Redis Cache -> Rohit 

    Next request: API hits Redis, Returns old name 

**How this problem arises**

1. First request -> data fetched from DB 
2. Data stored in Redis
3. DB record is updated later
4. Cache is not updated 
5. Users see outdated data 

    That gap is the cache invalidation problem. 

**How Redis solves cache invalidation**

1. Strategy 1: TTL

`redis.setEx("user:1", 60, JSON.stringify(user));`

- How it helps: Cache auto-expires, Eventually fetches fresh DB data

2. Explicit deletion 


**Cache invalidation using RabbitMQ**

- Problems in distributed systems - You have: Service A, Service B, Service C 

    All use Redis. 

- When DB updates: All caches must be cleared. 

1. DB updated 
2. Event published: `USER_UPDATED`
3. All services consume event 
4. Each service invalidates cache 

    `redis.del(user)`


**Why do we delete cache after DB update?**

```js
await User.findByIdAndUpdate(id, data) ; 
await redis.del(`user:${id}`);
```

1. User updates profile 
2. MongoDB gets updated
3. Old data still exists in Redis
4. We delete the cache manually 
5. Next request comes
6. Redis has no data -> cache miss
7. Fresh data fetched from DB 
8. Cache rebuilt with updated data 

- This guarantees fresh data, prevents stale responses, Common in real systems

- After updating the database, we delete the cache so the next read fetches fresh data and rebuilds the cache. 

## Latency

Latency is the delay between sending a request and receiving a response. 

- Example: Click send -> message appears after 2 seconds. That delay = high latency 

**Why HTTP causes high latency for real-time**

- Request -> response only 
- New request needed each time 
- Repeated handshakes 


## Distributed System

A distributed system is when multiple independent services work together as one application. 

- Example: User service, Order service, Notification service 

    Each: has its own code, may have its own cache, runs on differnt servers 

    Updating data in one service should reflect everywhere. 

**How do ALL services invalidate cache using RabbitMQ?**

1. User Service updates DB
2. User Service publishes event 

    USER_UPDATED

3. RabbitMQ sends event to all subscribed services
4. Each service receives event 
5. Each service runs: 

    `redis.del(`user:${id}`) ;`

**What are decoupled services?**

Decoupled services do not directly depend on each other's implementation. 

- Services don't call each other directly 

- They communicate via events/messages 

- Changes in one service don't break others 

- Example: User service doesn't call Order service. It just publishes an event. 

- Decoupled services communicate via events, making the system scalable and resilient. 


## WebSocket 

WebSocket provides full-duplex, persistent communication between client and server. 

- WebSocket maintains a persistent connection, allowing the server to push real-time updates with minimal latency. 

- Before WebSocket: HTTP only, Server couldn't push data, Clients had to poll 

    `setInterval(fetchMessages, 1000);`

- Problems: Wasted network, Deplayed updates, Server overload 

**How WebSocket solves**

WebSocket enables:

- real-time
- low-latency
- two-communication

    between client and server. 

**How WebSocket works**

1. Client sends HTTP request
2. Server upgrates protocol to WebSocket 
3. Connection stays open 
4. Data flows both way 

    `HTTP -> WebSocket -> Persistent Connection`

**Why latency is low in WebSocket**

- No repeated HTTP requests
- No headers overhead
- No reconnection cost 
- Server pushes data instantly 

**Why does HTTP cause high latency for real-time apps?**

- Core reason: HTTP is request-response based. 

1. Client sends request 
2. Server responds 
3. Connection closes 
4. Repeat again and again. 

**What is HTTP handshake?**

An HTTP handshake is the process of establishing a connection between client and server. 

- For real-time systems, repeated handshakes significantly increase latency. 

**What does polling mean?**

Polling means repeatedly asking the server if new data is available. 

```js
setInterval(()=> {
    fetch("/messages");
},1000) ; 
```

- Problem: Many unnecessary requests, Server overload, Delayed real-time updates 

- Polling wastes resources because the client repeatedly asks even when no new data exists. 

**How does WebSocket connection work?**

1. Client sends HTTP request
2. Server upgrades protocol to WebSocket 
3. Connection remains open
4. Client and server can send data anytime 

**HTTP is two-way too, so why WebSocket?**

HTTP: 

- Client always starts communication 
- Server cannot send data on its own
- Connection closes after response 

WebSocket: 

- Both can send data anytime 
- Server can push messages 
- Connection stays open 

HTTP is bidirectional, but not real-time whereas WebSocket allows full-duplex communication. 

**Isn't keeping a WebSocket connection open expensive?**

No. Why it's efficient: 

- No repeated handshakes 
- No repeated headers
- One persistent connection 
- Less CPU & network usage over time. 

| HTTP                   | WebSocket           |
| ---------------------- | ------------------- |
| Many short connections | One long connection |
| Repeated overhead      | Minimal overhead    |
| High latency           | Low latency         |


A persistent WebSocket connection is more efficient than repeated HTTP requests for real-time communication. 


**Real-life use cases**

- Chat apps 
- Notifications 
- Live tracking 
- Multiplayer games 

**Socket.io Vs. WebSocket**

- WebSocket: protocol, low-level, minimal overhead

- Socket.io: library, Auto reconnection

- WebSocket is the protocol; Socket.IO is a higher-level abstraction with extra features. 

## Polling Vs. Push

**Polling**

- Client keeps asking server: Any update? Any update? Any update?

- Problems: Wasted requests, High server load, Delayed updates, Poor scalability 

```js
setInterval(() => {
    fetch("/notifications") ;
}, 2000)
```

- Polling is inefficient because the client sends repeated requests even when no new data is availble. 

**Push (WebSocket / Socket.io)**

- Server pushes data instantly when it changes. 

- Flow: Connection open, Server sends data when needed, No repeated requests 

- Benefits: Real-time updates, Low latency, Fewer network calls 

- Push-based communication allows the server to send data immediately without the client requesting it repeatedly.


## Socket.IO room 

A room is a logical group of socket connections. 

- It lets you send messages to specific users or groups, not everyone. 

**Real-life use cases**

- Chat app: one room per chat, Only chat members receive messsages 

- Notifications: One room per user, User gets only their notifications 

- Live classes: One room per class, Only enrolled users get updates 

`Socket joins room -> Server emits to room -> Only sockets in that room receive it`

**Why rooms matter**

- Without rooms: `io.emit()` - sends to everyone 

- With rooms: `io.to(roomId).emit()` - targeted


## Event emitter 

`EventEmitter` is a core Node.js module that allows objects to emit and listen to events. 

    Node.js itself is built on this pattern. 

**Why EventEmitter exists**

- JavaScript is: single-threaded, Event-driven

    So, instead of blocking: Node emits events when something happens.

- Example: 

    Button click -> event emitted. Someone listening -> reacts 

- `EventEmitter` is Node.js's core event-driven abstraction, enabling asynchronous, non-blocking execution through emitted events and listeners. 


## Payment Gateway and Order Management 


`Client (Web/App) -> Backend (Orders & Payments) -> Payment Gateway (Razorpay / Stripe) -> Bank / Card Network`

Payment systems are asynchronous, idempotent, and event-driven. This means: 

- Asynchronous: Payment does not finish instantly 

- Idempotent: Same action repeated does not cause duplicate result 

- Event-driven: System reacts to payment events instead of assuming success. 

**What does asynchronous mean in payments?**

Payment takes time and happens in multiple steps. 

- Why? Bank processing, Network delays, User actions (OTP, UPI approval)

- Example: User clicks Pay -> Payment is started -> Final result comes later via webhook 

- Payments are asynchronous because the final success or failure is confirmed later by the payment gateway. 

**What is Idempotent?**

Doing the same operation multiple times gives the same result. 

- Example: User clicks Pay twice or Gateway sends webhook twice. 

    Without idempotency: Money deducted twice, Order shipped twice 

    With idempotency: Payment processed once, Order updated once 

- Idempotency is implemented by checking the current state before processing and ignoring duplicate requests. 

**How we ensure Idempotency?**

- Every order has unique `orderId`

- Before updating order: Check current status 

- Idempotency ensures that repeated requests don't create duplicate payments or orders. 

**What does event-driven mean in Payment systems?**

- System waits for events like "payment success" or "payment failed". 

- Example: payment.success, payment.failed, refund.completed 

    System reacts only when event happens. 

**How do we avoid double charges?**

Problems that cause double charge: 

- User double clicks pay button 
- Page refresh 
- Network retry 
- Webhook sent twice 

Solutions: 

- Unique order ID (Every payment tied to one order)

- Disable pay button (After first click)

- Idempotent backend logic (Is this order already paid?)

**How to handle double click on Pay button**

Frontend solution: 

- Disable button after first click
- Show loader 

Backend solution (Even if frontend fails): 

- Backend checks order status 
- Processes payment only once 


## Webhook 

A webhook is a server-to-server callback sent by the payment gateway to notify payment result. 

- Why webhook is needed? 

    Frontend cannot be trusted, 
    
    Payment happens outside your system 

- Example: 

    User pays -> Gateway processes -> Gateway calls your backend API 

- Webhooks allows payment gateways to securely notify backend systems about payment outcomes 

| HTTP API               | Webhook               |
| ---------------------- | --------------------- |
| Client → Server        | Server → Server       |
| Request based          | Event based           |
| Frontend calls backend | Gateway calls backend |
| User initiated         | System initiated      |



## Full Payment + Order Management 

1. **Create Order**

- Order stored in DB
- Status: `PENDING`

2. **Initiate Payment**

- Backend calls payment gateway 
- Payment order created 

3. **User completes Payment**

- Card / UPI / Netbanking 

4. **Gateway sends webhook**

- payment.success OR payment.failed 

5. **Backend verifies webhook**

- Signature validation 
- Amount check
- Order ID match

6. **Update order status**

- PAID / FAILED 

7. **Trigger next actions**

- Inventory update 
- Shipping 
- Email / notification 


## DB Schema for Orders & Payments 

- Orders Table 

```json
{
    "orderId": "ORD123",
    "userId": "USER1",
    "amount": 1200, 
    "currency": "INR",
    "status": "PENDING", 
    "createdAt": "...",
    "updatedAt": "..."
}
```

- Payments Table 

```json
{
    "paymentId": "PAY456", 
    "orderId": "ORD123", 
    "gateway": "Razorpay", 
    "gatewayPaymentId": "pay_xyz", 
    "status": "SUCCESS", 
    "amount": 1200, 
    "signature": "...", 
    "createdAt": "..."
}
```

## Webhook Signature Verification 

To ensure: 

- Request is from gateway 
- Data not tampered 

**How it works**

1. Gateway sends: Payload, Signature header 

2. You generate signature using: Payload, Secret key 

3. Compare both signatures 