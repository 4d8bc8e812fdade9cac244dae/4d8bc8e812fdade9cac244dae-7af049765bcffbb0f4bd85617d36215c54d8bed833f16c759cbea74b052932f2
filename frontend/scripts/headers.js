(req, res) => {
    res.write(JSON.stringify(req.headers))
    res.end()
}