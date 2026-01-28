MongoDB is open-source, document-oriented NoSQL database. 

- Unlike relational databases that rely on rigid tables, MonogoDB stores data in a flexible BSON format (similar to JSON), enabling faster and more efficient storage and retrieval. 


**SQL Databases** 

- SQL databases store data in structured tables with fixed schemas and support relations between data.

- Limitations: Not horizontally scalable; single-server deployments hit scaliing limits 

    Vertical scaling (bigger machine)

- Example: MySQL, PostgreSQL, Oracle 

**NoSQL Databases**

- NoSQL databases store data in flexible formats and are designed for high scalability and unstructured data. 

- More scalable and higher performing for big data workloads. 

- Horizontal scaling (add more servers)

- Example: MongoDB, Redis, Cassandra 


## Document and Collection 

**Document**

- A document is the basic unit of data in MongoDB. 

- It is a JSON-like object (stored as BSON internally)

- Each document can have different fields and nested structures. 

- Example: 

```mongodb
{
  _id: ObjectId("64fe1234567890abcdef1234"),
  name: "John Doe",
  age: 30,
  skills: ["JavaScript", "MongoDB"]
}
```

- A document is like one row, but written as JSON. 

- Flexible structure, Nested data allowed, Fields can vary per document 

**Collection**

- A collection is a group of documents in MongoDB 

- It is similar to a table in relational databases, but schema-less 

- All documents in a collection are stored together. 

- A `users` collection may contain multiple documents. 

## How does MongoDB store data internally? 

- MongoDB does not store plain JSON. Internally, MongoDB stores data as BSON. 

- `BSON`: faster to read/write, Supports more data types, Efficient indexing 

- Example BSON features: Dates, Binary data, Integers, Object IDs 

- MongoDB stores 

## MongoDB Aggregation Pipeline 

- Aggregation: processing data step by step to get a result. 

    Data passes through stages -> each stage modifies it. 

- Aggregation pipeline processes documents through multiple stages like filtering, grouping, and sorting. 

**Most common stages**

- `$match`

    Filter documents (just like `WHERE` in SQL)

- `$group`

    Just like `GROUP BY` in SQL. Groups documents.

- `$project`

    Choose fields / rename. Just like `SELECT` in SQL. 

- `$sort`

    `ORDER BY` in SQL. 

- `$limit`


## BSON and its Significance 

- BSON = Binary JSON 

- MongoDB doesn't store JSON directly. 

- Why BSON is important? 

    Faster read/write. Supports more data types than JSON. Efficient indexing. 

- Example BSON types: Date, Binary, ObjectId, Integer / Long 


## NeonDB 

NeonDB is a modern serverless PostgreSQL database. 
;
- Based on PostgreSQL 
- Serverless & cloud-native
- Auto-scaling 
- Used in modern web apps 

**Why it matters**

- No DB server management 
- Scales automatically
- Separate compute & storage 

## Data types supported in MongoDB 

| Type     | Example             |
| -------- | ------------------- |
| String   | `"Sonu"`            |
| Number   | `25`                |
| Boolean  | `true`              |
| Date     | `ISODate()`         |
| Array    | `["JS", "Node"]`    |
| Object   | `{ city: "Delhi" }` |
| ObjectId | `_id`               |
| Null     | `null`              |


## Create new database & collection in MongoDB 

- Create database: `use myDatabase`

- Create collection: `db.createCollection("users")` OR `db.users.insertOne({name: "Sonu NM"})`

- Insert: `db.users.insertOne({name:"A", age: 25})`

- Find: `db.users.find({age:{$gt: 20}})`

- Update: `db.users.updateOne({name: "A"},{$set: {age: 25}})`

- Delete: `db.users.deleteOne({name: "A"})`

## Sharding in MongoDB

MongoDB sharding distributes data across multiple servers (shards). 

- Data is distributed across multiple servers based on a shard key, and MongoDB automatically routes queries to the correct shard. 

- Used when: 

    Data is too big for one server. 

    Traffic is very high. 

- It allows horizontal scaling by splitting large datasets into smaller, more manageable pieces called `shards`.

    Each `shard` is a separate database that holds a portion of the data. 

    MongoDB automatically balances data and load across shards, ensuring efficient data distribution and high performance. 

**How MongoDB Sharding works**

1. Choose shard key 
2. MongoDB splits data 
3. Each shard stores part of data
4. Router (`mongos`) routes queries 

- MongoDB uses sharding to horizontally scale data across multiple nodes. 

**How developers actually do sharding**

1. Identify scaling bottleneck
2. Choose shard key 
3. Create sharded cluster
4. Enable sharding on database
5. Shard the collection'
6. Monitor and rebalance 

## Partitioning in MongoDB 


- MongoDB does not support traditional table-style partitioning like SQL. Instead, it relies on sharding and data modeling patterns to achieve the similar results.

- Instead, MongoDB uses: 

    Sharding (primary scaling mechanism)

    Indexes 

    Bucketing pattern 

1. **Logical Partitioning (application-level)**

