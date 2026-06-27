PostgreSQL is an open-source relational database management system known for its reliability, ACID compliance, extensibility, advanced querying capabilities, and strong support for modern application development. 

- PostgreSQL gained popularity because it combines the reliability and transactional guarantees of traditional relational databases with many advanced features expected in modern applications. 

    It provides strong ACID compliance, powerful indexing options, advanced query optimization, JSON support, extensibility, and excellent performance for both transactional and analytical workloads. 

## PostgreSQL vs MySQL 

Both are: Relational databases, SQL databases, ACID compliant, Open source 

- MySQL: Traditionally focused on: `Simplicity`, `Ease Of Use`, `Web Applications`

- PostgreSQL: Focused on: `Advanced features`, `Complex Queries`, `Extensibility`, `Data Integrity`

MySQL is often viewed as a simpler and more lightweight relational database suited for many traditional web applications. PostgreSQL offers a richer feature set, stronger standards compliance, more advanced indexing and query capabilities, and greater flexibility for complex applications. As a result, PostgreSQL is increasingly preferred for modern backend systems. 

**Why Do Modern Startups Often Choose PostgreSQL?**

PostgreSQL provides strong transactional guarantees, advanced querying capabilities, JSON support, powerful indexing, and excellent scalability. 

    It offers a balance between relational consistency and modern application flexibility, making it a popular choice for contemporary backend systems. 

**Can PostgreSQL store JSON?**

Yes. PostgreSQL supports JSON and JSONB data types, allowing semi-structured data to be stored and queried efficiently while retaining the benefits of a relational database. 


## Database vs ORM 

**Database** is a system responsible for storing, organizing, retrieving, and managing application data. 

    Examples - PostgreSQL, MySQL, MongoDB 

Database is where data actually lives. 

    Examples - Users, Orders, Products, Payments are physically stored there. 

Without database: No persistence 

#### What is ORM?

An ORM (Object Relational Mapping) is a library that enables developers to interact with relational databases using programming langauge objects and methods instead of writing raw SQL queries. 

- Without ORM: You write SQL manually - `SELECT * FROM users WHERE id = 1`

- With ORM: `prisma.user.findUnique()`

    ORM convert: JavaScript -> SQL, behind the scenes. 

- An ORM acts as an abstraction layer between application code and the database. It allows developers to work with database records as programming language objects rather than manually writing SQL queries. 

    ORMs improve productivity, readability, type safety, and maintainability while reducing repetitive database code. 

## PostgreSQL vs MySQL 

PostgreSQL offers richer feature set, stronger standards compliance, advanced indexing and query capabilities. How? 

**Advanced Querying**

- PostgreSQL provides a richer set of query capabilities that make it easier to express complex analytical and reporting requirements. 

    Features such as Common Table Expressions (CTEs), Window Functions, Recursive Queries, and advanced aggregations allow developers to solve sophisticated problems directly within the database. 

- Which customers spend more than ₹10,000 in the last 6 months and ordered more than 5 times? 

**JSON Support**

- MySQL supports JSON. But PostgreSQL is famous for: `JSONB`

    PostgreSQL can: Store JSON, Index JSON, Query JSON efficiently. 

- PostgreSQL combines relational database capabilities with strong support for semi-structured data through JSONB. This allows applications to store and query JSON documents efficiently without sacrificing the benefits of relational modeling. 

**Extensibility**

PostgreSQL allows: `Custom Types`, `Custom Functions`, `Extensions`

Example - Geolocation, Full Text Search, Vector Search. 

    Many AI applications use PostgreSQL because of extensions. 

**Why Is PostgreSQL Often Preferred Over MySQL?**

PostgreSQL offers a broader set of advanced features including richer query capabilities, better support for JSON data, extensibility through custom functions and extensions, advanced indexing mechanisms, and stronger standards compliance. 

    These features make it particularly suitable for complex modern applications. 

## Prisma ORM 

- Prisma is a modern TypeScript-first ORM that provides type-safe database access, schema management, migrations, and query generation for relational databases such as PostgreSQL, MySQL, and SQL Server. 

**Why Were ORMs Created?**

- Suppose you need: Create User, Find User, Update User, Delete User. 

- Without ORM: You write SQL every time. 

    Application grows: 100 tables, 1000 queries. Managing raw SQL becomes harder. 

    Need: Abstraction, Type Safety, Developer Productivity. ORMs solve this. 

**Why Did Prisma Become Popular?**

- Before Prism, many ORMs felt: Magic, Complex, Hard to debug 

- Prisma focused on: type safety, developer experience, auto-completion, readable queries. 

- Prisma became popular because it offers a strongly typed development experience that integrates naturally with TypeScript. 

    It provides compile-time validation, auto-completion, migration support, and an intuitive query API, reducing runtime errors and improving developer productivity. 

- Prisma improves developer productivity by providing type-safe database acess, schema management, migrations, and a modern query API. 

    It reduces the likelihood of runtime database errors and improves maintainability in TypeScript applications. 

### Prims vs Mongoose 

- Prisma is an ORM primarily designed for relational databases, whereas Mongoose is an ODM designed specifically for MongoDB. 

- Prisma is optimized for relational database workflows and provides strong TypeScript integration, and relational querying capabilities. Mongoose focuses on MongoDB document modeling and provides schema definitions, middleware validation, and document-oriented features. 

Prisma - PostgreSQL, MySQL, SQL Server 

Mongoose - MongoDB 

## PostgreSQL has advanced querying capabilities 

1. **Common Table Expressions (CTEs)**

- A Common Table Expression (CTE) is a temporary named result set that can be referenced within a SQL query to improve readability, modularity and maintainability. 

- CTEs allow complex queries to be broken into smaller logical steps. 

    By assigning inntermediate results a temporary name, developers can write more readable and maintainable SQL while avoiding deeply nested subqueries. 
 
Suppose you write a huge query. 

    Step I: Find all orders from last month 
    Step II: From those orders calculate revenue 

Without CTE: Everything becomes one giant query. Hard to read. Hard to maintain. 

CTE allows: Create Temporary Named Result. Use it in another query. 

Think: Variable for SQL 

2. **Window Functions**

- Window functions perform calculations across a set of related rows while still returning individual rows in the result set. 

- Unlike aggregate functions that collapse multiple rows into a single result, window functions allow calculations such as rankings, running totals, moving averages, and comparisons while preserving individual responsibility. 

- Example: Ranking employees, Top sellers, Running revenue totals, Leaderboard systems 

3. **Recursive Queries**

Recursive queries allow a query to repeatedly reference its own result set in order to process hierarchical or tree-structured data. 

- Recursive queries are commonly used for organizational hierarchies, category trees, folder structures, and graph-like relationships where the depth of traversal is not known in advance. 

**JSON Support**

JSON and JSONB are two different things. 

- JSON: Stores JSON exactly as provided. 

Example: 

```json
{
    "name":"Sonu",
    "city": "Delhi"
}
```

PostgreSQL keeps original structure. 

- JSONB: B means Binary

    PostgreSQL converts JSON into optimized internal format. Because, now PostgreSQL can: 

    Search Faster, Index JSON, Filter JSON Effectively 

- JSONB is PostgreSQL's binary JSON storage format that enables efficient querying, indexing, and manipulation of semi-structured data. 

- JSONB combines the flexibility of document-oriented data with the performance benefits of relational databases. It allows applications to store semi-structured information while still supporting indexing and efficient querying capabilities. 