const { Router } = require('./libs/router/index.js')

const app = new Router()

app.request('GET', '/', (_, res) => res.setText('index'))

app.request('GET', '/app.json', (_, res) => res.setJSON({ date: Date.now() }))

app.request('SETUP', '*', (_, res) => res)

app.request('PLAY', '*', (_, res) => res)

app.request('TEARDOWN', '*', (_, res) => res)

module.exports = app
