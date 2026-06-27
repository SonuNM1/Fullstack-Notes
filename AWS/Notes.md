## EC2 (Elastic Compute Cloud)

- Amazon EC2 (Elastic Computer Cloud) is a cloud computing service that provides virtual servers on demand, allowing developers to deploy and run applications without managing physical hardware. 

- Amazon EC2 provides virtual servers that allow applications to run in the cloud without requiring organizations to purchase or maintain physical hardware. 

    Developers can choose different instance types based on CPU, memory, storage, and networking requirements. Because these resources can be provisioned and scaled on demand, EC2 provides a flexible and cost-effective environment for hosting applications. 

**What does `Virtual Server` mean?**

Imagine Amazon has one powerful physical machine: `256 GB RAM`, `64 CPU Cores`. Instead of giving that entire machine to one customer, AWS uses a hypervisor to divide it into many isolated virtual machines. 

Example: 

Physical Server

        │

────────────────────────

VM 1
Ubuntu
4 GB RAM

────────────────────────

VM 2
Windows
8 GB RAM

────────────────────────

VM 3
Ubuntu
16 GB RAM

- Each VM behaves like an independent computer. Each customer gets their own VM. This VM is called on: `EC2 Instance`

**Why Was EC2 Created?**

Suppose you've built a Node.js application. Where will it run? Your laptop? 

    No. Because if you shut down your laptop: Website stops. 

- Need a computer that: Runs 24x7, Has internet access, Can be reached by worldwide 

    Earlier, companies used to buy physical servers. Like: Dell Server, HP Server - and keep them in their office or a data center. 

- Problems: Very expensive, Maintenance, Hardware failures, Scaling takes days or weeks 

- Amazon solved this problem by saying: "We'll own the physical server. You rent them whenever you need."

    This became: EC2

**Why is it called Elastic?**

- Elastic means - Resources can grow or shrink based on demand. 

- Today: 2 CPU, 4GB RAM. Tomorrow: 8 CPU, 32 GB RAM

- You can resize or replace instances much more easily than buying new physical hardware. 

**Real Production Example**

Suppose you've built: Node.js Backend, React Frontend, Redis, RabbitMQ

**Why use EC2 instead of your own server?**

EC2 eliminates the need to purchase and maintain physical hardware. It allows resources to be provisioned quickly, supports scalability, and provides scalability, and provides high availability through AWS infrastructure. 

**What can you deploy on EC2?**

Almost anything: 

- Node.js applications 
- React applications (often behind Nginx)
- Docker containers 
- PostgreSQL (though managed databases are usually preferred)
- Redis (for development or small deployments)
- Background workers
- Microservices 

**Managed Database**

- PostgreSQL is usually deployed as a managed database. What does that mean? 

- A managed database is a database service where the cloud provider is responsible for infrastructure management, backups, updates, monitoring, and high availability, allowing developers to focus only on application development. 

- Instead of installing and maintaining a database on a virtual server, developers can use a managed database service. 

    The cloud provider automates operational responsibilities such as backups, software updates, failover, monitoring, and scaling. 

    This reduces operational complexity and improves reliability while allowing developers to concentrate on building application features. 

- Suppose you install PostgreSQL on your own EC2. Now you are responsible for: 

    Installing PostgreSQL 
    Updating PostgreSQL 
    Security patches 
    Automatic backups 
    Crash recovery 
    Replication 
    Monitoring 
    Storage management

    That's a lot of work. AWS Says: "Don't worry. We'll manage PostgreSQL for you."

    You simply connect to it. This is called: Managed Database. 

- AWS's managed PostgreSQL service is: Amazon RDS (Relational Database Service)

**What is Hypervisor?**

- A Hypervisor is software that sits between the physial hardware and the virtual machines. 

- Think of it as a manager. 

- It says: 

    "Customer A gets 4GB RAM and 2 CPUs"
    "Customer B gets 8GB RAM annd 4 CPUs"
    "Customer C gets Windows"
    "Customer D gets Ubuntu"

    Every customer thinks they own an independent computer. Actually, they're sharing one physical machine. 

- A Hypervisor is virtualization software that allows multiple isolated virtual machines to run on a single phsyical server by allocating hardware resources such as CPU, memory, storage, and networking to each virtual machine. 

- Before AWS, companies bought a physical server. Imagine this machine 

```js
CPU: 64 Cores
RAM: 256 GB
Storage: 10 TB
```

Now suppose only one small Node.js application is running. It only needs: `2 CPU, 4GB RAM`

