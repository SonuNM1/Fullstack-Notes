- Relational databases uses: Tables, Rows, Columns, Relationships 

- SQL (Structured Query Language) is a standard language used to define, manage, query and manipulate data stored in relational database management systems such as MySQL, PostgreSQL, SQL Server, and Oracle. 

**What is a Relational Database?**

A relational database stores data in tables consisting of rows and columns. Relationships between tables are established using keys, enabling structured storage and efficient retrieval of related data. 

**Why use SQL databases?**

Relational databases provide a structured way to store and manage data through tables and relationships. 

    They enforce data consistency, support complex queries, maintain refrential integrity, and offer transactional guarantees. 

    These features make them suitable for applications where accuracy and consistency are critical, such as banking systems, eCommerce platforms, ERP systems, and financial applications. 

| Feature     | MySQL            | PostgreSQL           | MongoDB                             |
| ----------- | ---------------- | -------------------- | ----------------------------------- |
| Type        | Relational (SQL) | Relational (SQL)     | NoSQL (Document)                    |
| Schema      | Fixed            | Fixed (very strict)  | Flexible                            |
| Data format | Tables & rows    | Tables & rows        | JSON-like documents                 |
| Relations   | Yes              | Yes (very powerful)  | No joins (limited via lookup)       |
| ACID        | Yes              | Very strong     | Partial (strong now but diff model) |
| Best for    | Simple apps      | Complex data & logic | Rapid dev, flexible data            |

- MySQL/PostgreSQL = structured, relational data 

- MongoDB = flexible, evolving data models 


## What is MySQL?

- Data is stored in tables (rows & columns)

- We use SQL queries to insert, read, update, and delete data

`SELECT * FROM users WHERE email = 'abc@gmail.com'`

- MySQL is an open-source relational database management system (RDBMS) that stores data in tables composed of rows and columns. 

- SQL is a language, while MySQL is a software system that implements this language. 

**Why is MySQL so widely used?**

- No license cost 
- Huge community support 
- Backed by Oracle 

**Reliable & fast**

- Optimized for ready-heavy operations
- Uses indexes to fetch data quickly 
- Handles millions of records smoothly 

**Strong data integrity (ACID)**

MySQL ensures:

- Atomicity - all or nothing 
- Consistency - valid data only 
- Isolation - parallel queries don't conflict 
- Durability - data won't vanish after crash 


## `CHAR` Vs `VARCHAR` 


- Both `CHAR` and `VARCHAR` store string values, but their storage behaviour differs. 

- `CHAR`is a fixed-length type, `VARCHAR` is variable-length. 

- `CHAR`: fixed-length string, Always occupies the defined size

- `VARCHAR`: variable-length string, Uses only required space 


## Different types of relationships in MySQL

- **One-to-One** : Each record in Table A relates to exactly one in Table B. 

    A `user` has one `profile`

- **One-to-Many** : One record in Table A maps to many in Table B. 

    A `customer` has multiple `orders`

- **Many-to-Many** : Multiple records in Table A relate to multiple in Table B. 

    A `student` enrolls in many `courses`

## Composite Key 

More than one column together make the primary key. 

- Example: A student can enroll in many courses. 

    So, to uniquely identify one command, we need: 

    `(student_id + course_id)`

    This pair together is the composite key. Neither `student_id` nor `course_id` alone is enough. Together -> unique. 


## Normalization 

- Normalization is the process of organizing data to reduce redundancy and improve data integrity. 

- It divides large tables into smaller, related tables and establishes relationships using foreign keys. 

- Normalization is the process of organizing data to: 

    Remove duplicate data 
    
    Improve data integrity 
    
    Reduce anomalies (update, insert, delete problems)

- Normalization is the process of organizing database tables to eliminate redundancy and ensure data integrity by dividing data into related tables using normal forms. 

**1NF**

- Rules: Atomic values (no lists), No repeating columns 

- Eliminates repeating groups 

- Each cell holds atomic values 

- Separate rows or table 

- ❌ NOT in 1NF

| student_id | name | skills   |
| ---------- | ---- | -------- |
| 1          | Sonu | JS, Node |

    Problem: Multiple values in one column

- ✅ In 1NF

| student_id | name | skill |
| ---------- | ---- | ----- |
| 1          | Sonu | JS    |
| 1          | Sonu | Node  |

    Atomic values, No repeating groups 

**2NF**

- Rules: Must be in 1NF, No partial dependency

- Removes partial dependencies 

- Every column depends on the entire primary key 

- Example: Product name depends only on product_id, not order_id (Move product info to separate table)

