
### Why do we need CI/CD Docker Pipeline? 

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


### Why do we need Production NGINX Reverse Proxy? 

In production: 

- Frontend runs on :80
- Backend runs on :8000
- HTTPS is needed (SSL)
- Load balancing 
- Rate limiting 
- Redirects
- Logging

NGINX reverse proxy solves that 