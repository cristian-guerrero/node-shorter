const fs = require('fs')
const { baseDir } = require('./server')

const setEnv = () => {
  console.log('Reading env variables...')
    const env = fs.readFileSync(`${baseDir}.env`, 'utf-8')
    env.replace(/(\w+)=((\d+)|.+)/g,   (_, key, value, number)  =>{
      process.env[key] = number ? Number(number) : value
    })

}


module.exports = setEnv 