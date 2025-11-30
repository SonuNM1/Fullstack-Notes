
### Docker Image and Container

- solves "it works on my machine"

- Docker container : bundles our app and its dependencies into a single unit  

- Docker image

- Docker is used for replicating the entire local development environment in a standardized way across a large team. 

- Properties of Docker container: portable (shareable) ; lightweight (size is too less) ; build multiple apps parallely with different versions of the same dependency, host machine can different version of node, while container can have any other, container has its own environment as compared to the host machine. Host machine and containers can different versions of the same technology, so we can build different systems of the same technology using different versions of the same technology. 

- Docker image: basically it's an executable file. It contains instructions to build container. The job of docker image is to build container. Docker image and container carry the same relationship, as the class has with objects. Class is the blueprint that helps create multiple object or instances, thus with single docker image we can create multiple docker containers. 

In team while working, we share the docker image through which they create the docker container. Image's size is very less. 

Docker image is a static snapshot of what the local development environment should look like. 


### Docker Commands 

- DockerHub

- WSL and Docker

- Docker Daemon

- Ubuntu Vs. Linux 

- docker pull IMAGE_NAME

- docker pull IMAGE_NAME:version

- docker images

- docker run IMAGE_NAME 

- docker run -d IMAGE_NAME  

- docker run -it IMAGE_NAME

- docker run --name CONT_NAME -d IMAGE_NAME

- docker ps -a 

- docker ps

- docker start CONT_NAME or CONT_ID 

- docker stop CONT_NAME or CONT_ID

- docker rmi IMAGE_NAME

- docker rm CONT_NAME 

- docker run -d --name mysql_latest -p8080:3306 -e MYSQL_ROOT_PASSWORD=secret mysql:latest


### Troubleshoot Commands 


- docker logs CONT_ID

- docker exec -it CONT_ID /bin/bash

- docker exec -it CONT_ID /bin/sh 


**What's Docker exec?**


- docker exec is used to run a command inside a running container. 

    You use it after the container is already created and running. 

    It doesn't start a new container - it enters an existing one. 

- Example: docker exec -it mysql_latest /bin/bash

    It opens a terminal inside the container. We get access inside the Linux filesystem of the container as if we logged into it. 

    We can inspect files, logs, databases, environment variables, etc. 

- docker exec only works on the running containers. 


### Why Docker is in Linux mode even though your OS is windows? 


    Because Docker Desktop on Windows runs Linux containers inside a Linux virtual machine (WSL2). Windows cannot run Linux containers natively, so Docker Desktop uses: 

        - WSL2 (Windows Subsystem for Linux 2): WSL2 is a lightweight virtual machine that runs a real Linux kernet inside Windows. Docker Desktop installs and uses this Linux kernel behind the scenes to support Linux containers. That's why:

            Your Host OS = Windows
            But Docker containers = Linux 

            This is default and recommended mode. 


### Why Docker chooses Linux mode by default? 

- Most Docker images are Linux-based: Over 99% of Docker Hub images are Linux. Node, python, MySQL, Redix, Nginx, Ubuntu, Alpine...all Linux

- Linux containers are smaller and faster: Linux images are usually tiny. Windows are huge

- Linux container ecosystem is mature: All tutorials, CI pipelines, and orchestration tools assume Linux containers. 

- WSL2 makes Linux containers run extremely fast on Windows. Almost native speed. 

    So, Docker Desktop simply defaults on Linux containers. 


### docker run IMAGE_NAME Vs. docker run -it IMAGE_NAME


- docker run IMAGE_NAME

    This runs the container normally, in the background or foreground depending on the image. 

        If the image prints something and exits (like hello-world), it will just run and stop. 

        It it's a server (like Nginx), it runs in the foreground unless you add -d. 

        We do NOT get an interactive shell. 

        Eg: docker run ubuntu 

        Docker will run Ubuntu, but it will immediately exit because there's no interactive terminal and no command provided. 


- docker run -it IMAGE_NAME

    It gives you a terminal session inside the container. And we can run commands inside the container. It feels like we are "inside" the container

- When to use "-it"

    you want a shell inside the container

    you want to explore or debug the image 

    you want to run the commands manually 


### What is an Interactive Terminal? 

- An interactive terminal (like the -it in Docker) is a session where: 

    We type commands

    The container shows output immediately

    We can interact with programs (bash, python, node REPL, etc)

- It works just like a normal command prompt or Linux terminal. You get an interactive shell INSIDE the container. 

