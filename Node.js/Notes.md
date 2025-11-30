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