**3NF**

- Rules: Must be in 2NF, No transitive dependency 

- Removes transitive dependencies 

- Non-key columns depend only on primary key 


## Partial Dependency 

A column depends on only one part of the composite key, not the full key. 

- Partial - Part of key 

## Transitive Dependency 

One column depends on another column, instead of directly on the primary key. 

- Transitive = through another column 

- Solution: Every column depends directly on primary key

    No confusion, No duplication 

## Denormalization 

- Intentionally adding redundancy to improve read performance 

**Why denormalize?**

- Too many `JOIN`s
- Read-heavy application 
- Performance bottleneck 

- `1NF` removes repeating groups, `2NF` removes `partial dependency`, `3NF` removes `transitive dependency`. 

    `Denormalization` is used in read-heavy systems to improve performance by reducing joins at the cost of redundancy. 


## DELETE vs TRUNCATE vs DROP 

DELETE removes rows, TRUNCATE empties table, DROP removes table 

**DELETE**

- Removes rows, keeps table 

    `DELETE FROM users WHERE id = 5;`

- What it does?

    Deletes specific rows

    Can use `WHERE`

    Table structure stays 

    Can be rolled back (transaction)

    Slower (row by row)

- Safe and conditional delete 

- What if we don't use WHERE in DELETE?

    `DELETE FROM users;`

    All rows are deleted, but the table structure remains.

    Behaves like TRUNCATE, but DELETE is slower and rollback possible. 

**TRUNCATE**

- Removes all rows, keeps table 

    `TRUNCATE TABLE users;`

- What it does?

    Deletes everything 

    No `WHERE`

    Table structure stays

    Cannot rollback 

    Very fast 

**DROP**

- Deletes the table itself. 

    `DROP TABLE users;`

- What it does?

    Deletes data + structure 

    Table is gone 

    Cannot rollback 


## JOINS 

Combine rows from multiple tables using a common column 

- JOINs are used to combine data from multiple tables based on related columns. 

1. **INNER JOIN**

`INNER JOIN` returns only the records that exist in both tables. 

- Example: Users + Orders

    Only users who have orders. 

    If there is no match in either table, the row is excluded. 

    `SELECT users.name, orders.product FROM users INNER JOIN orders ON users.id = orders.user_id;`

2. **LEFT JOIN**

`LEFT JOIN` returns all records from the left table and only the matching records from the right table. 

- Example: Show all users, Orders only if the exist. 

    If there's no match, right-side columns are NULL.

    `SELECT users.name, orders.product FROM users LEFT JOIN orders ON users.id = orders.user_id;`

3. **RIGHT JOIN**

`RIGHT JOIN` returns all records from the right table and matching records from the left table. 

- Example: Show all orders, Users only if they exist 

    RIGHT JOIN is rarely used, LEFT JOIN is preferred. 

    `SELECT users.name, orders.product FROM users RIGHT JOIN orders ON users.id = orders.user_id;`

4. **FULL JOIN**

`FULL JOIN` returns all records from both tables, matched where possible. 

- MySQL doesn't support FULL JOIN directly, we use UNION of LEFT and RIGHT JOIN. 

    ```sql
    SELECT users.name, orders.product FROM users LEFT JOIN orders ON users.id = orders.user_id 

    UNION

    SELECT users.name, orders.product FROM users RIGHT JOIN orders ON users.id = orders.user_id; 
    ```

5. **SELF JOIN**

`SELF JOIN` joins a table with itself to represent hierarchical data. 

- Example: Employees and Managers. Both stored in same table. 

    `SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;`

6. **CROSS JOIN**

Every row of table A is combined with every row of table B. 

    ```sql
    SELECT users.name, orders.product FROM users CROSS JOIN orders;
    ```

- It produces a cartesian product. 


## Views in MySQL 

A View is a virtual table created from a query's result set. Its kind of a virtual table created from a `SELECT` query.  

- It doesn't store data itself - it just stores the query. 

- It simplifies complex queries by encapsulating them as reusable logical tables. 

    ```sql
    CREATE VIEW active_users AS 
    SELECT id, name, email 
    FROM users 
    WHERE status = 'active';
    ```

    Now, we can do: 

    ```sql
    SELECT * FROM active_users; 
    ```

**Benefits**

- Simplifies data access by hiding complex joins. Hide complex queries behind a simple name. (Example: instead of writing joins again and again)

- Enhances security by exposing only required columns. Show only required columns (hide password, salary)

- Reusability. Same query logic reused across app

**Limitations**

- Not stored physically. 
- Cannot always be updated directly. `INSERT/UPDATE` may fail.


