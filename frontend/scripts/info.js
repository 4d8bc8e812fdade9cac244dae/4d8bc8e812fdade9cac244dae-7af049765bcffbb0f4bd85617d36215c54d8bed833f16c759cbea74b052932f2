(req, res) => {
    let platform = null

    try {
        platform = JSON.parse(req.headers['sec-ch-ua-platform'])
    } catch {
        platform = null
    }

    res.statusCode = 200
    try {
        res.write(JSON.stringify(
            {
                ipAddress: req.socket.remoteAddress || null,
                platform: platform
            }
        ))
    } catch {
        res.write(JSON.stringify({}))
    }
    res.end()
}