// 

class Response {
  status = 200
  headers = new Headers()
  body = ''

  request = null

  constructor(request) {
    this.request = request
  }

  setJSON(json = {}, status = 200) {
    this.status = status
    this.headers.set('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
    return this
  }

  setText(text = '', status = 200) {
    this.status = status
    this.headers.set('Content-type', 'text/html')
    this.body = text
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  getStatus() {
    return this.status.toString()
  }

  getStatusMessage() {
    switch (this.getStatus()) {
      case '200': return 'OK'
      case '400': return 'CLIENT ERROR'
      case '500': return 'SERVER ERROR'
    }

    return 'ERROR'
  }

  getProtocol() {
    return this.request.protocol
  }

  getHeaders() {
    return Array.from(this.headers).map(([key, value = '']) => `${key}: ${value}`)
  }

  getBodyString() {
    return this.body.toString()
  }

  getAllLines() {
    return [
      `${this.getProtocol()} ${this.getStatus()} ${this.getStatusMessage()}`,
      ...this.getHeaders(),
      '',
      this.getBodyString(),
    ]
  }

  toString() {
    return this.getAllLines().join('\r\n')
  }
}

module.exports = { Response }
