
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const {URL} = require('url')
const { chdir } = require('process')


const server = {}

const baseDir = path.join(__dirname, '../')


const mimeTypes = {
  '.http': 'text/html',
  '.jpg': 'image/jpeg',
  '.css': 'tetxt/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
}

// conten type
server.getContentType = url => {
  let contentType = 'application/octet-stream'

  const extName = path.extname(url)

  for (const k in mimeTypes) {

    if (extName === k) {
      contentType = mimeTypes[k]
      break
    }
  }
  return contentType
}

// static files
server.serveStaticContent = (pathName, response) => {

  const contentType = server.getContentType(pathName)

  response.setHeader('Content-type', contentType)

  fs.readFile(`${baseDir}${pathName}`, (error, data) => {
    if (!error) {
      response.writeHead(200)
      response.end(data)

    } else {
      response.writeHead(404)
      response.end('404 - File Not Found')
    }

  })

}

let allowedPaths = {}

server.getallowedDynamicPath = ({ path, method }) => {


  for (const r of allowedPaths) {
    if (r.url === path && r.method.toLowerCase() === method) {
      return r
    }
  }

  return false
}

server.serveDynamicContent = (request, response, callback) => {
  const method = request.method.toLowerCase()

  const parsedUrl = url.parse(request.url, true)
  const { pathname, query } = parsedUrl

  let buffer = []

  request.on('error', error => {
    console.log('Error Ocurred', error)
    response.writeHead(500)
    response.end('Error occurred: ', error)
  })

  request.on('data', chunk => {
    buffer.push(chunk)
  })

  request.on('end', () => {
    buffer = Buffer.concat(buffer)


    const body = JSON.parse(buffer.toString())

    const responseData = {
      method, pathname, query, body
    }

    callback(responseData, ( data = {},statusCode = 200) => {
      response.writeHead(statusCode, {'Content-Type': 'application/json'})
      data =  JSON.stringify(data)
      response.end(data)
    })

  })

}

const httpServer = http.createServer((request, response) => {
  const path = url.parse(request.url, false).pathname

  const method = request.method.toLowerCase()

  const dynamicPath = server.getallowedDynamicPath({ path, method })


  if (dynamicPath) {
    server.serveDynamicContent(request, response, dynamicPath.callback)
  } else {
    server.serveStaticContent(path, response)
  }

})


server.setAllowedPaths = paths => {
  allowedPaths = paths
}


server.init = ((port = 4321, host = '127.0.0.1') => {

  httpServer.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`)
  })
})


module.exports = {
  baseDir, server
}

