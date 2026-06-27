
## Rate Limiting 

- Rate limiting is a technique used to control the number of requests a client can make to a system within a specific time period. It helps protect applications from abuse, excessive traffic, brute-force attacks, and resource exhaustion. 

- Modern applications are exposed to public networks and can receive requests from legitimate users as well as malicious actors. 

    Without restrictions, a client could send an excessive number of requests, consuming server resources and degrading application performance. 

    Rate limiting helps prevent abuse by enforcing request thresholds, ensuring fair resource usage, improving system stability, and protecting critical endpoints such as login, passsword test, and OTP APIs. 

- Suppose your login API is: `POST /login`

    Attacker sends: 10,000 Requests per minute trying passwords. This is - Brute Force Attack 

    Or someone accidentally sends: 100 requests per second, because of a frontend bug. Your server may become overloaded. 

    Need a mechanism that says: You are allowed only a certain number of requests within a specific time period. 

    This is called: Rate Limiting

**How Is Rate Limiting Implemented?**

The system keeps track of: `User ID` or `IP Address`

Example - 5 requests per minute 

If request count becomes: 6, before the minute ends.

    Server responds - 429 Too Many Requests. 

**Why Redis is commonly used?**

Rate limiting requires frequent reads, writes, and counter updates. Redis is commonly used because it provides extremely fast in-memory operations, atomic counters, and automatic expiration of keys. 

    These features allow request counts to be tracked efficiently without placing additional load on the primary database. 

**Real Production Example**

For a login endpoint - Maximum: 5 Requests. Window: 1 Minute. 

If a user exceeds the limit: HTTP 429 Too Many Requests - is returned. 

**Why Not Store Rate Limits In MongoDB?**

Although rate limiting can be implemented using MongoDB, it would generate a large number of frequent read and write operations. Redis is generally preferred because it provides faster access, efficient counters, and automatic expiration capabilities, making it more suitable for high-frequency request tracking. 


## API Pagination 

- Pagination is a technique used to divide large datasets into smaller, manageable chunks that can be retrieved incrementally. 

- It improves performance, reduces memory consumption, decreases response size, and enhances user experience. 

- Suppose your database contains: 10 Users. Returning all users is fine. 

    Now imagine: 10 million users. 

    API: GET /users - return all 10 million users. 

    Problems: High response size, High memory usage, Slow API, Bad user experience

    Instead we return: 10 Users at a time OR 20 Products per page. 

    This technique is called - Pagination. 

**Why Do We Need Pagination?**

Applications often can contain large amounts of data that cannot be efficiently returned in a single response. Retrieving an entire dataset increases database load, network usage, and response times. 

Pagination solves this problem by limiting the amount of data returned in each request, allowing users to consume data in smaller portions while maintaining application performance and scalability. 

**Types of Pagination**

1. Offset Pagination 
2. Cursor Pagination 

### Offset Pagination

- Offset pagination retrieves data by skipping a specified number of records and returning a fixed number of results. It is commonly implemented using `skip` and `limit` operations. 

Example: 

    Page 1 returns 1-10 
    Page 2 returns 11-20
    Page 3 returns 21-30

Query: `User.find().skip(20).limit(10)` meaning - Skip first 20, return next 10 

**Advantages of Offset Pagination**

Offset pagination is simple to implement and easy for frontend applications to understand because it directly maps to page numbers. 

It is suitable for small and moderately sized datasets where performance is not a major concern. 

**Problem With Offset Pagination**

Imagine: 10 million records.

Request: Page 100000. 

    Database must: Skip 999,990 Records first. 
    
    Then return: 10 Records. Very expensive. 


### Cursor Pagination 

- Cursor pagination retrieves records based on a unique reference point, known as cursor, rather than using page numbers and offsets. The next set of records is fetched relative to the last retrieved record. 

- Instead of saying: Give Me Page 2, We say: Give me records after this record. 

**Advantages of Cursor Pagination**

Cursor Pagination is more efficient for large datasets because the database does not need to skip large numbers of records. It also provides more consistent results when records are inserted or deleted while users are navigating through data. 

- Real Example - Social media feeds: Instagram, Twitter, LinkedIn, Facebook usually use - Cursor Pagination, because data changes continuously. 

**Offset vs Cursor**

| Feature                      | Offset Pagination | Cursor Pagination     |
| ---------------------------- | ----------------- | --------------------- |
| Uses Page Number             | Yes               | No                    |
| Uses Skip                    | Yes               | No                    |
| Easy To Implement            | Yes               | Slightly More Complex |
| Performance On Large Data    | Slower            | Faster                |
| Handles Data Changes Better  | No                | Yes                   |
| Suitable For Infinite Scroll | No                | Yes                   |