- Why is an interactive terminal needed? 

    Because without it, a container: 

        cannot receive your keyboard input

        cannot show a fully working shell 

        wil often exit immediately if there's nothing running in foreground 


### Linux Vs. Ubuntu 


- Linux is the operating system kernel. 

- Ubuntu is a Linux-based operating system (a Linux distribution). 

- Think of it like this: 

    Linux = engine 
    Ubuntu = complete car built using the engine (engine + seats + dashboard + everything)

- Linux is the core, and Ubuntu is a complete OS built using that core. 

- Linux alone isn't enough for normal use. Ubuntu adds all the software, tools, and interface needed to make a usable OS.

- Similarly Windows Microsoft has Windows NET Kernel as engine, and MacOS uses the XNU kernel

- **kernel**: It's an internal engine of an OS. We normally never interact with it directly. 

- Linux dominates servers and cloud. Almost all servers run Linux: AWS, Azure, Google Cloud, Docker containers, Kubernets, Web hosting, Database systems. 


### Why does the container ID shown inside the terminal (18b75948a5bf), not match the container shownn in Docker Desktop (e.g., zealous_panini with ID 382e703bb9c5)?

1. Every time we run "docker run", Docker creates a NEW CONTAINER 

    docker run -it ubuntu 

always creates a new container instance, even if we ran Ubuntu before. 

Inside the container, the shell prompt shows its own container ID: 

    root@18b75948a5bf:/#

This ID belongs to the new container we just launched. 

2. Docker Desktop shows All containers, including old ones: 

- Docker desktop also shows containers you created earlier (even if they are stopped). 

    For example: 

        18b75948a5bf -> new container you are currently inside 

        382e703bb9c5 -> older Ubuntu container you created earlier 

    Docker Desktop isn't wrong - it's simply showing all the containers, not only the one you're currently attached to. 

3. "docker run" creates a new container; it doesn't reuse old ones

- If you want to resue the SAME existing container: 

        docker start -ai CONTAINER_NAME_OR_ID

    OR, give a name to the container at creation 

        docker run -it --name myubuntu ubuntu 

    Then reuse it anytime: 

        docker start -ai myubuntu

4. How to check which containers are running

    docker ps 



### Docker Tags 

- In Docker, tags and versions are mechanisms used to identify specific variants of an image. They help us pull, run, and manage the exact image we want. 

- Docker tag is a label attached to an image version. 

- If we don't specify a tag, Docker automatically uses: 

    :latest


### Docker Versions 

- Docker image versions are just tags that follow versioning semantics.


### Docker Image Layers 

- Docker image layers is how Docker builds, stores, and runs images efficiently. 

- A Docker image is made up on many read-only layers, each layer representing a change (instruction) in the Dockerfile. 

    Think of an image like a stack of layers, where each layer depends on the one below it. 

**Why Does Docker Use Layers?**

- Layer gives Docker speed, efficiency, and reuse. 

1. Faster Builds (Layer Caching): If nothing changes in a layer, Docker reuses it. 

    Example - If you rebuild your image but only the app code changed, Docker will reuse the earlier layers (like OS and installed packages) - so the build is very fast. 

2. Multiple images can share the same base layers 

    Example: If we pull, 'python:3.12' and python:3.9....they might share large parts of the OS layer, saving GBs of space. 

3. Efficient Deployment: Only changed layers need to be transferred. This reduces network usage when pushing/pulling images. 


### How Layers Work 


1. Each layer is read-only: Once created, it cannot be modified. 

2. The last layer (container layer) is writable: When we run a container, Docker adds a thin writable layer on the top. 

    [ Writable Container Layer ]
    [ Image Layer 5 ]
    [ Image Layer 4 ]
    [ Image Layer 3 ]
    [ Image Layer 2 ]
    [ Image Layer 1 ]

Anything that your container writes -> goes into the writable layer.

While Image itself -> remains unchanged (immutable)

- **In Short:**

    Docker images are built in layer stacks. 

    Each Dockerfile instruction creates a layer. 

    Layers are cached, shared, and reused. 

    Containers add one extra writable layer. 

    Layering makes Docker fast and efficient. 


- Different version of same technology on same machine 


## A Practical Example of Layer Caching


- Imagine this simple Dockerfile: 

    FROM python:3.12
    RUN pip install flask
    COPY app.py /app/app.py
    CMD ["python3", "/app/app.py"]

