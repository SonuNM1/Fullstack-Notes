## Primary Key 

A Primary Key is a column or combination of columns that uniquely identifies each row in a table. 

    Primary keys cannot contain duplicate values and cannot be NULL. 

**Why Is Primary Key Important?**

A primary key ensures that each record within a table can be uniquely identifies. 

It prevents duplicate records, maintains data integrity, and enables relationships between tables. 

Primary keys are fundamental to relational database design because they provide a reliable mechanism for uniquely referencing individual records. 

**Can a table have multiple primary keys?**

No. A table can have only one primary key, although that primary key may consist of multiple columns, which is known as a composite primary key. 

## SQL vs MySQL 

- SQL (Structured Query Language) is a standard language used to interact with relational databases. It is used to create tables, query data, update records, and manage database objects. 

    Just like `JavaScript`, SQL is also just a language. 

- MySQL is a Relational Database Management System (RDBMS) that uses SQL as its query language. 

**Other Relational Databases** MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database, SQLite, MariaDB

    All use SQL. 

## How Does MongoDB Handle Relationships? 

- Unlike relational databases, MongoDB does not enforce foreign key constraints. Relationships are typically modeled using document references or embedded documents. 

    Referencing stores related document identifiers, while embedding stores related data directly within the parent document. 

In MySQL: Users Table -> Foreign Key -> Orders Table 

    Relationships enforced by database. Database has Foreign key. 

MongoDB has no traditional Foreign keys. Instead it usually uses: 

1. Referencing 
2. Embedding 

### Referencing 

User Document: 

```js
{
    "_id":"1", 
    "name": "Sonu"
}
```

Order Document: 

```js
{
    "_id":"101", 
    "userId":"1"
}
```

Very similar to foreign keys. But MongoDB doesn't enforce it. 

### Embedding 

Instead of separate collections. 

```json
{
  "_id": "1",
  "name": "Sonu",
  "orders": [
    {
      "id": 101,
      "amount": 500
    }
  ]
}
```

Order data stored inside user document. 


## Foreign Key 

A foreign key is a column in one table that refrences the Primary key of another table. 

    It establishes relationships between tables and helps maintain refrential integrity within a relational database. 

**Why Do We Need Foregin Keys?**

Suppose an eCommerce application contains separate tables for users and orders. An order must always belong to a valid user. 

    Without a mechanism to enforce this relationship, invalid or orphaned records could be inserted into the database.

    Foreign keys solve this problem by ensuring that references between tables remain valid and consistent. 

- A Foreign Key is used to create a relationship between two tables by referencing the Primary Key of another table. 

    Its primary purpose is to maintain referential integrity ensuring that related records remain consistent. 

    For example - an orders table may contain a foreign key referencing the users table. This guarantees that every order is associated with a valid user and prevents the creation of records that reference non-existent entities. 

    Foreign keys therefore play a critical role in maintaining data accuracy and consistency within relational databases. 


## Referential Integrity 

Referential integrity is a database property that ensures relationships between tables remain valid and consistent by preventing references to non-existent records. 

- Referential integrity ensures that every foreign key value corresponds to an existing primary key value in the related table. 

    This prevents invalid relationships and maintains consistency across the database. 

    For example - if an order references a user, the database ensures that the referenced user actually exists. 

    By enforcing these rules, referencing integrity helps preserve data quality and prevents orphaned or inconsistent records. 

**Difference Between Primary Key and Foreign Key?**

A `Primary Key` uniquely identifies a record within its own table, whereas a `Foreign Key` establishes a relationship by referencing the Primary Key of another table. 

    Primary key ensures uniqueness within a table, while Foreign Keys maintain relationships and referential integrity across tables. 


## Joins 

A Join is a database operation used to combine rows from two or more tables based on a related column, typically a primary key and foreign key relationship. 

- Relational databases store data across multiple tables to reduce redundancy and improve data integrity. 

    However, business requirements often require information that is distributd across these tables.Joins allow related records to be combined and retrieved as a single result set by matching values between related columns. 

    They are fundamental to relational database systems because they enable efficient querying of interconnected data. 

### Types of Joins 

