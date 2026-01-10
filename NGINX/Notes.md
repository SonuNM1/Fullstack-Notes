## What is NGINX? 

Nginx is: 

    - A Web Server (server websites)
    - A Reverse Proxy (sits in front of apps like Node, Django, Flask)
    - A Load Balancer
    - A Static File Server    

- NGINX is a powerful web server and uses a non-threaded, event-driven architecture 

- NGINX is declarative

- Using Nginx in real projects mainly involves writing and modifying configuration files to control traffic, security and routing. 

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

    systemd = service manager of Linux. It controls starting services, restarting services, running them in background, starting them on boot

    Thus, PM2 is basically: "systemd-like behavior for Node apps"


**Why PM2 is IMPORTANT in MERN apps**

- Real-world Node problems: memory leaks, Crashes, App stops on reboot

- PM2 fixes: Auto-restart, startup on boot, multiple Node instances

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


**“I want to build a real-world MERN app deployment.
Please guide me step-by-step to:

create a simple React app

create a simple Node/Express API

build the React app

serve it using Nginx

proxy /api requests to Node

run Node using PM2

I am a full-stack developer, not DevOps.
Explain WHY each step exists and what problem it solves.”**


## Install and Setup NGINX 


1. **docker run -it -p 8080:80 ubuntu**

    Starts a Linux machine (Ubuntu) inside Docker and lets you interact with it from your terminal.

    Nginx run on Linux in real companies. Docker gives you a clean, isolated Linux environmennt. We don't need to install Nginx directly on our laptop. 

    This is safe sandbox. 

    docker run (starts a new container) ; -it (interactive terminal) ; -p 8080:80 (host_port : container_port) ; ubuntu (base image)

    Browser -> localhost:8080 -> Nginx (port 80 inside container, 80 is default HTTP port, 443 is for HTTPS)

    This is how companies run NGINX. In many cases, Docker containers, Cloud services, CI/CD pipelines. Also common: Nginx directly works on VM (no Docker)

    When you see: root@cc2cc78b90768c:/# -> it means you are inside a Linux system, inside a docker container


    **What does SSH-ing into a server mean?**

        - What is a Server? 

            A server is just: a computer that is always ON and connected to the Internet. 

            Usually: runs Linux, has a public IP, lives in data center (AWS, DigitalOcean)

        - What is SSH? 

            Secure Shell. It is a way to: Log into another computer, Control it using the terminal, Securely (encrypted)


2. **uname, uname -a**

- uname = tells what operating system kernel you are using 

3. **apt-get update**

- updates the list of available software package 

- Why this matters? 

    Without running "apt-get update" if you install software: "apt-get install nginx" you might get old versions, get errors, fail to install 

4. **Installing Nginx**

    - apt-get install nginx
    - nginx -v
    - nginx  (start nginx)

After starting Nginx, open "http://localhost:8080"

You should see: Welcome to Nginx page

    This confirms: Nginx is running, Docker port mapping (8080:80) works 


**How can we tell which web server (Nginx, Apache, etc) is handling a webpage request?**

- By inspecting the HTTP response headers in the browser's Network tab and checking the server header. 

Inspect -> Network tab -> refresh the page so network requests appear -> Click on the main document request (first one) -> Check response headers -> Open the Headers section -> Look for header named: Server 


5. Understanding `/etc/nginx/` Directory Structure 

**What are the files and folders inside `/etc/nginx/`, and which ones actually matter for real-world Nginx usage (as a full-stack dev)?**


- `/etc/nginx/` is the configuration directory for Nginx. 

- Think of it as: "The control center where Nginx learns how to behave"

- **nginx.config**

    Path: /etc/nginx/nginx.config

    - Main Nginx configuration file 
    - Entry point for all other configs 
    - defines global settings 
    
    - Real world usage: We rarely change this, we mostly just make sure it includes our site configs 

