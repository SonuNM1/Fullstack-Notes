
- Redis: Remote Dictionary Service 

- An in-memory data store: stores data in RAM (not disk), fast 

- In-memory: Data is stored inside RAM, not on disk. But RAM is temporary -> If Redis restarts, the cached data disappears (unless persistence is enabled)

- Used as: cache, message queue, pub/sub system, rate limiter, session store, job queue store

- not a database replacement 

- Redis is used where speed is everything 

- stores data in JSON key-value form (MongoDB stores in document form, MySQL in tables)

- Cache HIT / Cache MISS


## Why companies use Redis 

1. Caching 

    - Reduce database load: save expensive DB results in Redis, Next request is served instantly 

2. Session store

    - Instead of storing web sessions in MongoDB or on your server, Redis stores it: fast, scalable and shared across multiple backend servers 

3. Rate Limiting 

    - API limits like: Max 100 requests per miinute, Block after 5 wrong login attempts 

    Redis counters make this easy 

4. Queue/Job Processing 

    Using libraries like: Bull/BullMQ (Node.js), Celery (Python), Sidekiq (Ruby)

    Typical background jobs: Sending mails, Image processing, Payment processing, Video compression, Notifications

    Redis stores the job list 

5. Pub/Sub

    - Used for real-time chat, Push notifications, Live analytics dashboard 

6. Stampede Protection, Redis lock


## Where Redis fits in a real company system 


- Redis works as a helper system for: Caching user data, Storing login sessions, Holding rate-limit counters, Fast search results cache, Queues for emails/notifications 


## As a full-stack dev with ~2 years experience, you MUST know these concepts 

1. Caching: cache, TTL, cache invalidation, write-through vs read-through caching, when to use caching 

2. Session Store: When using JWT, you may not need Redis for sessions. 

    But for login sessions or cookies - Redis is ideal. 

3. Rate Limiting 

    Using Redis increment counters

4. Message Queue/Job Queue 

    Every big company uses job queues. 

5. Eviction Policies: when redis runs out of RAM. 


## What you SHOULD be learning next


1. Redis basics: Setting/getting keys, TTL, Storing objects, Deleting keys

2. Caching patterns: Read-through, Write-through, Write-behind

3. Using Redis with Node.js: ioredis, node-redis 

4. Redis for session management: express-session + RedisStore 

5. Rate limiting: Using Redis counters

6. Job Queues (BullMQ)


### Commands 

- Key-value basics: SET key value, GET key, DEL key 

- Expire / Cache: EXPIRE key seconds, TTL key 

- Hash (Common for sessions, user objects)

    HSET user:123 name "sonu"
    HGET user:123 name
    HGETALL user:123

- List / Queue (for jobs, messages)

    LPUSH queue value
    RPUSH queue value 
    LPOP queue 
    RPOP queue 

- Check Keys

    KEYS * 
    FLUSHALL 


**What YOU must know:**

- Why Redis is used 
- Basic commands (GET, SET, EXPIRE, HSET)
- How to connect to Redis in Node.js

- How to use Redis for: caching, sessions, rate limiting, queues 


**System Design best practices to FOLLOW**

1. Always Use a TTL: Cache must expire or risk stale data 

    Recommended: User data (5 min) ; Posts/Articles (1 hr) ; Product List (10 min) ; Config/metadata (24 hrs)

2. Always Store JSON Strings 

    Redis only stores strings -> You must use JSON.stringify and JSON.parse

3. Cache Only What Helps 

    API responses, DB queries, Aggregations, Count queries, Analytics, Repeated pages 

    Don't Cache: Highly dynamic fields, Data that changes every few seconds (Stock quotes/cryptocurrency prices, Presence/Online status that changes frequently, Live game data in multiplayer games - player positions, scores, User wallet balance, Live match score, live chat messages, Notifications unread count, order delivery tracking)


## When Should you use Cache? 

- Use Redis caching only for data that: 

    Is expensive to fetch, Doesn't change frequently, Is requested many times 


## Examples of Good Cached Data 

- list of posts
- product list 
- categories
- user profiles
- search suggestions 
- analytics 
- most viewed products 

TTL: 1 min to 10 minutes to 1 hour depending on need. 


## Redis Persistence 

Redis normally stores data in RAM (memory). RAM is temporary, so: 

    - If Redis container stops 
    - If Redis restarts
    - If the system reboots 

All cached data is lost. Unless persistence is enabled. 

Persistence = Redis saving data to disk not just RAM. 

Redis has 2 persistence mechanisms: 

1. RDB (Redis Database Backup) - Snapshotting 

    This creates a .rdb file every X seconds. 

2. AOF (Append Only File) - Real-time logging 

    Every write command gets appended to a log file. (.aof extension file)

    More durable. Slower than RDB because it records everything. Best for production 

- Enable Persistence for Redis Stack (Docker): Redis Stack uses a config automatically, but does NOT persist unless you mount a volume. 