## JWT - The 3 Components 

JWT consists of a header, payload, and signature. The header defines the algorithm, the payload carries claims like user data, and the signature ensures the token has not been tampered with. 

- JWT looks like this 

    xxxx.yyyy.zzzz

    It has 3 parts, separated by dots (.)

1. **Header**

Contains: 

- Token type (JWT)
- Signing algorithm (HS256, RS256)

Purpose: tells how the token is signed 

2. **Payload**

Contains: 

- userId
- role
- email
- expiry (exp)

Purpose: stores user-related data 

Not encrypted, only Base64 encoded 

3. **Signature**

Created using: 

- Header 
- Payload 
- Secret key (server only)

Purpose: Ensures token integrity and authenticity. Ensures token hasn't been tampered. 

- If payload is changed, signature fails, token invalid 