1. Inner Join
2. Left Join 
3. Right Join
4. Cross Join
5. Self Join 


## Indexes 

- An Index is a database data structure that improves query performance by allowing records to be located efficiently without scanning the entire table. 

- As database tables grow in size, searching for specific records can become increasingly expensive because the database may need to examine every row. 

    An index addresses this problem by creating a separate data strucutre that stores indexed column values in an optimized format. 

    This allows the database engine to locate matching records significantly faster, reducing query execution time and improving application performance. 

**Why Were Indexes Created?**

Suppose you have a book. You want to find: `Chapter: Redis`

Option 1 - Start from page 1. 
           Read: Page 1, Page 2, Page 3 ... Page 500, until Redis is found. 

           Slow. 

Option 2 - Open the index section at the back. 

            Redis -> Page 320. Directly jump there. Fast. 

            Database indexes solve the same problem. 

**The Database Problem**

Suppose Users table: 

| id | name  |
| -- | ----- |
| 1  | Sonu  |
| 2  | Rahul |
| 3  | Amit  |

With 3 records: No problem. 

Now imagine: 10 Million Users. 

Query: `SELECT * FROM users WHERE email = 'sonu@gmail.com'`

Without index - Database checks: 

    Row 1, Row 2, Row 3, .... Row 10,00,000

    This is called: Full Table Scan. Very expensive. 


- An Index stores references to table records in a sorted and optimized structure, commonly implemented using B-Trees. 

    When a query searches for indexed values, the database can navigate the index structure instead of scanning every row, significantly reducing the number of operations required to locate data. 

**Why Does Index Improve Performance?**

Indexes improve performance because they reduce the amount of data the database must examine during query execution. 

    Instead of performing a full table scan, the database can use the index to locate matching records directly. 

**Why Not Create Index On Every Column?**

More Index = More speed. Wrong

Index does improves: `Read performance`, but it hurts: `Write performance`. 

Suppose: `INSERT INTO users (...)`

Database must: Step 1 -> Insert row. Step 2 -> Update indexes 

     More indexes, more work, for every: Insert, Update, Delete. 

- While indexes improve read performance, they increase storage requirements and add overhead to write operations because index structures must be maintained whenever data changes. 

**What Are The Drawbacks Of Indexes?**

Indexes consume additional storage space and can slow insert, update, and delete operations because the database must maintain both the table data annd the associated index structures. 

    Therefore, indexes should be created strategically rather than on every column. 

**Which Columns Should Be Indexed?**

Indexes are typically created on: 

- Frequently searched columns 
- WHERE clause columns 
- JOIN columns 
- Foreign key columns 
- Sorting columns (ORDER BY)

- Indexes should be applied to columns that are frequently used in filtering, joining, sorting, or searching operations. 

    Proper indexing can significantly improve query performance, whereas excessive indexing may negatively impact write performance and storage utilization. 

**Create Index**

`CREATE INDEX idx_users_email ON users(email);`

- Create an index on the email column of the users table 

**Check Existing Indexes**

`SHOW INDEX FROM users;`

**DROP INDEX**

`DROP INDEX idx_users_email ON users;`


## Compound (Composite) Index 

- While single-column indexes improve performance for queries filtering on a single field, many real-world queries involve multiple conditions. 

    A composite index combines multiple columns into a single index structure, allowing the database to efficiently locate records that satisfy multiple criteria simultaneously. 

    Composite indexes often provide significantly better performance than multiple individual indexes when queries frequently use the same combination of columns. 

**Why Single Index Is Not Always Enough**

`SELECT * FROM users WHERE first_name='Sonu' AND city='Delhi'`

- A Composite index is an index created on multiple columns. It improves performance for queries that frequently filter, sort, or join using the same combination of columns. 

- Composite indexes reduce query execution time for multi-column searches by allowing the database to locate matching records through a single optimized index structure. 


## Normalization 

- Normalization is the process of organizing data within a relational database to reduce redundancy, eliminate data anomalies, and improve data integrity. 

- As database grow, storing repeated information across multiple records can lead to redundancy, inconsistency, and maintenance challenges. 

    Normalization addresses these issues by dividing data into logically related tables and establlishing relationships between them. 

    This reduces duplication, improves consistency, and ensures that information is stored in the most appropriate location. 

    The primary objective of normalization is to maintain data integrity while minimizing redundant storage. 

