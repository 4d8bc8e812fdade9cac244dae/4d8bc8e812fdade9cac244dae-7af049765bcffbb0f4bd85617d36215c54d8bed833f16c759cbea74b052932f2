process.on('uncaughtException', (e) => console.error(e.stack))

const fs = require('fs')

function readPath(path) {
    return fs.readFileSync(require('path').join(__dirname, path))
}

const config = {
    assetsPath: '/assets/',
    exampleFilePath: 'frontend/systemPaths/debug/',
    examplePath: '/debug/',
    notFound: readPath('frontend/systemPaths/notfound/index.html'),
    port: null
}

const ServerClass = require('./server')
const server = new ServerClass(config.port)
try {
    server.startHttp()
} catch {}
try {
    server.startHttps(
        fs.readFileSync('/etc/letsencrypt/live/nekoisa.dev/privkey.pem'),
        fs.readFileSync('/etc/letsencrypt/live/nekoisa.dev/fullchain.pem')
    )
} catch {}
try {
    server.startWS()
} catch {}
try {
    server.startWSS()
} catch {}

const domainMap = [
    {
        name: 'nekoisa.dev',
        custom: false
    },
    {
        name: 'doin-your.mom',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./frontend/systemPaths/domains/doin-your.mom/index.html'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/0.png',
                    pathFile: readPath('./frontend/systemPaths/domains/doin-your.mom/0.png'),
                    runAsJavascript: false,
                },
            ],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'minecraft.doin-your.mom',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./frontend/paths/minecraft/index.html'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/assets.epk',
                    pathFile: readPath('./frontend/paths/minecraft/assets.epk'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/classes.js',
                    pathFile: readPath('./frontend/paths/minecraft/classes.js'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/classes.js.map',
                    pathFile: readPath('./frontend/paths/minecraft/classes.js.map'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/favicon.png',
                    pathFile: readPath('./frontend/paths/minecraft/favicon.png'),
                    runAsJavascript: false,
                },
            ],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'ifyouseethisyoulikemenkissing.xyz',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./frontend/systemPaths/debug/randomtest2.html'),
                    runAsJavascript: false,
                }
            ],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: '2hw.icu',
        custom: {
            pathMap: [],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'discord-refined.nekoisa.dev',
        custom: {
            pathMap: [],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'music.nekoisa.dev',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./assets/bomb.mid'),
                    runAsJavascript: false,
                }
            ],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'files.nekoisa.dev',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./assets/bomb.zip'),
                    runAsJavascript: false,
                }
            ],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'scripts.nekoisa.dev',
        custom: {
            pathMap: [
                {
                    pathName: '/list.json',
                    pathFile: readPath('./assets/list.json'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/installer.sh',
                    pathFile: readPath('./assets/installer.sh'),
                    runAsJavascript: false,
                },
                {
                    pathName: '',
                    pathFile: readPath('./assets/installer.sh'),
                    runAsJavascript: false,
                }
            ],
            assets: [],
            example: [],
            notFound: '',
            toggles: {
                assets: false,
                example: false,
                notFound: false,
            }
        }
    },
    {
        name: 'www.nekoisa.dev',
        custom: false
    },
    {
        name: 'proxy.nekoisa.dev',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./frontend/paths/proxy/index.js'),
                    runAsJavascript: true,
                },
            ],
            assets: [],
            example: [],
            notFound: '',
            toggles: {
                assets: false,
                example: false,
                notFound: false,
            }
        }
    },
    {
        name: 'alt.doin-your.mom',
        custom: true,
        proxy: 'https://nekoisa.dev'
    },
    {
        name: 'doxbin.live',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./frontend/paths/minecraft/index.html'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/assets.epk',
                    pathFile: readPath('./frontend/paths/minecraft/assets.epk'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/classes.js',
                    pathFile: readPath('./frontend/paths/minecraft/classes.js'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/classes.js.map',
                    pathFile: readPath('./frontend/paths/minecraft/classes.js.map'),
                    runAsJavascript: false,
                },
                {
                    pathName: '/favicon.png',
                    pathFile: readPath('./frontend/paths/minecraft/favicon.png'),
                    runAsJavascript: false,
                },
            ],
            assets: [],
            example: [],
            notFound: readPath('./frontend/systemPaths/domains/global/nginx_notfound.html'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'md.nekoisa.dev',
        custom: {
            pathMap: [
                {
                    pathName: '',
                    pathFile: readPath('./assets/md.mp4'),
                    runAsJavascript: false,
                },
            ],
            assets: [],
            example: [],
            notFound: readPath('./assets/md.mp4'),
            toggles: {
                assets: false,
                example: false,
                notFound: true,
            }
        }
    },
    {
        name: 'g2rbevpos7n5c5s5dod2upuvdvluohsiv6czpy45p3eif7lmbonl44ad.onion',
        custom: true,
        proxy: 'https://nekoisa.dev'
    },
]

