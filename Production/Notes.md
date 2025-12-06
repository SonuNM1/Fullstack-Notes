
- Do containers update automatically? on code change 

- Why containers don't update unless images rebuild (docker compose up --build)

- Postman API Collection export, import 

- Will code changes reflect automatically in Docker containers? 

- Docker images are immutable 

- Why do we mount volumes? 

- Bind mounts Vs. Docker volumes 

- Hot reload inside containers 

- Why do we use volumes in development but in production? Then what do we use in production? 

- Why does frontend call backend using service name

- Container internal network (bridge network)

- How 5173 inside Docker not equal your machine's 5173 

- Hot port Vs. Container port 

- Difference between dev server (Vite, Nodemon) Vs. Production build 

- why production shouldn't have hot reloads 

- Why React dev server (Vite) not used in production. What is used then 

- React is static in Production. 

- Why need NGINX? 

- Till now my app worked without NGINX, how? in deployment 

- How does frontend talk to backend in production

- Serving static files with NGINX 

- Reverse Proxy 

- Difference between React dev server and NGINX server 

- Why you must use NGINX in Docker production 

- Frontend directly calls backend now, why NGINX 

- What does Reverse Proxy even do 

- How NGINX forwards requests 

- Why frontend -> NGINX -> backend is correct flow in production 

- Multi-stage Dockerfile for React 

    Stage 1: build React
    Stage 2: server build using NGINX 

- CI/CD Automation, No more manual builds 

- Do i need to rebuild manually every time? Isn't this too manual? 

- GitHub Actions 

- Docker image auto-build 

- Automatic deployment pipelines 

- How cloud servers auto-pull new images 

- Deploying Docker to Cloud Servers 

- What do i need to make it production ready? 

- Is Docker alone enough? 

- VPS (DigitalOcean, AWS EC2, Linode)

- Setting up domain + HTTPS 

- Why React static in Production 

- How did my older apps work without NGINX in deployment 

- What /dist folder contains 

- Why hosting static files require a web server 

- Why local systems like Netlify auto-add servers behind the scenes 

- Passing env to container 

- .env handling 

- pushing docker image to docker hub. Then how production server (AWS EC2, DigitalOcean, Render) pulls image from there. 

        Developer pushes code > GitHub Actions builds Docker image > Pushes to Docker Hub > Server automatically pulls updated image > Deploys app 

        This is how zero-downtime deployments happen. 