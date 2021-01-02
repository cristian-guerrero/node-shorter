const shortUrl = require('../controllers/short-url.controller')



const routes = [
  {
    url: '/api/short-url',
    method: 'post',
    callback: shortUrl.createShortUrl
  }
]
module.exports = routes