This produces 4 layers: 

    1. Base Python Image
    2. Install Flask
    3. Copy app.py
    4. CMD (metadata)

Now, let's say you build the image: 

    docker build -t myapp:v1

Everything builds normally. 


**Now you change only your app code**


You edit "app.py" and rebuild: 

    docker build -t myapp:v2 .

What happens?

Docker sees: 

- FROM python:3.12 -> unchanged -> cache hit 

- RUN pip install flask -> unchanged -> cache hit 

- COPY app.py -> changed -> cache MISS 

- That layer and everything after it must be rebuilt -> only 1 layer rebuilt 

So, the build completes instantly, because only the small layer changes. 

This is what "Docker reuses earlier layers" means. 


    Command: docker history IMAGE_NAME


### How Layer Caching Works? 


- Docker has a build cache. 

- For each instruction in the Dockerfile: 

    It checks whether this instruction has been run before with the same input. 

- If YES -> reuse cached layer

- If NO -> rebuild layer + all layers after it 

- Docker caches layers from top to bottom. If you change a layer early, Docker must rebuild everything after it. 

- **Example of a Bad Dockerfile (no caching)**

    FROM python:3.12
    COPY . /app
    RUN pip install -r /app/requirements.txt

Why is this bad? 

    - Because changing ANY small file triggers: 

        COPY again

        pip install again (slow)

- **Example of Optimized Dockerfile (good caching)**

    FROM python:3.12
    COPY requirements.txt /app/
    RUN pip install -r /app/requirements.txt
    COPY . /app/


- Now: 

    Only requirements.txt causes rebuild of dependencies 

    Changing code rebuilds only the last layer, not pip install



### How to Optimize a Dockerfile (imp)


- Tip 1: Move frequently changing lines to the bottom 

    Because everything below a changed layer is rebuilt

- Tip 2: Install dependencies before copying code 

    So dependency layers can be reused 

- Use .dockerignore 

    So unnecessary files don't break caching 

- Use lightweight base images (alpine, slim)

    python:alpine
    node:18-alpine
    golang:1.21-alpine


Layer Caching - Reuse unchanged layers -> fast build 

Order Matters - Change early = rebuild everything 

Optimized Dockerfile - Put changing stuff at bottom 


### What is Detached Mode? 


- When we run a container with: 

    docker run -d...

        it runs in the background. 

    This means: your terminal is free and not occupied by the container's logs. The container keeps running independently, like a service or daemon. 

    Think of it like running a program "in the background". 

### Why is Detached Mode useful? 

    1. You want the container to keep running without blocking your terminal. 

        MySQL, Nginx, Postgres, Redis, etc are long-running services. You don't want your terminal frozen with their logs. 

    2. You want to start multiple containers easily. 

        Running containers in the background makes multi-tasking easy. 

    3. It behaves like a server or a background process. 

        Database services should run like a daemon. 


### What if you don't use Detached Mode? 

- The container starts in foreground 

- The terminal becomes locked to show the MySQL server logs. 

- You cannot type any other commands in that terminal. 

- Stopping the terminal (ctrl + C) will stop the container. 


### When should you use Detached Mode? 

- Databases (MySQL / PostgreSQL)
- Web servers (Nginx / Apache)
- Backend APIs
- Message brokers (RabbitMQ / Redis)
- Any long-running service 

Note: Don't use -d for: debugging a container, running short scripts 


### Why do we need to set "MYSQL_ROOT_PASSWORD" when running a MySQL container, but we don't need anything like that for other containers like Ubuntu? 


- Because different Docker images have different requirements 

1. Ubuntu is a normal OS image -> no special setup needed 

    docker run -it ubuntu 

Ubuntu is just a basic Linux OS. It has no database, no server, no security implementation, nothing. 

So Docker can start it with no configuration. 

2. MySQL is a DATABASE SERVER -> it requires a root password 

MySQL cannot start unless it has a root password for security. So, the official MySQL image forces you to provide: 

    -e MYSQL_ROOT_PASSWORD=somepassword 

- Why this is required? 

    MySQL must create a secure root account. 

    Without a password, the database server would be insecure. 

    The Docker image checks for this variable -> if missing, it exits. 

This is built into the MySQL Dockerfile, not a Docker rule. 


### Why do some images (like MySQL) require extra options such as environment variables, ports, or volumes, when running them, while simple images like Ubuntu do not? 

- Because different Docker images server different purposes, and some images need configuration to work correctly. 

