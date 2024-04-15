(req, res) => {
    let platform = null
    const toBlock = '::ffff:'

    try {
        platform = JSON.parse(req.headers['sec-ch-ua-platform'])
    } catch {
        platform = null
    }

    res.statusCode = 200
    try {
        if (req.socket.remoteAddress.startsWith(toBlock)) req.socket.remoteAddress = req.socket.remoteAddress.substring(toBlock.length)
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