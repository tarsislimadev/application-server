// 

class Request {
  protocol = null
  method = null
  path = null
  headers = {}
  body = ''

  constructor(data = '') {
    this.protocol = this.parseProtocol(data)
    this.method = this.parseMethod(data)
    this.path = this.parsePath(data)
    this.headers = this.parseHeaders(data)
    this.body = this.parseBody(data)
  }

  getHeadersAndBody(data = '') {
    return data.toString().split('\r\n\r\n', 2)
  }


  parseHeaders(data) {
    const [headers,] = this.getHeadersAndBody(data)
    return headers
  }

  getFirstLine(data) {
    const [first,] = this.parseHeaders(data).split('\r\n')
    return first
  }

  parseProtocol(data) {
    const [, , protocol,] = this.getFirstLine(data).split(' ')
    return protocol
  }

  parseMethod(data) {
    const [method,] = this.getFirstLine(data).split(' ')
    return method
  }

  parsePath(data) {
    const [, path = '',] = this.getFirstLine(data).split(' ')
    console.log({ path })

    if (path.toString().indexOf('://') !== -1) {
      const url = new URL(path)
      return url.pathname
    }

    return path
  }

  parseBody(data) {
    const [, body = '',] = this.getHeadersAndBody(data)
    return body
  }
}

module.exports = { Request }
