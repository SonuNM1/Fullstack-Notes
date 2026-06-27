## Redis 

Redis is an in-memory key-value data store commonly used for caching, session management, rate limiting, pub/sub messaging, and real-time applications. 

    Database (MongoDB) -> Permanent Storage 

    Redis -> Super fast temporary storage 

**Why Redis Exists?**

Suppose: `GET /products` hits database. Database query: `200ms`

1000 users: 1000 DB Queries. Database becomes bottleneck. 

- In modern applications, many requests repeatedly fetch the same data from the database. 

    Even though databases such as MongoDB are optimized for storage and querying, repeatedly executing the same queries can increase database load and impact performance. 

    Redis solves this problem by acting as a high-speed intermediary layer between the application and the database. 

    Instead of querying MongoDB for every request, the application can first check Redis. If the required data is arleady present in Redis, it can be returned immediately without touching the database. 

    This significantly reduces response time and decreases the laod on the primary database. 

**Redis Solution**

- First request: Redis -> Not Found

- Then: MongoDB -> Get Products 

- Store in Redis: products 

- Second Request: Redis -> Found 

    Return immediately. No database hit. 

**Why is Redis Fast?**

Because: 

- MongoDB -> Disk based 

- Redis -> Memory based (RAM)

    Accessing RAM is extremely fast compared to disk. 


1. **Redis for Caching:**

    Caching is the most common use case of Redis. In a typical application, some data is requested frequently but changes infrequently. 

    Examples - product listings, user profiles, category data, configuration settings, and homepage content.

    Wihout caching, every request would require a database query, increasing latency and database load. Redis stores this frequently accessed data in memory, allowing future requests to retrieve the data much faster. 

    This improves application performance and scalability while reducing the number of database queries. 

    Without Redis: Request -> Database -> Response, every time 

    With Redis: Request -> Redis -> Found? -> Return
                Else -> Database -> Store in Redis -> Return 

2. **Redis for Session Storage** 

In distributed systems where multiple application servers are running, storing sessions in server memory becomes problematic because a user's request may reach different servers. If the session exists only on one server, other servers cannot access it.

    Redis provides a cetralized session store that can be accessed by all application instances. This ensures that user sessions remain consistent regardless of which server processes the request.

    Instead of session in memory, store: session in Redis.
    Useful for multiple servers. 

- Why use Redis for session storage instead of server memory? 

    Redis allows multiple application servers to acccess the same session data, making it suitable for distributeed and scalable systems where requests may be handled by different servers. 

3. **Redis for Rate limiting** - 

Rate limiting is a mechanism used to restrict how many requests a user can make within a specific time period. This helps protect applications from abuse, brute-force attacks, and excessive traffic. 

Redis is commonly used for rate limiting because it provides atomic counters and expiration features. The application can maintain a request counter for each user or IP address and automatically reset the counter after a specified duration. 
    
- Why not use MongoDB? 

    MongoDB can also store request counts, but rate limiting requires extremely frequent reads and writes. Performing these operations on the primary database increases load unnecessarily. 

    Redis is optimized for such high-frequency operations and provides much better performance. 

- Why is Redis preferred for rate limiting? 

    Redis provides fast atomic operations and key expiration support, making it highly efficient for tracking request counts and enforcing rate limits without adding significant load to the primary database.  

- Example: 5 requests per minute.

    Redis stores: IP Address request count. Request 6 - Blocked. 

4. **Redis for OTP Storage** 

OTPs are temporary pieces of data that are valid only for a short duration. Redis is ideal for this use case because it supports automatic key expiration. 

When an OTP is stored in Redis, an expiration time can be configured. Once the specified time period expires, Redis automatically removes the OTP without requiring manual cleanup logic.

    Instead of MongoDB, store OTP for 5 minutes. Store it in Redis: Set OTP and expire in 300 seconds. Automatically deleted

-  Why is Redis preferred for OTP storage? 

    Redis supports automatic expiration of keys, making it ideal for temporary data such as OTPs, verification codes, and password reset tokens. 

5. **Redis Pub/Sub** 

Redis Pub/Sub is a messaging pattern where publishers send messages to channels and subscribers receive messages from those channels in real time. 

Pub/Sub stands for Publish/Subscribe. In this model, a publisher sends messages to a channel without knowing which systems are listening. Subscribers listen to specific channels and automatically receive any messages published to them. 