The remaining: `62 CPU, 252 GB RAM` is wasted

Question: Can Amazon divide one physical server among many customers?

    Yes. But how? 

    A normal operating system cannot securely divide one computer into many completely independent computers. 

    To solve this problem, software called a Hypervisor was created. 

- A hypervisor enables cloud providers such as AWS to efficiently utilize physical hardware by partitioning a single server into multiple isolated virtual machines. 

    Each virtual machine behaves like an indepndent computer with its own operating system, memory, storage, and CPU allocation. 

    This allows multiple customers to securely share the same physical infrastructure without interfering with each other. 

**What Is An EC2 Instance?**

- When AWS creates one virtual machine for you, that virtual machine is called an: `EC2 Instance`. 

- Think: 

    Physical Server
        ↓
    Hypervisor
        ↓
    EC2 Instance

    Every EC2 instance is simply your own virtual computer.  


## IAM (Identity and Access Management)

- AWS IAM is a service that enables administrators to securely manage authentication and authorization by controlling who can access AWS resources and what actions they are permitted to perform. 

- IAM provides centralized access control for AWS resources. 

    It allows organization to create users, groups, and roles, and assign permissions. 

    Instead of giving every developer full administrative access, IAM ensures that each user or service receives only the permissions required to perform its responsibilities, improving both security and operational control. 

**Why Was IAM Created?**

Imagine you own an AWS ccount. Inside it you have: 

- EC2 servers
- S3 buckets
- Databases
- CloudFront distributions 

- Now your company hires: 

    10 backend developers
    5 frontend developers
    2 DevOps engineers 

    Question: Should everyone have full access to everything? 

    No

    A frontend developer should not be able to delete the production database. 

    A junior backend developer should not accidentally terminate all EC2 instances. 

- AWS needed a way to answer: Who can access that? That is exactly why IAM exists. 

**Authentication vs Authorization**

- Authentication answers: Who are you?

- Authorization answers: What are you allowed to do? 

    Can Sonu create an EC2 instance?
    Can Sonu delete an S3 bucket? 
    Can Sonu view CloudWatch logs? 

    IAM decides. 


## S3 (Simple Storage Service)

- Amazon S3 is AWS's **object storage** service used to securely store and retrieve files of virtually any size with high durability, scalability and availability. 

- User profile images, Resume upload, Product images, PDF upload, Course videos, Certificates, Chat attachmets - Where are these files stored? 

    Database isnt the correct solution for that. 

The production solution is: Frontend -> Node.js Backend -> AWS S3 

Concepts: Multer, S3, Pre-signed URLs, Public vs Private Buckets, Bucket policies, CloudFront, CDN 

User uploads image -> Stored in S3 -> CloudFront caches image -> Nearest edge location serves image 

**What does Object Storage mean?**

- SQL database stores - `Rows, Columns` 

- MongoDB stores - `Documents`

- S3 stores - `Ojects` 

    An object consists of: File + Metadata 

    Example - resume.pdf
              uploadedBy: Sonu
              uploadedAt: 2026-06-25
              size: 2MB

**Why Was S3 Created?**

Suppose you're building: `Instagram`. Users upload: Images, Videos, Stories

Question - Where should these files go? 

    Neither database nor uploads/ inside Node.js project - since both not a production solution. 

Imagine: `10 million images` stored inside your Node.js server. 

    Problems: Server storage fills up, Deployments become difficult, Scaling becomes harder, Multiple servers can't easily share local files 

    Need dedicated file storage. AWS created: Amazon S3. 

**Why not store images in MongoDB?**

- Database are designed to efficiently manage structured and semi-structured data, whereas S3 is specifically designed for storing files and binary objects. 

    In production applications, files are typically uploaded to S3, while only the file URL or metadata is stored in the database. 

    This approach improves scalability, simplifies backups, and keeps database optimized for query performance. 

- MongoDB is optimized for: `Documents`. Not: `Videos, Images, PDFs, ZIP Files`

- Storing large binary files inside a database: increases database size, Slow backups, Makes replication heavier, Increases storage cost 

- Better approach: Store - `Image` in `S3`, Store - `Image URL` in `MongoDB`

## Bucket 

- A Bucket is the top-level logical container in Amazon S3 used to store objects. 

- S3 provides centralized object storage that is independent of application servers. 

    Multiple EC2 instances can upload and retrieve files from the same bucket, making S3 highly suitable for scalable and distributed architectures. 

- Think: Bucket -> Folder, but at the top level. 

- Example: `my-company-image, user-resumes, course-videos`

    These are S3 buckets. Inside them: profile.jpg, resume.pdf, video.mp4

