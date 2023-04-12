# OAuth 2.0 Authorization Framework

Issues of traditional client-server authentication model
- 3rd party is required to store credentials in forms of raw text (e.g: API key)
- Server needs to take care of securing password
- Lacks of strictness on duration (for how long?) and resource (which resource?)
- Credentials revocation becomes abundant
- 3rd party credentials compromising

## Roles
- Client
- Resource Owner
- Authorization Server
- Resource Server

## Flow

Diagram

```text
     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+
```

## References
- [OAuth 2 - RFC6749](https://www.rfc-editor.org/rfc/rfc6749)
- [OAuth 1 - RFC5849](https://www.rfc-editor.org/rfc/rfc5849)

