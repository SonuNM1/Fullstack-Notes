Next.js in React-based framework for building fast, scalable and SEO-friendly web applications. It provides modern features for both frontend and backend development.  

- Built on React, enabling component-driven UI development. 

- Supports SSR (Server Side Rendering), SSG (Static Site Generation) for improved performance and SEO. 

- Provides API routes for backend integration within the same project. 


## Why Next.js exists 

**Problems without plain React (SPA)**

- Poor SEO (content rendered on client)
- No built-in routing
- Manual performance optimization 
- Slow first load 

**Next.js solves this by**

- Rendering pages on server
- Pre-rendering HTML
- Built-in routing (File based routing, automatically maps pages to URLs)
- Automatic code splitting
- Image and font optimization

- Next.js provides SSR, SEO, routing, and performance optimizations out of the box. 


| Feature          | React (CRA/Vite) | Next.js              |
| ---------------- | ---------------- | -------------------- |
| Routing          | Manual           | File-based           |
| SEO              | Poor             | Excellent            |
| Rendering        | CSR only         | CSR + SSR + SSG      |
| Performance      | Manual           | Optimized by default |
| API Routes       | No               | Yes                  |
| Production ready | Needs setup      | Yes                  |


## How Next.js works? 

- Pre-rendering: Pages can be rendered on the server (SSR) or pre-rendered at build times (SSG) for faster load and better SEO. 

- Routing: File-based routing automatically maps pages to URLs. 

- API Routes: allows backend functionality within the application. 

    Each file inside `pages/api` automatically becomes an API endpoint. 

- Automatic code splitting: Loads only the necessary JS for each page, improving performance. 

- Optimized Builds: Bundling, minification, and image optimization. 

- Easy deploymen


## API Routes in Next.js 

- Next.js lets us create backend endpoints inside our project without setting up a separate server (like Express or Django). 

- By placing files within the `/pages/api` directory, each file automatically becomes an API endpoint. 

- When deployed, these API routes are often treated as serverless functions 


## How React (SPA) actually works - CSR 

User opens website
↓
Server sends index.html (almost empty)
↓
Browser downloads JS bundle (React)
↓
React renders UI using JS
↓
React Router updates UI without reload


- **Client-Side Rendering:** CSR means the browser downloads JavaScript and renders the entire UI on the client. 

    First paint is slow, SEO weak 

- **SEO in React:** 

    Search engines see: <div id="root"></div>

    No content, No meaningful HTML, Bad for SEO 

    React Helment and other manual things we did for SEO. 

    React can do SEO, but it requires extra tools and complex setup. 


## Rendering Types 

Rendering = converting React components into HTML. 

There are 3 places this can happen: 

1. Browser (CSR)
2. Server (SSR)
3. Build Time (SSG)

- Next.js supports hybrid rendering, meaning the same app can use CSR, SSR, and SSG together. 

**CSR in Next.js**

Yes, it exists. 

```js
"use client";

useEffect(() => {
  fetchData();
}, []);
```

- Same as React. 
- Used for: Dashboards, Admin panels, Logged-in areas. 


**SSR - Server Side Rendering**

`Request -> Server -> HTML generated -> Browser`

```js
export async function getServerSideProps() {
  const res = await fetch("https://api.com/products");
  const data = await res.json();

  return { props: { data } };
}
```

- Result HTML sent to browser 

```html
<h1>iPhone</h1>
<p>₹79,999</p>
```


**SSG - Static Site Generation**

`Build time -> HTML generated -> CDN`


## Hydration 

- Hydration is making already visible HTML interactive by attaching JavaScript to it. 

- Without hydration: Buttons won't work, Inputs won't type, Links won't work 

- Hydration is the process where React attaches event handlers to server-rendered HTML to make it interactive. 


## Performance Optimization in Next.js 

1. **Automatic Code Splitting** 

- React: All JS bundled together 

- Next.js: 

    `Each page = separate JS bundle` 

    Load only what you need. 

2. **Image Optimization**

- React: <img src="big.jpg" />

- Next.js: 

    <Image src="/big.jpg" width={300} height={200} />

    Automatically: Lazy loads, Resizes

3. **Font Optimization**


4. **Caching** 

- Pages served from CDN
- Faster than client-only apps
 
5. **API Routes - Backend inside Next.js**

- Runs on server, Not browser 



## Why Next.js is production ready 

React needs: 

- Routing 
- SEO setup 
- Code splitting 
- SSR setup 
- Image optimization 
- Security headers 

Next.js gives: 

- Routing
- SSR/SSG
- SEO
- Performance
- Backend APIs 