- **sites-available/**

    Path: /etc/nginx/sites-available/

    - What it is: where you define websites/apps, each file = one site or app

    - Real-world usage: you will edit files here the most, This is where React + Node routing lives 

- **sites-enabled/**

    Path: /etc/nginx/sites-enabled 

    - What it is: contains enabled (live) sites. Uses symbolic links to "sites-available"

    - Why this exists: easy enable/disable of sites, no file duplication. If the site isn't here, it means site is NOT live


- Files that actually matters: 

    /etc/nginx/nginx.config
    /etc/nginx/sites-available/
    /etc/nginx/sites-enabled/


**What are `nano` and `vim`, and why do we use them working with Nginx configuration files?**


- Context: We are inside this directory - /etc/nginx 

    This folder contains Nginx configuration files, not application code. To change how Nginx behaves, we must edit text files on a Linux server. 

    Linux server do not have GUI editors like VS Code. This is where terminal text editors come in. 

- Nano: simple beginner friendly terminal text editor 

    type normally, use arrow keys, save with `ctrl + O` and exit with `ctrl + X`

- vim: powerful, professional-grade terminal text editor   

    vim file_name (open a file)
    i (enter insert mode) 
    esc (exit insert mode) 
    :w (save)
    :q (quit)
    :wq (save & quit) 
    :q! (quit without saving)


**What do we actually edit with nano/vim in Nginx**

- Mostly: `nginx.config` and files inside `sites-available/`

- Nginx behaviour -> controlled by text files 

- Text files -> edited using vim or nano 


6. **apt-get install vim**

This command downloads Vim and its dependencies, unpacks them, configures the system, and registers Vim as a usable command.

After installing `vim`, we can use it to open and read Nginx configuration files and modify the configs. 

- `vm nginx.conf` = opens nginx.conf file in editor mode 

    To close enter `esc` and then `:wq` 

- `mv nginx.conf nginx-backup.conf`

    `mv` is used to move files, and rename files. 

    Rename `nginx.conf` -> `nginx-backup.conf`

    So, `nginx.conf` no longer exists. `nginx-backup.conf` exists

    **Why is this command used?**

    Safety. Before modifying an important config file, professionals always take a backup. This gives us: a rollback option, and zero fear while experimenting. 

    If something breaks, we will be back to normal. 

    `cp nginx.config nginx-backup.config`: It also works same

Nginx is: a highly efficient engine whose behaviour is almost entirely controlled by configuration files. 



| Without Nginx       | With Nginx          |
| ------------------- | ------------------- |
| Node exposed        | Node hidden         |
| No SSL              | SSL handled         |
| Poor static serving | Fast static serving |
| Hard to scale       | Easy to scale       |


7. **touch nginx.conf**


- `touch nginx.conf` : Creates an empty file named `nginx.conf`  

    Why it's used here? -> Because earlier `mv nginx.conf nginx-backup.config`, so, `nginx.conf` no longer existed. Nginx requires this file to run

    `touch` creates a new clean config file. 

- `vim nginx.conf` 

    Opens the newly created file. Lets us write a fresh Nginx configuration. 

    Will write declarative config from scratch 

- `nginx -s reload`

    Tells Nginx: "Re-read your configuration files"

    Nginx doesn't automatically apply config changes. You can edit files all day - nothing changes until you reload 

    **What Reload Actually Does Internally?** 

        Nginx checks new config, If config is valid -> applies it, Old workers finish requests, New workers start with new config 


8. Writing Config (nginx.conf)

events
http
    server
        location 



## A Realistic `nginx.conf` for a MERN app 

This setup assumes: 

    - React frontend is built -> static files
    - Node/Express backend runs on `localhost:3000`
    - Nginx is the public entry file 

Traffic flow: 

    Browser -> Nginx -> React (static)
                     -> Node API (/api)

```
`nginx.conf`

user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;

    server {
        listen 80;
        server_name _;

        # React build files
        root /var/www/mern-frontend/build;
        index index.html;

        # Frontend routing (React Router)
        location / {
            try_files $uri /index.html;
        }

        # Backend API
        location /api {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

- A `nginx.conf` serves React static files and proxies API requests to a Node backend running on localhost. 







