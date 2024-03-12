module.exports = class HttpWebServer {
    constructor(port) {
        this.port = port || 80
        this._server = null
    }

    start() {
        this._server = require('http').createServer()
        this._server.listen(this.port)

        return this._server
    }
}