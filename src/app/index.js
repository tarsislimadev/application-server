const netPkg = require('net')

const { Request } = require('./libs/parsers/request.js')

const { Response } = require('./libs/parsers/response.js')

const { PORT } = require('./config.js')

const app = require('./app.js')

const server = netPkg.createServer((socket) => {
  let lastData = Date.now()

  socket.on('data', (data) => {
    console.log('socket.on:data', { data: data.toString() })

    const req = new Request(data.toString())

    const res = new Response(req)

    const runned = app.run(req, res)

    console.log('socket.on:data', { req, res, runned })

    socket.write(runned.toString())

    lastData = Date.now()
  })

  setInterval(() => Date.now() - lastData > 1000 ? socket.end() : null, 1000)
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
