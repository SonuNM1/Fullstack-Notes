WebSocket is a protocol that provides full-duplex, real-time communication between client and server over a single persistent connection. 

- HTTP: request/response (one-way)
- WebSocket: two-way, real time 

- A WebSocket is a full-duplex, persistent connection between client and server. 

    Once established, either side can push data at any time. 

    HTTP, in contrast, is a stateless request/response protocol where the client always starts a conversation and the server just replies. 

## Why not HTTP/REST for real-time 

Problem with HTTP: 

- Client must keep polling 
- High latency
- Wasted bandwidth 

WebSocket solution: 

- Server pushes data instantly 
- No repeated requests 

- `WebSocket` eliminate polling and reduce latency. 

| HTTP             | WebSocket      |
| ---------------- | -------------- |
| Stateless        | Stateful       |
| Request/response | Bi-directional |
| High latency     | Low latency    |
| Polling required | Push based     |


## How does WebSocket work?

1. Client sends HTTP request 
2. Server upgrades protocol to WebSocket
3. Connection stays open 
4. Data flows both way 

- WebSocket starts as HTTP and then upgrades the connection. 


## Full=duplex communication 

Both client and server can send messages at the same time. 

- Example: Chat apps, Online games, Live dashboards, multiplayer games, Notifications, Live stock prices

- Used where instant updates are required 

## WebSocket Vs. Socket.IO

- Socket.IO is a library, WebSocket is a protocol. 

WebSocket 

- Low-level protocol 
- No fallback
- Lightweight 

Socket.IO

- Built on top of WebSocket
- Auto reconnect 
- Fallback to polling 
- Rooms, namespaces 

## Are WebSockets stateful or stateless? 

- Stateful. Connection stays open. 

- Server remembers client. 

- WebSockets maintain state through persistent connections. 

| HTTP         | WebSocket           |
| ------------ | ------------------- |
| Stateless    | Stateful            |
| Request ends | Connection persists |
| No memory    | Maintains session   |


## Polling 

Polling is a technique where the client repeatedly sends requests to the server at fixed intervals to check if nenw data is available. 

Client → Request → Server
(wait 5 seconds)
Client → Request → Server
(wait 5 seconds)

- Even if there is no new data, requests are still being sent. 

**Why polling is a problem:**

- Unnecessary requests
- Increased server load 
- Wasted bandwidth 
- Delayed updates 

- Polling wastes resources because the client keeps asking even when there is no data. 

## Latency: 

Latency is the time delay between a request and the response. 

- High latency: slow experience
- Low latency: real-time feel 

**Polling Vs WebSocket**

- Polling: high latency (waits till next request)

- WebSocket: low latency (instant push)

## Bandwidth 

- The amount of data transferred over the network. 

- Why polling wastes bandwidth? 

    Repeated headers, Empty responses, Duplicate requests 

- Polling consumes more bandwidth due to repeated requests. 


## What happens if a WebSocket connection drops? 

Common reason for drop: 

- Network issues 
- Server restart
- Client refresh
- Timeout 

How to handle it: 

- detect disconnect 
- Attempt reconnection
- Re-authenticate
- Resume session 

Technologies used: 

- heartbeat (`ping/pong`)
- auto-reconnect logic 

- `Heartbeat` mechanisms are used to detect broken connections. 

## Push Notification 

The server sends data to the client without the client asking for it. 

- Example: WhatsApp message, Swiggy order updates, System notifications 

- WebSockets are commonly used to implement push-style real-time updates in web apps. 


## What happens if a WebSocket connection drops? 

What causes drop? 

- Network issue 
- Server crash
- Client refreshes page 
- Timeout 

What happens?

- Connection is closed 
- Server loses reference to that client 
- No messages can be sent 

How do we handle it? 

- Detect `onclose` or `onerror`
- Reconnect from client 
- Restore state if needed 


## How do you establish a WebSocket connection? 

1. Client sends HTTP handshake request 

