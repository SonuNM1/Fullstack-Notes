Frontend System Design is designing how the frontend application is structured, not just writing components. 

It answers: 

- How data flows?
- How state is managed? 
- How app scales?
- How performance is handled? 
- How teams work on it? 

- State Management: Local, Global and Server state 

- Performance: Code splitting, Memoization, Caching, Virtualization 

- Scalability: Folder structure, Feature-based design, Reusability 

- Handling large lists

    Problem: 10,000 products -> slow DOM

    Solution: `react-window / react-virtualized`

    Only visible items are rendered, reducing DOM nodes. 


## Micro Frontend 

- Breaking one large frontend app into multiple independent apps. 

    Just like microservices but for frontend 

- Example: Amazon - Cart team, Search team, Payments team 

    Each team - owns its UI, deploys independently 

- Separate repo, Separate deployment 

**Monolith Frontend**

One repo, one build, one deployment 

- Problems: Slow builds, Team conflicts, Risky deployments. 

**How Micro Frontends Communicate?**

- Events
- Shared state
- URL 
- Shared libraries 

**Popular Modern Frontend Techniques**

| Technique         | Used when          |
| ----------------- | ------------------ |
| Module Federation | Webpack            |
| iframe            | Isolation needed   |
| Single-SPA        | Framework-agnostic |



## Monolith Vs Micro Frontend 

**Monolith Frontend**

A single frontend application: One codebase, One build, One deployment. 

- Single repo, Single bundle, One team or tighly coupled teams 

- `Pros`: Simple to start, Easy to debug, Less architectural overhead 

- `Cons`: Large bundle size, Slow build times, Hard for multiple teams, Small change -> full redeploy 

**Micro Frontend**

Frontend split into independent applications, composed together. 

- Example:

    Shell App -> Auth app, Cart app, Product app 

- Each: own repo, own build, own deployment

- Characteristics: Independent teams, Independent releases, Loosely coupled 

- Pros: Scales with teams, Faster deployments, Fault isolation 

- Cons: Complex setup, Shared dependency issues, Harder debugging 


## Frontend Design Patterns 

Design Pattern = proven solutions to common UI problems. 

**1. Component Pattern**

Components are the building blocks of UI.

- Problem: UI needs reuse 

- Solution: Break UI into components 

- Example: Button, Card, Modal

**2. Custom Hooks Pattern**

Hooks allows logic reuse without UI duplication. 

- Problem: Logic duplication

- Solution: Extract logic into hooks 

- Example: useAuth, useCart, useFetch 

**3. State Lifting Pattern**

State is lifted to the nearest common ancestor/parent. 

- Problem: Sibling components need shared data. 

- Solution: Move state to common parent 

**4. Performance Scalability**

Render only what the user sees. 

- Code splitting
- Lazy loading
- Memoization 
- Virtual lists 



## Singleton Design Pattern 

Ensures only one instance exists. 

- Ensures only one instance of a class exists across the application.

- The Singleton design pattern is a type of design pattern that restricts the creation of a class to only one instance. It ensures that a class has only one instance and provides a global point of access to it. 

- Frontend use cases: Global config, API client, Auth service 

- Singleton ensures shared resources like API clients are not recreated. 

- Providing a single access point and preventing conflicts. 


**Why do we need it?**

Imagine this without Singleton: 

- Every component creates: API client, Auth service, Analytics tracker 

    Multiple instances, Duplicate config, Memory waste, Inconsistent state

- Singleton ensures a single shared instance of critical services like API clients, stores, and auth handlers. 

**Where Singleton is used in Frontend**

| Use Case     | Why                     |
| ------------ | ----------------------- |
| API Client   | Shared headers, baseURL |
| Auth Service | One login state         |
| Analytics    | Avoid duplicate events  |
| WebSocket    | Single connection       |

**Example 1 - API Client Singleton**

- Problem: Every request needs - base URL, token, interceptors 

- Singleton prevents recreating shared services. 

```js
// api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
});

export default api;
```

```js
// ProductPage.jsx
import api from "./api";

useEffect(() => {
  api.get("/products").then(res => setProducts(res.data));
}, []);
```

- Same `api` instance used everywhere -> Singleton 


**Example 2 - Auth Service Singleton**

- Problem: We want - Logged-in user info, Token handling, Shared across app 

```js

// authService.js

const authService = {
  login(token) {
    localStorage.setItem("token", token);
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }
};

export default authService;
```

- One file, one instance, used everywhere. 

- Using Auth Service in Component 

```js
import authService from "./authService";

if (authService.isLoggedIn()) {
  // show dashboard
}
```

**Why Redux/Zustand Store is Singleton?**

- Redux store: Created once, Shared everywhere 

- Global stores are natural singletons 

- Singleton should be used carefully to avoid tight coupling. 


**Why use Singleton in frontend?**

To manage shared resources like API clients and auth services. 

**Is Redux store a Singleton?**

Yes, it acts as a single global state container. 