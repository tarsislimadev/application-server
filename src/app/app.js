const { Router } = require('./libs/router/index.js')

const app = new Router()

// HTTP

app.request('GET', '*', (_, res) => res)

// RTSP

app.request('OPTIONS', '*', (_, res) => res.setHeader('Public', 'DESCRIBE, SETUP, TEARDOWN, PLAY, PAUSE'))

app.request('DESCRIBE', '*', (_, res) => res)

app.request('SETUP', '*', (_, res) => res)

// app.request('PLAY', '*', (_, res) => res)

app.request('PLAY', '/stream=0', (_, res) => res)

app.request('PLAY', '', (_, res) => res)

app.request('PAUSE', '*', (_, res) => res)

app.request('RECORD', '*', (_, res) => res)

app.request('ANNOUNCE', '*', (_, res) => res)

app.request('TEARDOWN', '*', (_, res) => res)

app.request('GET_PARAMETER', '*', (_, res) => res)

app.request('SET_PARAMETER', '*', (_, res) => res)

app.request('REDIRECT', '*', (_, res) => res)

module.exports = app
