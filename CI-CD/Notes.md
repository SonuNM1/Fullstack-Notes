## What Problem does CI/CD solve? 

Before CI/CD: 

- Dev writes code 
- Pushes to Git 
- Manually tests 
- Manually deploys

    Slow, error-prone, "Works on my machine" issues 

- CI/CD automates this entire flow. 

## CI vs CD 

**CI - Continuous Integration**

Automatically testing and validating code whenever it's pushed. 

**CD - Continuous Delivery / Deployment**

Automatically preparing or deploying code to servers after CI passes. 

## Continuous Integration (CI)

Whenever we: `git push`, CI automatically: 

1. Pulls our code 
2. Installs dependencies 
3. Run tests 
4. Runs linting/build
5. Reports success or failure

- CI ensures that every code change is automatically tested and integrated early to avoid last-minute failures. 


## Continuous Delivery Vs. Continuous Deployment 

**Continuous Delivery**

- Code is ready for production 
- Deployment needs manual approval 

`Code -> Test -> Build -> Ready`

**Continuous Deployment**

- Code is automatically deployed 
- No manual step 

`Code -> Test -> Build -> Auto deploy`

- Most companies use continuous delivery, not full auto-deployment. 

## Real-world CI/CD flow 

**Developer Workflow**

1. Create feature branch
2. Write code 
3. Push code 
4. Create Pull Request 

**CI kicks in**

- Run tests
- Run lint 
- Build project 

**After PR merge -> CD**

- Build Docker image 
- Push to registry 
- Deploy to server (EC2 / Kubernetes)

**CI/CD tools**

- CI Tools: GitHub Actions, GitLab CI, Jenkins 

- CD Tools: Docker, Kubernetes 

## GitHub Actions 

- GitHub Actions uses YAML workflows that define jobs and steps which run on GitHub-hosted runners. 

## CI/CD + Docker 

- "Works on my machine" issue resolve 
- Same environment everywhere 

```js
Code
↓
Docker build
↓
Docker image
↓
Push to registry
↓
Deploy container
```

- Docker ensures environment consistency between development, testing and production. 

## Before CI/CD

Situation - You are a backend developer working on a Node.js app. 

**Manual Testing**

What you do manually: 

1. Write code 
2. Run the app on your laptop 
3. Open browser / Postman
4. Test APIs yourself: 

    Login works? Signup breaks? Response correct? 

5. Maybe run: `npm test` by yourself 

    This is called manual testing. 

    Because a human decides: when to test, what to test, whether it passed or failed 

    Problems: You might forget to test, Tests may differ per developer, You might miss edge cases 

## Manual Deployment - what it ACTUALLY means

After testing, you want to send code to server. 

**What you do manually:**

1. Login to server (EC2 / VPS)
2. Pull code: `git pull`
3. Install deps: `git pull`
4. Restart server: `pm2 restart`
5. Hope nothing breaks. 

    This is manual deployment. 

**Problems:**

- You can make mistakes 
- Someone may forget a step 
- Deployments are slow 
- If 5 devs -> chaos 

**Automation by CI/CD**

```
Write code
↓
Test code
↓
Build app
↓
Deploy app
```

**Before CI/CD**

- All steps done by humans
- On laptops or servers 
- Inconsistent 


## Enter CI/CD (Automation begins)

CI/CD means: let machines do repetitive work automatically. 

- They follow the instructions that we write once. 

- We write rules. CI tool follows those rules. 

**How CI works**

1. You push code 

    `git push origin feature/login`

2. GitHub sees a CI file 

    In your repo: `.github/workflows/ci.yml`

    This file says: Whenever code is pushed, do these steps. 

3. CI machine starts

    GitHub gives you a temporary virtual machine. 

    We never see it. It's invisible. 

4. CI automatically does this 

    - Pulls your code. CI now has your code 

    - Install dependencies 

    - Runs tests: If any test fails -> CI fails 

    - Runs lint/build: `npm run lint`, `npm run build`

    - Reports results. Pass/fail 


**So what `automatic testing` really means**

- CI doesn't write tests
- CI doesn't think 

- CI runs the tests we wrote 
- Automatically 
- Every push 
- Same environment 

CI automatically runs predefined scripts like tests, linting, and builds on every code push using a clean environment. 


## Why companies avoid full auto-deployment (Continuous Delivery > Continuous Deployment)

- Companies prefer continuous delivery, not continuous deployment (full auto-deployment )

- Simple reason: Risk. 

- Example: Bug passes tests, But breaks payments, Auto-deployed -> production outage 

- Developers need to have the control. 

## Why do we need CI/CD Docker Pipeline? 

Docker makes your app containerized, but CI/CD makes it: 

- automatically build on every git push
- automatically test
- automatically create new Docker images
- automatically deploy to server/Cloud 

Think of CI/CD like: 

- Every time you push code, deploy new version automatically 

Companies use: 

- GitHub Actions, GitLab CI, Jenkins, CircleCI

Docker + CI/CD = production engineering standard 


## Why do we need Production NGINX Reverse Proxy? 

In production: 

- Frontend runs on :80
- Backend runs on :8000
- HTTPS is needed (SSL)
- Load balancing 
- Rate limiting 
- Redirects
- Logging

NGINX reverse proxy solves that 

## Docker, Registry, Container Deployment 

`Code -> Docker Image -> Registry -> Server -> Running Container`

**Docker**

- Docker = packaging your app with everything it needs 

- Docker Image = Zipped app + Node + dependencies + config 

    `docker build`

- CI does this automatically 

**Registry**

- Registry = storage for Docker images 

- Just like: GitHub -> stores code. Docker Registry -> stores images 

- Example: Docker Hub, AWS ECR 

`docker push my-app:latest`


## Why companies AVOID auto-deploy 

- Auto-deploy means: 

    `Push code -> instantly live to users`

    Sounds good, but reality is following: 

- Tests are never perfect 

    Payment bugs, data loss bug

- Business risk 

    Black friday, live traffic, legal impact 

- Human approval needed 

    Product manager, QA, Ops 

    CI -> automatic 
    CD -> manual approval 



- CI/CD is a process that automates testing and delivery of code. 

    Continuous Integration ensures that code is automatically tested and validated whenever it's pushed, while Continuous Delivery or Deployment prepares or releases that code to production in a reliable way. 

**How does CI work in real projects?**

In CI, whenever a developer pushes code to Git, a CI tool like GitHub Actions pulls the code, installs dependencies, run tests, linting and build steps. 

If any step fails, the pipeline fails and the code is not promoted further. 

**What kind of tests run in CI?**

Primarily unit and integration tests. 

- Unit tests validate individual functions or services, while integration tests ensure APIs, databases, and services work together. 

- In projects without tests, CI still runs build and lint checks to catch syntax or compilation issues .

**What is CD then?**

After CI passes, Continuous Delivery prepares the application for release - often by building a Docker image and pushing it to a registry. 

- Deployment may still require manual approval, especially for production, to reduce risk. 

**Why not auto-deploy everything?**

Because tests are never perfect. 

- Auto-deployment can introduce production outages, especially in critical systems. 

- Most companies prefer controlled releases with approvals for safety and rollback capability. 

**Have you worked with CI/CD ?**

Yes, I've worked with GitHub Actions where we defined pipelines to install dpeendencies, run tests, build the application, and ensure code quality before merging. 