- Service-Based Images (like MySQL, PostgreSQL, Redix, Nginx). 

    These images are running servers. So they need configuration at startup: 

        - passwords (database root password)

        - ports (so you can access the service)

        - volumes (to save data)

        - environment variables (to configure the servicee)


### Port Binding 

- mapping the host machine port with container port is called Port Binding 

- default ports used 

**What do 3306/tcp annd 33060/tcp mean in "docker ps" output for a MySQL container?**


- These are internal container ports, not necessarily mapped to your host machine. 

- This is the default MySQL database server port. 

- 3306 is the main port used to communicate with MySQL. 

- 33060 is used for MySQL's newer document-based API features 

- Seeing 3306/tcp and 33060/tcp doesn't mean these ports are accessible from your host machine. It only means these ports are open inside the container. 

- To make ports accessible to your Windows machine (host), you must map them using -p. 

- docker run -d --name mysql_latest -p8080:3306 -e MYSQL_ROOT_PASSWORD=secret mysql:latest



### Docker Vs. VM (Virtual Machine)


Application Layer <- Host OS Kernel <- Hardware 

- Docker Desktop adds a lightweight hyper-visor layer to our system, which internally uses lightweight Linux distribution, which helps us in running our containers even on non-Linux systems. Docker Desktop contains small Linux-based virtual machine, which helps us in running the containers. 

    That's why Docker is faster on Linux, as compared to other OS. But even on other OS, there wouldn't be any visible performance issues. 


### Developing with Docker 



### Docker Network 

- Commands: 

    docker network ls

    docker network create NETWORK_NAME

    docker network inspect bridge 


- It's a virtual network for containers. Default-type: bridge. Containers can talk using names. Purpose: isolation, communication, security. 

- A Docker network is a virtual network created by Docker that allows containers to communicate with each other, with the host system, or with the outside world. 

- Think of it as a virtual LAN (Local Area Network) specially for containers. 


**Why Docker Networks Exist**


- Containers are isolated by default. Docker networks allow: 

    Container <-> Container Communication

    Containner <-> Host Commmunication

    Internet access for containers 

    Network isolation (security)

    Name-based container discovery (no need for IP addresses)


**Types of Docker Networks:**

1. bridge (default)

    - Automatically created on Docker installation 

    - Most commonly used. 

    - Containers can talk to eacah other using container names.

2. host 

    - Container shares the host machine's network 

    - No isolation 

    - Faster, but less secure 

3. none 

    - no network at all 

    - Container has zero connectivity 

4. user-defined bridge network 

    - created manually by the developer

    - best for multi-container apps (MySQL + Backend + Frontend)

    - docker network create mynet


**Simple Real-Life Example:**


- You have: A backend container & A MySQL container. You want the backend to connect to MySQL. 

Solution: 

    1. Create a network: docker network create mynet

    2. Run containers on that network 

        docker run --network mynet --name mysql mysql:latest

        docker run --network mynet --name backend mybackendimage

    3. Now backend can reach MySQL with: 
    
        mysql:3306

- docker run -d ^
More? -p27017:27017 ^
More? --name mongo ^
More? --network mongo-network ^
More? -e MONGO_INITDB_ROOT_USERNAME=admin ^
More? -e MONGO_INITDB_ROOT_PASSWORD=qwerty ^
More? mongo

- docker run -d ^
More? -p8081:8081 ^
More? --name mongo-express ^
More? --network mongo-network ^
More? -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin ^
More? -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty ^
More? -e ME_CONFIG_MONGODB_URL="mongodb://admin:qwerty@mongo:27017" ^
More? mongo-express


### Docker Compose 

- Commands:

    docker compose -f fileName.yaml up -d

    docker compose -f fileName.yaml down 

- Docker compose is a tool for defining and running multi-container applications together using a single YAML file. 

    .yaml (yet another markup language)

- Instead of running many long "docker run" commands, you define everything in a file called: 

    docker-compose.yml

Then start everything with: docker compose up 


**Why Docker Compose is Used?**

- Without Compose 

    You must start each container manually: 

        docker run ... 
        docker run ...
        docker network create ...

    Messy and hard to manage. 

- With Compose 

    You define everything once in a file: 

        Containers, Networks, Volumes, Environment variables, Ports, Dependencies

    Then you simply run: 

        docker compose up -d 

    It runs ALL services at once. 


**What Docker Compose Actually Does?**

