# microblog
Self-hosted microblog service

## Notes



## Getting Started

###

```sh
# Generate Redis password
openssl rand -base64 100
```

## TEMP


TODO: Organise into better place.

Authenticate tweets posted to ZECpages with a server secret signed with timestamp. Threat model: if server secret leaks, all records until that point should be still considered as authentic.

### Custom byte length – collision risk

```js

const crypto = require('crypto')

const get4DigitsCode = (message) => {
  const hash = crypto
    .createHmac('sha256', Buffer.from(SECRET, 'hex'))
    .update(message)
    .digest('hex');
  const first4HexCharacters = hash.slice(0, 4);
  const int = parseInt(first4HexCharacters, 16) % 10000;
  let code = int.toString();
  code =
    Array(4 - code.length)
      .fill(0)
      .join('') + code;
  return code;
};

```

### 43 bytes

```js
let secret = "your-256-bit-secret"; // the secret key
let enc = new TextEncoder("utf-8");
let body = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";
let algorithm = { name: "HMAC", hash: "SHA-256" };

let key = await crypto.subtle.importKey("raw", enc.encode(secret), algorithm, false, ["sign", "verify"]);
let signature = await crypto.subtle.sign(algorithm.name, key, enc.encode(body));
let digest = btoa(String.fromCharCode(...new Uint8Array(signature)));
```

### JWT/Paseto asymmetric authentication code

- https://github.com/panva/paseto/blob/main/docs/README.md#v2verifytoken-key-options=
- `V2.verify()`
- Web usage (`libsodium`) – https://stackoverflow.com/questions/67876326/need-help-verifying-paseto-tokens-validity-in-javascript-currently-have-flaky-b

```js
// TODO: Extract function from Pasteto.js
// 
```