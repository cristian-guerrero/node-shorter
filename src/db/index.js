const { Pool, Client } = require('pg')
const {
  POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_PORT, POSTGRES_DB_HOST,
} = process.env

//
const connectionString = `postgresql://${ POSTGRES_USER }:${ POSTGRES_PASSWORD }@${ POSTGRES_DB_HOST }:${ POSTGRES_DB_PORT }/${ POSTGRES_DB }`
console.log(connectionString)
const pool = new Pool({
  //connectionString,
  host: POSTGRES_DB_HOST,
  port: POSTGRES_DB_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,

  //
  max: 10,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 2000,

})


/* 
// official documentation https://node-postgres.com/features/connecting


pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/

class Db {

  query = async ({ text, values, name }) => {

    const start = Date.now()
    const client = await pool.connect()
    const res = await client.query({ text, values, name })
    client.release()
    const duration = Date.now() - start
    console.log(`Executed query in:${ duration }`)

    return res
  }

  /*
    Transactions if you have all data (values)
   */
  transaction = async queries => {

    const start = Date.now()
    const { client, clientRelease } = await this.client()
    const result = []
    try {
      if (!Array.isArray(queries)) {
        throw new Error('Queries must be an array')
      }

      await client.query('BEGIN')
      for (const q of queries) {
       result.push( await client.query(q.text, q.values))
      }

      await client.query('COMMIT')
      const duration = Date.now() - start
      console.log(`Executed transaction in:${ duration }`)
      return result
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      clientRelease()
    }

  }

  client = async () => {

    const client = await pool.connect()
    const clientRelease = () => client.release()

    return { client, clientRelease }

  }

}


module.exports = Db