**Why Is S3 Better Than EC2 Storage?**

Suppose your images are stored inside: `EC2 Server`. Tomorrow: `EC2 crashes`. Files gone. 

OR, Launch another EC2. New server has: `No Images`

S3 is shared storage. Every EC2 server accesses the same bucket. 

## Public vs Private Buckets 

**Why was this concept created?**

Imagine you're building an application like Instagram. Users upload: `Profile pictures, Reels, Videos`. 

Now ask yourself: Should everyone on the internet be able to download every uploaded file? 

    Obviously not. Some files should be public. Some should be private. That's why S3 buckets have access control. 

**Public Bucket**

- A public bucket allows objects to be accessed over the internet without requiring authentication, making it suitable for publicly available assets such as website images, CSS files, and JavaScript bundles. 

- Public buckets are typically used for static resources that need to be accessible to all users. 

    Since these files do not contain confidential information, they can be saved directly from S3 or through CloudFront without requiring user authentication. 

- Suppose your company logo is stored in S3. Everyone visiting your website should be able to see it. The image doesn't contain sensitive information. 

    So the bucket (or specific objects) can be public. 

    Anyone with the URL can access it. 

Example: `https://mybucket.s3.amazonaws.com/logo.png`. No authentication required. 

**Private Bucket**

- A private bucket restricts access to authorized users or services only. Objects cannot be accessed directly over the internet without appropriate permissions. 

- Private buckets are used for sensitive or confidential files. Access is controlled through IAM policies, bucket policies, or temporary access mechanisms such as pre-signed URLs, ensuring that only authorized users can retrieve the stored objects. 

- Now imagine: `resume.pdf, aadhar.pdf, passport.pdf, salary-slip.pdf`

- Should anyone with the URL access them? 

    No. These files should only be accessed to the owner or authorized users. So they are stored in a private bucket. 

**Which Bucket Type Would You Use?**

- Public Bucket: Product Images, Company Logo, Static Website Assets 

- Private Bucket: Medical Records, User Documents, Resumes, Invoices, Internal Reports 

### Pre-Signed URL 

- A pre-signed URL is a temporary, secure URL generated by AWS that grants time-limited access to a private S3 object without making the bucket public. 

- Pre-signed URLs enable secure access to private files stored in S3 by generating URLs that remain valid only for a specific duration. 

    This approach allows applications to share private objects without exposing permanent public access or AWS credentials.

**How Pre-Signed URLs Actually Work**

- Suppose you uploaded: `resume.pdf` to a private S3 bucket. The file stays there permanently until you delete it. It doesn't expire. 

- A pre-signed URL is generated dynamically whenever an authorized user requests access to a private object. The object itself remains permanently stored in S3, while the generated URL is valid only for a limited duration. 

    Once the URL expires, users simply request a new one through the application, which performs authentication and authorization before generating another temporary URL.

**Why Was It Created?**

Suppose your bucket is private. User wants to download: `resume.pdf` 

Question: How can the user access it if the bucket is private? 

    Option 1 - Make bucket public. Bad. Everyone can access everything. Need another solution 

    Option 2 - AWS says: "Generate a temporary secure link". 

        Example - Valid for 5 minutes. After 5 minutes - the link stops working automatically. 

        This is called: Pre-Signed URL. 

### Bucket Policy 

- A Bucket Policy is a resource-based policy attached directly to an S3 bucket that defines who can access the bucket and what actions they are permitted to perform. 

- Bucket policies provide fine-grained access control at the bucket level. They allow administrators to specify which AWS users, roles, accounts, or even public users can perform actions such as uploading, downloading, or deleting objects within a specific bucket. 

Imagine - you own a shopping mall. 

- IAM answers: Which employees can enter the mall? 

- Bucket policy answers: What are the rules for this particular shop? 

- IAM is generally attached to: `User, Role, Service`

- Bucket Policy is attached to: `Bucket`

**IAM vs Bucket Policy**

| IAM Policy                          | Bucket Policy                        |
| ----------------------------------- | ------------------------------------ |
| Attached to Users, Groups, or Roles | Attached to S3 Bucket                |
| Controls what a user/service can do | Controls who can access this bucket  |
| Applies across AWS services         | Applies only to that specific bucket |


## Security Groups 

- A Security Group is a virtual firewall that controls inbound and outbound network traffic for AWS resources such as EC2 instances. 

