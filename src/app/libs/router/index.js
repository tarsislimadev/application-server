
class Router {
  requests = []

  request(method, path, fn = ((_, res) => res)) {
    this.requests.push({ method, path, fn })
    return this
  }

  run(request, response) {
    const action = this.requests.find((req) =>
      ['*', request.method].indexOf(req.method) != -1 && ['*', request.path].indexOf(req.path) != -1
    )

    if (!action) {
      return response
    }

    return action.fn(request, response)
  }
}

module.exports = { Router }