**Why Was Normalization Created?**

Suppose we have one table: 

| order_id | customer_name | customer_email                          | product_name | product_price |
| -------- | ------------- | --------------------------------------- | ------------ | ------------- |
| 101      | Sonu          | [sonu@gmail.com](mailto:sonu@gmail.com) | Laptop       | 50000         |
| 102      | Sonu          | [sonu@gmail.com](mailto:sonu@gmail.com) | Mouse        | 1000          |
| 103      | Sonu          | [sonu@gmail.com](mailto:sonu@gmail.com) | Keyboard     | 2000          |


Here, we are repeating: `Sonu`, `sonu@gmail.com` - again and again. 

Question - What happens if Sonu changes email? 

    Now we must update: Row 1, Row 2, Row 3 

    Suppose we forget one row. Now database contains: Old Email, New Email - for same customer. Data inconsistency. 

## What Problem Does Normalization Solve?

1. **Update Anomaly:** 

- Customer email changes. Need to update: `50 Rows` instead of: `1 row`. 

    Miss one row. Database becomes inconsistent. 

- An Update Anomaly occurs when the same piece of information is stored in multiple locations and must be updated in several records to remain consistency. 

2. **Insert Anomaly:** 

- Suppose, new customer: `Rahul` exists. But: No Orders yet 

    Current table requires: Order information -  to create a row. Can't store customer independently. 

- An Insert Anomaly occurs when a database structure prevents certain information from being inserted unless unrelated data is also available. 

3. **Delete Anomaly:**

- Suppose, only one order exists: `Order 101` for Sonu

    Delete order. Customer information also disappears. Bad. 

- A Delete Anomaly occurs when deleting a record unintentionally removes additional valuable information. 

## Solution to Normalization 

Instead of: one huge table. Split into: 

**Customers**

| customer_id | name | email                                   |
| ----------- | ---- | --------------------------------------- |
| 1           | Sonu | [sonu@gmail.com](mailto:sonu@gmail.com) |

**Orders**

| order_id | customer_id |
| -------- | ----------- |
| 101      | 1           |
| 102      | 1           |

Now, no duplication. 

### First Normal Form (1NF)

- A table is in First Normal Form when each column contains atomic values and each row represents a unique record. 

- What does Atomic mean?

    One cell should contain: `One Value`

### Second Normal Form (2NF)

- A table is in Second Normal Form when it is already in First Normal Form and all non-key columns depend entirely on the primary key. 

| user_id | name | email                                   |
| ------- | ---- | --------------------------------------- |
| 1       | Sonu | [sonu@gmail.com](mailto:sonu@gmail.com) |

    Primary Key: `user_id` - because it uniquely identifies the row. 

    Everything else: `name`, `email` is called - Non-key Columns or Non-key attributes 

- A **non-key attribute** is any column that is not part of the primary key and is used to store descriptive information about an entity. 

- **Partial dependency** occurs when a non-key attribute depends on only part of a composite primary key rather than the entire key. 

- Therefore, a table is in 2NF when it is already in 1NF and every non-key attribute depends ono the entire primary key rather than only a portion of it. 

### Third Normal Form (3NF)

- A table is in Third Normal Form when it is already in Second Normal Form and non-key attributes depend only on the primary key, not on other non-key attributes. 

- Third Normal Form removes transitive dependencies by ensuring that non-key columns are directly dependent on the primary key rather than on other non-key columns. 

    This further reduces redundancy and improves data integrity. 

- **Transitive Dependency** occurs when a non-key attribute depends on another non-key attribute rather than directly on a primary key. 

- A table is in 3NF when it is already in 2NF nad every non-key attribute depends directly on the primary key rather than on another non-key attribute. 


**Do We Always Normalize?**

No. Sometimes performance is more important. 

    Then Denormalization is used. 

**Benefits of Normalization**

Normalization reduces duplicate data, improves consistency, simplifies maintenance, and prevents update, insert, and delete anomalies. 

**Have You Used Normalization In Real Projects?**