2. Server responds with 101 Switching protocols (101 is an HTTP status code that means the server has accepted the client's request to switch protocols)

3. Protocol upgrades from HTTP -> WebSocket

4. Persistent connection is established

5. Data flows both ways (full-duplex)

    This happens only once. 


## WebSocket handshake process 

Browsers always starts as HTTP. 

- Browsers are not allowed to open raw TCP connections. So WebSocket uses HTTP first, then upgrades.

1. Client opens HTTP connection 

2. Client sends HTTP request with `Upgrade: websocket`

3. Server validates headers

4. Server replies with 101 Switching Protocols

5. Protocol switches to WebSocket

6. Persistent, full-duplex channel established

    Handshake happens only once. 


## Implementing heartbeat (ping/pong) to keep the connection alive 

WebSocket connections can silently die due to: 

- Network issues
- Proxy / firewall timeout 
- Idle connections 

Client & server may think connection is alive, but it's actually dead. 

**Solution: Heartbeat (Ping/Pong)**

Heartbeat is a health-check mechanism where the server periodically sends ping frames and expects pong responses. 

    If the pong isn't received within a timeout, the server assumes the client is disconnected and cleans up resources. 

- Server periodically sends ping 
- Client responds with pong 
- If no pong -> connection is dead -> terminate 

## Automatic reconnection on the client 

WebSocket connections can drop because of: 

- Network switch
- Server restart
- App refresh 

    Without reconnection -> real-time features break. 

**Solution: Auto-reconnect with backoff**

WebSockets didn't reconnect automatically. The client must detect connection close events and retry the connection, usually the exponential backoff to avoid server overload. 

- Use exponential backoff 

## Secure a WebSocket connection 

**Security Problems in WebSockets**

- No built-in auth like HTTP headers
- Long-lived connections 
- Risk of hijacking if unsecured 

1. Use Secure Protocol (`wss://`)

    WebSocket security starts with usiing `wss://` which encrypts data using TLS, similar to HTTPS.

2. Authenticate during handshake (JWT)

3. Authorize messages (RBAC)

## Broadcasting a message to all connected WebSocket clients 

- Broadcasting: Sending one message to all active connections. 

- Used in: Chat apps, Notifications, Live dashboards 

- Broadcasting means iterating over all connected clients and sending the message to each active socket. 

- Check `readyState === OPEN`
- Avoid sending to closed sockets 

- For multiple servers, broadcasting requires `pub/sub` system like Redis. 


## Pub-Sub (Publish-Subscribe)

- Pub-Sub is a messaging pattern where senders don't talk directly to receivers. 

    Instead everyone talks through a middleman. 

**Components**

1. Publisher - sends message 
2. Subscriber - receives message 
3. Broker - middleman (Redis, Kafka, RabbitMQ)
4. Topic / Channel - message category 

`Publish -> Broker -> Subscribers`

**Problem without Pub-Sub**

- User A connects to Server 1
- User B connects to Server 2
- Server 1 can't directly message Server 2

    Messages don't reach all users. 

`User A -> Server 1 -> Redis -> Server 2 -> User B`

    Redis acts as the broker. 

- Pub-Sub is a messaging pattern where publishers send messages to a topic, and subscribers receive messages from that topic via a broker, without knowing each other. 

**Why Pub-Sub is used**

- Loose coupling 
- Scalability
- Multi-server communication 
- Real-time updates

| Direct                | Pub-Sub         |
| --------------------- | --------------- |
| Sender knows receiver | Sender doesn’t  |
| Hard to scale         | Easy to scale   |
| Tightly coupled       | Loosely coupled |


## Pub-Sub Vs. RabbitMQ 

NO. Pub-Sub is a pattern, RabbitMQ is a tool that implements messaging patterns. 

- Pub-Sub -> Concept / Idea (like "OOP")
- RabbitMQ -> Software / Tool (like "Java")

- RabbitMQ is a message broker that helps different services communicate reliably and asynchronously. 

- Think of it as a post office: 

    Sender drops a letter
    RabbitMQ delivers it 
    Receiver picks it up later 

    Sender and receiver don't talk directly. 


**Core RabbitMQ Components** 

1. Producer - Send messages 

2. Exchange - Decides how messages are routed 

3. Queue - Stores messages 

4. Consumer - Reads messages from queue 

`Producer -> Exchange -> Queue -> Consumer`

**When to use**

- Background jobs 
- Email sending 
- Payment processing 
- Order pipelines 
- Event-driven microservices 

| RabbitMQ                   | Kafka             |
| -------------------------- | ----------------- |
| Queue-based                | Log-based         |
| Message removed after read | Messages retained |
| Task processing            | Event streaming   |