- Security Groups protect AWS resources by defining rules that determine which network traffic is allowed to enter or leave an EC2 instance. These rules are typically based on protocols, port numbers, and source or destination IP addresses. 

    By restricting unnecessary access, Security Groups provide an important layer of network security. 

**Why were security groups created?**

- Imagine your EC2 server is connected to the internet. 

- Question - Should everyone be allowed to connect to: SSH, PostgreSQL, Redis, MongoDB 

    No. You want to decide: Which ports are open? Who can access them? 

    Security groups solve this. 

- Think of a Security Group as the security guard standing outside your EC2 instance. Every request arrives. 

    The security guard checks: 
            
            Which port is being accessed?
            Is this traffic allowed?

            If yes: Request enters. Otherwise: Blocked. 

**Real Example**

Your Node.js server runs on: `Port 3000`. Users shouldn't access it directly. 

Instead: 

- Load Balancer listens on 443 (HTTPS)
- The Load Balancer forwards requests to your EC2 instance 
- The EC2 Security Group allows traffic on port 3000 only from the Load Balancer, not from the public internet. 

Similarly: 

- Port 22 (SSH) is allowed only from your office IP or your personal IP for administration 
- Port 5432 (PostgreSQL) is not open to the internet; only your application server or trusted services can connecct. 

    This is how production systems reduce the attack surface. 

**Inbound vs Outbound Traffic**

- Inbound: Traffic coming into your server. 

    Example: Browser -> EC2 

    User requesting: GET /users This is inbound. 

- Outbound: Traffic leaving your server. 

    Example: EC2 -> MongoDB -> S3 -> Another API 

    Server calling another server. That's outbound.


## CloudFront 

Amazon CloudFront is AWS's Content Delivery Network (CDN) that caches content at geographically distributed Edge Locations and serves it from the location nearest to the user, reducing latency and improving performance. 

- CloudFront improves application performance by caching frequently accessed content at Edge Locations located around the world. Instead of every user retrieving files from the origin server or S3 bucket, users receive cached content from the nearest Edge Location. 

    This reduces latency, decreases bandwidth usage on the origin, and improves the overall user experience. 

- Suppose S3 is in Mumbai. First Canadian user requests: `profile.jpg`. CloudFront checks: `Do I already have it?`. 

    No. So it fetches: Mumbai S3 -> Canada Edge Location - stores a cached copy. Returns image. 

    Now, second Canadian user requests: profile.jpg

    CloudFront says: I already have it. No need to contact Mumbai. Image comes directly from Canada. 

- First Request: User -> CloudFront -> S3 (Mumbai) -> CloudFront stores copy -> User 

- Second Request: User -> CloudFront -> Cached Copy -> User 

    Notice: S3 isn't contacted again. 

**What Happens If Image Changes?**

Suppose you upload: `profile.jpg` again. CloudFront still has: Old version. 

    This is called - Stale Cache 

- To solve this: 

    Set a cache expiry (TTL) after which CloudFront fetches the latest file 
    
    Or, explicitly invalidate the cache object so CloudFront removes it and retrieves the new version on the next request 



**Why Was CloudFront Created?**

Suppose your S3 bucket is in: `Mumbai`. User lives in: `Canada`. User requests: `profile.jpg`

- Without CloudFront: Canada -> Internet -> Mumbai S3 -> Internet -> Canada 

    Every request travles thousands of kilometers. 

    That increases: Latency, Page load time 

- Question: Can AWS keep a copy closer to Canada? 

    Yes. That's why CloudFront exists. 

    

### What is an Edge Location?

- An edge location is a geographically distributed AWS facility that caches and delivers content closer to end users, reducing latency and improving application performance. 

- Edge Locations are part of AWS's global content delivery infrastructure. 

    Instead of serving every request from the origin server or S3 bucket, CloudFront stores frequently accessed content at Edge Locations located around the world. 

    When users request cached content, it is served from the nearest edge location, reducing network latency and improving response times. 

- Suppose your S3 bucket is in: `Mumbai (ap-south-1)`. Now a user from: `London` opens your website. 

- Question - Where will the image come from? 

    Mumbai. Every request has to travel: London -> Internet -> Mumbai AWS Server -> Internet -> London 

    This increases: Latency, Loading time 

- Question - Can AWS keep one copy of that image closer to London users? 

    Yes. That's exactly what an Edge Location is. 

- AWS has small data centers around the world. Not full AWS Regions. Only used to cache frequently requested content. 

- These are called: `Edge Locations`

- Think: Main Storage -> Mumbai 

       Copies - London, Paris, Singapore, Tokyo, New York 