**Which is used in Production?**

Offset Pagination is commonly used in admin dashboards and smaller applications where page numbers are important. 

Cursor pagination is generally preferred for large-scale applications, infinite scrolling interfaces, and systems with frequently changing data because it provides better performance and consistency. 


## Monolith vs Microservices 

Example - Imagine you're building an eCommerce application. 

    Features: Authentication, Products, Orders, Payments, Notifications 

### Monolith 

- A monolithic architecture is a software design approach in which all application modules were developed, and maintained as a single unified application. 

    Components such as authentication, business logic, data access, and APIs exist within the same codebase and deployment unit. 

- Monolithic architecture is simple to develop, test, and deploy because all application functionality resides within a single codebase. Communication betweenn modules occurs through direction function calls rather than network communication. 

    While this simplicity makes monoliths suitable for small and medium-sized applicationsm, they can become difficult to scale and maintain as the application grows in size and complexity. 

- Everything exists inside: One codebase, One backend application

```js
backend/

 ├── auth
 ├── products
 ├── orders
 ├── payments
 ├── notifications
```

    All deployed together. One server: Node.js App - handles everything. 

    This is called: Monolithic Architecture 

**Why Was Monolith Created?**

Because it is simple. 

    One codebase. One deployment. One database. 

    Easy to understand. Easy to develop. Easy to debug. 

- Most startups begin as: `Monolith`

**Problem With Monolith**

- As a monolithic application grows, all modules such as authentication, products, orders, payments, and notificatioons become part of a single deployment unit. This means that even a small change in one module often requires rebuilding, testing, and redeploying the entire application. As a result, deployments become slower and riskier because changes in one area may unintentionally impact other parts of the system. 

- Another challenge is scalability. Different modules within an application may experience different levels of traffic. 

    For example, a payment service might receive significantly more requests than a notification service. 

    In a monolithic architecture, individual modules cannot typically be scaled independently. To handle increased load on a single feature, the entire application must be scaled, which can lead to inefficient resource utilization and higher infrastructure costs. 

- As the codebase continues to grow, development and maintenance also become more difficult. 

    Multiple teams working on the same application may encounter code conflicts, longer testing cycles, and increased complexity, making it harder to introduce new features and maintain system stability. 

1. Suppose: Notification Module - has a bug. 

Need to deploy fix. 

Question - What gets deployed? -> Entire application. 

Even if: Products, Orders, Payments - were unchanged. 

2. Suppose: Payment Module - receives heavy traffic. 

Can we scale only: Payment Module? No. 

Must scale - entire application. Wastes resources. 

### Microservices 

- Microservices architecture is a design approach in which an application is divided into mulitple independent services. Eacah service is responsible for a specific business capability and can be developed, deployed, scaled, and maintained independently. 

- Microservices architecture improves scalability, maintainability, and team autonomy by decomponsing a large application into smaller independent services. 

    Each service own its businss logic and communicates with other services through APIs or messaging systems. 

    This allows teams to deploy and scale services independently while reducing the impact of changes on the overall system. 

- Now imagine: Authentication Service 
             Product Service 
             Order Service 
             Payment Service 
             Notification Service 

- Each service: Own Codebase. Own Deployment. Own Responsibility. 

- Example: 

    Auth Service -> Runs on Port 3001 
    Product Service -> Runs on Port 3002 
    Order Service -> Runs on Port 3003 

- Service communicate through: REST APIs, RabbitMQ, Kafka, gRPC

    This is: Microservices Architecture 

**Why Were Microservices Created?**

As applications become larger: More Developers, More Features, More Traffic 

    Managing one giant codebase becomes difficult. 

    Microservices solve this by: breaking large applications into smaller services. 

    Each service focuses on one business capability. 

**Monolith vs Microservices**

| Monolith                          | Microservices                |
| --------------------------------- | ---------------------------- |
| Single Codebase                   | Multiple Codebases           |
| Single Deployment                 | Independent Deployments      |
| Easier Initially                  | More Complex Initially       |
| Direct Function Calls             | Network Communication        |
| Harder To Scale Specific Features | Scale Services Independently |
| Easier For Small Teams            | Better For Large Teams       |


**Which one should you choose?**

Monolithic architecture is generally preferred for startups and small to medium-sized applications because it is simpler to develop and maintain. 

    Microservices become beneficial when applications grow significantly in size, require independent scaling, involve multiple development teams, or need greater deployment flexibility. 


## API Gateway 

