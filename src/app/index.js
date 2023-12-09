const netPkg = require('net')
const path = require('path')
const fs = require('fs')

const { Request } = require('./libs/parsers/request.js')

const { Response } = require('./libs/parsers/response.js')

const { PORT } = require('./config.js')

const app = require('./app.js')

const server = netPkg.createServer((socket) => {
  let lastData = Date.now()

  let cseq = 0

  const sessionId = Date.now()

  socket.on('data', (data) => {
    const dateStr = data.toString()

    fs.writeFileSync(path.resolve('.', 'files', `${Date.now()}.http`), dateStr)

    const req = new Request(dateStr)

    const res = new Response(req)

    res.setHeader('Session', sessionId)

    res.setHeader('CSeq', ++cseq)

    const runned = app.run(req, res)

    console.log({ req, res, runned, data: dateStr })

    socket.write(runned.toString())

    lastData = Date.now()
  })

  setInterval(() => Date.now() - lastData > 500 ? socket.end() : null, 500)
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