const pathMap = [
    {
        pathName: '',
        pathFile: readPath('./frontend/paths/main/index.html'),
        runAsJavascript: false,
    },
    {
        pathName: '/dns',
        pathFile: readPath('./frontend/paths/domains/index.html'),
        runAsJavascript: false,
    },
    {
        pathName: '/domain',
        pathFile: readPath('./frontend/paths/domains/index.js'),
        runAsJavascript: true,
        allowedTypes: ['POST']
    },
    {
        pathName: '/robots.txt',
        pathFile: readPath('./assets/robots.txt'),
        runAsJavascript: false,
    },
    {
        pathName: '/easymc/tokens',
        pathFile: readPath('./frontend/paths/easymc/scraper.html'),
        runAsJavascript: false,
    },
    {
        pathName: '/info',
        pathFile: readPath('./frontend/scripts/info.js'),
        runAsJavascript: true
    },
    {
        pathName: '/headers',
        pathFile: readPath('./frontend/scripts/headers.js'),
        runAsJavascript: true
    },
    {
        pathName: '/countries',
        pathFile: readPath('./frontend/paths/countries/index.html'),
        runAsJavascript: false
    },
    {
        pathName: '/owoify',
        pathFile: readPath('./frontend/paths/owoify/index.html'),
        runAsJavascript: false
    },
    {
        pathName: '/.well-known/discord',
        pathFile: readPath('./assets/discord'),
        runAsJavascript: false
    },
]

const assets = [
    {
        pathName: 'style.css',
        pathFile: readPath('./assets/style.css')
    },
    {
        pathName: 'domains',
        pathFile: readPath('domains.json')
    },
    {
        pathName: 'rickroll.mp4',
        pathFile: readPath('./assets/rickroll.mp4')
    },
    {
        pathName: 'bomb.mid',
        pathFile: readPath('./assets/bomb.mid')
    },
    {
        pathName: 'countries.json',
        pathFile: readPath('./assets/countries.json')
    },
    {
        pathName: 'bomb.zip',
        pathFile: readPath('./assets/bomb.zip')
    },
]

const example = []

fs.readdirSync(config.exampleFilePath).forEach(dir => {
    example.push({
        pathName: dir,
        pathFile: readPath(`${config.exampleFilePath}/${dir}`)
    })
})

