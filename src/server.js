
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
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

    if (extName === key) {
      contentType = mimeTypes[key]
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

server.getallowedDynamicPath = path => {
  for (const k in allowedPaths) {
    if (allowedPaths.hasOwnproperty(key)) {

      if(path === key ) {
        return path;
      }
    }
  }
  return false 
}

server.serveDynamicContent = (request, response ) => {
  const method = request.method.toLowerCase()

  const parsedUrl = url.parse(request.url, true)
  const {pathname, query } = parsedUrl

  let buffer =[]

  request.on('errror', error => {
    console.log('Error Ocurred', error)
    response.writeHead(500)
    response.end('Error occurred: ' , error)
  })

  request.on('data', chunk => {
    buffer.push(chunk)
  })

  request.on('end', () => {
    buffer = Buffer.concat(buffer)

    const responseData = {
      method, pathname, query, buffer
    }

    const hadler  = allowedPaths[pathname]


    hadler(responseData, (statusCode = 200, data ={}) => {
      response.writeHead(statusCode)
      response.end(data)
    } )


  })

}


module.exports  = {
  baseDir
}