- Example: 

    `orders_2024 orders_2025`

- Or field-based filtering: 

    `{createdYear: 2024}`

2. **Bucketing Pattern**

- Bucketing is a design pattern where related data is grouped into a single document to reduce the number of documents scanned. 

    Instead of storing each user action as a separate document, we store actions in buckets, like one document per user per day. 

- Group data: 

{
  userId: 1,
  orders: [
    { date: "...", amount: 100 },
    { date: "...", amount: 200 }
  ]
}


## Indexes in MongoDB 

- An `index` in MongoDB is a data structure that improves the speed of data retrieval operations on a collection. 

    We can create an index using the `createIndex` method. 

    `db.collection.createIndex({name:1})`

- Index improves query performance by avoiding full collection scans. 

Indexes in MongoDB work similarly to SQL indexes. They allow MongoDB to quickly locate documents without scanning the entire collection. 

- If a collection has millions of documents and we frequently query by email or userId, adding an index on that field drastically improves query performance. 

- Indexes reduce read latency but increase write cost, so we index only frequently queried fields. 

- Indexes speed up reads but slow down writes, so we index only frequently queried fields. 


## MongoDB Aggregation Framework 

Aggregation in MongoDB is used for data processing and analytics. It works as a pipeline where documents pass through multiple stages. 

- Basic structure: 

```
db.collection.aggregate([
    {stage1},
    {stage2},
    {stage3}
])
```

- Most important stages: `$match`, `$group`, `$project`, `$sort`, `$limit`


## Replica Sets 

A `replica set` is a group of MongoDB servers that maintain the same data for high availability. 

- MongoDB replica sets provide fault tolerance and high availability by maintaining multiple copies of data across nodes with automatic failover. 

## TTL Indexes 

- A TTL index automatically deletes documents after a specified time. 

    `TTL = Time to Live` 

- Create TTL index 

    db.sessions.createIndex(
        {createdAt: 1}, 
        {expireAfterSeconds: 3600}
    )

    Document auto-deletes after 1 hour 

- Use cases: Session cleanup, OTP expiry, Logs removal, Temporary data  


## Schema Design and Data Modeling 


**Schema design** and **data modeling** in MongoDB involve defining how data is organized and stored in a document-oriented database. 

- Unlike SQL databases, MongoDB offers flexible schema design.

- `Schema` design means deciding how data is structured inside documents and collections. 


**Embedding**

- `Embedding` = Keep everything together 

- Example: User + Orders (embedded)

{
  _id: 1,
  name: "Sonu",
  orders: [
    { orderId: 101, amount: 500 },
    { orderId: 102, amount: 700 }
  ]
}

- Orders are inside the user. One database read gives everything. 

- Use embedding when: Data is always used together, Limited number of related items 

- Embedding means storing related data insdie the same document for faster reads.

- Embedding optimizes reads. 

**Referencing**

- Store separately, connect by ID

- Example: User + Orders (referenced)

// users
{ _id: 1, name: "Sonu" }

// orders
{ orderId: 101, userId: 1, amount: 500 }

- What this means: User and orders are separate, You connect them using `userId`

- Use referencing when: Lots of related data, Data grows large 

- Referencing stores related data in different collections and links them using IDs. 

- Referencing optimizes scalability. 


## Transactions 

A transaction is a group of operations executed as a single unit. 

    Either all succeed or all fail. 

| Property    | Meaning            |
| ----------- | ------------------ |
| Atomicity   | All or nothing     |
| Consistency | Data remains valid |
| Isolation   | No interference    |
| Durability  | Data persists      |
 

## CRUD operations in MongoDB

- Create: `db.collection.insertOne({name:"Sonu", age:25})`

- Read: `db.collection.find({name:"Alice"})`

- Update: `db.collection.updateOne({name:"Sonu"}, {$set:{age:25}})`

- Delete: `db.collection.deleteOne({name: "Sonu"})`


## CRUD operations in SQL 

- CREATE: 

```sql
INSERT INTO users (name, email, age) 
VALUES ('Sonu', 'sonu@gmail.com', 25); 
```

- READ: 

```sql
SELECT * FROM users ; 

SELECT name, email FROM users WHERE age > 25 ; 
```

- UPDATE: 

```sql
UPDATE users 
SET age = 26
WHERE email = 'sonu@gmail.com'
```

- DELETE: 

```sql
DELETE FROM users WHERE age < 18 ; 
```


## Backup & Disaster Recovery in MongoDB 

1. MongoDB Atlas: Automated backups, Point-in-time recovery 

2. Replica sets: ensure high availability and disaster recovery 


## Optimize MongoDB Queries for Peformance 

1. Proper Indexing 

    `db.users.createIndex({email: 1})`

2. Use `explain()`

    `db.users.find({email: "sonu@gmail.com"}).explain("executionStats")`

3. Limit returned data 

    `db.users.find({}, {name: 1, email: 1})`

4. Avoid large documents 

- max size = 16MB
- Use referencing if data grows 

5. Use pagination 

    `db.users.find().limit(10).skip(20)`