## Indexing in MySQL 


An `Index` is a data structure that speeds up data retrieval. 

- Indexes in MySQL acts as lookup tables that speed up data retrieval operations on a database table. 

    They function like an index in a book, helping MySQL locate specific rows without scanning the entire dataset. 

- Think: Book Index - faster lookup instead of scanning everything. 

- **Without Index:** full table scan, slow for large data 

- **With Index:** Direct lookup, Faster `SELECT` queries 


## Triggers in MySQL 

A Trigger is a set of instructions that automatically executes in response to specifc database events such as `INSERT`, `UPDATE`, or `DELETE`. 

- A Trigger is a piece of SQL code that runs automatically when a specific action happens on a table. 

    When X happens -> do Y automatically 

- Example (Real life): When an order is placed, reduce product stock automatically 

- Automates routine data tasks 
- Reduces the need for application-level logic 

**How triggers work**

1. An event happens on a table: `INSERT`, `UPDATE` or `DELETE`

2. MySQL automatically fires the trigger 

3. Trigger executes SQL logic 

4. No manual call needed 

**Types of Triggerrs**

- Based on Time: BEFORE trigger, AFTER trigger 

- Based o Event: INSERT, UPDATE, DELETE

- So combinations like: 

    BEFORE INSERT, AFTER UPDATE, BEFORE DELETE 

## Transactions 

- A Transaction is a sequence of operations performed as a single logical unit of work. 

- A transaction is a group of SQL operations that must all succeed or all fail together. (All or nothing)

- Transactions follow the **ACID principles** - `Atomicity`, `Consistency`, `Isolation` and `Durability` - ensuring data reliability. 

    `Atomicity`: All operations succeed or fail together 

    `Consistency`: Maintains database integrity constraints 

    `Isolation`: Transactions do not interfere with each other 

    `Durability`: Changes persist after a commit 

- **Real-life example**

Money transfer: 

1. Debit from A
2. Credit to B 

If step 2 fails -> step 1 must be undone

If something goes wrong: `ROLLBACK`

**When to use transactions?**

- Banking
- Orders & Payments
- Multi-table updates
- Critical operations 


## Integrity Constraints 

Rules applied on table columns to keep data valid and correct. 

**Types of Integrity Constraints**

1. PRIMARY KEY 

    Ensures unique + not null 

    `id INT PRIMARY KEY`

    No duplicate, not NULL

2. FOREIGN KEY 

    Maintains relationship between tables. Links one table to another table's primary key. 

    `user_id INT FOREIGN KEY (user_id) REFERENCCES users(id)`

    Ensures referential integrity. 

3. UNIQUE KEY 

    No duplicate values. 

    `email VARCHAR(100) UNIQUE`

    Allow NULL (one time)

4. NOT NULL 

    Column must have value 

5. CHECK 

    Value must satisfy condition 

    `age INT CHECK (age >= 18)`

6. DEFAULT 

    Sets default value 

    `status VARCHAR(10) DEFAULT 'active'`


## SQL Command Types 

1. **DDL (Data Definition Language)**

Defines database structure. 

- Example: `CREATE`, `ALTER`, `DROP`, `TRUNCATE` 

- Affects structure, Cannot rollback

2. **DML (Data Manipulation Language)**

Works with data 

- Example: `INSERT`, `UPDATE`, `DELETE`, `SELECT`

- Affects rows, can rollback

3. **DCL (Data Control Language)**

Controls access. 

- Example: `GRANT`, `REVOKE`

4. **TCL (Transaction Control Language)**

Manages transactions. 

- Examples: `COMMIT`, `ROLLBACK`, `SAVEPOINT`

## GRANT & REVOKE 

- Grant: Gives permission to users. 

    `GRANT SELECT, INSERT on mydb.users TO 'sonu'@'localhost'`

    Meaning user can read and insert, cannot update or delete 

- REVOKE: Removes permissions from users. 

    `REVOKE INSERT ON mydb.users FROM 'sonu'@'localhost'`


## Transaction Control Language (TCL)

TCL commands manage transactions to ensure data consistency. 

1. **COMMIT**

Permanently saves changes. `COMMIT` makes all changes in a transaction permanent. 

2. **ROLLBACK**

Undo changes if something goes wrong. `ROLLBACK` restores the database to the last committed state. 

3. **SAVEPOINT**

Creates a checkpoint inside a transaction. `SAVEPOINT` allows partial rollback within a transaction. 

**Rollback Vs. Savepoint**

- Rollback undos everything.

    Used when: payment fails, order fails completely 

