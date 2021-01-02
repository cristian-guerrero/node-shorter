
require('./env')()

const {server} = require('./server')

const routes = require('./routes')




server.setAllowedPaths(routes)

server.init()