- Yes. Although I have not explicitly performed formal normalization exercises, I reguarly apply normalization principles by separating related entities such as users, orders, products, and payments into different tables. 

- This reduces redundancy, improves maintainability, and helps preserve data integrity. 


## Denormalization 

- Denormalization is the deliberate introduction of redundancy into a database to improve read performance and reduce the number of joins required during query execution. 

    Sometimes more duplication, faster reads. 

**Why don't we fully normalize everything?**

While normalization improves data integrity and reduces redundancy, excessive normalization can increase the number of joins required to retrieve data. 

    In performance-sensitive systems, selective denormalization may be used to optimize read operations. 


## Transactions 

- A transaction is a sequence of database operations that are executed as a single logical unit of work. A transaction either completes entirely or is rolled back completely if any operation fails. 

- In real word applications, many business operations involve multiple database changes that must succeed together to maintain consistency. 

    Executing these operations independently can result in partial updates if failure occur. 

    Transactions solve this problem by grouping related operations into a single unit of work . 

    If all operations succeed, the transaction is committed. 

    If any operation fails, the transaction is rolled back, ensuring that the database remains in a consistent state. 

- Suppose user buys a product. Price: `₹1000`. 

    Step 1 - Deduct money from wallet. 

    Step 2 - Create order 

    Now imagine: Step 1 success, Step 2 failed - because server crashed. 

    Result: Money deducted, Order not created 

        Bad. Very Bad. 

    Question - Can we allow half-completed transactions? No. 

    Need a mechanism that says: Either everything succeeds or nothing succeeds. 

    This is called: Transaction. 

- Example: Bank Transfer. 

    Account A -> Deduct ₹1000

    Account B -> Add ₹1000

    Question - What if deduction succeeds but addition fails? 

    Without transaction: Money Lost. 

    With transaction: Everything reverted. Database returns to previous state. 

### Commit 

    A Commit permanently saves all changes made during a transaction to the database. 

### Rollback 

    A Rollback reverses all changes performed within a transaction and restores the database to its previous consistent state. 

**Why Are Transactions Important?**

Transactions ensure that related database operations are executed reliably as a single unit. 

    They prevent partial updates, maintain consistency, and protect data integrity when failures occur. 


## ACID Properties 

ACID is a set of four properties that guarantee reliable and consistent transaction processing in relational database systems. 

    The 4 properties are: Atomicity, Consistency, Isolation, and Durability. 

- ACID is a set of properties that ensure reliable transaction processing. 

    Atomicity guarantees that transactions execute completely or not at all. 

    Consistency ensures that database rules remain valid before and after a transaction. 

    Isolation prevents concurrent transactions from interfering with each other. 

    Durability guarantees that committed changes remain permanent even after failure or crashes. 

1. **Atomicity:**

- Atomicity ensures that all operations within a transaction are treated as a single indivisible unit. 

    Either every operation succeeds or all changes are rolled back. 

- Think: `All or Nothing`

- Bank transfer: `Deduct Money and Add Money`

    Either: Both Succeed or Both Fail. Never: half done 

- Atomicity prevents partial execution of transactions. If any step within a transaction fails, the entire transaction is rolled back to maintain consistency. 

    This guarantees that the database never enters a partially updated state. 

2. **Consistency:**

- Consistency ensures that a transaction transforms the database from one valid state to another valid state while preserving all defined rules, constraints and relationships. 

- Consistency guarantees that all database constraints, relationships, validations and business rules remain satisfied before and after a transaction. 

    A transaction should never leave the database in an invalid or inconsistent state. 

- Database rules should always remain valid. 

- Suppose: Wallet Balance cannot be negative. 

- Transaction should never leave database in an invalid state. 

3. **Isolation**

- Isolation ensures that concurrent transactions execute independently without interfering with each other's intermediate states. 

- Isolation prevents transactions from stepping on each other. 

- In multi-user systems, many transactions may execute simulateneously. Isolation ensures that concurrent transactions behave as though they were executed independently, preventing inconsistent results caused by overlapping operations. 

- Imagine: `User A` and `User B` both updating same account. 

- Without Isolation: Operations may interfere. Result: Wrong balance 

