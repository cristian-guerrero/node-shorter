const { Pool, Client } = require('pg')
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB,
  POSTGRES_DB_PORT, POSTGRES_DB_HOST, } = process.env

//
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}/${POSTGRES_DB}`
const pool = new Pool({
  connectionString,
})


/* 
// official documentation https://node-postgres.com/features/connecting


pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/

module.exports = pool