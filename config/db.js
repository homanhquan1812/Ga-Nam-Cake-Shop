const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

async function connect()
{
    try {
        await mongoose.connect('mongodb+srv://homanhquan:homanhquan@cluster0.ap9zdrs.mongodb.net/cakeshopDatabase')
        console.log('Connected successfully.')
    } catch (error) {
        console.log('Failed to connect.')
    }
}

module.exports = { connect }