1. Runs multi-container applications easily 

    Example: Backend, Frontend, MongoDB, Redis 

    All started with one command. 

2. Automatically creates a network 

    Example: Backend connects to database using hostname -> mongo

3. Manages volumes for data persistence 

    No need to create manually

4. Replaces long "docker run" commands: 

    Instead of writing long docker commands, we describe all of it in YAML. 


- Start everything: 

    docker compose up -d 

- Stop everything: 

    docker compose down 

- Rebuild and restart: 

    docker compose up -d --build 



### Dockerizing our App


    FROM
    WORKDIR
    COPY
    RUN
    CMD 
    EXPOSE
    ENV

- Dockerizing an app means packaging our application along with everything it needs (runtime, dependencies, libraries) inside a Docker image so it can run anywhere. 

You create: 

    1. Dockerfile -> defines how to build the image 

    2. (Optional) docker-compose.yml -> defines how to run multi-container apps


**Steps to Dockerize ANY Application**

Step 1 - Create a Dockerfile 

    This file tells Docker how to build your app image. 

    The basic structure of a Dockerfile is: 

        FROM <base-image>
        WORKDIR <path>
        COPY <local files> <container path>
        RUN <install dependencies>
        CMD ["command", "to start app"]


**Example Dockerization - Node.js App**


Directory: 

    app/
        package.json
        index.js
        Dockerfile

Dockerfile: 

    FROM node:18
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY ..
    EXPOSE 3000
    CMD ["npm", "start"]

Build image: 

    docker build -t my-node-app .

Run: 

    docker run -d -p 3000:3000 my-node-app 


**Next Step: Build the Docker Image**


From the same folder as Dockerfile: 

    docker build -t myapp .

This creates an image named 'myapp'


**Next Step: Run the container**

    docker run -d -p 8080:8080 myapp 

Map ports based on your app. 


**Next Step: (OPTIONAL) - Use docker-compose**

Compose lets you run your app + DB together


**NoTe:** Copy Dependencies First 

- This allows Docker to cache layers and build faster. 

    COPY package*.json .
    RUN npm install 
    COPY . .



## JENKINS 


- Jenkins is an automation tool used for CI/CD (Continuous Integration & Continuous Delivery). 

- In simple words: Jenkins automatically builds, tests, and deploys your application. You don't need to run commands manually. 


**Relationship between Docker & Jenkins:**

- Docker: Packages and runs the application

- Jenkins: Automates the process of building, testing, and deploying application 

Together, they make DevOps powerful.


**How Jenkins + Docker work together**

Jenkins can:

- Automatically build Docker images 

    If you push new code -> Jenkins can run: 

        docker build -t myapp . 

- Automatically run containers 

    Jenkins can start containers: 

        docker run -d -p 3000:3000 myapp

- Automatically push Docker images to Docker Hub 

    docker push myapp:latest 

- Automatically deploy containers to servers 

    - AWS, DigitalOcean, Kubernetes, Any Linux server 

- Jenkins = automation 
  Docker = container platform



**Why Jenkins was needed even though Docker exists?**

- Problem that Docker does NOT solve: Docker only helps you run and package apps. 

But in a real company, we need: 

    1. Automatic testing
    2. Automatic building
    3. Automatic deployment
    4. Automatic notifications 
    5. Scheduled jobs 
    6. Pipeline control (stage -> stage -> stage)

Docker cannot do any of this. 


**What Jenkins adds on top of Docker**


1. CI/CD pipelines: 

    Automatically run build -> test -> deploy steps 

2. Automation: 

    Trigger builds when code is pushed 

3. Integration: 

    Works with GitHub, Maven, Gradle, Docker, Kubernetes, AWS, etc. 

4. Versioned deployments: 

    Deploy automatically for every commit. 


**When do you need Jenkins?**


Use Jenkins when you want: 

- Automatic builds
- Automatic testing on every code change
- Automatic Docker image creation
- Deploying Docker containers to servers 
- Continuous Delivery
- Quality checks before deployment 

In production, Docker + Jenkins is the standard. 



## Publishing Images to DockerHub


- Publishing an image means uploading your Docker image from your computer to your Docker Hub account, so that: 

    You can download it from anywhere

    Others can pull it 

    You can use it in Jenkins, Kubernetes, cloud servers, etc. 

**STEPS:**

- Step 1: Log in to Dockerhub from your terminal 

    docker login 

    Enter: Username, Password

    If login is successful -> we can push images 

