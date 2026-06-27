## WebSocket 

WebSocket provides full-duplex, persistent communication between client and server. 

- WebSocket maintains a persistent connection, allowing the server to push real-time updates with minimal latency. 

- Before WebSocket: HTTP only, Server couldn't push data, Clients had to poll 

    `setInterval(fetchMessages, 1000);`

- Problems: Wasted network, Deplayed updates, Server overload 

**How WebSocket solves**

WebSocket enables:

- real-time
- low-latency
- two-communication

    between client and server. 

**How WebSocket works**

1. Client sends HTTP request
2. Server upgrates protocol to WebSocket 
3. Connection stays open 
4. Data flows both way 

    `HTTP -> WebSocket -> Persistent Connection`

**Why latency is low in WebSocket**

- No repeated HTTP requests
- No headers overhead
- No reconnection cost 
- Server pushes data instantly 

**Why does HTTP cause high latency for real-time apps?**

- Core reason: HTTP is request-response based. 

1. Client sends request 
2. Server responds 
3. Connection closes 
4. Repeat again and again. 

**What is HTTP handshake?**

An HTTP handshake is the process of establishing a connection between client and server. 

- For real-time systems, repeated handshakes significantly increase latency. 

**What does polling mean?**

Polling means repeatedly asking the server if new data is available. 

```js
setInterval(()=> {
    fetch("/messages");
},1000) ; 
```

- Problem: Many unnecessary requests, Server overload, Delayed real-time updates 

- Polling wastes resources because the client repeatedly asks even when no new data exists. 

**How does WebSocket connection work?**

1. Client sends HTTP request
2. Server upgrades protocol to WebSocket 
3. Connection remains open
4. Client and server can send data anytime 

**HTTP is two-way too, so why WebSocket?**

HTTP: 

- Client always starts communication 
- Server cannot send data on its own
- Connection closes after response 

WebSocket: 

- Both can send data anytime 
- Server can push messages 
- Connection stays open 

HTTP is bidirectional, but not real-time whereas WebSocket allows full-duplex communication. 

**Isn't keeping a WebSocket connection open expensive?**

No. Why it's efficient: 

- No repeated handshakes 
- No repeated headers
- One persistent connection 
- Less CPU & network usage over time. 

| HTTP                   | WebSocket           |
| ---------------------- | ------------------- |
| Many short connections | One long connection |
| Repeated overhead      | Minimal overhead    |
| High latency           | Low latency         |


A persistent WebSocket connection is more efficient than repeated HTTP requests for real-time communication. 


**Real-life use cases**

- Chat apps 
- Notifications 
- Live tracking 
- Multiplayer games 

**Socket.io Vs. WebSocket**

- WebSocket: protocol, low-level, minimal overhead

- Socket.io: library, Auto reconnection

- WebSocket is the protocol; Socket.IO is a higher-level abstraction with extra features. 

## Polling Vs. Push

**Polling**

- Client keeps asking server: Any update? Any update? Any update?

- Problems: Wasted requests, High server load, Delayed updates, Poor scalability 

```js
setInterval(() => {
    fetch("/notifications") ;
}, 2000)
```

- Polling is inefficient because the client sends repeated requests even when no new data is availble. 

**Push (WebSocket / Socket.io)**

- Server pushes data instantly when it changes. 

- Flow: Connection open, Server sends data when needed, No repeated requests 

- Benefits: Real-time updates, Low latency, Fewer network calls 

- Push-based communication allows the server to send data immediately without the client requesting it repeatedly.


## Socket.IO room 

A Socket room is a logical grouping mechanism provided by Socket.IO that allows the server to send messages to a specific set of connected clients instead of broadcasting messages to every connected user. 

- A room is a logical group of socket connections. 

- It lets you send messages to specific users or groups, not everyone. 

- Thousands of users are connected to your server through WebSockets. When User A sends a message to User B, you do not want every connected user to receive that message. You only want the intended participants to receive it. 

    Socket rooms solve this problem by allowing the server to create logic groups of connected users. A room can represent a private conversation, a group chat, a notification channel, a game lobby, or any other collection of users. When a message is sent to a room, only the users who belong to that room receive the message. 

    In simple terms, a room acts like a virtual group inside the server that helps send messages only to relevant users instead of broadcasting them to everyone. 