This pattern is commonly used in real-time systems such as chat applications, notification systems, live dashboards, and event-driven architectures. 

- Example: When a user sends a chat message, one server may publish the message to a Redis channel. Other servers subscribed to that channel instantly receive the message and forward it to connected users. 

- What is Redis Pub/Sub? 

    Redis Pub/Sub is a messaging mechannism that allows applications to communicate in real time through channels. Publishers sends messages to channels, and all subscribers listening to those channels receive the messages instantly. 

    Used in: Chat Apps, Notifications, Real-time systems

    Publisher: Send Message
    Subsribers: Receive Message 

**Redis vs MongoDB**

| Redis          | MongoDB           |
| -------------- | ----------------- |
| In Memory      | Disk Based        |
| Extremely Fast | Slower            |
| Temporary Data | Permanent Data    |
| Cache          | Primary Database  |
| Session        | Long-Term Storage |

**What is Caching?**

Caching is the process of storing frequently accessed data in a fast storage layer such as Redis to reduce database load and improve response time.

## If Redis is faster, why not use Redis only? 

Redis = Faster
MongoDB = Slower

Then why use MongoDB at all? Because Redis and MongoDB solve different problems. 

- MongoDB is designed for: Permanent Storage, Durability, Data Safety, Complex queries, Relationships between data 

    If server crashes: MongoDB -> Data still exists 

- Redis is designed for: Speed, Temporary data, Caching, Counters, Sessions 

    Redis stores data in RAM. RAM is fast but volatile. 

    Meaning - Power off, memory cleared. 

**Why not use Redis as primary database?**

Redis is optimized for speed and temporary data storage, whereas databases such as MongoDB are optimized for durability, persistence and complex querying. Redis is commonly used alongside a database rather than replacing it. 


## Stale Data 

Stale data refers to cached data that no longer matches the latest version stored in the primary database. 

- Suppose: MongoDB 

```js
{
    "name":"Sonu"
}
```

Redis Cache: 

```js
{
    "name": "Sonu"
}
```

Now update MongoDB: 

```js
{
    "name":"Sonu N Mahto"
}
```

But Redis still has: 

```js
{
    "name":"Sonu"
}
```

Now: MongoDB != Redis. Redis data is outdated. This is called: **Stale data**

**How Do We Solve Stale Data?**

- Solution 1: TTL (Time To Live)

    Example - Cache for 5 Minutes 

    After 5 minutes, Redis automatically removes it. Next request: 

        Cache Miss -> MongoDB -> Fresh Data 

- Solution 2: Cache Invalidation

    Most common production approach. User updates profile. 

    After MongoDB update: 

        ```js
        await User.updateOne(...)

        await redis.del(
            "user:123"
        )
        ```

        Delete cache. Next request: 

            Redis Miss -> MongoDB -> Fresh cache created. This is called: **Cache Invalidation**

**How do you handle stale data in Redis?**

Stale data can be handled using cache expiration (TTL) or cache invalidation strategies. When underlying data changes, the corresponding cache entry is removed or updated to ensure consistency between Redis and the database. 

**First user still hits MongoDB right?**

Yes. Absolutely. This is called: Cache Miss

- Flow: 

    Request #1 -> Redis Miss -> MongoDB -> Store in Redis -> Response 

    Then: 

        Request #2 -> Redis Hit -> Response 

**Does first user suffer?**

Technically: Yes. MongoDB: `200ms`. Redis: `5ms`. First user waits. 

The solution is - Cache Warming. 

    Even before the user arrives: Application starts. Load popular data - Products, Categories, Homepage Data. 

    Store directly in Redis. 

    Now: First user also gets - Redis Hit 

    This is called: Cache Warming. 

- Cache warming is the process of preloading frequently accessed data into the cache before user requests arrive, reducing cache misses and improving initial response times. 

## Cache Invalidation 

Cache invalidation is the process of ensuring that cached data remains consistent with the latest data stored in the primary database. Whenever the underlying data changes, the corresponding cache entry must be updated or removed so that users do not receive outdated information. 

