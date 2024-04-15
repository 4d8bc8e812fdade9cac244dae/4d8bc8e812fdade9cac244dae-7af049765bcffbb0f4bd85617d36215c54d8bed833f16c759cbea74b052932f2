(req, res) => {
    let platform
    const toBlock = '::ffff:'

    try {
        platform = JSON.parse(req.headers['sec-ch-ua-platform'])
    } catch (e) {
        platform = undefined
    }

    res.statusCode = 200
    try {
        let ipAddress = req.socket.remoteAddress || ''

        if (ipAddress.startsWith(toBlock)) {
            ipAddress = ipAddress.substring(toBlock.length)
        }

        res.write(JSON.stringify(
            {
                ipAddress: ipAddress || null,
                platform: platform
            }
        ))
    } catch {
        res.write(JSON.stringify({}))
    }
    res.end()
}