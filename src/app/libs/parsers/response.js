const { ApplicationError } = require('../errors/index.js')

const messages = require('../errors/messages.js')

class Response {
  status = '200'
  headers = new Headers()
  body = ''
  request = null

  constructor(request) {
    this.request = request
  }

  setJSON(json = {}, status = '200') {
    console.log('setJSON', { json, status })
    this.setStatus(status)
    this.setHeader('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
    return this
  }

  setText(text = '', status = '200') {
    console.log('setText', { text, status })
    this.setStatus(status)
    this.setHeader('Content-type', 'text/html')
    this.body = text
    return this
  }

  setHeader(key, value = '') {
    console.log('setHeader', { key, value })
    this.headers.set(key, value)
    return this
  }

  setStatus(status) {
    console.log('setStatus', { status })
    this.status = status
    return this
  }

  setError(error = new ApplicationError) {
    console.log('setError', { error })
    this.setStatus(error.getStatus())
    this.body = JSON.stringify(error)
    return this
  }

  getStatus() {
    console.log('getStatus', {})
    return this.status.toString()
  }

  getStatusMessage() {
    console.log('getStatusMessage', {})

    const message = messages[this.getStatus()]

    return message || 'ERROR'
  }

  getProtocol() {
    console.log('getProtocol', {})
    return this.request.protocol
  }

  getHeaders() {
    console.log('getHeaders', {})
    return Array.from(this.headers).map(([key, value = '']) => `${key}: ${value}`)
  }

  getBodyString() {
    console.log('getBodyString', {})
    return this.body.toString()
  }

  getAllLines() {
    console.log('getAllLines', {})

    return [
      `${this.getProtocol()} ${this.getStatus()} ${this.getStatusMessage()}`,
      ...this.getHeaders(),
      '',
      this.getBodyString(),
    ]
  }

  toString() {
    console.log('toString', {})
    return this.getAllLines().join('\r\n')
  }
}

module.exports = { Response }