- An API Gateway is a centralized entry point that sits between clients and backend services. It receives incoming requests, routes them to the appropriate microservice, and returns the response to the client. 

- In a microservices architecture, applications often consist of multiple independent services. Exposing every service directly to clients increases complexity, security concerns, and maintenance overhead. 

    An API Gateway addresses this by acting as a single entry point for all client requests. 

- The gateway receives incoming requests, performs cross-cutting concerns such as authentication, authorization, rate limiting, logging, and request validation, and then forwards the request to the appropriate service. 

    This simplifies client interactions and centralizes common functionality, allowing backend services to focus on business logic. 

- Now, we understand: Auth Service
                    Product Service 
                    Order Service 
                    Payment Service

    the next question is: How does the frontend know which microservice to call? 

    and that leads directly to: API Gateway
                                Service-to-Service Communication 

- Suppose we have a microservices architecture: 

        Auth Service
        Product Service 
        Order Service 
        Payment Service 
        Notification Service 

    Now imagine the frontend needs: 

        Login 
        Get Products
        Create Order
        Make Payment 

    Without an API Gateway, the frontend must know: 

        Auth Service URL
        Product Service URL 
        Order Service URL 
        Payment Service URL 

    This creates a problem because the frontend becomes tightly coupled to all backend services. If a service URL changes, the frontend also needs to be updated. 

    To solve this problem, an API Gateway is introduced. 

**Why is API Gateway Important?**

Without an API Gateway, clients must communicate with multiple services directly, increasing coupling and complexity. 

    An API Gateway provides a unified interface for clients, hides internal service details, improves security, centralizes common concerns, and simplifies system evolution. 

**Real World Example**

Suppose the frontend calls: `GET /products`. 

The API Gateway receives the request and forwards it to: `Product Service`. 

Similarly: `POST /login` may be routed to: `Auth Service`

The frontend only communicates with the gateway and remains unaware of the underlying microservice architecture. 

**Common Responsibilities of API Gateway**

An API Gateway commonly handles: 

- Authentication 
- Authorization 
- Rate Limiting 
- Request Routing 
- Logging 
- Response Aggregation 
- SSL Termination 

## API Gateway Is Not A Design Pattern 

In production it is usually: 

- A separate server
- A reverse proxy
- A cloud service 

    that sits in front of all microservices. 

**Without API Gateway**

Suppose: 

`Auth Service -> auth.company.com`
`Product Service -> product.company.com`
`Order Service -> order.company.com`

    Frontend must know: Auth URL, Product URL, Order URL - and call each separately. 

Now imagine: Auth URL changed, Frontend breaks. 

**With API Gateway**

Frontend only knows: `api.company.com`

Requests: 

    ```js
    api.company.com/auth/login
    api.company.com/products
    api.company.com/orders
    ```

    Gateway receives request. Decides: 

    ```js
    /auth -> Auth Service 
    /products -> Product Service 
    /orders -> Order Service 
    ```

    Then forwards request. 

## Service-to-Service Communication 

Suppose: `Order Service` creates a new order. After creating the order: `Payment Service` needs to process payment. 

    The question becomes: How does one service communicate with another service? 

    This is called service-to-service communication. 

**Types of Service Communication**

1. Synchronous Communication 
2. Asynchronous Communication 

### Synchronous Communication 

- Synchronous communication is a request-response interaction where one service directly calls another service and waits for a response before continuing execution. 

- One service directly calls another service and waits for response. 

- Example: `Order Service` calls - `Payment Service` and waits.

- In synchronous communication, services interact through direct API calls using protocols such as HTTP, REST, or gRPC. The calling service remains blocked until it receives a response from the target service. This approach is simple to implement and easy to understand but can create tighter coupling and dependency between services. 

**Drawbacks of Synchronous Communication**

Suppose: `Payment Service` is down. Then: `Order Service` may also fail. This creates dependency chain. 

### Asynchronous Communication 

- Asynchronous communication is a messaging-based interaction where services exchange information through queues, message brokers, or event streams - without waiting for an immediate response. 

- In asynchronous communication, services communicate through intermediaries such as `RabbitMQ`, `Kafka`, or `Redis Pub/Sub`. 

    Instead it directly invoking another service, a service publishes an event or message. Interested services consume and process the message independently. 

    This reduces coupling, improves resilience, and allows systems to scale more effectively. 

- Instead of calling another service directly, a service publishes an event. 

    Other services consume the event when available. 

- Example: Order created. `Order service` publishes - `Order created` event. 

    Services listening to that event: Payment service, Notification service, Analytics service - can react independently. 

