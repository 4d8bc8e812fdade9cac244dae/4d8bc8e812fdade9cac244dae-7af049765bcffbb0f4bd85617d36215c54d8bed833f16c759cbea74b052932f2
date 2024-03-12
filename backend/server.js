const { EventEmitter } = require('events')

module.exports = class HttpWebServer extends EventEmitter {
    constructor(port) {
        super()

        this.port = port || 80
        this._server = null
    }

    start() {
        this._server = require('http').createServer()
        this._server.listen(this.port)

        return this._server
    }
}