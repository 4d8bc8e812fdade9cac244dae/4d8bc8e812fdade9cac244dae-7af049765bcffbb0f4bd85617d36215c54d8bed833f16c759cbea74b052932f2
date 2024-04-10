(req, res) => {
    const fs = require('fs')
    let request = ''
    req.once('data', (chunk) => {
        chunk = chunk.toString()
        request += chunk
    })

    req.once('end', () => {
        fs.readFile('domains.json', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.write('Domain fetch error')
                res.end()
                return
            } else {
                data = data.toString()
                try {
                    data = JSON.parse(data)
                } catch {
                    res.statusCode = 500
                    res.write('Domain fetch error')
                    res.end()
                    return
                }

                try {
                    const found = data.find(domain => domain.domain.toLowerCase() === request.toLowerCase())
                    if (found) {
                        res.statusCode = 200
                        res.write(found.resolve)
                        res.end()
                    } else {
                        res.statusCode = 404
                        res.write('Domain not found')
                        res.end()
                    }
                } catch {
                    res.statusCode = 500
                    res.write('Domain fetch error')
                    res.end()
                    return
                }
            }
        })
    })
}