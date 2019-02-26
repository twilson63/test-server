const test = require('tape')
const express = require('express')
const fetch = require('node-fetch')

const testServer = require('../')

test('throw error if not express server', t => {
  try {
    const server = testServer()
  } catch (err) {
    t.equals(err.message, 'Express App is required!')
    t.end()
  }
})

test('express server should listen and close', async t => {
  const app = express()
  app.get('/', (req, res) => res.send({ok: true}))
  const server = testServer(app)

  const result = await fetch(server.url).then(r => r.json())
  t.ok(result.ok)
  server.close(() => t.end())
})


