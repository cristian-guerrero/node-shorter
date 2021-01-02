

const createShortUrl = async (responseData, callback) => {



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