const { EventEmitter } = require('events')

module.exports = class HttpWebServer extends EventEmitter {
    constructor(port) {
        super()

        this.port = port
        this._httpserver = null
        this._httpsserver = null
    }

    startHttp() {
        this._httpserver = require('http').createServer()
        this._httpserver.listen(this.port || 80)

        this._httpserver.on('request', (req, res) => {
            this.emit('request', req, res)
        })

        return this._httpserver
    }

    startHttps(key, certificate) {
        this._httpsserver = require('https').createServer(
            {
                key: key,
                cert: certificate
            }
        )
        this._httpsserver.listen(this.port || 443)

        this._httpsserver.on('request', (req, res) => {
            this.emit('request', req, res)
        })

        return this._httpsserver
    }
}