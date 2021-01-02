const { Pool, Client } = require('pg')
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const pool = new Pool({
  connectionString,
})