- Step 2: Tag your image correctly 

    You must tag it using the format: 

        docker tag <local-image> <dockerhub-username>/<repo-name>:<tag>

    Example: 

        Say we have an image - 

        REPOSITORY      TAG     IMAGE ID
        myapp          latest   abcd1234

        Your Dockerhub username is: isonu
        Your repo name is: myapp
        You want tag: v1

        Then: 

            docker tag myapp:latest isonu/myapp:v1

- Step 3: Push the image to Dockerhub

    docker push isonu/myapp:v1

    This uploads the image layer by layer to Dockerhub. 

- Step 4: How to pull the image back later? 

    From any computer: 

        docker pull isonu/myapp:v1

    Runs exactly the same everywhere 


**Why is publishing to Dockerhub important?**


- You don't need to send your image files manually

- Jenkins can pull your image 

- Kubernetes can deploy it 

- Cloud servers (AWS, Azure, etc) can use it 

- You can share your app with others instantly. 



## Docker Volumes 


- Volumes are persistent data stores for containers. 

- A Docker volume is a special storage mechanism used to store data outside a container, so the data is not lost when the container stops or is deleted.

In simple words: 

    - Containers are temporary 
    - Volumes are permanent 

**Why are Volumes Needed?**

Containers delete everything inside them when: 

- You restart a container
- You recreate a container 
- You pull a new version of an image 

So to save important data (like database files, logs, uploaded files), Docker uses volumes. 


**What Problems do Volumes Solve?**


            Without Volumes                         With Volumes 

Data is deleted when container stops                Data persists 

Cannot update container without losing data         Safe updates 

Difficult to share data between containers          Easy sharing

Database becomes useless after restart              Database survives restarts 


**How to create and use a Volume?**


- Create a Volume 

    docker volume create mydata

- Use Volume in a container 

    data persists even if you delete the container, if u use Volume

- List all volumes 

    docker volume ls

- Inspect a Volume 

    docker volume inspect mydata

- Remove a Volume 

    docker volume rm mydata

    docker volume prune 

    

- Docker volumes store persistent data.

- Containers are temporary -> volumes survive restarts. 

- Recommneded for databases, logs, and uploaded files. 

- Volumes are stored and managed by Docker internally. 


**Types of Volumes:**

- Named Volumes 
- Anonymous Volumes
- Bind Mount 



## Docker Image Pulling Vs. GitHub 


1. What does it mean when people say "Docker images contain everything (environment + dependencies)"? 

- A Docker image bundles the entire application environment, including: 

    Source code, Required runtime (Node, Python, Java, etc), OS-level libraries, App dependenceis, Configurations

So when we run the image, the app works the same on any machine, regardless of the OS or versions installed. 


2. When I pull an image from Docker Hub, does it download the source code like GitHub? 

- No, pulling a Docker image doesn't give you the source code. It gives you a packaged, ready-to-run application, similar to downloading: 

    A compiled .exe

    An already packaged mobile app

    A ready-made service 

You cannot edit the app simply by pulling the image 


3. If pulling an image doesn't give the code, what is the purpose of pulling a Docker image? 

- The purpose is to run the application instantly without installing: 

    runtime (Node, Python, Java), dependencies (npm install, pip install), system packages, OS-level libraries

    By pulling an image, we get a ready-to-run application with zero setup required. 


4. Does Docker pull work the same way as GitHub pull? 

- No, they are completely different. 

    GitHub pull: downloads source code, requires environment setup, user edits the code, not ready to run 

    Docker pull: Downloads packaged application, No setups needed, User runs the app, Ready to run 


5. Why do we use Docker instead of installing applications manually? 

Because Docker makes apps: 

- Easier to install -> one command 
- Consistent -> same version everywhere 
- Portable -> runs on any machine 
- Isolated -> no conflicts with other apps 
- Fast to deploy -> server only needs Docker 


- Use DockerHub when you want to share a runnable application. Use GitHub when you want to share the source code. 


## After I dockerize my app, create an image, and push it to Docker Hub - is my deployment complete? 


No. Pushing an image to Docker Hub doesn't mean the application is deployed. 

Docker Hub is only a registry (like GitHub but for Docker images). It stores your image so it can be pulled later. 

To fully deploy the application, you must still: 

1. Choose a server or hosting platform

    AWS, DigitalOcean, Render, Railway, Fly.io, Google Cloud Run, etc. 

2. Pull the image onto that server

    docker pull username/myapp:v1

