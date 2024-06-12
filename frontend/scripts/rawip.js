(req, res) => {
    const toBlock = '::ffff:'

    res.statusCode = 200
    try {
        let ipAddress = req.socket.remoteAddress || ''

        if (ipAddress.startsWith(toBlock)) {
            ipAddress = ipAddress.substring(toBlock.length)
        }

        res.write(req.headers['cf-connecting-ip'] || ipAddress || undefined)
    } catch {}
    res.end()
}