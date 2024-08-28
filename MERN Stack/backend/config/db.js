const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log('Database connected successfully.')
	} catch (error) {
		console.error('Failed to connect to database.', error)
	}
}

module.exports = { connect }