- Savepoint undo only part. 

    Used when: partial failure is acceptable. Savepoint allows partial rollback without aborting the entire transaction. 

## LOCKS in Transactions 

A lock prevents multiple transactions from modifying the same data at the same time. 

- Locks prevent data inconsistency by controlling concurrent access during transactions.

1. Shared lock (Read lock)

- Multiple transactions can read
- No one can write 

2. Exclusive lock (Write lock)

- Only one transaction can read/write
- Others must wait 


## Stored Procedures 

- A stored procedure is a set of SQL statements saved in the database and executed as a single unit. 

    Function inside the database. 

- Faster execution 
- Reusable 
- Reduced network calls 
- Business logic at DB level 

| Stored Procedure        | Trigger                |
| ----------------------- | ---------------------- |
| Called manually         | Executes automatically |
| Accepts parameters      | No parameters          |
| Used for business logic | Used for events        |


## Deadlock 

Two transactions waiting on each other forever. 

- Example: 

    Txn A locks Row 1, wants Row 2 
    Txn B locks Row 2, wants Row 1

    Stuck 🚫

- Real backend scenario: 

    Two users booking same seat. 


## Optimize Query Performance in MySQL 

1. **Use Indexes correctly**

- Index columns used in: `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`

2. **Optimize JOINs**

- Join on Indexed columns 

3. **Use LIMIT**

`SELECT * FROM orders ORDER BY created_at DESC LIMIT 10`

4. **Normalization** 


## Aggregate Functions 

Functions that operate on multiple rows and return a single value. 

- Aggregate functions summarize multiple rows into a single result and are commonly used with `GROUP BY` and `HAVING`. 

- Common Aggregate Functions: `COUNT`, `SUM`, `AVG`, M`IN/MAX`, `GROUP BY`, `HAVING Vs WHERE` (Where -> filter rows, HAVING -> filter groups)

- `ORDER BY`: used to sort the result (ASC -> A to Z default, DESC -> Z to A)

    ORDER BY sorts the result set after rows are selected. It happens after grouping. 

    `WHERE` filters individual rows before grouping happens. Cannot use aggregate functions in WHERE. 

- `GROUP BY`: groups rows so aggregate functions can work. 

    GROUP BY combines rows with the same value into one group. 

    ```sql
    SELECT city, COUNT(*)
    FROM users
    GROUP BY city 
    ```

- `HAVING`: filters groups, not rows

    ```sql
    SELECT city, COUNT(*)
    FROM users
    GROUP BY city
    HAVING COUNT(*) > 2
    ```

| WHERE           | HAVING             |
| --------------- | ------------------ |
| Filters rows    | Filters groups     |
| Before GROUP BY | After GROUP BY     |
| No aggregates   | Aggregates allowed |


- **DISTINCT**

    remove duplicates. DISTINCT removes duplicate rows from the result 

- **LIMIT/OFFSET**

    LIMIT controls number of rows returned, OFFSET skips rows. 

    Used in pagination. 

- **BETWEEN** and **IN**



## EXECUTION ORDER 

SQL runs in the following order (not the way we write): 

1. FROM
2. WHERE
3. GROUP BY
4. HAVING 
5. SELECT 
6. ORDER BY 


## MySQL Vs. PostgreSQL 

PostgreSQL is advanced, open-source object-relational database. 

**MySQL (Why companies still use it)**

- Faster for simple read-heavy apps
- Easier to set up 
- Huge ecosystem (LAMP Stack)
- Trusted by Legacy + startup systems

**PostgreSQL**

- Strict SQL standards

- Advanced Indexing - PostgreSQL supports multiple index types: B-tree, Hash, GIN, GiST

    This means faster search on JSON data, efficient full-text search 

    In MySQL, indexing options are limited compared to PostgreSQL. 

- Better concurrency (less locking)

    PostgreSQL uses MVCC (Multi-Version Concurrency Control) more effectively. 

    Readers don't block writers. Writers don't block readers. 

- Better data integrity

- Advanced features: JSONB (better than MySQL), Strong indexing 

    PostgreSQL has JSONB: Stored in binary format, Can be indexed, Faster queries inside JSON. 

    This allows using PostgreSQL almost like a hybrid NoSQL + SQL database. 

- Better concurrency handling 


## Partitioning 

Partitioning splits one big table into smaller pieces, inside the same database. 

- Example: Orders table -> too big 

    Partition by year: orders_2023, orders_2024, orders_2025

    But logically, it's still one table. 

- Why partitioning? - Faster queries, Easier maintenance 
 