- Example: Balance - `₹1000`

    Two transactions: Withdraw ₹500, Withdraw ₹700 - at same time. 

    Without isolation: Incorrect balance may occur. 

    Isolation protects against such conflicts. 

4. **Durability:**

- Durability ensures that once a transaction has been committed, its changes are permanently stored and will not be lost even in the event of system failures, crashes or power outages. 

- Durability guarantees that committed transactions remain permanently recorded in the database. 

    Database systems achieve durability through mechanisms such as transaction logs, write-ahead logging, and persistent storage. 

- Transaction committed. Server crashes immediately. Power goes off. 

    Question - Should data disappear? No. 

    Committed data must survive. 


## SQL vs NoSQL 

SQL = Tables 
NoSQL = JSON 

**Why was NoSQL created?**

Imagine: Facebook, Instagram, Twitter, YouTube 

    Billion of users. Petabytes of data. Constantly changing requirements. 

    Traditional relational databases work very well for: Banking, Payments, ERP, Inventory, Accounting 

    But large internet companies started facing problemms. 

    Suppose User Profile - Today: Name, Email, Phone 

                            Tomorrow: Instagram Handle, LinkedIn URL, Twitter URL 

    Every schema change requires: ALTER TABLE. As data grows to billion of records: Schema Management, Scaling, Joins - becomes challenging. 

    NoSQL emerged to provide: Flexible Schema, Horizontal Scaling, High Throughput

**What is SQL?**

SQL databases are relational databases that store data in structured tables with predefined schemas and relationships. 

    They use SQL as the query language and emphasize consistency, integrity, and transactional guarantees. 

**What is NoSQL?**

NoSQL databases are non-relational databases designed to store and retrieve data using flexible schemas. 

    They are optimized for scalability, high availability, and handling large volumes of unstructured or semi-structured data. 

- Relational databases organize data into structured tables and establish relationships through keys and joins. They are ideal for applications requiring strong consistency, complex querying, and transactional integrity. 

    NoSQL databases use more flexible data models such as documents, key-value pairs, graphs, or wide-column stores. They are designed to handle rapidly changing data structures and large-scale distributed workloads while sacrificing some relational capabilities. 

**Schema Difference**

- Relational databases enforce predefined schemas that require all records to follow the same structure. NoSQL databases typically support flexible schemas, allowing different documents within the same collection to contain differnet fields. 

- SQL - Suppose table: `Users` must contain: `id name email`

    Every row follows same structure. 

- MongoDB - Document 1: `Name Email` Document 2: `Name Email Phone LinkedIn`

    Both valid 

**Relationship Handling**

- SQL: Relationships are handled through - `Primary Keys, Foreign Keys, Joins`

    Database enforces integrity. 

- MongoDB: Relationships are handled through - `Embedding, Referencing`

    Application often manages consistency. 

**Scaling**

- Relational databases have traditionally favoured vertical scaling, whereas many NoSQL systems are designed with horizontal scaling in mind. This makes NoSQL databases particularly suitable for large-scale distributed applications. 

- SQL: Traditionally scales vertically - `More CPU, More RAM, Better Server`

- NoSQL: Designed for horizontal scaling - `Server 1, Server 2, Server 3, Server 4`

    Data distributed across machines. 

**Transactions**

- SQL: Strong transaction support. Full ACID guarantees. 

- MongoDB: Modern MongoDB supports transactions. 

**When Would You Choose SQL?**

SQL databases are preferred when applications require strong consistency, complex relationships, transactional guarantees, and structured data models. 

Common examples include banking system, financial applications, ERP systems, inventory management platforms, and eCommerce order processing. 

**When Would You Choose NoSQL?**

NoSQL databases are preferred when applications require flexible schemas, rapid development, horizontal scalability, and the ability to handle large volumes of semi-structured or unstructured data. 

Common examples include social media platforms, content management systems, analytics platforms, and real-time applications. 

**Which Is Better: SQL or NoSQL?**

Neither SQL nor NoSQL is universally better. The choice depends on the application's requirements. 

    SQL databases excel in consistency, relationships, and transactional workloads, whereas NoSQL databases excel in scalability, schema flexibility, and handling large distributed datasets. 