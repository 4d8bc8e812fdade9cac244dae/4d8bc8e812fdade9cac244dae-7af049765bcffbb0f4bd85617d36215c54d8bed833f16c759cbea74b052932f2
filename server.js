const { EventEmitter } = require('events')

module.exports = class HttpWebServer extends EventEmitter {
    constructor(port) {
        super()

        this.port = port
        this._httpserver = null
        this._httpsserver = null
        this._wsserver = null
        this._wssserver = null
        this._wsModule = null
    }

    startHttp() {
        try {
            this._httpserver = require('http').createServer()
            this._httpserver.listen(this.port || 80)
    
            this._httpserver.on('request', (req, res) => {
                this.emit('request', req, res)
            })
    
            return this._httpserver
        } catch {}
    }

    startHttps(key, certificate) {
        try {
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
        } catch {}
    }

    startWS() {
        try {
            this._wsModule = require('./modules/ws')
        } catch {
            console.log('WS module was not found, not starting websocket server.')
            return
        }

        if (ws) {
            try {
                this._wsserver = new this._wsModule.WebSocketServer(
                    {
                        server: this._httpserver || undefined
                    }
                )

                this._wsserver.on('connection', (socket) => {
                    this.emit('socket-connection', socket)
                })
            } catch {}
        }
    }

    startWSS() {
        try {
            this._wsModule = require('./modules/ws')
        } catch {
            console.log('WS module was not found, not starting secure websocket server.')
            return
        }

        if (ws) {
            try {
                this._wssserver = new this._wsModule.WebSocketServer(
                    {
                        server: this._httpsserver || undefined
                    }
                )

                this._wssserver.on('connection', (socket) => {
                    this.emit('socket-connection', socket)
                })
            } catch {}
        }
    }
}