server.on('request', (req, res) => {
    let host = ''
    let domain
    let path = req.url || ''
    if (req && req.headers && req.headers['host']) host = req.headers['host']
    if (host) domain = domainMap.find(domain => domain.name === host)
    if (!req.method) req.method = 'GET'
    if (path.endsWith('/')) path = path.slice(0, -1)

    if (domain) {
        if (!domain.custom) {
            if (path.startsWith(config.assetsPath)) {
                const requestedFilePath = path.substring(config.assetsPath.length)
        
                const requestedFile = assets.find(asset => asset.pathName === requestedFilePath)
        
                if (requestedFile) {
                    res.statusCode = 200
                    res.write(requestedFile.pathFile)
                    res.end()
                } else {
                    res.statusCode = 404
                    res.write(config.notFound)
                    res.end()
                }
        
                return
            }
        
            if (path.startsWith(config.examplePath)) {
                const requestedFilePath = path.substring(config.examplePath.length)
        
                const requestedFile = example.find(example => example.pathName === requestedFilePath)
        
                if (requestedFile) {
                    res.statusCode = 200
                    res.write(requestedFile.pathFile)
                    res.end()
                } else {
                    res.statusCode = 404
                    res.write(config.notFound)
                    res.end()
                }
        
                return
            }
            
            const foundPath = pathMap.find(pathData => pathData.pathName === path)
        
            if (foundPath) {
                if (foundPath.allowedTypes) {
                    const allowed = foundPath.allowedTypes.findIndex(type => type === req.method)
                    if (allowed === -1) {
                        res.statusCode = 400
                        res.write(`Invalid request method: ${req.method} expected ${foundPath.allowedTypes.join(' ')}`)
                        res.end()
                        return
                    }
                }
                if (foundPath.runAsJavascript) {
                    try {
                        eval(foundPath.pathFile.toString())(req, res)
                    } catch (e) {
                        res.statusCode = 500
                        res.write(`500 Internal server error: ${e.message ? e.message : 'Unknown error'}`)
                        res.end()
                    }
                    return
                } else {
                    res.statusCode = 200
                    res.write(foundPath.pathFile)
                    res.end()
                    return
                }
            } else {
                res.statusCode = 404
                res.write(config.notFound)
                res.end()
            }
        } else {
            if (domain.proxy) {
                const proxyModule = require(domain.proxy.startsWith('https:') ? 'https' : 'http')

                const proxyUrl = new URL(`${domain.proxy}/${path}`)
                req.headers.host = proxyUrl.host
                
                const proxyReq = proxyModule.request(
                    {
                        host: proxyUrl.host,
                        port: proxyUrl.port || (proxyUrl.protocol === 'https:' ? 443 : 80),
                        path: req.url,
                        method: req.method,
                        headers: req.headers,
                        rejectUnauthorized: false
                    }, proxyRes => {
                        res.writeHead(proxyRes.statusCode, proxyRes.headers)
                        let data = []

                        proxyRes.on('data', (chunk) => {
                            data.push(chunk)
                        })

                        proxyRes.once('end', () => {
                            data.forEach(chunk => {
                                res.write(chunk)
                            })
                            res.end()
                        })

                        proxyRes.on('error', () => {proxyRes.end()})
                    }
                )
                
                proxyReq.on('error', (e) => {
                    res.writeHead(500)
                    res.end(`Internal Server Error: ${e.message}`)
                })
                
                proxyReq.end()
            } else if (domain.custom.toggles && domain.custom.toggles.assets && domain.custom.assets) {
                if (path.startsWith(config.assetsPath)) {
                    const requestedFilePath = path.substring(config.assetsPath.length)
            
                    const requestedFile = domain.assets.find(asset => asset.pathName === requestedFilePath)
            
                    if (requestedFile) {
                        res.statusCode = 200
                        res.write(requestedFile.pathFile)
                        res.end()
                    } else {
                        res.statusCode = 404
                        if (domain.custom.toggles && domain.custom.toggles.notFound && domain.custom.notFound) res.write(domain.custom.notFound)
                        else res.write(config.notFound)
                        res.end()
                    }
            
                    return
                }
            } else if (domain.custom.toggles && domain.custom.toggles.example && domain.custom.example) {
                if (path.startsWith(config.examplePath)) {
                    const requestedFilePath = path.substring(config.examplePath.length)
            
                    const requestedFile = domain.assets.find(asset => asset.pathName === requestedFilePath)
            
                    if (requestedFile) {
                        res.statusCode = 200
                        res.write(requestedFile.pathFile)
                        res.end()
                    } else {
                        res.statusCode = 404
                        if (domain.custom.toggles && domain.custom.toggles.notFound && domain.custom.notFound) res.write(domain.custom.notFound)
                        else res.write(config.notFound)
                        res.end()
                    }
            
                    return
                }
            } else if (domain.custom.toggles && domain.custom.pathMap) {
                const foundPath = domain.custom.pathMap.find(pathData => pathData.pathName === path)
    
                if (foundPath) {
                    if (foundPath.allowedTypes) {
                        const allowed = foundPath.allowedTypes.findIndex(type => type === req.method)
                        if (allowed === -1) {
                            res.statusCode = 400
                            res.write(`Invalid request method: ${req.method} expected ${foundPath.allowedTypes.join(' ')}`)
                            res.end()
                            return
                        }
                    }
                    if (foundPath.runAsJavascript) {
                        try {
                            eval(foundPath.pathFile.toString())(req, res)
                        } catch (e) {
                            res.statusCode = 500
                            res.write(`500 Internal server error: ${e.message ? e.message : 'Unknown error'}`)
                            res.end()
                        }
                        return
                    } else {
                        res.statusCode = 200
                        res.write(foundPath.pathFile)
                        res.end()
                        return
                    }
                } else {
                    res.statusCode = 404
                    if (domain.custom.toggles && domain.custom.toggles.notFound && domain.custom.notFound) res.write(domain.custom.notFound)
                    else res.write(config.notFound)
                    res.end()
                }
            }
        }
    } else {
        res.statusCode = 404
        res.write(config.notFound)
        res.end()
    }
})

const webSocketList = []