- When Redis is used as a cache, it stores a copy of data that originally exists in the database. The challenge arises when the data in the database changes but the cached copy remains unchanged. In such cases, Redis may continue serving old data even though the database contains the latest information. This problem is known as - **Stale data**

    To solve this issue, applications implement cache invalidation strategies. The most common approach is to remove the cached data immediately after updating the database. The next time a user requests that information, the application fetches the latest version from the database and stores it baack in Redis. This ensures that users always receive up-to-date information while still benefiting from caching. 


## Redis Pub/Sub Vs. WebSocket 

**Redis Pub/Sub**

Redis Pub/Sub is a messaging mechanism that enables real-time communication between different servers, services, or application instances. It follows the publish-subsribe pattern, where publishers send messages to channels and subscribers receive those messages instantly. 

- In distributed applications, multiple servers may be running simultaneously. These servers often need to share information with one another in real time. Redis Pub/Sub provides a lightweight communication mechanism for this puurpose. When one server publishes a message to a channel, Redis immediately forwards that message to all servers subsribed to the same channel. This allows different parts of the system to stay synchronized without directly communicating with each other. 

    Redis Pub/Sub is commonly used in chat applications, notification systems, event-driven architecture, and microservices where multiple services need to react to events as soon as they occur. 

**Difference Between Redis Pub/Sub and WebSocket**

- WebSocket and Redis Pub/Sub solve different problems and operate at different layers of an application. WebSocket is used for real-time commnication between a client and a server, whereas Redis Pub/Sub is used for real-time communication between servers or services. 

- `WebSocket` establishes a persistent connection between a browser or client application and a server. This allows data to be exchanged in both directions without repeatedly creating new HTTP requests. It's primarily used to deliver real-time upates such as chat messages, notifications, live scores, and collaborative editing features directly to users. 

- `Redis Pub/Sub`, on the other hand, does not communicate with end users. Instead, it enables communication between backend servers. In large-scale applications where multiple server instances are running, one server may need to notify other servers about an event. Redis Pub/Sub acts as the communication layer that distributes these events across the system. 

- In practice, both technologies are often used together. `Redis Pub/Sub` messages between servers, while `WebSockets` deliver those messages froom the server to connected users. 

WebSocket provides: Client <-> Server communication

- Example: User A <-> Server <-> User B

    It's a communication channel. 

Redis Pub/Sub provides: Server <-> Server communication. 

- Not: Client <-> Server

- WebSocket: Server <-> Browser
  Redis Pub/Sub: Server <-> Server

- WebSocket enables real-time communication between clients and servers, whereas Redis Pub/Sub enables real-time communication between servers and services. 

    In distributed systems, Redis Pub/Sub is often used alongside WebSockets to propagate events across multiple application instances. 

## Node.js Redis 

An in-memory data store used for caching, queues, sessions, and pub/sub. 

**Why Redis is fast?**

- Stores data in RAM
- Simple data structures 
- Single-threaded but extremely optimized 

**When Redis is used**

- API caching
- Rate limiting 
- Session storage
- Message queues 
- Pub/Sub 

**Why TTL is important**

- Without TTL: Stale data, Memory leak
- With TTL: Auto-expiry, Fresh data


## Redis Vs. Memcached 

`Memcached` is a simple key-value cache, `Redis` is a full in-memory data store with advanced data structures. 

**Memcached**

- Pure key -> value 
- Data stored only as strings 
- No persistence 
- No data structure

- Use cases: Simple page caching, Session caching (basic)

**Redis**

- In-memory data structure store 
- Supports: Strings, Lists, Sets, Hashes, Sorted sets, Streams

- Use cases: Caching, Rate limiting, Queues, Sessions, Pub/Sub

**What is Cache hit and a Cache miss?**

- Cache Hit: When requested data is found in cache (Redis)

    `Client -> Redis -> Data Found -> Response`

    Very fast, No DB call, Low latency 

    A cache hit occurs when the requested data is available in cache, so the database is not queried. 

- Cache Miss: When requested data is not found in cache. 

    `Client -> Redis (not found) -> MongoDB -> Redis updated -> Response`

    A cache miss happens when data is not present in cache and must be fetched from the database. 

## Cache Invalidation Strategies 

Cache invalidation is the process of keeping cached data consistent with database when the original data changes. 

**Why is cache invalidation a problem?**

- The root issue: Cache is a copy of data. 

    When DB changes: DB updated. Cache still has old data. 

    Now our app serves stale data. 

- Example: 

    User updates the profile name, MongoDB -> Rahul, Redis Cache -> Rohit 

    Next request: API hits Redis, Returns old name 

