# baileys-whatsapp-api
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
## Install
```bash
git clone https://github.com/danarn17/baileys-whatsapp-api danarn17
cd danarn17
npm install
```

## Setup new instance
```bash
npm start
```

Make a post to `http://localhost:3000/new` with:
```JSON
{
  "webhook": "https://123412341234.ngrok.io/"
}
```

You can get a free subdomain to proxy the request to your localhost:
- https://ngrok.com/download

You don't need to respond to that request, copying the log from the ngrok dashboard is enough.

The QRcode will be sent to the webhook. You will need to transform it into an image. You can use:
- https://www.qr-code-generator.com/

The QRcode has a 20 seconds life.

You can read the QRCode from the terminal too.

## routes
- `GET {host}/` hello world
- `GET {host}/:number/up` start baileys
- `GET {host}/:number/down` stop baileys

[API documentation](./danarn17.postman_collection.json)

## There is no authentication
