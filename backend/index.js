const config = {
    assetsPath: '/assets/',
    port: 80
}

const ServerClass = require('./server')
const server = new ServerClass(config.port).start()

function readPath(path) {
    return require('fs').readFileSync(require('path').join(__dirname, path))
}

const pathMap = [
    {
        pathName: '/',
        pathFile: readPath('./frontend/paths/main/index.html')
    }
]

const assets = [
    {
        pathName: 'favicon.ico',
        pathFile: readPath('./assets/favicon.ico')
    }
]

server.on('request', (req, res) => {
    const path = req.url || '/'

    if (path.startsWith(config.assetsPath)) {
        const requestedFilePath = path.substring(config.assetsPath.length)

        const requestedFile = assets.find(asset => asset.pathName === requestedFilePath)

        if (requestedFile) {
            res.write(requestedFile.pathFile)
            res.end()
        } else {
            res.statusCode = 404
            res.write('404 - Not found')
            res.end()
        }

        return
    }
    
    const foundPath = pathMap.find(pathData => pathData.pathName === path)

    if (foundPath) {
        res.write(foundPath.pathFile)
    } else {
        res.write(pathMap[0].pathFile)
    }

    res.end()
})