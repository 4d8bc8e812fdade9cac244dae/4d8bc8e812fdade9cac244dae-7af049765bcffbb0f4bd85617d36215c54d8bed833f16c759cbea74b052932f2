(req, res) => {
    const fs = require('fs')
    const crypto = require('crypto')
    let request = ''
    req.once('data', (chunk) => {
        chunk = chunk.toString()
        request += chunk
    })

    req.once('end', () => {
        fs.readFile('proxy_keys', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.write('Proxy key fetch error')
                res.end()
                return
            } else {
                data = data.toString()
                data = data.split('\n')

                if (request.length > 64) {
                    const hash = crypto.createHash('sha256').update(request).digest('hex').substring(16, 32)

                } else {
                    res.statusCode = 500
                    res.write('Kinda weird of a request not gonna lie...')
                    res.end()
                    return
                }
            }
        })
    })
}