- Now: London user requests - `profile.jpg`. 

    Instead of: London -> Mumbai 

    AWS serves it from: London Edge Location. Much faster. 

**Why not store everything at every edge location?**

- Suppose your S3 bucket contains: `20 TB` of files. 

- Should AWS copy: `20 TB` to: `300+ edge locations`?

    Impossible. Too expensive. 

- Instead: CloudFront says: 

    User Requests Image -> If Cached -> Return immediately. Else -> Fetch from S3 -> Store copy -> Next user gets cached version 

**Why use CloudFront if S3 already stores files?**

S3 is responsible for durable object storage, whereas CloudFront is responsible for fast content delivery. CloudFront caches frequently accessed files at Edge Locations close to users, reducing latency and minimizing repeated requests to the origin S3 bucket. 

## ALB (Amazon Load Balancer)

- An Application Load Balancer (ALB) is an AWS service that receives incoming HTTP and HTTPS requests and distributes them across multiple application servers to improve availability, scalability, and reliability. 

- An ALB acts as the single entry point for client requests. Instead of users connecting directly to individual application servers, all requests are first received by the load balancer. 

    The load balancer evaluates the available servers and forwards each request to an appropriate healthy instance. 

    This distributes traffic evenly, prevents server overload, and improves overall application avaialability. 

**Why Was Load Balancer Created?**

Suppose your Node.js backend is deployed on one EC2 instance. 

    Internet -> EC2 -> Node.js Backend 

    Everything works. 

    Now, instead of 100 users, you suddenly have: 100,000 users. 

Question - Can one server handle everyone?

    Eventually, No. CPU becomes full. RAM becomes full. Response time increases. Application crashes. 

Question - What is the obvious solution? 

    Launch another EC2. Now we have: EC2 - 1, EC2 - 2. 

    Both running the same application. Now another problem appears. 

    How will users know - Should I send my request to: EC2-1 or EC2-2 ? 

- Users don't know. DNS doesn't know. Browser doesn't know. Need someone standing in front of all servers. 

    That someone is called a: Load Balancer. 

- Work (traffic) gets distributed evenly. 

**Real Production Flow**

- Without ALB: Users -> One EC2 -> Application

    If EC2 crashes: Website down

- With ALB:      Users
                   │
                   ▼
        Application Load Balancer
             /        |        \
            ▼         ▼         ▼
        EC2-1      EC2-2      EC2-3

    Every request first reaches the ALB. The ALB decides which server should handle it. The user doesn't know which server actually processed the request. 

**Load Balancing Algorithms**

1. Round Robin: Suppose - Three servers. Requests come: 

    Request 1 → EC2-1
    Request 2 → EC2-2
    Request 3 → EC2-3
    Request 4 → EC2-1
    Request 5 → EC2-2

    Everyone gets work. 

2. Sticky Sessions: Imagine - User logs in. Their cart is stored only in: `EC2-2`

    If the next request goes to: EC2-1, the cart may disappear. 

    One solution is: Sticky Sessions. 

    They try to send the same user's requests to the same server for a period of time. 

    However, in modern applications we usually avoid relying  on sticky sessions by storing session data in shared storage like Redis or by using stateless JWT authentication.

**Why Is Redis Used Instead Of Sticky Sessions?**

Sticky sessions create dependence on a specific application server and reduce flexibility when scaling. Storing shared session data in Redis or using stateless JWT authentication allows any application server to handle any request, improving scalability and fault tolerance. 

**Real Production Example**

Imagine you're building your microservices project. Users acccess: `https://api.company.com`

    That request first reaches the ALB. 

- The ALB forwards it to one of several Node.js instances running the API Gateway or backend service. If you deploy a fourth instance because traffic increases, you register it with the ALB, and it automatically begins receiving requests. 

    Users continue using the same domain witout knowing that the number of backend servers has changed. 

### Health Checks 

- A Health Check is a periodic request sent by the load balancer to verify whether an application server is healthy and capable of handling client requests. 

- Health checks enable the load balancer to continuously monitor application instances. 

    If a server becomes unavailable or starts returning errors, the load balancer automatically stops routing traffic to that server, ensuring that client requests are directed only to healthy instances. 

Suppose: `EC2-2` crashes. Should ALB continue sending requests there? 

    No. How does it know? 

    It performs: Health Checks. 

- Every few seconds, ALB asks each server: `Are you alive?`. Usually by requesting a URL like: `GET /health` 

    If server replies: 200 OK. ALB keeps sending requests. If not, ALB removes that server from rotation until it becomes healthy again. 