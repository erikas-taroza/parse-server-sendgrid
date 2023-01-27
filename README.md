# parse-server-sendgrid

A package for sending emails from Parse server over SendGrid.

## Usage
```js
import ParseServerSendGrid from "parse-server-sendgrid";

const config = {
  // ...
  emailAdapter: ParseServerSendGrid({
    apiKey: "Your API key",
    from: "Name <name@domain.com>",
    // Your template IDs -------v
    passwordResetTemplateId: "d-.....",
    verificationTemplateId: "d-....."
  })
};
```
