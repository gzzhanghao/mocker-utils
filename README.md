# @gzzhanghao/mocker-utils

Utility functions for building mocker's mockup rules.

## Usage

```bash
npm i -S @gzzhagnaho/mocker-utils
```

Then import the package in your mocker rules:

```javascript
//
// Import functions from mocker-utils:
//
// import { file } from '@gzzhangaho/mocker-utils'
//
export default [

  '//www.google.com/', [

    // response `www.google.com` with `/tmp/google.html`
    // request will pass through if the file does not exists
    file('/tmp/google.html'),

    // send request and save the response body into `/tmp/google.html`
    save('/tmp/google.html'),
  ],

  // respond with html content
  '//mocker.io/', [
    req => html(`<h1>It works ${req.query.name}!</h1>`),
  ],

  // respond with json data
  '//mocker.io/awesome-api', [
    req => json({ username: req.query.name }),
  ],

  // add CORS / custom headers to third-party API
  '//awesome.com/api', [
    headers({ 'access-control-expose-headers': 'X-My-Custom-Header' }),
    cors(),
  ],

  // Hijacking WebSocket connection. http://www.websocket.org/echo.html
  'ws://echo.websocket.org', async req => {
    const socket = await ws(req)
    socket.on('message', msg => {
      socket.send(`[MOCKER] ${msg}`)
    })
  },
]
```
