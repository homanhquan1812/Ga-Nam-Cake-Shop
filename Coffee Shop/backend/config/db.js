require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.POSTGRESQL_DATABASE_URL
})

async function connect() {
    try {
        await pool.connect()
        console.log('Database connected successfully.')
    } catch (error) {
        console.error('Failed to connect to database.', error)
    }
}

module.exports = { connect, pool }