3. Run the image as a container on the server, exposing ports: 

    docker run -d -p 8080:3000 username/myapp:v1

4. Make the app accessible through the server's public IP 

    
**Summary:**

- Dockerizing = Packaging 
- Pushing to Docker Hub = Storing 
- Deployment = Running your container on a live server 

So, pushing the image is not the final step - it only prepares the app for deployment. 

The final step is running that image on a server so users can access it. 



## Where does Jenkins fit in the deployment process after Dockerizing and pushing the image? 

- Jenkins is used after you dockerize your application and before it gets deployed to a server. 

Jenkins doesn't replace Docker, Docker Hub, or your cloud server - instead, it automates the entire process. 

Think of Jenkins as the automation brain of the development -> build -> test -> deployment pipeline. 


**So, What exactly does Jenkins do?**

Jenkins automates these tasks: 

1. Automatic Code Pulling 

    Whenever you push code to GitHub, Jenkins automatically pulls the latest code. 

2. Automatic Building

    Jenkins automatically builds: your project, your Docker image, your production-ready artifact 

3. Automatic Testing 

    Runs unit tests or integration tests: 

        npm test 

4. Automatic Image Push to Docker Hub

    After a successful build: 

        docker push username/myapp:latest 

5. Automatic Deployment to Server 

    Jenkins logs into your server (AWS EC2, DigitalOcean, etc) and: 

        Pulls the new image 

        Stops the old container

        Starts the new one 

7. Automatic Notifications: 

    Jenkins can notify you on: email, Slack, Teams

    if something fails. 


**In short: Where is Jenkins in the process?**

Below is the full lifecycle: 

Developer -> GitHub -> Jenkins -> Docker Build -> Docker Hub -> Server -> Deployment 

Jenkins sits in the middle, automating everything between GitHub and Deployment. 


**Why do we need Jenkins at all?**

Without Jenkins, you must manually: 

    - pull latest code 
    - build the Docker image
    - push it 
    - SSH into server
    - stop old container 
    - run new container 

This is slow, repetitive, and error-prone. 

Jenkins solves this with CI/CD: 

- CI: Continuous Integration
- CD: Continuous Deployment 

Meaning: 

- Every code change is automatically tested 
- Automatically built 
- Automatically dockerized
- Automatically deployed 

No manual steps. 



## Was deployment always done using Docker, Jenkins, CI/CD? What was the older process and why did these tools become necessary? 


No. Modern deployment with Docker, Jenkins, CI/CD is very new (last 8-10 years). 

Before this, deployment was manual, slow and painful. These tools were created to solve the problems of old/traditional deployment process. 


**Traditional Deployment (Before Docker, Jenkins)**

1. Manual Server Setup

Developers manually installed everything on the server: 

- Install Java, Python, Node
- Install dependencies manually
- install database manually
- configure environment variables 
- install OS packages 

If the app needed a different version, you had to uninstall and reinstall things. 


2. Code Was Copied Manually to the Server 

Example old workflow: 

- ZIP the project folder
- upload using FTP / SCP
- unzip it on the server
- manually run 

    npm install

Every update required repeating this. 


3. Manually Build and Restart

Developers had to log into the server: 

    ssh myserver
    cd project
    npm install
    npm run build
    pm2 restart app

If 2 environments needed different configs (dev vs prod), LOT of manual changes. 


4. "Works on my machine" biggest problem. 

Different developers had different: 

- OS
- versions
- libraries
- dependencies
- runtime (Node 16 vs. Node 18)

So the app behaved different everywhere. What worked on the developer's machine often failed on the server. 


5. No Automation - everything broke easily 

No automation for: 

- testing
- building
- deployment
- rollback

If a single developer forgot a step, deployment failed. 


6. Deployments were risky and required downtime. 

If you deployed a new version: 

- stop the server
- deploy new files
- restarts the server

During this time, the website was down. No zero-downtime deployment. 


7. Scaling was a nightmare

If traffic increased: 

- manually buy a new server
- manually install everything 
- manually configure it 
- manually deploy again 

Took hours or days. 


**Why Docker Solved These Problems?**


Docker introduced containerization. Now the app comes packaged with: 

- dependencies
- OS libraries
- runtime 
- configurations 

So the environment is identical everywhere. 

This solves: 

- works on my machine 
- server setup issues 
- dependency conflicts
- portability issues 


**Why Jenkins Solved These Problems?**


Jenkins added automation (CI/CD). Now: 