### Synchronous vs Asynchronous Communication 

| Synchronous         | Asynchronous        |
| ------------------- | ------------------- |
| Direct Service Call | Message/Event Based |
| Waits For Response  | Does Not Wait       |
| Simpler             | More Scalable       |
| Tighter Coupling    | Looser Coupling     |
| Immediate Result    | Eventual Processing |

**How Do Microservices Communicate With Each Other?**

Microservices typically communicate using either synchronous or asynchronous mechanisms. 

    Synchronous communication usually invovles direct HTTP or gRPC calls between services, while asynchronous communication uses messages brokers such as RabbitMQ, Kafka, or Redis Pub/Sub to exchange events and messages without requiring immediate response. 


## Logging  

- Imagine production issue. Customer says: Order creation failed. 

    Question - How do you know: Which user? Which API? What payload? What error? 

    Without logs: No visibility 

- Logs are basically: `Application diary` - every important event gets recorded

- Logging is the process of recording application events, requets, errors, warnings, and system activities to provide visibility into application behaviour and assist with debugging, monitoring and auditing. 

- Used by developers to understand: Errors, Exceptions, API Failures, Performance Issues, CPU Usage, Memory Usage. 

- Examples - Sentry, Datadog, New Relic 

- Logging is an essnetial practice in backend systems that involve capturing important information about application execution. 

    Logs help developers understand how a system behaves in production, diagnose issues, trace user requests, monitor business events, and investigate failures. 

    Effective logging improves observability by providing a historical record of application activity by enabling and faster troubleshooting when problems occur. 

**Why Is Logging Important?**

Logging is important because production environments cannot be debugged using traditional techniques such as console inspection. 

    Logs provide visibility into application behaviour, making it possible to identify errors, trace request flows, analyze failures, and understand system usage patterns. 

**Difference between Console.log and Logging?**

Console.log is primarilu used for local development and debugging, whereas production logging involves structured, searchable, and persistent records that can be aggregated, monitored and analyzed across environments. 

## Monitoring 

Monitoring and Logging are two different things. 

- Monitoring is the continuous observation of application and infrastructure health through metrics, alerts, dashboards, and performance indicators. 

- While logging records individual events, monitoring focuses on measuring the overall health and performance of a system. 

    Monitoring tools collect metrics such as response times, request rates, error rates, CPU utilization, memory usage, and service availability. 

    These metrics help teams identify performance degradation, detect outages, and proactively resolve issues before they affect users. 

**What is the difference between Logging and Monitoring?**

Logging focuses on recording detailed application events and errors, whereas monitoring focuses on collecting and analyzing system-level metrics and performance indicators. 

    Logs help explain what happened, while monitoring helps identify whether the system is healthy. 

- Example - Monitoring says: `Error rate increased`

    Then, we open logs to find: Database connection failed. 

    Monitoring finds the problem. Logging explains the problem. 

## Sentry 

- Sentry is an application monitoring and error tracking platform that automatically captures exceptions, crashes, stack traces, performance issues, and contextual debugging information from production environments.  

- Sentry helps developers detect, analyze, and resolve production issues by automatically collecting runtime errors and performance data. 

    When an exception occurs, Sentry captures detailed context such as stack traces, request information, user details, browser information, environment data, and timestamps. 

    This information is centralized within a dashboard, enabling faster debugging and reducing the time required to identify the root cause of production issues. 

- Imagine your application is deployed. A user reports: Checkout page crashed. 

    Question: How do we know - Which user got the error? Which page crashed? What line of code failed? What browser was being used? What request triggered the issue? 

    Without a monitoring tool: Very difficult. 

    Traditionally developers would:

    ```js
    try{
        ...
    }catch(err){
        console.log(err)
    }
    ```

    Problem: Console logs remain on server. 

    Developers may not even know an error occured. Sentry solves the problem. 

- Sentry can tell you: 

    ```js
    User: 123
    Page: /checkout 
    Browser: Chrome 
    File: Chekcout.js 
    Line: 84
    ```

    Now debugging becomes much easier. 

**Why Is Sentry Important?**

In production environments, developers cannot directly observe user interactions or inspect browser consoles. Sentry provides visibility into runtime failures by automatically collecting diagnostic information whenever errors occur. This enables teams to identify issues quickly, prioritize fixes, and improve application reliability. 

**How Is Sentry Different From Logging?**

Logging records application events and operational information, whereas Sentry focuses specifically on error tracking and performance monitoring. 

    While logs provide a broad record of system activity, Sentry automatically aggregates, categorizes, and analyzes exceptions with rich debugging context. 

