import path from 'path'

import { Router } from '@brtmvdl/backend'

import { PATH } from './config.js'

const app = new Router()

// HTTP

app.request('GET', '/', (_, res) => res.setFile(path.resolve(PATH, 'audio.mp3')))

app.request('GET', '/audio.mp3', (_, res) => res.setFile(path.resolve(PATH, 'audio.mp3')))

// RTSP

app.request('OPTIONS', '*', (_, res) => res.setHeader('Public', 'DESCRIBE, SETUP, TEARDOWN, PLAY, PAUSE'))

app.request('DESCRIBE', '*', (_, res) => res)

app.request('SETUP', '*', (req, res) => res.setHeader('Transport', req.getHeader('Transport')))

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

export default app