- `Partitioning` improves performance by reducing the amount of data shared. 

- Partitioning splits one large table into smaller logical pieces inside the same database. 

**Why do partitioning & sharding exist?**

As data grows: 

- Tables become huge 
- Queries slow down 
- Indexes become heavy 
- One server reaches its limits 

    We need ways to handle large data efficiently. 

    That's where partitioning and sharding come in. 

**Why partitioning is needed?**

- Large tables cause slow scans 
- Indexes become large 
- Old data is rarely queried 
- Maintenance becomes difficult 

Partitioning: 

- Reduces data scanned 
- Improves query performance

**How developers implement partitioning**

1. Identify large table 
2. Identify query pattern 
3. Choose partition key 
4. Create partitions 
5. Monitor performance 


## Sharding 

Sharding splits data across multiple databases or servers. 

- Sharding splits data across multiple databases or servers. 

- Different machines, Different databases, App decides where data goes 

- Example: Users 1-1M -> DB1
           Users 1M-2M -> DB2 

        Now, different machines, different databases 

- Why Sharding? 

    Database is too big for one server

    Need horizontal scaling 


| Feature    | Partitioning | Sharding      |
| ---------- | ------------ | ------------- |
| Where      | Same DB      | Different DBs |
| Server     | One          | Multiple      |
| Purpose    | Performance  | Scalability   |
| Complexity | Low          | High          |


**Why Sharding is needed?**

A single database can't: 

- Handle unlimited traffic 
- Store infinite data 
- Scale beyond hardware limits 

Sharding enables 

- Horizontal scaling 
- Higher throughput 
- Fault isolation 

## Database Migration 

A database migration is a version-controlled change to the database schema. 

- A database migration is a file that describes one small database change and is tracked like code. 

    A migration is just a SQL file or script. 

- Example migration file: 

    ```sql
    001_add_phone_to_users.sql
    ```

    Inside: 

    ```sql
    ALTER TABLE users ADD COLUMN phone VARCHAR(15);
    ```

    That's it. 

**What problem does migration solve?**

- Without migration: Manual SQL, Human memory, Mistakes 

- With migration: Automatic, Repeatable, Safe, Trackable

    If code can be versioned, database changes must be too. 

**Why do we need database migrations in the first place?**

- The core problem: Applications change over time - New features, New fields, New tables, New constraints 

    But databases are shared by many people and environments. 

- Without migrations: 

    Everyone's DB looks different, 
    
    Production breaks randomly, 
    
    No one knows what change happened when 

- Migrations exist to keep database structure synchronized everywhere. 

**What problem migrations actually solve**

- Imagine 3 developers: 

    Dev A adds a column locally 

    Dev B doesn't know 

    Code uses that column 

    Production crashes 

**How do developers actually do migrations?**

- Step 1: Dev needs a schema change 

    Example: Need to add user phone numbers. 

- Step 2: Dev creates a migration file 

    Example - 004_add_phone_to_users.sql

    ```sql
    ALTER TABLE users ADD COLUMN phone VARCHAR(15);
    ```

- Step 3: Commit migration to Git 

    `git commit -m "Add phone column"`

- Step 4: Migration runs automatically 

    Tools check - which migration has already been applied. Runs only new ones 

    
## Describe a time when you handled a database performance issue 

In one of my projects, some API responses became slow as the data grew. I first checked the slow query logs and found that a frequently used query was doing a full table scan. (try seeing the query at database level before touching the application code)

- Added proper indexes 
- Removed unnecessary columns from `START *`
- Optimized pagination using indexed columns 

**BEFORE**

- We had an API: `GET /users/{id}/orders`

    The query was: 

    ```sql
    SELECT * 
    FROM orders
    WHERE user_id = 101
    ORDER BY created_at DESC; 
    ```

    What was wrong? `orders` table had millions of rows, `user_id` and `created_at` had NO index. MySQL did a full table scan. Response time: 2-3 seconds 

**What i checked**

    ```sql
    EXPLAIN SELECT *
    FROM orders
    WHERE user_id = 101
    ORDER BY created_at DESC ; 
    ```

    Output showed: 
        
        `type = ALL` -> full table scan 

        `key = NULL` -> no index used 

**What changes i made**

    ```sql
    CREATE INDEX idxx_orders_user_created ON orders(user_id, created_at) ; 
    ```

    Now, no full scan. The SQL didn't change - the execution plan did. 

## How do you handle database schema changes in a production environment? 

- Use migration tools 
- Apply changes in staging first 
- Schedule changes during low-traffic hours 
- Add columns as nullable first 
- Take backup before change 



