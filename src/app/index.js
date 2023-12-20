import netPkg from 'net'

import { HttpRequest, HttpResponse } from '@brtmvdl/backend'

import { Logger } from '@brtmvdl/logger'

import { PORT } from './config.js'

import app from './app.js'

const logger = new Logger('server')

logger.setPath('files')

const server = netPkg.createServer((socket) => {
  let cseq = 0

  const sessionId = Date.now()

  socket.on('data', (data) => {
    const dateStr = data.toString()

    logger.file(`${Date.now()}.http`, dateStr)

    const req = new HttpRequest(dateStr)

    const res = new HttpResponse(req)

    res.setHeader('Session', sessionId)

    res.setHeader('CSeq', cseq++)

    res.on('data', (r) => socket.write(r.toString()))

    res.on('end', (r) => socket.end(r?.toString()))

    app.run(req, res).catch((err) => res.setError(err)).finally(() => res.end())
  })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