**Real World Usage**

Suppose: `100 users` experience - `Payment error`

    Without Sentry: Users complain 

    With Sentry: Developers immediately receive - Alert, Stack Trace, Affected Users, and can begin investigating. 

## Winston and Pino 

- Winston is a popular Node.js logging library that provides configurable log levels, multiple output destinations, log formatting, and centralized logging capabilities. 

- Pino is a high-performance Node.js logging library designed for structured logging with minimal overhead and faster execution compared to traditional logging solutions. 

**Problem With `Console.log`**

`console.log("User logged in")` - This works locally. But production applications need: 

- Log levels
- Searchable logs 
- JSON output 
- Log files 
- Centralized storage 
- Performance 

    This is why logging libraries exist

**Practical Difference**

1. Winston/Pino

We decide what to log: 

```js
logger.info(...)
logger.error(...)
```

If we don't log it: Doesn't exist. 

2. Sentry 

Automatically captures: Unhandled exceptions, Runtime errors, Performance issues 

    Even if we forgot to log. 

**Difference between Winston, Pino and Sentry?**

Winston and Pino are logging libraries used to record application events, requests, and operational information. They help developers track system behaviour and troubleshoot issues through structured logs. 

Sentry, on the other hand, is an error monitoring platform that automatically captures exceptions, stack traces, performance issues, and debugging context. Logging libraries help record what happened, while Sentry helps identify why a failure occurred. 

## Product Analytics 

Used in business owners, product managers, and developers to understand: 

    How many visitors came? 
    Which pages are most visited?
    Where do users click?
    Where do users leave?
    Which feature is used most?
    Conversion rate?
    Bounce rate?

### Google Analytics 

- It's a web analytics platform that tracks user behaviour, traffic sources, page views, sessions, conversions, bounce rates, and other visitor metrics to help businesses understand how users interact with their websites. 

- Common metrics: Visitors, Sessions, Page views, Bounce rate, Traffic sources, Country, Device type, Conversion rate 

- We create account on `Google Analytics`. Google gives us a tracking ID and a JavaScript snippet. We add it to our website. Now whenever a user visits: Home page, products page, Checkout page 

    Google automatically receives events such as: Page views, Session start, Device information, Country, Traffic Source - and stores them in Google's servers. 

### Microsoft Clarity

- It is a behavioral analytics tool that provides heatmaps, session recordings, click tracking, and user interaction insights to help teams understand how users engage with a website. 

- It not only gives numbers. But actual user behaviour. We can see: 

1. Heatmaps - shows where users click most. 

2. Scroll Maps - shows how far users scroll 

3. Session Recordings - literally replay: User moved mouse, Clicked button, Scrolled page - like a screen recording 

## Validation (Joi/Zod)

- Validation is the process of verifying that incoming data conforms to predefined rules and constraints before it is processed by the application. 

We must verify:

- Required fields exist
- Data types are correct
- Values are valid 

    This process is called: Validation

**Why is Validation important?**

Applications receive data from external sources such as - users, browsers, mobile applications, and third-party systems. 

    Since incoming data cannot be trusted, it must be validated before being processed or stored. 

    Validation helps prevent invalida data, application errors, security vulnerabilities, and database inconsistencies while ensuring that business rules are enforced consistently. 

**Joi**

Joi is a schema-based validation library commonly used in Node.js applications to validate request payloads, query parameters, and application data against predefined validation rules.

We define rules. Examples: 

    Email -> required 
    Age -> number 
    Name -> Minimum 3 characters 

    Then Joi automatically checks incoming data. 

**Zod**

Zod is a TypeScript-first schema validation library that provides runtime validation along with static type inferene, enabling type-safe data validation. '

- Zod became popular because of TypeScript. 

    With Zod: One schema gives - Validation + Type Inference. Less duplication. 

**Why do we need backend validation if frontend alredy validates?**

Frontend validation improves user experience, but it cannot be trusted for security purposes because users can bypass frontend checks and directly send requests to backend APIs. 

    Therefore, backend application is required to ensure data integrity, security, and correctness regardless of the client implementation. 

- Validation is a critical backend responsibility that ensures only well-formed and expected data enters the application. 

    Libraries such as Joi and Zod allow developers to define schemas that describe the expected structure, types, and constraints of incoming data. 

    By validating requests before processing them, applications can prevent invalid inputs, reduce runtime errors, enforce business rules, and improve overall reliability. 

    While Joi is a mature and feature-in validation library, Zod has gained popularity in TypeScript ecosystems because it combines runtime validation with compile-time type safety. 

## API Versioning 