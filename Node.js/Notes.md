### dependencies Vs. devDependencies 

- dependencies: used in production. These packages are required for your application to run. 

    Example: express -> your server won't work without it. dotenv -> used to load environment variables your app needs 

- devDependencies: used only during development. These packages are needed while building or developing, but not required for production. 

    Example: nodemon -> restarts server during development. Testing tools (Jest, Mocha). Linters (ESLint), Bundlers (Webpack, Vite)


### type commonjs vs type module 


- type "commonjs": This is the older Node.js module system. Not the modern JavaScript standard. 

    Not idea for modern bundlers and frontend code sharing 

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