**How this problem arises**

1. First request -> data fetched from DB 
2. Data stored in Redis
3. DB record is updated later
4. Cache is not updated 
5. Users see outdated data 

    That gap is the cache invalidation problem. 

**How Redis solves cache invalidation**

1. Strategy 1: TTL

`redis.setEx("user:1", 60, JSON.stringify(user));`

- How it helps: Cache auto-expires, Eventually fetches fresh DB data

2. Explicit deletion 


**Cache invalidation using RabbitMQ**

- Problems in distributed systems - You have: Service A, Service B, Service C 

    All use Redis. 

- When DB updates: All caches must be cleared. 

1. DB updated 
2. Event published: `USER_UPDATED`
3. All services consume event 
4. Each service invalidates cache 

    `redis.del(user)`


**Why do we delete cache after DB update?**

```js
await User.findByIdAndUpdate(id, data) ; 
await redis.del(`user:${id}`);
```

1. User updates profile 
2. MongoDB gets updated
3. Old data still exists in Redis
4. We delete the cache manually 
5. Next request comes
6. Redis has no data -> cache miss
7. Fresh data fetched from DB 
8. Cache rebuilt with updated data 

- This guarantees fresh data, prevents stale responses, Common in real systems

- After updating the database, we delete the cache so the next read fetches fresh data and rebuilds the cache. 

## Cache Invalidation Strategies 

1. **Cache Aside Pattern**

Update flow: Update MongoDB -> Delete Redis Cache 

```js
await Product.updateOne(...) ; 

await redis.del(
    `product:${id}`
)
```

Next Request: Redis Miss -> MongoDB -> Fresh Data -> Store in Redis 

- The Cache Aside Pattern is the most commonly used caching strategy. When data is updated in the database, the corresponding cache entry is removed. The next request retrieves fresh data from the database and repopulates the cache. This approach ensures cache consistency while keeping implementation simple. 

2. **TTL (Time To Live)**

```js
redis.set(key, value, "EX", 300); 
```

Meaning: Expire after 5 minutes 

- Even if nobody invalidates cache: Old Cache -> Auto deleted after 5 minutes 

- TTL-based caching automatically removes cache entries after a specified duration. It is simple to implement but may temporarily serve stale data until the expiration period ends. 

3. **Write Through Cache**

- Instead of update MongoDB only, application does: Update MongoDB + Update Redis, at the same time. 

- In the Write Through strategy, every database update is immediately written to the cache as well. This keeps the cache synchronized with the database and minimizes stale data issues. 

- Problem: More writes. Every update hits: MongoDB + Redis

4. **Event Driven Cache Invalidation**

This is where RabbitMQ and Pub/Sub come in. 

- Imagine: User service, Product service, Order service, Inventory service. 

    Product updated. How do all services know? 

    One service publishes: Product updated event 

    RabbitMQ: Distributes event 

    Subscribers receive: Product updated 

    Each service: Delete related Cache 

- In event-driven architectures, servives publish cache invalidation events whenever data changes. Other services subscribe to these events and invalidate their local cache accordingly. This approach is commonly used in microservices environments. 

**RabbitMQ Cache Invalidation**

- Let's say: Product Service updates - iPhone Price. 

- After update - publish event 

- RabbitMQ: product.updated 

- Inventory Service: Receives event, deletes cache 

- Search Service: Receives event, Deletes cache 

- Recommendation Service: Receives event, Deletes cache 

    Everything becomes consistent. 

- Why RabbitMQ? Because services dont need to know about each other. They only know: Event happened. 

5. **Redis Pub/Sub**

Similar to RabbitMQ Cache Invalidation strategy. Service updates: Product. 

- Publishes: product.updated 

- Other services subscribe. Receive notification

- Invalidate cache 

- Difference from RabbitMQ 

    RabbitMQ - Message Queue. Messages survive temporarily. Reliable delivery. Acknowledgements. Retries 

    Redis Pub/Sub - Fire and forget. Real-time. If subscriber is offline: Message lost. 

- RabbitMQ is a durable message broker designed for reliable message delivery, retries, and acknowledgements. Redis Pub/Sub is a lightweight real-time messaging mechanism where messages are immediately delivered to active subscribers but are not persisted if a subscriber is unavailable. 
