Next.js in React-based framework for building fast, scalable and SEO-friendly web applications. It provides modern features for both frontend and backend development.  

- The Next.js framework (open-source) wa developed by Vercel. 

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

    Image loads only when it comes into view. Faster initial page load. Why load 100 product images if user sees only 5? Lazy loading means loading images only when they are needed, improving page load speed. 

3. **Font Optimization**

- Problems in normal React apps: 

    Page loads, Text shows in default font, Google font loads late, Text jumps -> layout shift 

    User sees text jumping - bad UX + SEO 

- What Next.js does automatically 

    Downloads font at build time, Serves font from same domain, Preloads font, Prevents text jumping

    Text doesn't move when font loads. 

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


## How SEO is better in Next.js 

**React SEO Problem - CSR**

- When Google visits a React site, it sees: 

```html
<div id="root"></div>
```

    No content, No headings, No keywords 

    Google cannot rank what it cannot see.

**Next.js (SSR/SSG)**

- When Google visits Next.js site, it sees: 

    ```html
    <h1>Buy iPhone Online</h1>
    <p>Best price guaranteed</p>
    ```

    Content exists, Keywords exist, Headings exist

    Google can index immediately. 

- React sends empty page. Next.js sends ready page. 

    SEO is better in Next.js because content is rendered on the server and sent as HTML, allowing search engines to index it immediately. 


## SSR (Server Side Rendering)

HTML is created on the server for every request and sent to the browser. 

Flow: 

- User requests page 
- Server fetches data
- Server creates HTML 
- Browser displays page 

SSR means generating HTML on the server for each request instead of rendering everything on the browser. 

- SSR doesn't load page every time. Only first load uses server. After hydration -> behaves like SPA. Navigation uses client-side routing. 

- **Client Side Rendering** renders web pages in the browser using JavaScript after the initial load.

    Sends an initially minimal HTML page, which is then populated and rendered using JavsScript in the browser. 

    CSR may result in slower initial load compared to SSR but allows for highly interactive client-side applications. 

- **Server Side Rendering** Sends a fully rendered HTML page from the server to the browser. 



## What rendering types does Next.js support? 

Next.js supports: 

- CSR (Client Side Rendering)
- SSR (Server Side Rendering)
- SSG (Static Site Generation)

Next.js does not force one rendering type. You choose per page based on requirement. 

| Rendering | When HTML is created | Use case                  |
| --------- | -------------------- | ------------------------- |
| CSR       | In browser           | Dashboards, internal apps |
| SSR       | On every request     | Auth pages, dynamic SEO   |
| SSG       | At build time        | Blogs, landing pages      |
| ISR       | Build + revalidate   | Ecommerce, content sites  |


- Next.js allows mixing CSR, SSR, and SSG in the same app, which lets us optimize performance and SEO page-by-page. 


## CSR in React? Why SEO is weak? 

CSR means: 

- Browser downloads `index.html`
- JS loads
- React renders UI after JS execution 

Search engines initially see: 

```html
<div id="root"></div>
```

Content appears later -> slower indexing. 


## SSR in Next.js? 

- SSR generates HTML on the server for every request. 

- Flow: 

    `Request -> Server fetches data -> HTML created -> Sent to browser`

- Browser immediately sees: Text, Meta tags, Headings 



## What is SSG? 

- SSG generates pages at build times, not per request. 

- HTML is stored, Served instantly via CDN, Fastest rendering types 

- SSG is ideal for content that doesn't change often, like blogs or marketing pages. 


## What is Hydration? 

- Hydration means: React attaching JavaScript logic to already existing HTML. 

- Server sends ready HTML -> Browser shows content immediately -> React then connects buttons, clicks, state 

    HTML = body, JS = brain 

- Hydration is the process where React makes server-rendered HTML interactive. 


## Why hydration mismatch happens? 

Because server HTML ≠ client HTML

- Common causes: conditional rendering 

- Hydration error occurs when server and client render different outputs. 


## How does Next.js improves SEO compared to React? 

- Next.js sends pre-rendered HTML with: Meta tags, Headings, Content 

- Proof

    View Page Source: 

        React CSR -> empty root
        Next.js CSR -> full HTML 


## Does SSR reload the browser every time? 

SSR does not reload the browser like traditional apps. 

- HTML is fetched from server -> React hydrates -> Navigation still happen via client routing 

- SSR renders HTML on server, but navigation still happens client-side, perserving SPA behaviour. 


## How does Next.js optimize performance by default? 

Next.js optimizes performance via: 

- Automatic code splitting 
- Image optimization 
- Font optimization 
- Lazy loading 
- Server rendering 

**What is automatic code splitting?** 

Each page gets only its required JavaScript. 

- In React: One big JS bundle 

- In Next.js: One bundle per route 

Next.js automatically splits code per route, reducing initial bundle size. 


**Lazy loading in Next.js**

- Lazy load means load things only when needed. 

- Example: 

    Images load when visible, Components load when route accessed. 


**How does <Image/> optimize images?**

`<Image/>` provides: 

- Lazy loading
- Responsive images
- Fixed dimensions 

**Font Optimization (`next/font`)**

Next.js: 

- Downloads font at build time 
- Injects CSS
- No external font request 
- Font loads instantly 
- No layout shift 


## Why Next.js is production ready but React needs setup? 

Next.js gives: 

- Routing 
- SSR
- Code splitting
- Optimization
- API routes 

React gives: 

- Only UI layer 

Next.js is a full-stack framework, React is just a UI library. 


## App Router Vs. Pages Router 

- Pages Router: older (`pages/`)
- App Router: new (`app/`), React Server components 


## Server Vs. Client Component 


| Server Component | Client Component |
| ---------------- | ---------------- |
| Runs on server   | Runs in browser  |
| No hooks         | Hooks allowed    |
| No JS sent       | JS sent          |
| Secure           | Interactive      |


## Streaming in Next.js 

Send HTML in chunks instead of waiting for full page. 

- Example: 

    Header loads first
    Product list loads later 

- Streaming improves performance. 


## Suspense in Next.js 

- Allows showing fallback UI while data loads. 

- progressive rendering and better UX 

