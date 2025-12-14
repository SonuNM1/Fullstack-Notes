## What is NGINX? 

Nginx is: 

    - A Web Server (server websites)
    - A Reverse Proxy (sits in front of apps like Node, Django, Flask)
    - A Load Balancer
    - A Static File Server    

- NGINX is a powerful web server and uses a non-threaded, event-driven architecture 

- It can also do other important things, such as **load balancing**, and **HTTP caching**, or be used as a **reverse proxy**. 

- can handle 10,000 concurrent requests 

- Cache HTTP Requests 

- Act as Reverse Proxy, Load Balancer, API Gateway

- Serve and Cache Static files like images, videos, etc

- Handle SSL Certificates 

- Pre-requisites: docker, Linux, AWS


## How NGINX Works 

Browser -> Nginx -> Your App 

Examples: 

    - Server HTML/CSS directly
    - Forward requests to a backend app (Node, Python, etc)
    - Handle HTTPS (SSL)
    - Block or allow traffic 


## Install NGINX 

- On Ubuntu / Debian: 

    sudo apt update
    sudo apt install nginx -y

- On Mac (Homebrew)

    brew install nginx 
    nginx -v


## Installing Nginx on Windows 

On Windows, Nginx is not meant to run directly like Linux. In real-world jobs, Nginx almost always runs on Linux servers. 


## What Nginx actually does in real jobs 

- Scenario 1: Hosting a website 

    Browser -> Nginx -> HTML Files 

    Nginx: Handles 10,000 users, No backend needed, Fast 

- Scenario 2: Backend app 

- Scenario 3: Multiple apps on ONE server 


## Docker and NGINX 

Internet -> Nginx (Docker container) -> Node app (Docker container)

- Used when: Company already uses Docker, Easier deployment  


## Where Nginx fits in MERN 


1. MERN Lifecycle - Development (Local machine)

    React -> localhost:3000
    Node -> localhost:5000

    No NGINX, No SSL, No Security, Only Coding 

2. Build Phase (Fronted)

    npm run build 

    React becomes: HTML + CSS + JS (static files)

    React is NO LONGER a Node app. 

3. Server Setup (Linux / Cloud)

    You now have: A Linux server (AWS, DigitalOcean, etc), Public IP, Domain name 

4. Deployment (This is where NGINX enters)

    Browser -> Nginx (port 80/443) -> React build (static files) -> /api requests -> Node.js (port 3000)

    Nginx becomes the front door of your application. 


## What Nginx actually does in MERN 

- Frontend (React): Serves "index.html", Server JS/CSS

    React NEVER talks directly to users 

- Backend (Node/Express): Runs on localhost:3000, Not exposed to internet, Nginx forwards /api to it 


## Without NGINX 


Browser -> http://your-ip:3000

- Problems: security (Node exposed to internt, Easy to crash, no protection), SSL, 

- With NGINX: Node focuses only on business logic 


## Before NGINX - How was it done? 


- Old days (pre-2010): Apache handled everything, One request = one thread, Slow under load 

    Problems: Poor concurrency, Bad with real-time apps, 

- Why Nginx won? 

    Event driven, Non-blocking, Handles thousands of connections

    That's why almost every company uses it now. 


## What you should focus on (as Full-Stack Dev)

- Reverse Proxy 
- Static hosting (React build)
- SSL via NGINX 
- Basic security (rate limit, headers)
- Docker + Nginx basics 


## What is PM2 and Why do companies use it? 


- Running Node like (node app.js): BAD for production 

- Problems: If Node crashes -> app is DOWN, If server restarts -> app is DOWN, No logs management, No monitoring 

- PM2 (Production Process Manager): A manager that keeps your Node app alive. 

    Think of PM2 as: "systemd for Node apps" 


**What PM2 does in Real-life?**

Nginx -> PM2 -> Node app 

- PM2: 
    
    - Restarts app if it crashes, 
    - Keeps app running in background, 
    - Restarts on server reboot, Manages logs  

- Companies almost never run Node without PM2 


**Important Clarity**

- PM2 does NOT: Handle HTTP traffic, Replace NGINX, Handle SSL 

    It ONLY manages Node processes. 



## How VPN Works? - Proxy server

- VPN: forward proxy, NGINX: reverse proxy  