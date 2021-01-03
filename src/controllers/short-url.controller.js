const Db = require('../db')

const createShortUrl = async (responseData, callback) => {

  const numCPUs = require('os').cpus().length;

  console.log(numCPUs)

  const db = new Db()
  const text =`INSERT INTO url (id, url) VALUES ($1, $2) RETURNING *`
  const values = [db.newId, responseData.body.url]
  const result = await db.transaction([{text, values}])

  //console.log(result[0].rows[0])

   // console.log( callback)
  callback( {msg: 'The message', data:result[0].rows[0] })
}

const updateShortUrl = async (responseData, callback) => {


  callback( {msg: 'The message'})
}

const getShortUrl = async (responseData, callback) => {

  


  callback( {msg: 'The message'})
}

const getAllShortUrl = async (responseData, callback) => {


  callback( {msg: 'The message'},500)
}


module.exports = {

  createShortUrl, updateShortUrl, getAllShortUrl, getShortUrl
}
