const Db = require('../db')

const createShortUrl = async (responseData, callback) => {

  const db = new Db()
  const text =`INSERT INTO url (url) VALUES ($1)`
  const values = [responseData.body.url]
  const result = await db.transaction([{text, values}])

  console.log(result)

   // console.log( callback)
  callback( {msg: 'The message'})
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
