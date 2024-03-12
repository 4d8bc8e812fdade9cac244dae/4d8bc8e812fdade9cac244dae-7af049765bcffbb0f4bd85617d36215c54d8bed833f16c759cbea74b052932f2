const ServerClass = require('./server')
const server = new ServerClass(80).start()

function readPath(path) {
    return require('fs').readFileSync(require('path').join(__dirname, `./frontend/paths/${path}`)).toString('utf-8')
}

const pathMap = [
    {
        pathName: '/',
        pathFile: readPath('main/index.html')
    }
]

server.on('request', (req, res) => {
    const path = req.url || '/'
    
    const foundPath = pathMap.find(pathData => pathData.pathName === path)

    if (foundPath) {
        res.write(foundPath.pathFile)
    } else {
        res.write(pathMap[0].pathFile)
    }

    res.end()
})