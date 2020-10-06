# test-server

test-server is a function that takes an express app as an argument and spins up a server using the express app, then returns an object containing the following:

* Server URL
* Server Port
* Close method

The server url is the location that the server is listening for requests, the port is the specific port number and the close function will stop the server from listening.

## Motivation

I wanted a way to spin up a node express server in an integration test environment dynamically, and then close the server when the test completed. `SuperTest` is a great way to do this, but it comes with its own way of calling the express server. I wanted to be able to choose how I call the express server for testing. This is why I built test-server, so I can just use fetch, request, or got to call my express server and not some custom dsl.

## Usage

Requirements

* Node 10 or greater
* Express 4 or greater

Install

``` sh
npm install @twilson63/test-server
```

> NOTE: in your express server remember to export the app and only call the listen
> method if the module does not have a parent
>
> ```
> if (!module.parent) {
>   app.listen(...)
> }
>
> module.exports = app

Test Example

``` js
const test = require('tape')
const testServer = require('@twilson63/test-server')
const app = require('../server')
const fetch = require('node-fetch')

test(async t => {
  // start server
  const server = testServer(app)
  // run test
  const result = await fetch(server.url).then(r => r.json())
  // do assertions
  t.ok(result.ok)
  // close server and end test
  server.close(() => t.end())
})
```

## Test

``` sh
npm test
```


## License

MIT

## Contributions

PRs Welcome

## Thanks

- SuperTest
- create-test-server