- code is automatically tested
- image is automatically built 
- pushed to Docker Hub
- automatically deployed to server

This removed manual steps and human errors. 




-------------------------


## Is DevOps all about Deployment? 

No. Deployment is only one part of DevOps.

DevOps includes: CI/CD, automation, monitoring, infrastructure, cloud systems, scaling, networking, containers, logging, security, etc. 

A Full-Stack Developer doesn't need all of this. 


**What a full stack developer actually needs for deployment**


1. Deploy your frontend

    Learn deploying: React, Next.js, plain HTML/CSS/JS

    to platforms like: Vercel, Netlify, GitHub Pages, Render, AWS S3 + CloudFront


2. Deploy your backend 

    Learn deploying: Node.js/Express, Python, Spring Boot, Django, etc 

    to platforms like: Render, Railway, AWS EC2, DigitalOcean Droplet, Google Cloud Run, Dockerized deployment 


3. Basic Docker 

    - how to write Dockerfile 
    - how to build and run Docker images
    - how to push to Docker Hub
    - port mapping
    - Volumes 

You do not need Kubernetes, advanced networking, or clusters. 


4. Basic CI/CD

    - Auto deploy your backend from GitHub

    - use GitHub Actions or Jenkins, 
    
    - understand pipelines (build -> test -> deploy)


**Deployment Topics**

"how to deploy node js app to production"
"deploy express node app on render"
"deploy node js app on aws ec2"
"deploy react app vercel tutorial"
"deploy full stack app render"
"docker basics for full stack developers"
"deploy docker containers to production"

**Full Stack Deployment**

"mern app deployment tutorial"
"full stack app deployment render"
"full stack project deployment step by step"

**CI/CD**

"ci cd for beginners github actions"
"automatic deployment github actions"
"ci cd pipeline tutorial for node js"

**Docker**

"docker for node js developers"
"dockerize node js app tutorial"
"docker basics आसान भाषा"


**What not to learn**

- Kubernetes
- Terraform 
- Prometheus/Grafana (monitoring tools)
- Load balancers setup
- AWS ECS + EKS 
- Nginx reverse proxy 


## How Docker works with images & containers 

1. You write your code on your host machine (local folder)

2. You run docker build ... -> Docker builds an image from your current code. 

3. You run docker run ... -> Docker creates a container from that image. 

Important: 

- Updating your local code does NOT automatically update a running container. 

- Containers always run the code that was present when the image was built. 

- So our old container is still running the old code. 


**How to Fix it?**

OPTION 1 - Rebuild the image & run a new container 

1. Stop the old container: 

    docker ps 
    docker stop <container-id>

2. Build a new image from updated code: 

    docker build -t my-node-app:latest .

3. Run a new container 

    docker run -d -p 8001:8000 my-node-app:latest
     
Now, the browser will show according to the updated code. 


OPTION 2 - Use volume mapping for development (hot reload)

- If you want to see changes immediately without rebuilding the image very time: 

    docker run -d -p 8001:8080 -v ${PWD}:/app my-node-app

Explanation: 

    - v ${PWD}:/app -> maps your local folder to the container folder 

    - Any changes you make locally are reflected inside the container immediately 

    - Tip: combine with nodemon to auto-restart the app on changes 

        docker run -d -p 8001:8080 -v ${PWD}:/app my-node-app npm run dev



## Docker Volume 


- A volume is basically a special folder managed by Docker that lives outside of the container filesystem, but can be attached to a container. 

    Volumes can persist data even if the container is deleted. 

    Used for things like databases, logs, or configuration. 

Think of it like a folder on your computer that is "shared" with a container, but Docker manages it for you. 

**Bind mount (mounting current working directory)**

- A bind mount lets you take a folder from your host machine (like your local project folder) and mount it inside the container. 

Example: docker run -v ${PWD}:/app -p 8080:8080 my-node-app

    -v: volume/bind mount 
    
    ${PWD}: current working directory on your host machine (where your terminal is)

    /app: folder inside the container wehre the host folder will appear 

This means whatever you change in your local folder will instantly appear in the container. 


**How Does It Work Internally?**


- Container has its own filesystem: /app, /node_modules, etc. 

- Normally, changes inside the container stay inside the container 

- Bind mounts overlays /app inside the container with your host folder 

So: 

- Any file you add or edit in your host folder -> instantly visible inside container 

- Any file container creates -> instantly visible on your host (unless it's a Docker volume)