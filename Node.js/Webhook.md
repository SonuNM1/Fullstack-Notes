## Webhook 

- A webhook is an HTTP callback mechanism that allows one system to automatically send real-time notifications to another system when a predefined event occurs. 

- Webhooks are used to enable event-driven communication between different applications. Instead of continuously requesting information from another service, an application an register a webhook URL and allow the external service to notify it whenever a relevant event occurs. 

    When the event takes place, the external service sends an HTTP request, typically a POST request, to the registered webhook endpoint along with event-related data. The receiving application processes the payload and performs the required business logic. 

    This approach reduces unnecessary network requests, improves efficiency, and enables near real-time synchronization between systems. 

- Webhook is used in: Payment gateways, Razorpay, Stripe, GitHub, Slack, Google Calendar, Shopify, N8N, Zapier 

- Suppose your application needs to know when a payment is successful. 

    One approach is: 

        Your Server: 
            "Payment done?"
            "Payment done?"
            "Payment done?"

        asking every few seconds. This is called: Polling. The problem is that most of the time the answer is: No, which wastes resources.

        Instead, we can tell the payment provider: "When the payment succeeds, call my API and inform me"

        This is called a Webhook. 

        In simple terms, a webhook is a mechanism through which one application automatically notifies another application when a specific event occurs. 

**Polling vs Webhook**

Polling - In polling, the client repeatedly sends requests to check whether new data is available. Even if nothing has changed, requests continue to be sent. 

Webhook - In webhooks, the client registers a callback URL and waits. The external system sends data only when an event actually works. 

**Real Example - Payment Gateway**

Suppose a user makes a payment using a payment gateway. The user may close the browser immediately after payment. 

- If your application relies only on frontend confirmation, payment status could become inconsistent. 

- Instead, the payment provider sends a webhook request to your backend when the payment is completed. 

- Your server receives the webhook, verifies its authority, updates the database, and marks the order as paid. 

- This ensures that the system remains accurate even if the user closes the browser or loses internet connectivity. 

**Real Example - GitHub**

Suppose you want automatic deployment whenever code is pushed. 

- When a developer pushes code to GitHub, GitHub sends a webhook request to your deployment server. 

- The deployment server receives the event and starts the CI/CD pipeline automatically. 

- This is how many automated deployment systems work. 

**Webhook Flow**

A webhook typically follows 4 steps: 

1. An application exposes a webhook endpoint 
2. The external service is configured with that endpoint URL 
3. An event occurs in the external service. 
4. The external service sends a HTTP request containing event data to the webhook endpoint. 

## Payment Gateway and Order Management 


`Client (Web/App) -> Backend (Orders & Payments) -> Payment Gateway (Razorpay / Stripe) -> Bank / Card Network`

Payment systems are asynchronous, idempotent, and event-driven. This means: 

- Asynchronous: Payment does not finish instantly 

- Idempotent: Same action repeated does not cause duplicate result 

- Event-driven: System reacts to payment events instead of assuming success. 

**What does asynchronous mean in payments?**

Payment takes time and happens in multiple steps. 

- Why? Bank processing, Network delays, User actions (OTP, UPI approval)

- Example: User clicks Pay -> Payment is started -> Final result comes later via webhook 

- Payments are asynchronous because the final success or failure is confirmed later by the payment gateway. 

**What is Idempotent?**

Doing the same operation multiple times gives the same result. 

- Example: User clicks Pay twice or Gateway sends webhook twice. 

    Without idempotency: Money deducted twice, Order shipped twice 

    With idempotency: Payment processed once, Order updated once 

- Idempotency is implemented by checking the current state before processing and ignoring duplicate requests. 

**How we ensure Idempotency?**

- Every order has unique `orderId`

- Before updating order: Check current status 

- Idempotency ensures that repeated requests don't create duplicate payments or orders. 

**What does event-driven mean in Payment systems?**

- System waits for events like "payment success" or "payment failed". 

- Example: payment.success, payment.failed, refund.completed 

    System reacts only when event happens. 

**How do we avoid double charges?**

Problems that cause double charge: 

- User double clicks pay button 
- Page refresh 
- Network retry 
- Webhook sent twice 

Solutions: 

- Unique order ID (Every payment tied to one order)

- Disable pay button (After first click)

- Idempotent backend logic (Is this order already paid?)

**How to handle double click on Pay button**

Frontend solution: 

- Disable button after first click
- Show loader 

Backend solution (Even if frontend fails): 

- Backend checks order status 
- Processes payment only once 


## Webhook 

A webhook is a server-to-server callback sent by the payment gateway to notify payment result. 

- Why webhook is needed? 

    Frontend cannot be trusted, 
    
    Payment happens outside your system 

- Example: 

    User pays -> Gateway processes -> Gateway calls your backend API 

- Webhooks allows payment gateways to securely notify backend systems about payment outcomes 

| HTTP API               | Webhook               |
| ---------------------- | --------------------- |
| Client → Server        | Server → Server       |
| Request based          | Event based           |
| Frontend calls backend | Gateway calls backend |
| User initiated         | System initiated      |