- In real-time applications such as chat systems, notification platforms, online gaming systems, and collaborative tools, it is often necessary to send messages only to a specific subset of connected users. Broadcasting every event to all connected clients would be inefficient and could expose information to unintended users. 

- Socket.IO addresses this problem through the concept of `rooms`. A room is a logical grouping of sockets that allows the server to organize connected users based on business requirements.

    For example - all participants of a private chat can be placed in one room, while members of a group discussion can be placed in another room. 

- When the server emits an event to a particular room, Socket.IO ensures that only the sockets belonging to that room receive the event. This improves performance, reduces unnecessary network traffic, and enables scalable real-time communication. 

**Why Do We Need Rooms?**

Consider a WhatsApp-like application. Suppose: 

    User A
    User B 
    User C 
    User D, are connected. 

- User A sends a message to User B. 

    Without rooms: Server -> Broadcast Message -> A, B, C, D receive message. 

        This is wrong because: User C, User D shouldn't recieve a private message. 

    We need a way to group specific users together. This is where rooms come in. 

- Think of a room as: A Virtual Group inside the server.

    Example: `room_123` -> User A, User B

        `room_456` -> User C, User D 

    Now, when a message is sent to: `room_123` only -> User A, User B receive it. 

- Socket Rooms improve efficiency and privacy by ensuring that messages are delivered only to relevant users. Without rooms, the server would need to broadcast messages to all connected clients, resulting in unnecessary network traffic and incorrect message delivery. 

- Socket Rooms are commonly used in private messaging systems where each conversation is assigned a separate room. They are also used in group chat applications where all members of a group belong to the same room. 

    In notification systems, users can be grouped based on roles, subscriptions, or preferences, allowing notifications to be delivered only to relevant recipients. Gaming applications use rooms to represent individual game sessions, ensuring that game events are shared only with participating players. 

**Real World Uses of Socket Rooms**

Socket rooms are commonly used in private messaging systems where each conversation is assigned a separate room. They are also used in group chat applications where all members of a group belong to the same room. 

    In notification systems, users can be grouped based on roles, subscriptions, or preferences, allowing notifcations to be delivered only to relevant recipients. 

    Gaming applications use rooms to represent individual game sessions, ensuring that game events are shared only with participating players. 

**How are Socket rooms used in production?**

In production systems, rooms are commonly used for private messaging, group chats, notification channels, and live events. 

In distributed environments with multiple server instances, `Redis adapters` are often used to synchronize room events across servers. 

**Socket Rooms in Distributed Systems**

In a single-server application, Socket Rooms are managed entirely by Socket.IO. However, when an application is deployed across multiple servers, room information becomes distributed across different instances. 

In such scenarios, technologies such as `Redis Pub/Sub` are often used to synchronize room events between servers. This ensures that users connected to different servers can still participate in the same room and receive real-time updates consistently. 

**Are Rooms Stored In Database?**

No. Rooms are maintained by Socket.IO in memory. 

    This creates scaling problem. 

**Scaling Problem**

Suppose: Server 1, Server 2, Server 3

- User A connected to: Server 1

- User B connected to: Server 3

    Room information exists separately on each server. 

**How does Server 1 know that User B is on Server 3**

It doesn't. This is where: `Redis Adapter`, `Redis Pub/Sub` comes into the picture. 

## Redis + Socket Rooms 

When a message is emitted: `Server 1` - publishes event through Redis. 

- Redis distributes event to: `Server 2`, `Server 3`

- Server 3 finds: `User B` inside the room and delivers the message. 

    This is how large-scale chat systems work. 

**Real-life use cases**

- Chat app: one room per chat, Only chat members receive messsages 

- Notifications: One room per user, User gets only their notifications 

- Live classes: One room per class, Only enrolled users get updates 

`Socket joins room -> Server emits to room -> Only sockets in that room receive it`

**Why rooms matter**

- Without rooms: `io.emit()` - sends to everyone 

- With rooms: `io.to(roomId).emit()` - targeted

