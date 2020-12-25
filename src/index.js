
require('./env')()
const {server} = require('./server')


const testHandler = (responseData, callback ) => {

  callback(200, {msg: 'The message'})
}


const paths = {
  '/api/test': testHandler
}
server.setAllowedPaths(paths)

server.init()