const messages = require('./messages.js')

class ApplicationError extends Error {
  extras = null
  status = '400'

  constructor(status, extras = {}) {
    super(messages[status.toString()])
    this.extras = extras
    this.status = status
  }

  getStatus() {
    return this.status
  }

  toJSON() {
    const { status, message, extras } = this
    return { status, message, extras }
  }
}

class NotFoundError extends ApplicationError {
  constructor(extras = {}) {
    super('404', extras)
  }
}

module.exports = {
  ApplicationError,
  NotFoundError,
}
